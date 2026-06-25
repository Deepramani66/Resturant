import axiosInstance from "./axios";

export const addOrder = async (enterddata) => {
  try {
    const response = await axiosInstance.post("/api/order/place-order", enterddata);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchOrders = async () => {
  try {
    const res = await axiosInstance.get("/api/order/get-order");

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getAllOrders = async () => {
  try {
    const res = await axiosInstance.get("/api/order/get-all-orders");

    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateOrderStatus = async (id, orderStatus) => {
  try {
    const res = await axiosInstance.put(`/api/order/change-status/${id}`, {
      orderStatus,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const razorpaypayment = async (orderId) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/order/payments/create-order/${orderId}`,
    );

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return false;
    }

    return new Promise((resolve, reject) => {
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,

        name: "The Bunglow",
        prefill: {
          name: data.customer?.fullName || "",
          email: data.customer?.email || "",
          contact: data.customer?.phone || "",
        },

        theme: {
          color: "#ffb03bff",
        },

        handler: async function (response) {
          try {
            const verifyRes = await axiosInstance.post(
              "/api/order/payments/verify",
              {
                orderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            );

            resolve(verifyRes.data.success);
          } catch (err) {
            reject(err);
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Checkout closed by user");
            resolve(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  } catch (error) {
    console.error("Payment initialization error:", error);
    throw error;
  }
};
