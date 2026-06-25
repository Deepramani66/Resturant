import { useActionState, useContext, useState } from 'react';
import { CartContext } from '../../store/CartProvider';
import { CurrencyFormater } from '../../util/currencyFormate';
import { addOrder, razorpaypayment } from '../../api/orderApi';

const CheckOutForm = ({ open, setIsChekingout }) => {
  const { cart, clearCart } = useContext(CartContext);
  const [success, setSuccess] = useState(false);

  const SubTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const onsubmit = async (prevState, formData) => {
    const userData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      street: formData.get("street"),
      postalCode: formData.get("postalCode"),
      city: formData.get("city"),
    };

    try {
      const response = await addOrder(userData);
      const paymentSuccess = await razorpaypayment(response.order._id);

      console.log(paymentSuccess)
      if (paymentSuccess) {
        clearCart();
        setSuccess(true);
      }

      return {
        error: null,
        userData: {},
      };
    } catch (error) {
      console.error(error);
      return {
        error: "Failed to place order",
        userData,
      };
    }
  };

  const [formState, formAction, pending] = useActionState(onsubmit, {
    error: null,
    userData: {}
  });

    const newLocal = "w-full max-w-125 h-[46px] px-4 border-2 border-[#e5e0d8] rounded-xl text-[15px] outline-none bg-white box-border transition-all duration-200 font-inherit hover:border-[#cbd5e1] focus:border-[#ffbb00] focus:shadow-[0_0_0_3px_rgba(255,187,0,0.2)]";
  return (
    <>
      <div className="w-full max-w-212.5 bg-[#ded7cb] rounded-[30px] p-8 mx-auto box-border shadow-[0_12px_28px_rgba(0,0,0,0.1)] max-sm:p-5 max-sm:rounded-[20px]">
        <h2 className="text-[30px] font-bold mb-2 text-[#2c2b28] max-sm:text-2xl">
          Checkout
        </h2>

        <p className="text-[18px] mb-7 pb-4 border-b-2 border-black/10 text-[#3b3a37] font-medium max-sm:text-base">
          Total Amount: {CurrencyFormater.format(SubTotal)}
        </p>

        <form action={formAction} className="flex flex-col gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-[#2c2b28] tracking-[0.3px]">
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              defaultValue={formState.userData?.fullName}
              className={newLocal}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-[#2c2b28] tracking-[0.3px]">
              E-Mail Address
            </label>
            <input
              name="email"
              type="email"
              defaultValue={formState.userData?.email}
              className="w-full max-w-125 h-11.5 px-4 border-2 border-[#e5e0d8] rounded-xl text-[15px] outline-none bg-white box-border transition-all duration-200 font-inherit hover:border-[#cbd5e1] focus:border-[#ffbb00] focus:shadow-[0_0_0_3px_rgba(255,187,0,0.2)]"
            />
          </div>

          {/* Street */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-[#2c2b28] tracking-[0.3px]">
              Street
            </label>
            <input
              name="street"
              type="text"
              defaultValue={formState.userData?.street}
              className="w-full max-w-125 h-11.5 px-4 border-2 border-[#e5e0d8] rounded-xl text-[15px] outline-none bg-white box-border transition-all duration-200 font-inherit hover:border-[#cbd5e1] focus:border-[#ffbb00] focus:shadow-[0_0_0_3px_rgba(255,187,0,0.2)]"
            />
          </div>

          {/* Row Fields - Postal Code & City */}
          <div className="flex gap-6 flex-wrap max-sm:flex-col max-sm:gap-4">
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              <label className="text-base font-semibold text-[#2c2b28] tracking-[0.3px]">
                Postal Code
              </label>
              <input
                name="postalCode"
                type="text"
                defaultValue={formState.userData?.postalCode}
                className="w-full h-11.5 px-4 border-2 border-[#e5e0d8] rounded-xl text-[15px] outline-none bg-white box-border transition-all duration-200 font-inherit hover:border-[#cbd5e1] focus:border-[#ffbb00] focus:shadow-[0_0_0_3px_rgba(255,187,0,0.2)]"
              />
            </div>

            <div className="flex-1 flex flex-col gap-2 min-w-0">
              <label className="text-base font-semibold text-[#2c2b28] tracking-[0.3px]">
                City
              </label>
              <input
                name="city"
                type="text"
                defaultValue={formState.userData?.city}
                className="w-full h-11.5 px-4 border-2 border-[#e5e0d8] rounded-xl text-[15px] outline-none bg-white box-border transition-all duration-200 font-inherit hover:border-[#cbd5e1] focus:border-[#ffbb00] focus:shadow-[0_0_0_3px_rgba(255,187,0,0.2)]"
              />
            </div>
          </div>

          {/* Error Message */}
          {formState.error && (
            <p className="text-[#dc2626] text-sm font-medium -mt-2">
              {formState.error}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end items-center gap-4 pt-2 max-sm:flex-col-reverse max-sm:items-stretch">
            <button
              type="button"
              className="bg-transparent border-none cursor-pointer text-[15px] font-semibold text-[#3b3a37] transition-all duration-200 hover:text-black max-sm:w-full max-sm:text-center"
              onClick={() => setIsChekingout(false)}
            >
              Close
            </button>

            <button
              type="submit"
              className="bg-[#ffbb00] border-none rounded-[10px] cursor-pointer px-7 py-3 min-w-42.5 text-[16px] font-bold text-[#1e1b15] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffae00] hover:shadow-[0_6px_14px_rgba(255,187,0,0.3)] active:translate-y-px disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none max-sm:w-full"
              disabled={pending}
            >
              {pending ? 'Submitting...' : 'Submit Order'}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex justify-center items-center z-9999 p-5">
          <div className="w-full max-w-105 bg-white rounded-2xl p-[36px_30px] text-center animate-[modalPopup_0.3s_ease] shadow-[0_20px_40px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.08)] max-sm:p-[28px_20px] max-sm:rounded-[18px]">
            <h2 className="text-[28px] mb-3 text-[#1f2937] max-sm:text-2xl">
              🎉 Order Successful!
            </h2>
            <p className="text-base leading-relaxed text-[#4b5563] mb-7 max-sm:text-[15px]">
              Your order has been placed successfully.
            </p>
            <button
              className="bg-[#ffbb00] border-none rounded-xl px-7 py-3 text-[15px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#ffae00] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(255,187,0,0.35)] active:translate-y-px max-sm:w-full"
              onClick={() => {
                setSuccess(false);
                setIsChekingout(false);
                open(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOutForm;