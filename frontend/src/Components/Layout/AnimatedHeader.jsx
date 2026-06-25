import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  // New props for more control
  as: Tag = 'h2',
  from = { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7 },
  to = { opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1 },
  scrub = true,
  markers = false,
  once = false,
  onComplete = null,
}) => {
  const containerRef = useRef(null);
  const animationCompletedRef = useRef(false);

  // Split text into characters with proper whitespace handling
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span 
        className="char inline-block" 
        key={index}
        style={{ 
          transformOrigin: '50% 0%',
          willChange: 'opacity, transform'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || window;
    const charElements = el.querySelectorAll('.char');

    // Clean up any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === el) st.kill();
    });

    // Create the animation
    const tl = gsap.fromTo(
      charElements,
      {
        ...from,
        willChange: 'opacity, transform',
      },
      {
        ...to,
        duration: animationDuration,
        ease: ease,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: scrub,
          markers: markers,
          once: once,
          onComplete: () => {
            animationCompletedRef.current = true;
            if (onComplete) onComplete();
          },
        },
        onComplete: () => {
          // Optional: cleanup after animation
        }
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
      tl.kill();
    };
  }, [
    scrollContainerRef, 
    animationDuration, 
    ease, 
    scrollStart, 
    scrollEnd, 
    stagger,
    from,
    to,
    scrub,
    markers,
    once,
    onComplete,
    children // Re-run if children change
  ]);

  return (
    <Tag 
      ref={containerRef} 
      className={`scroll-float overflow-hidden ${containerClassName}`}
    >
      <span className={`scroll-float-text inline-block text-center font-black leading-normal ${textClassName}`}>
        {splitText}
      </span>
    </Tag>
  );
};

export default ScrollFloat;