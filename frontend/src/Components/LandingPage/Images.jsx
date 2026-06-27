import burger from "../../assets/platter/burger.jpg";
import pasta from "../../assets/platter/pasta.jpg";
import ramen from "../../assets/platter/ramen.jpg";
import a from '../../assets/resturant/1.jpg';
import b from '../../assets/resturant/2.jpg';
import c from '../../assets/resturant/3.jpg';
import ScrollFloat from '../Layout/AnimatedHeader';
import { useState, useEffect } from 'react';

// Image Component with Loading Animation
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const imgElement = document.getElementById(`img-${alt.replace(/\s/g, '')}`);
    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => observer.disconnect();
  }, [alt]);

  return (
    <div className="relative overflow-hidden rounded-[20px] group">
      {/* Skeleton Loading Placeholder */}
      <div className={`absolute inset-0 bg-linear-to-r from-[#1a1a20] via-[#2a2a35] to-[#1a1a20] bg-size-[200%_100%] animate-[shimmer_2s_ease-in-out_infinite] ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}></div>
      
      {/* Blur-up placeholder */}
      <div className={`absolute inset-0 bg-[#1a1a20] blur-2xl scale-105 ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}></div>
      
      <img
        id={`img-${alt.replace(/\s/g, '')}`}
        src={src}
        alt={alt}
        className={`${className} relative ${
          isVisible ? 'animate-[fadeInScale_0.8s_ease-out]' : 'opacity-0'
        } ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image Counter Badge */}
      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-2">
        {alt}
      </div>
    </div>
  );
};

const Images = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const videoElement = document.getElementById('video-section');
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Images Section 1 */}
      <div className="flex justify-center items-center gap-10 py-15 px-5 flex-wrap bg-transparent relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-[#ffd72f] before:to-transparent before:opacity-30">
        <LazyImage
          src={burger}
          alt="Burger"
          className="w-[30vw] h-auto object-cover rounded-[20px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] cursor-pointer hover:-translate-y-3.75 hover:scale-[1.05] hover:drop-shadow-[0_25px_50px_rgba(255,215,47,0.3)] hover:brightness-110 max-md:w-[45vw] max-sm:w-[90vw]"
        />
        <LazyImage
          src={pasta}
          alt="Pasta"
          className="w-[30vw] h-auto object-cover rounded-[20px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] cursor-pointer hover:-translate-y-3.75 hover:scale-[1.05] hover:drop-shadow-[0_25px_50px_rgba(255,215,47,0.3)] hover:brightness-110 max-md:w-[45vw] max-sm:w-[90vw]"
        />
        <LazyImage
          src={ramen}
          alt="Ramen"
          className="w-[30vw] h-auto object-cover rounded-[20px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] cursor-pointer hover:-translate-y-3.75 hover:scale-[1.05] hover:drop-shadow-[0_25px_50px_rgba(255,215,47,0.3)] hover:brightness-110 max-md:w-[45vw] max-sm:w-[90vw]"
        />
      </div>

      {/* Video Section */}
      <div id="video-section" className="flex flex-col items-center relative py-10 px-5 pb-20 overflow-hidden before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:top-[-50%] before:left-[-50%] before:bg-[radial-gradient(circle,rgba(255,215,47,0.05)_0%,transparent_70%)] before:animate-[spin_20s_linear_infinite] before:pointer-events-none">

        {/* Heading */}
        <div className={`text-center w-[67vw] max-w-300 mt-10 z-2 relative transition-all duration-1000 ${
          isVideoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <ScrollFloat
            containerClassName="w-full"
            textClassName="heading-text font-black text-[#feefdb] leading-[1.1] m-0 cursor-default drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] tracking-[-0.02em] text-4xl md:text-6xl lg:text-7xl"
            animationDuration={1.25}
            ease="power3.out"
            scrollStart="top 80%"
            scrollEnd="bottom 40%"
            stagger={0.03}
            as="div"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            scrub={false}
            once={true}
          >
            THE BEST COMFORT FOOD IN NEW YORK
          </ScrollFloat>
        </div>

        {/* Video Wrapper */}
        <div className={`relative -mt-20 z-1 max-md:-mt-10 max-sm:-mt-3.75 group transition-all duration-1000 ${
          isVideoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="relative rounded-[30px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:shadow-[0_40px_80px_rgba(255,215,47,0.3)] group-hover:scale-[1.02] before:content-[''] before:absolute before:inset-0 before:p-0.5 before:bg-linear-to-br before:from-[#ffd72f] before:via-transparent before:to-[#ffd72f] before:pointer-events-none before:rounded-[30px] max-sm:rounded-[20px] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] mask-exclude">
            
            {/* Video Skeleton */}
            {!videoLoaded && (
              <div className="absolute inset-0 bg-linear-to-r from-[#1a1a20] via-[#2a2a35] to-[#1a1a20] bg-size-[200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded-[30px]"></div>
            )}
            
            <img
              src={c}
              alt="Restaurant"
              className={`w-full max-w-175 block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:brightness-110 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setVideoLoaded(true)}
            />
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <div className="w-20 h-20 rounded-full bg-[#ffd72f]/90 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(255,215,47,0.5)]">
              <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          {/* Watch Video Button */}
          <div className="absolute -bottom-6.25 left-1/2 -translate-x-1/2 z-3 max-sm:-bottom-4.5">
            <button className="bg-linear-to-br from-[#ffd72f] to-[#ffb300] bg-size-[200%_200%] bg-left text-[#111] h-13 w-55 rounded-[999px] text-[18px] font-bold tracking-[1px] cursor-pointer border-none transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_5px_20px_rgba(255,215,47,0.3)] relative overflow-hidden hover:bg-right hover:text-black hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,215,47,0.5)] hover:scale-[1.02] active:translate-y-px active:scale-[0.98] max-sm:w-42.5 max-sm:h-11 max-sm:text-[15px] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:rounded-full before:bg-white/30 before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:duration-700 before:ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:before:w-75 hover:before:h-75">
              Watch Video
            </button>
          </div>
        </div>
      </div>

      {/* First Info Section */}
      <section className="w-full py-20 px-5 bg-[#0b0b0f] flex justify-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[radial-gradient(circle_at_20%_50%,rgba(255,215,47,0.03)_0%,transparent_50%)] before:pointer-events-none max-md:py-15 max-sm:py-10">
        <div className="w-full max-w-300 flex justify-between items-center py-12.5 px-7.5 border-t border-t-[rgba(255,215,47,0.2)] border-b border-b-[rgba(255,215,47,0.2)] gap-15 relative backdrop-blur-[10px] animate-[fadeInUp_0.8s_ease-out] max-md:flex-col max-md:text-center max-md:gap-10 max-md:py-10 max-md:px-5 max-sm:px-3.75">

          {/* Info Text */}
          <div className="flex-1 text-[#bfbfbf] text-[18px] leading-[1.7] max-w-137.5 relative pl-5 border-l-3 border-l-[#ffd72f] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:pl-7 hover:border-l-[#ffd72f]/80 max-md:text-center max-md:pl-0 max-md:border-l-0 max-md:border-t-2 max-md:border-t-[#ffd72f] max-md:pt-5 max-sm:text-[15px] max-sm:leading-[1.6]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
            dignissimos, saepe porro vero velit praesentium nam necessitatibus
            assumenda nulla ipsa ullam corporis. Ratione assumenda reiciendis
            sequi inventore sapiente, eveniet nihil.
          </div>

          {/* Rating Stats */}
          <div className="flex items-center gap-15 max-md:justify-center max-md:gap-12.5 max-sm:gap-7.5">
            {/* Menu Rating */}
            <div className="flex flex-col items-center gap-2.5 text-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-3 hover:scale-105 group">
              <span className="text-[54px] font-extrabold text-[#ffd72f] drop-shadow-[0_2px_10px_rgba(255,215,47,0.3)] leading-none transition-all duration-500 group-hover:drop-shadow-[0_4px_20px_rgba(255,215,47,0.5)] group-hover:scale-110 max-sm:text-[40px]">+1k</span>
              <span className="text-[15px] text-[#bfbfbf] uppercase tracking-[1px] font-medium transition-all duration-500 group-hover:text-white max-sm:text-[12px]">Premium Menu</span>
            </div>

            {/* Divider */}
            <div className="hidden max-md:hidden h-12.5 w-px bg-linear-to-b from-transparent via-[#ffd72f] to-transparent"></div>

            {/* Quality Rating */}
            <div className="flex flex-col items-center gap-2.5 text-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-3 hover:scale-105 group">
              <span className="text-[54px] font-extrabold text-[#ffd72f] drop-shadow-[0_2px_10px_rgba(255,215,47,0.3)] leading-none transition-all duration-500 group-hover:drop-shadow-[0_4px_20px_rgba(255,215,47,0.5)] group-hover:scale-110 max-sm:text-[40px]">100%</span>
              <span className="text-[15px] text-[#bfbfbf] uppercase tracking-[1px] font-medium transition-all duration-500 group-hover:text-white max-sm:text-[12px]">Quality Foods</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="flex justify-center items-center py-20 px-5 bg-linear-to-b from-[#0b0b0f] to-[#0a0a0e] relative before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22 opacity=%220.03%22%3E%3Cpath fill=%22none%22 d=%22M20,20 L80,20 M20,40 L80,40 M20,60 L80,60 M20,80 L80,80%22 stroke=%22%23ffd72f%22 stroke-width=%221%22/%3E%3C/svg%3E')] before:bg-size-[20px_20px] before:pointer-events-none max-md:py-15 max-sm:py-12.5 max-sm:px-3.75">
        <div className="w-full max-w-300 flex justify-between gap-15 relative z-1 max-md:flex-col max-md:items-center max-md:text-center max-md:gap-7.5 max-md:max-w-full">

          {/* Menu Heading */}
          <div className="text-[52px] font-extrabold text-[#feefdb] max-w-137.5 leading-[1.2] tracking-[-0.02em] relative animate-[slideInLeft_0.8s_ease-out] after:content-[''] after:absolute after:-bottom-3.75 after:left-0 after:w-[80vw] after:h-0.75 after:bg-linear-to-r after:from-[#ffd72f] after:to-transparent transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] hover:text-white max-md:text-center max-md:max-w-full max-md:after:left-1/2 max-md:after:-translate-x-1/2 max-sm:text-[32px]">
            A PREMIUM RESTURANT IN THE HEART OF OUR CITY
          </div>

          {/* Right Section */}
          <div className="flex flex-col max-w-100 gap-8.75 animate-[slideInRight_0.8s_ease-out] max-md:items-center max-md:text-center max-md:max-w-full max-sm:gap-6.25">
            <div className="text-[#bfbfbf] leading-[1.7] text-[16px] transition-all duration-500 hover:text-white max-sm:text-[14px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit Repellendus qui sed et corrupti neque architecto soluta
            </div>

            <button className="bg-linear-to-br from-[#ffd72f] to-[#ffb300] text-[#111] border-none rounded-[999px] text-[16px] h-13 w-52.5 font-bold cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative overflow-hidden shadow-[0_4px_15px_rgba(255,215,47,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,215,47,0.5)] hover:scale-[1.02] active:translate-y-px active:scale-[0.98] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-linear-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-700 before:ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:before:left-full max-sm:w-45 max-sm:h-12 max-sm:text-[15px]">
              Check Menu
            </button>
          </div>
        </div>
      </section>

      {/* Images Section 2 */}
      <div className="flex justify-center items-center gap-10 py-15 px-5 flex-wrap bg-transparent relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-[#ffd72f] before:to-transparent before:opacity-30">
        <LazyImage
          src={a}
          alt="Restaurant 1"
          className="w-[30vw] h-auto object-cover rounded-[20px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] cursor-pointer hover:-translate-y-3.75 hover:scale-[1.05] hover:drop-shadow-[0_25px_50px_rgba(255,215,47,0.3)] hover:brightness-110 max-md:w-[45vw] max-sm:w-[90vw]"
        />
        <LazyImage
          src={b}
          alt="Restaurant 2"
          className="w-[30vw] h-auto object-cover rounded-[20px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] cursor-pointer hover:-translate-y-3.75 hover:scale-[1.05] hover:drop-shadow-[0_25px_50px_rgba(255,215,47,0.3)] hover:brightness-110 max-md:w-[45vw] max-sm:w-[90vw]"
        />
        <LazyImage
          src={c}
          alt="Restaurant 3"
          className="w-[30vw] h-auto object-cover rounded-[20px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] cursor-pointer hover:-translate-y-3.75 hover:scale-[1.05] hover:drop-shadow-[0_25px_50px_rgba(255,215,47,0.3)] hover:brightness-110 max-md:w-[45vw] max-sm:w-[90vw]"
        />
      </div>
    </>
  );
};

export default Images;