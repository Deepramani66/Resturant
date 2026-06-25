import { useContext, useState } from 'react';
import CartDialog from '../UI/CartDialog';
import { CartContext } from '../../store/CartProvider';

const MenuHeader = ({ onFilterChange }) => {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const { cart } = useContext(CartContext);

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleFilter = (category) => {
    setActive(category);
    onFilterChange(category);
  };

  const handleCartbtn = (cartsize) => {
    if (cartsize > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <div className="h-[5vh] w-full mt-10 flex justify-center max-md:h-auto max-md:flex-col max-md:items-center max-md:mt-6">
        {/* Navigation Tabs */}
        <ul className="flex gap-5 list-none w-[85%] h-full items-center justify-start ml-5 max-md:w-full max-md:justify-center max-md:flex-wrap max-md:gap-3 max-md:ml-0 max-md:py-2 max-sm:gap-2">
          {["All", "Appetizer", "Main Course", "Dessert", "Beverage"].map((category) => (
            <li
              key={category}
              onClick={() => handleFilter(category.toLowerCase())}
              className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium whitespace-nowrap max-sm:text-xs max-sm:px-3 max-sm:py-1.5 ${
                active === category.toLowerCase()
                  ? 'bg-[#ffb300] text-black shadow-[0_4px_15px_rgba(255,179,0,0.3)]'
                  : 'text-gray-300 hover:text-white hover:bg-[rgba(255,179,0,0.1)]'
              }`}
            >
              {category}
            </li>
          ))}
        </ul>

        {/* Cart Button */}
        <div className="ml-auto mr-7.5 w-[15%] flex items-center justify-end max-md:w-full max-md:mr-0 max-md:justify-center max-md:mt-3 max-sm:mt-2">
          <button
            className="bg-black text-white border-none text-xl cursor-pointer px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 hover:bg-[#ffb300] hover:text-black hover:shadow-[0_4px_20px_rgba(255,179,0,0.4)] max-sm:text-base max-sm:px-4 max-sm:py-1.5"
            onClick={() => handleCartbtn(itemCount)}
          >
            <span>🛒</span>
            <span className="text-sm font-medium max-sm:text-xs">
              Cart({itemCount})
            </span>
          </button>
        </div>
      </div>

      {/* Cart Dialog */}
      {open && <CartDialog setOpen={setOpen} />}
    </>
  );
};

export default MenuHeader;