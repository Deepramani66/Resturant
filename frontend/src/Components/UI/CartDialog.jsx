import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../store/CartProvider';
import { CurrencyFormater } from '../../util/currencyFormate';
import CheckOutForm from './CheckOutForm';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Trash2,
  ShoppingCart,
  CreditCard,
  Loader2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

const CartDialog = ({ setOpen, isOpen }) => {
  const [isCheckingout, setIsChekingout] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { cart, plusItem, minusItem, deleteItem, loading } = useContext(CartContext);

  const SubTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Handle entrance animation
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the component is rendered before animation
      requestAnimationFrame(() => {
        setIsMounted(true);
      });
    }
  }, [isOpen]);

  // Handle close animation
  const handleClose = () => {
    setIsClosing(true);
    setIsMounted(false);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 400);
  };

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // If dialog is not open, don't render
  if (!isOpen && !isClosing) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-9999 p-5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isMounted && !isClosing ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-linear-to-br from-[#ded7cb] to-[#d4c9bb] text-black w-full max-w-187.5 max-h-[85vh] rounded-3xl flex flex-col overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isMounted && !isClosing 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-10'
        } max-md:max-h-[95vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {isCheckingout ? (
          <CheckOutForm open={setOpen} setIsChekingout={setIsChekingout} />
        ) : (
          <>
            {/* Header */}
            <div className="py-5 px-6.25 bg-linear-to-r from-[#ded7cb] to-[#d4c9bb] sticky top-0 z-10 border-b border-[#b9b1a5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#333]" />
                <h2 className="text-2xl font-semibold">Your Cart</h2>
                {cart.length > 0 && (
                  <span className="bg-linear-to-r from-[#ffd72f] to-[#ffb300] text-black text-xs font-bold px-2.5 py-1 rounded-full animate-[pulse_2s_ease-in-out_infinite]">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                className="p-2 rounded-full hover:bg-black/10 transition-all duration-300 hover:rotate-90 active:scale-90"
                onClick={handleClose}
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 py-5 px-6.25 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#b9b1a5] [&::-webkit-scrollbar-thumb]:rounded-[10px] hover:[&::-webkit-scrollbar-thumb]:bg-[#999]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="w-12 h-12 text-[#ffd72f] animate-spin" />
                  <h3 className="text-xl text-gray-600 font-medium">Loading your cart...</h3>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="relative">
                    <ShoppingCart className="w-24 h-24 text-gray-400" />
                    <AlertCircle className="w-8 h-8 text-[#ffd72f] absolute -top-2 -right-2" />
                  </div>
                  <h3 className="text-2xl text-gray-600 font-semibold">Your cart is empty</h3>
                  <p className="text-gray-400">Start adding some delicious items!</p>
                  <button
                    className="mt-4 px-6 py-3 bg-linear-to-r from-[#ffd72f] to-[#ffb300] text-black rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(255,215,47,0.4)] active:scale-95 flex items-center gap-2"
                    onClick={handleClose}
                  >
                    Browse Menu
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    className="group flex items-center gap-4.5 bg-white/60 backdrop-blur-sm p-4 rounded-2xl transition-all duration-300 hover:bg-white/80 hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:scale-[1.01] max-md:flex-col max-md:items-start"
                    key={item._id}
                  >
                    {/* Image */}
                    <div className="w-22.5 shrink-0 max-md:w-full relative">
                      <img
                        src={item.image}
                        alt={item.dishName}
                        className="w-full h-20 rounded-xl object-cover transition-all duration-300 group-hover:scale-105 max-md:h-45"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 rounded-xl bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Details */}
                    <div className="w-55 shrink-0 flex flex-col gap-1.5 max-md:w-full">
                      <h3 className="m-0 text-[18px] font-semibold transition-all duration-300 group-hover:text-[#333]">
                        {item.dishName}
                      </h3>
                      <p className="m-0 text-[15px] text-[#555] font-medium">
                        {CurrencyFormater.format(item.price)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="w-30 shrink-0 flex items-center justify-center gap-2.5 max-md:w-full max-md:justify-start">
                      <button
                        className="w-8 h-8 border-none rounded-lg cursor-pointer font-bold bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-[#333] active:scale-95 hover:shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center"
                        onClick={() => plusItem(item._id, item.quantity)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <label className="min-w-8 text-center font-semibold text-[16px]">
                        {item.quantity}
                      </label>
                      <button
                        className="w-8 h-8 border-none rounded-lg cursor-pointer font-bold bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-[#333] active:scale-95 hover:shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center"
                        onClick={() => minusItem(item._id, item.quantity)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="w-45 ml-auto flex flex-col items-end gap-2.5 max-md:w-full max-md:ml-0 max-md:items-start">
                      <div className="text-right flex gap-0.75 max-md:text-left items-center">
                        <label className="text-[#6b6b6b] text-[14px]">
                          {`${CurrencyFormater.format(item.price)} × ${item.quantity} =`}
                        </label>
                        <label className="font-bold text-[16px] text-[#333]">
                          {CurrencyFormater.format(item.price * item.quantity)}
                        </label>
                      </div>

                      <button
                        className="flex items-center gap-2 bg-linear-to-r from-[#ff4d4d] to-[#e63939] text-white border-none rounded-lg px-4 py-2 text-[14px] font-medium cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_4px_15px_rgba(255,77,77,0.4)] active:scale-[0.95]"
                        onClick={() => deleteItem(item._id, setOpen)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Section - Only show if cart has items */}
            {cart.length > 0 && (
              <section className="border-t border-[#b9b1a5] py-5 px-6.25 flex justify-between items-center gap-5 bg-linear-to-r from-[#ded7cb] to-[#d4c9bb] sticky bottom-0 z-10 max-md:flex-col max-md:items-stretch">
                <div className="flex items-center gap-2">
                  <label className="text-[#555] text-[16px] font-medium">Subtotal :</label>
                  <label className="font-bold text-[20px] text-[#333]">
                    {CurrencyFormater.format(SubTotal)}
                  </label>
                </div>

                <div className="flex gap-3.75 max-md:flex-col max-md:w-full">
                  <button
                    className="px-5 py-2.5 border-2 border-[#b9b1a5] rounded-lg bg-transparent text-black cursor-pointer text-[15px] font-medium transition-all duration-300 hover:bg-black/10 hover:border-[#999] active:scale-95 max-md:w-full"
                    onClick={handleClose}
                  >
                    Close
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 bg-linear-to-r from-[#ffd72f] to-[#ffb300] border-none rounded-lg cursor-pointer px-6 py-2.5 min-w-40 text-[15px] font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_25px_rgba(255,215,47,0.4)] active:scale-[0.97] max-md:w-full"
                    onClick={() => setIsChekingout(true)}
                  >
                    <CreditCard className="w-4 h-4" />
                    Go to Checkout
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartDialog;