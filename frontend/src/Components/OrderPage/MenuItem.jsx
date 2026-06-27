import { useContext, useState, useEffect } from 'react';
import { CurrencyFormater } from '../../util/currencyFormate';
import { CartContext } from '../../store/CartProvider';
import { 
  ShoppingBag, 
  Star, 
  CheckCircle,
  Heart
} from 'lucide-react';

const MenuItem = ({ menuItem }) => {
  const { addtocart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item) => {
    addtocart(item);
    setAddedItems(prev => ({ ...prev, [item._id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item._id]: false }));
    }, 1500);
  };

  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="h-[80vh] w-[28vw] text-center rounded-[20px] mx-auto bg-[#0f0f0f] shadow-[0_8px_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col justify-between animate-pulse max-lg:w-[40vw] max-md:w-[80vw] max-sm:w-[90vw] max-sm:h-[70vh]">
      <div className="w-full h-[50vh] bg-linear-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] bg-size-[200%_100%] animate-[shimmer_2s_ease-in-out_infinite] max-sm:h-[40vh]"></div>
      <div className="h-10 flex items-center justify-center px-4">
        <div className="w-3/4 h-6 bg-linear-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] bg-size-[200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded"></div>
      </div>
      <div className="h-10 flex items-center justify-center">
        <div className="w-22.5 h-8 bg-linear-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] bg-size-[200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded"></div>
      </div>
      <div className="h-17.5 flex items-center justify-center px-7.5">
        <div className="w-full h-4 bg-linear-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] bg-size-[200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded"></div>
      </div>
      <div className="h-12 bg-linear-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] bg-size-[200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded-b-[20px]"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-10 w-full mx-auto px-10 mt-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:px-5 max-sm:px-3">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-10 w-full mx-auto px-10 mt-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:px-5 max-sm:px-3">
      {menuItem.length === 0 ? (
        <div className="col-span-3 text-center text-gray-400 text-lg py-10 max-md:col-span-2 max-md:py-8 max-sm:col-span-1">
          <div className="flex flex-col items-center gap-4">
            <ShoppingBag className="w-16 h-16 text-gray-600" />
            <p className="text-xl font-semibold text-gray-300">No items available</p>
            <p className="text-sm text-gray-500">Check back later for delicious options</p>
          </div>
        </div>
      ) : (
        menuItem.map((item) => {
          const isImageLoaded = imageLoaded[item._id];
          const isAdded = addedItems[item._id];
          const isHovered = hoveredItem === item._id;

          return (
            <div
              key={item._id}
              className="group relative h-[80vh] w-[28vw] text-center rounded-[20px] mx-auto bg-[#0f0f0f] shadow-[0_8px_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(255,215,47,0.15)] max-lg:w-[40vw] max-md:w-[80vw] max-sm:w-[90vw] max-sm:h-[70vh]"
              onMouseEnter={() => setHoveredItem(item._id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-linear-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] bg-size-[200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"></div>
                )}
                <img
                  src={item.image}
                  alt={item.dishName}
                  className={`w-full h-[50vh] object-cover transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-sm:h-[40vh] ${
                    isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  } ${isHovered ? 'scale-110 brightness-110' : ''}`}
                  onLoad={() => handleImageLoad(item._id)}
                  loading="lazy"
                />
                
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-[#ffd72f] hover:text-black">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Rating Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Star className="w-3.5 h-3.5 text-[#ffd72f] fill-[#ffd72f]" />
                  <span className="text-xs text-white font-medium">4.8</span>
                </div>

                {/* In Stock Badge */}
                <div className="absolute bottom-4 left-4 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                  <span className="text-xs text-white font-medium">In Stock</span>
                </div>
              </div>

              <h3 className="h-10 text-[25px] font-bold text-white flex items-center justify-center gap-2 max-sm:text-[20px] max-sm:h-8">
                {item.dishName}
                {isAdded && (
                  <CheckCircle className="w-5 h-5 text-green-500 animate-[popIn_0.5s_ease-out]" />
                )}
              </h3>

              <p className="h-10 text-[18px] rounded-md bg-[rgba(60,40,10,0.6)] text-[#ffb300] shadow-[0_0_10px_rgba(255,179,0,0.4)] backdrop-blur-[6px] w-22.5 flex items-center justify-center font-semibold mx-auto transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,179,0,0.6)] max-sm:text-[16px] max-sm:w-20 max-sm:h-8">
                {CurrencyFormater.format(item.price)}
              </p>

              <p className="h-17.5 text-[14px] text-gray-300 mx-7.5 overflow-hidden flex items-center justify-center max-sm:text-[12px] max-sm:mx-5 max-sm:h-15">
                {item.description}
              </p>

              <button
                className={`relative bg-[rgba(60,40,10,0.6)] text-white border-none py-3 text-[15px] rounded-b-[20px] cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-linear-to-r hover:from-[#ffd72f] hover:to-[#ffb300] hover:text-black hover:scale-[1.02] active:scale-[0.98] overflow-hidden group/btn max-sm:text-[14px] max-sm:py-2.5 ${
                  isAdded ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
                onClick={() => handleAddToCart(item)}
              >
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></span>
                
                <span className="relative flex items-center justify-center gap-2">
                  {isAdded ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 transition-transform duration-500 group-hover/btn:rotate-12" />
                      Add To Cart
                    </>
                  )}
                </span>
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MenuItem;