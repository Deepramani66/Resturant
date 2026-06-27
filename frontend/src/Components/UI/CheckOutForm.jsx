import { useActionState, useContext, useState, useEffect } from 'react';
import { CartContext } from '../../store/CartProvider';
import { CurrencyFormater } from '../../util/currencyFormate';
import { addOrder, razorpaypayment } from '../../api/orderApi';
import { 
  ArrowLeft, 
  CreditCard, 
  User, 
  Mail, 
  MapPin, 
  Home, 
  Building2, 
  AlertCircle,
  CheckCircle,
  Loader2,
  ShoppingBag,
  X
} from 'lucide-react';

const CheckOutForm = ({ open, setIsChekingout }) => {
  const { cart, clearCart } = useContext(CartContext);
  const [success, setSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSuccessClosing, setIsSuccessClosing] = useState(false);

  const SubTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Handle entrance animation
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

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

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true);
    setIsMounted(false);
    setTimeout(() => {
      setIsChekingout(false);
      setIsClosing(false);
    }, 400);
  };

  // Handle success modal close
  const handleSuccessClose = () => {
    setIsSuccessClosing(true);
    setTimeout(() => {
      setSuccess(false);
      setIsChekingout(false);
      open(false);
      setIsSuccessClosing(false);
    }, 400);
  };

  // Input field styles
  const inputStyles = "w-full h-[46px] px-4 border-2 border-[#e5e0d8] rounded-xl text-[15px] outline-none bg-white/80 backdrop-blur-sm box-border transition-all duration-300 font-inherit hover:border-[#cbd5e1] focus:border-[#ffbb00] focus:shadow-[0_0_0_4px_rgba(255,187,0,0.15)] focus:bg-white pl-11 max-sm:h-[42px] max-sm:text-[14px] max-sm:pl-9";

  return (
    <>
      <div className={`w-full max-w-212.5 bg-linear-to-br from-[#ded7cb] to-[#d4c9bb] rounded-[30px] p-8 mx-auto box-border shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-sm:p-5 max-sm:rounded-[20px] max-xs:p-4 ${
        isMounted && !isClosing 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-95 translate-y-10'
      }`}>
        
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 mb-2 max-sm:gap-2">
          <button
            className="p-2 rounded-full hover:bg-black/10 transition-all duration-300 hover:scale-110 active:scale-95 group max-sm:p-1.5"
            onClick={handleClose}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-[#2c2b28] group-hover:-translate-x-0.5 transition-transform duration-300 max-sm:w-4 max-sm:h-4" />
          </button>
          <h2 className="text-[30px] font-bold text-[#2c2b28] max-sm:text-2xl max-xs:text-xl">
            Checkout
          </h2>
        </div>

        {/* Total Amount */}
        <div className="flex items-center justify-between bg-white/40 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/30 max-sm:p-3 max-sm:mb-5 max-xs:p-2.5 max-xs:flex-col max-xs:gap-2">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ffbb00] max-sm:w-4 max-sm:h-4" />
            <p className="text-[16px] text-[#3b3a37] font-medium max-sm:text-[14px] max-xs:text-[13px]">
              Total Amount:
            </p>
          </div>
          <p className="text-[20px] font-bold text-[#2c2b28] max-sm:text-[18px] max-xs:text-[16px]">
            {CurrencyFormater.format(SubTotal)}
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-4 max-sm:gap-3.5 max-xs:gap-3">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5 group max-sm:gap-1">
            <label className="text-base font-semibold text-[#2c2b28] tracking-[0.3px] flex items-center gap-2 max-sm:text-sm max-xs:text-xs">
              <User className="w-4 h-4 text-[#ffbb00] max-sm:w-3.5 max-sm:h-3.5" />
              Full Name
            </label>
            <div className="relative">
              <input
                name="fullName"
                type="text"
                defaultValue={formState.userData?.fullName}
                placeholder="John Doe"
                className={inputStyles}
                required
              />
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 peer-focus:text-[#ffbb00] max-sm:w-4 max-sm:h-4 max-sm:left-2.5" />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5 group max-sm:gap-1">
            <label className="text-base font-semibold text-[#2c2b28] tracking-[0.3px] flex items-center gap-2 max-sm:text-sm max-xs:text-xs">
              <Mail className="w-4 h-4 text-[#ffbb00] max-sm:w-3.5 max-sm:h-3.5" />
              E-Mail Address
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                defaultValue={formState.userData?.email}
                placeholder="john@example.com"
                className={inputStyles}
                required
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 peer-focus:text-[#ffbb00] max-sm:w-4 max-sm:h-4 max-sm:left-2.5" />
            </div>
          </div>

          {/* Street */}
          <div className="flex flex-col gap-1.5 group max-sm:gap-1">
            <label className="text-base font-semibold text-[#2c2b28] tracking-[0.3px] flex items-center gap-2 max-sm:text-sm max-xs:text-xs">
              <MapPin className="w-4 h-4 text-[#ffbb00] max-sm:w-3.5 max-sm:h-3.5" />
              Street
            </label>
            <div className="relative">
              <input
                name="street"
                type="text"
                defaultValue={formState.userData?.street}
                placeholder="123 Main Street"
                className={inputStyles}
                required
              />
              <Home className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 peer-focus:text-[#ffbb00] max-sm:w-4 max-sm:h-4 max-sm:left-2.5" />
            </div>
          </div>

          {/* Row Fields - Postal Code & City */}
          <div className="flex gap-4 max-sm:flex-col max-sm:gap-3 max-xs:gap-2.5">
            <div className="flex-1 flex flex-col gap-1.5 min-w-0 group max-sm:gap-1">
              <label className="text-base font-semibold text-[#2c2b28] tracking-[0.3px] flex items-center gap-2 max-sm:text-sm max-xs:text-xs">
                <Building2 className="w-4 h-4 text-[#ffbb00] max-sm:w-3.5 max-sm:h-3.5" />
                Postal Code
              </label>
              <div className="relative">
                <input
                  name="postalCode"
                  type="text"
                  defaultValue={formState.userData?.postalCode}
                  placeholder="12345"
                  className={inputStyles}
                  required
                />
                <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 peer-focus:text-[#ffbb00] max-sm:w-4 max-sm:h-4 max-sm:left-2.5" />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-1.5 min-w-0 group max-sm:gap-1">
              <label className="text-base font-semibold text-[#2c2b28] tracking-[0.3px] flex items-center gap-2 max-sm:text-sm max-xs:text-xs">
                <Building2 className="w-4 h-4 text-[#ffbb00] max-sm:w-3.5 max-sm:h-3.5" />
                City
              </label>
              <div className="relative">
                <input
                  name="city"
                  type="text"
                  defaultValue={formState.userData?.city}
                  placeholder="New York"
                  className={inputStyles}
                  required
                />
                <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 peer-focus:text-[#ffbb00] max-sm:w-4 max-sm:h-4 max-sm:left-2.5" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {formState.error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 -mt-1 max-sm:p-2.5 max-xs:p-2">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 max-sm:w-4 max-sm:h-4" />
              <p className="text-red-600 text-sm font-medium max-sm:text-xs">
                {formState.error}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end items-center gap-3 pt-3 border-t border-white/30 max-sm:flex-col-reverse max-sm:items-stretch max-sm:gap-2.5 max-sm:pt-2.5">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#b9b1a5] rounded-xl cursor-pointer text-[15px] font-semibold text-[#3b3a37] px-6 py-2.5 transition-all duration-300 hover:bg-black/5 hover:border-[#999] active:scale-95 max-sm:w-full max-sm:text-[14px] max-sm:py-2 max-xs:text-[13px] max-xs:px-4"
              onClick={handleClose}
            >
              <X className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5" />
              Close
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-linear-to-r from-[#ffd72f] to-[#ffb300] border-none rounded-xl cursor-pointer px-7 py-3 min-w-42.5 text-[16px] font-bold text-[#1e1b15] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,187,0,0.4)] active:translate-y-px disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none max-sm:w-full max-sm:text-[14px] max-sm:py-2.5 max-xs:text-[13px] max-xs:px-4"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin max-sm:w-4 max-sm:h-4" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                  <span>Submit Order</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {success && (
        <div 
          className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-9999 p-5 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isSuccessClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleSuccessClose}
        >
          <div 
            className={`w-full max-w-105 bg-linear-to-br from-white to-gray-50 rounded-2xl p-[36px_30px] text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-sm:p-[28px_20px] max-sm:rounded-[18px] max-xs:p-[20px_16px] ${
              isSuccessClosing 
                ? 'opacity-0 scale-95 translate-y-10' 
                : 'opacity-100 scale-100 translate-y-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto max-sm:w-16 max-sm:h-16 max-xs:w-14 max-xs:h-14">
                <CheckCircle className="w-12 h-12 text-green-500 max-sm:w-10 max-sm:h-10 max-xs:w-8 max-xs:h-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite] max-sm:w-5 max-sm:h-5 max-xs:w-4 max-xs:h-4">
                <CheckCircle className="w-4 h-4 text-white max-sm:w-3 max-sm:h-3" />
              </div>
            </div>
            
            <h2 className="text-[28px] mb-3 text-[#1f2937] font-bold max-sm:text-2xl max-xs:text-xl">
              Order Successful! 🎉
            </h2>
            <p className="text-base leading-relaxed text-[#4b5563] mb-3 max-sm:text-[15px] max-xs:text-[14px]">
              Your order has been placed successfully.
            </p>
            <p className="text-sm text-gray-400 mb-6 max-sm:mb-5 max-xs:text-xs">
              You will receive a confirmation email shortly.
            </p>
            
            <button
              className="flex items-center justify-center gap-2 bg-linear-to-r from-[#ffd72f] to-[#ffb300] border-none rounded-xl px-7 py-3 w-full text-[15px] font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,187,0,0.4)] active:translate-y-px max-sm:text-[14px] max-sm:py-2.5 max-xs:text-[13px] max-xs:py-2"
              onClick={handleSuccessClose}
            >
              <CheckCircle className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5" />
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOutForm;