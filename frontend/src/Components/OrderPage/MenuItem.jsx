import { useContext } from 'react';
import { CurrencyFormater } from '../../util/currencyFormate';
import { CartContext } from '../../store/CartProvider';

const MenuItem = ({ menuItem }) => {
  const { addtocart } = useContext(CartContext);

  return (
    <div className="grid grid-cols-3 gap-10 w-full mx-auto px-10 mt-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:px-5 max-sm:px-3">
      {menuItem.length === 0 ? (
        <p className="col-span-3 text-center text-gray-400 text-lg py-10 max-md:col-span-2 max-md:py-8 max-sm:col-span-1">
          No items available
        </p>
      ) : (
        menuItem.map((item) => (
          <div
            key={item._id}
            className="h-[80vh] w-[28vw] text-center rounded-[20px] mx-auto bg-[#0f0f0f] shadow-[0_8px_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] max-lg:w-[40vw] max-md:w-[80vw] max-sm:w-[90vw] max-sm:h-[70vh]"
          >
            <img
              src={item.image}
              alt={item.dishName}
              className="w-auto h-[50vh] object-cover max-sm:h-[40vh]"
            />

            <h3 className="h-10 text-[25px] font-bold text-white flex items-center justify-center max-sm:text-[20px] max-sm:h-8">
              {item.dishName}
            </h3>

            <p className="h-10 text-[18px] rounded-md bg-[rgba(60,40,10,0.6)] text-[#ffb300] shadow-[0_0_10px_rgba(255,179,0,0.4)] backdrop-blur-[6px] w-22.5 flex items-center justify-center font-semibold mx-auto max-sm:text-[16px] max-sm:w-20 max-sm:h-8">
              {CurrencyFormater.format(item.price)}
            </p>

            <p className="h-17.5 text-[14px] text-gray-300 mx-7.5 overflow-hidden flex items-center justify-center max-sm:text-[12px] max-sm:mx-5 max-sm:h-15">
              {item.description}
            </p>

            <button
              className="bg-[rgba(60,40,10,0.6)] text-white border-none py-3 text-[15px] rounded-b-[20px] cursor-pointer transition-all duration-300 hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] max-sm:text-[14px] max-sm:py-2.5"
              onClick={() => addtocart(item)}
            >
              Add To Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MenuItem;