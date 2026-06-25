import axiosInstance from "./axios";

export const addToCart = async (cart) => {
  try {
    const response = await axiosInstance.post("/api/cart/add-to-cart", cart);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async () => {
  try {
    const response = await axiosInstance.get("/api/cart/get-cart");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeCartItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/cart/cart/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCartQuantity = async (id, quantity) => {
  try {
    const response = await axiosInstance.patch(`/api/cart/cart/${id}`, {
      quantity,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
