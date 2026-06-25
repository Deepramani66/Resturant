import heroBg from '../../assets/LandingImg/bg-Hero.jpg';

const HeroSection = () => {
  return (
    <section
      className="min-h-[70vh] 
      bg-cover bg-center bg-no-repeat bg-fixed 
      flex justify-center items-center flex-col relative 
      isolate"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >

      {/* Heading */}
      <div
        className="text-center w-[min(80vw,900px)] mt-[clamp(1.5rem,5vh,3rem)] 
      animate-[fadeInUp_0.8s_ease-out_0.2s]"
      >
        <h1
          className="text-[clamp(2.5rem,8vw,7rem)] font-bold 
        bg-linear-to-br from-[#ffaf47] to-[#ffdd88] 
        bg-clip-text leading-[1.1] m-0 cursor-default 
        tracking-[-0.02em] opacity-50"
        >
          Welcome to Our <br />
          Luxury Experience
        </h1>
      </div>

      {/* Second Section */}
      <div
        className="flex justify-between items-center gap-[clamp(1.5rem,4vw,3rem)] 
      px-[clamp(1rem,5vw,3rem)] mt-[clamp(1.5rem,5vh,3rem)] 
      w-full max-w-300 animate-[fadeInUp_0.8s_ease-out_0.4s]"
      >
        <div
          className="flex-1 max-w-137.5 text-bisque 
        text-[clamp(0.9rem,2.5vw,1.125rem)] leading-relaxed font-normal 
        backdrop-blur-sm bg-black/30 p-6 rounded-[20px] 
        border border-white/10"
        >
          <p className="m-0 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
            Indulge in an unforgettable journey of exquisite flavors and
            unparalleled service. Every moment is crafted to perfection,
            ensuring a truly remarkable experience.
          </p>
        </div>

        <div>
          <button
            className="bg-linear-to-r from-[#ffd72f] to-[#ffb300] 
            bg-size-[200%_200%] bg-position-[0%_50%] 
            text-[#1a1a1a] h-[clamp(44px,8vh,52px)] min-w-50 
            px-8 rounded-[999px] text-[clamp(0.875rem,2vw,1rem)] 
            font-bold tracking-[1.5px] uppercase cursor-pointer 
            border-none relative overflow-hidden 
            transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] 
            hover:bg-position-[100%_50%] hover:-translate-y-0.5 
            hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:text-black 
            hover:tracking-[2px] active:translate-y-px 
            active:shadow-[0_2px_10px_rgba(0,0,0,0.2)]
            after:content-[''] after:absolute after:top-1/2 after:left-1/2 
            after:w-0 after:h-0 after:rounded-full after:bg-white/50 
            after:-translate-x-1/2 after:-translate-y-1/2 
            after:transition-[width,height] after:duration-600 
            active:after:w-75 active:after:h-75"
          >
            Reserve Now
          </button>
        </div>
      </div>

      {/* Loop Section */}
      <div
        className="relative border-t-2 border-t-[rgba(90,55,30,0.9)] 
      border-b-2 border-b-[rgba(90,55,30,0.9)] h-[8vh] w-full mt-5 
      flex justify-evenly items-center 
      bg-linear-to-r from-[rgba(10,7,5,0.98)] via-[rgba(35,22,15,0.98)] 
      to-[rgba(10,7,5,0.98)] backdrop-blur-sm overflow-hidden
      before:content-[''] before:absolute before:w-full before:h-0.5 
      before:top-0 before:left-0 
      before:bg-linear-to-r before:from-transparent before:via-[#caa27a] 
      before:to-transparent before:animate-[glowMove_3.5s_linear_infinite]"
      >
        <span
          className="text-[#e6d2bf] font-semibold tracking-[1px] 
        flex items-center gap-2 opacity-75 hover:opacity-100 
        hover:-translate-y-1 hover:scale-105 hover:text-[#caa27a] 
        hover:shadow-[0_0_12px_rgba(202,162,122,0.25)] 
        transition-all duration-300 cursor-pointer"
        >
          ✨ Premium Quality
        </span>
        <span
          className="text-[#e6d2bf] font-semibold tracking-[1px] 
        flex items-center gap-2 opacity-75 hover:opacity-100 
        hover:-translate-y-1 hover:scale-105 hover:text-[#caa27a] 
        hover:shadow-[0_0_12px_rgba(202,162,122,0.25)] 
        transition-all duration-300 cursor-pointer"
        >
          🌟 5-Star Service
        </span>
        <span
          className="text-[#e6d2bf] font-semibold tracking-[1px] 
        flex items-center gap-2 opacity-75 hover:opacity-100 
        hover:-translate-y-1 hover:scale-105 hover:text-[#caa27a] 
        hover:shadow-[0_0_12px_rgba(202,162,122,0.25)] 
        transition-all duration-300 cursor-pointer"
        >
          🍽️ Exquisite Dining
        </span>
        <span
          className="text-[#e6d2bf] font-semibold tracking-[1px] 
        flex items-center gap-2 opacity-75 hover:opacity-100 
        hover:-translate-y-1 hover:scale-105 hover:text-[#caa27a] 
        hover:shadow-[0_0_12px_rgba(202,162,122,0.25)] 
        transition-all duration-300 cursor-pointer"
        >
          🥂 Unforgettable Moments
        </span>
        <span
          className="text-[#e6d2bf] font-semibold tracking-[1px] 
        flex items-center gap-2 opacity-75 hover:opacity-100 
        hover:-translate-y-1 hover:scale-105 hover:text-[#caa27a] 
        hover:shadow-[0_0_12px_rgba(202,162,122,0.25)] 
        transition-all duration-300 cursor-pointer"
        >
          🏆 Award Winning
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
