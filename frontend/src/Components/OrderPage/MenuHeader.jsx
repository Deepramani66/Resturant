import { useContext, useState, useEffect } from 'react';
import CartDialog from '../UI/CartDialog';
import { CartContext } from '../../store/CartProvider';
import { 
  ShoppingCart, 
  Utensils, 
  Coffee, 
  Cake, 
  Wine, 
  Pizza,
  Sparkles
} from 'lucide-react';

const MenuHeader = ({ onFilterChange }) => {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { cart } = useContext(CartContext);

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilter = (category) => {
    setActive(category);
    onFilterChange(category);
  };

  const handleCartbtn = () => {
    setOpen(true);
  };

  // Category icons mapping
  const getCategoryIcon = (category) => {
    const icons = {
      'all': <Sparkles className="w-4 h-4" />,
      'appetizer': <Utensils className="w-4 h-4" />,
      'main course': <Pizza className="w-4 h-4" />,
      'dessert': <Cake className="w-4 h-4" />,
      'beverage': <Coffee className="w-4 h-4" />
    };
    return icons[category.toLowerCase()] || <Wine className="w-4 h-4" />;
  };

  return (
    <>
      <div className={`sticky top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isScrolled 
          ? 'bg-[#0b0b0f]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-[#ffd72f]/10' 
          : 'bg-transparent'
      }`}>
        
        <div className="h-[5vh] w-full mt-10 flex justify-center max-md:h-auto max-md:flex-col max-md:items-center max-md:mt-6 px-4 max-md:px-2">
          
          {/* Navigation Tabs */}
          <ul className="flex gap-2 sm:gap-5 list-none w-[85%] h-full items-center justify-start ml-5 max-md:w-full max-md:justify-center max-md:flex-wrap max-md:gap-2 max-md:ml-0 max-md:py-3 max-sm:gap-1.5">
            {["All", "Appetizer", "Main Course", "Dessert", "Beverage"].map((category) => {
              const isActive = active === category.toLowerCase();
              return (
                <li
                  key={category}
                  onClick={() => handleFilter(category.toLowerCase())}
                  className={`group relative cursor-pointer px-4 py-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-sm font-medium whitespace-nowrap flex items-center gap-2 max-sm:text-xs max-sm:px-3 max-sm:py-2 ${
                    isActive
                      ? 'bg-linear-to-r from-[#ffd72f] to-[#ffb300] text-black shadow-[0_4px_20px_rgba(255,215,47,0.4)] scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 hover:scale-105'
                  }`}
                >
                  <span className={`transition-all duration-300 ${
                    isActive ? 'scale-110' : 'opacity-50 group-hover:opacity-100'
                  }`}>
                    {getCategoryIcon(category)}
                  </span>
                  <span>{category}</span>
                  
                  {/* Active indicator glow */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-[#ffd72f]/20 to-[#ffb300]/20 blur-xl -z-10 animate-pulse"></span>
                  )}
                
                </li>
              );
            })}
          </ul>

          {/* Cart Button */}
          <div className="ml-auto mr-7.5 w-[15%] flex items-center justify-end max-md:w-full max-md:mr-0 max-md:justify-center max-md:mt-3 max-sm:mt-2">
            <button
              className={`relative group bg-black text-white border-none text-xl cursor-pointer px-6 py-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center gap-2.5 hover:bg-linear-to-r hover:from-[#ffd72f] hover:to-[#ffb300] hover:text-black hover:shadow-[0_8px_30px_rgba(255,215,47,0.4)] hover:scale-[1.05] active:scale-[0.95] max-sm:text-base max-sm:px-4 max-sm:py-2 ${
                itemCount > 0 ? 'ring-2 ring-[#ffd72f]/50 ring-offset-2 ring-offset-[#0b0b0f]' : ''
              }`}
              onClick={handleCartbtn}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Animated cart icon */}
              <div className="relative">
                <ShoppingCart className={`w-5 h-5 transition-all duration-500 ${
                  isHovered ? 'rotate-12 scale-110' : ''
                }`} />
                {itemCount > 0 && (
                  <span className={`absolute -top-2 -right-2 bg-[#ffd72f] text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center transition-all duration-500 ${
                    isHovered ? 'scale-125' : 'scale-100'
                  }`}>
                    {itemCount}
                  </span>
                )}
              </div>
              
              <span className="text-sm font-medium max-sm:text-xs">
                Cart
              </span>

              {/* Ripple effect on hover */}
              <span className="absolute inset-0 rounded-full bg-linear-to-r from-[#ffd72f]/20 to-[#ffb300]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              
              {/* Animated border glow */}
              <span className={`absolute inset-0 rounded-full transition-all duration-500 ${
                itemCount > 0 ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''
              }`} style={{
                boxShadow: itemCount > 0 ? '0 0 20px rgba(255, 215, 47, 0.2)' : 'none'
              }}></span>
            </button>
          </div>
        </div>

        {/* Decorative bottom gradient line */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-[#ffd72f]/10 to-transparent"></div>
      </div>

      {/* Cart Dialog with animation control */}
      {open && <CartDialog setOpen={setOpen} isOpen={open} />}
    </>
  );
};

export default MenuHeader;