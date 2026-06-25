import { useContext, useState } from 'react';
import { CartContext } from '../../store/CartProvider';
import { CurrencyFormater } from '../../util/currencyFormate';
import CheckOutForm from './CheckOutForm';

const CartDialog = ({ setOpen }) => {
  const [isCheckingout, setIsChekingout] = useState(false);
  const { cart, plusItem, minusItem, deleteItem, loading } = useContext(CartContext);

  const SubTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-9999 p-5"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-[#ded7cb] text-black w-full max-w-187.5 max-h-[80vh] rounded-[20px] flex flex-col overflow-hidden relative shadow-[0_10px_40px_rgba(0,0,0,0.3)] max-md:max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {isCheckingout ? (
          <CheckOutForm open={setOpen} setIsChekingout={setIsChekingout} />
        ) : (
          <>
            {/* Header */}
            <h2 className="py-5 px-6.25 text-2xl font-semibold bg-[#ded7cb] sticky top-0 z-10 border-b border-[#b9b1a5]">
              Your Cart
            </h2>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-5 py-5 px-6.25 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#999] [&::-webkit-scrollbar-thumb]:rounded-[10px]">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <h3 className="text-xl text-gray-600">Loading...</h3>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex justify-center items-center py-10">
                  <h3 className="text-xl text-gray-600">Your cart is empty</h3>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    className="flex items-center gap-4.5 bg-white/40 p-3.5 rounded-[14px] max-md:flex-col max-md:items-start"
                    key={item._id}
                  >
                    {/* Image */}
                    <div className="w-22.5 shrink-0 max-md:w-full">
                      <img
                        src={item.image}
                        alt={item.dishName}
                        className="w-full h-20 rounded-[10px] object-cover max-md:h-45"
                      />
                    </div>

                    {/* Details */}
                    <div className="w-55 shrink-0 flex flex-col gap-1.5 max-md:w-full">
                      <h3 className="m-0 text-[18px] font-semibold">{item.dishName}</h3>
                      <p className="m-0 text-[15px] text-[#444]">
                        {CurrencyFormater.format(item.price)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="w-30 shrink-0 flex items-center justify-center gap-2.5 max-md:w-full max-md:justify-start">
                      <button
                        className="w-8 h-8 border-none rounded-lg cursor-pointer text-[18px] font-bold bg-black text-white transition-all duration-200 hover:scale-105 active:scale-95"
                        onClick={() => plusItem(item._id, item.quantity)}
                      >
                        +
                      </button>
                      <label className="min-w-5 text-center font-semibold">
                        {item.quantity}
                      </label>
                      <button
                        className="w-8 h-8 border-none rounded-lg cursor-pointer text-[18px] font-bold bg-black text-white transition-all duration-200 hover:scale-105 active:scale-95"
                        onClick={() => minusItem(item._id, item.quantity)}
                      >
                        -
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="w-45 ml-auto flex flex-col items-end gap-2.5 max-md:w-full max-md:ml-0 max-md:items-start">
                      <div className="text-right flex gap-0.75 max-md:text-left">
                        <label className="text-[#6b6b6b] text-[14px]">
                          {`${item.price} x ${item.quantity} =`}
                        </label>
                        <label className="font-bold text-[16px]">
                          {CurrencyFormater.format(item.price * item.quantity)}
                        </label>
                      </div>

                      <button
                        className="bg-[#ff4d4d] text-white border-none rounded-lg px-3.5 py-2 text-[14px] font-medium cursor-pointer transition-all duration-200 hover:bg-[#e63939] hover:scale-[1.03] active:scale-[0.97]"
                        onClick={() => deleteItem(item._id, setOpen)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Section */}
            <section className="border-t border-[#999] py-5 px-6.25 flex justify-between items-center gap-5 bg-[#ded7cb] sticky bottom-0 z-10 max-md:flex-col max-md:items-stretch">
              <div className="flex items-center">
                <label className="text-[#6b6b6b] text-[16px]">Subtotal :</label>
                <label className="ml-1.5 font-bold text-[18px]">
                  {CurrencyFormater.format(SubTotal)}
                </label>
              </div>

              <div className="flex gap-3.75 max-md:flex-col">
                <button
                  className="px-4.5 py-2.5 border-none rounded-lg bg-transparent text-black cursor-pointer text-[15px] transition-all duration-200 hover:bg-black/10"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>

                <button
                  className="bg-[rgb(255,187,0)] border-none rounded-lg cursor-pointer px-5 py-2.5 min-w-40 text-[15px] font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] max-md:w-full"
                  onClick={() => setIsChekingout(true)}
                >
                  Go to Checkout
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDialog;