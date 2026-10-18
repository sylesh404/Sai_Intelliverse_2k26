import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import symposiumConfig from '../config/symposiumConfig';

gsap.registerPlugin(ScrollTrigger);

export const TransitionHeroDepartment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const redBrushRef = useRef<HTMLDivElement>(null);
  const speedLinesRef = useRef<SVGSVGElement>(null);
  const deptRevealRef = useRef<HTMLDivElement>(null);

  const letters = ["I", "N", "T", "E", "L", "L", "I", "V", "E", "R", "S", "E"];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.8,
        },
      });

      // 1. Initial State: Center Title separating & stretching
      tl.to(lettersRef.current, {
        y: -30,
        scaleX: 1.15,
        stagger: 0.015,
        duration: 0.3,
        ease: "power1.out",
      })
      // 2. Letters Fragment and Disperse Outward
      .to(lettersRef.current, {
        x: (index) => {
          const mid = letters.length / 2;
          const factor = index - mid;
          return factor * (window.innerWidth < 768 ? 25 : 65);
        },
        y: (index) => (index % 2 === 0 ? -60 : 60),
        rotation: (index) => (index - 6) * 4,
        opacity: 0.1,
        stagger: 0.01,
        duration: 0.5,
        ease: "power2.inOut",
      }, 0.2)
      // 3. Comic Speed Lines & Red Brush Slash travel across screen
      .fromTo(speedLinesRef.current, {
        opacity: 0,
        scaleY: 0.5,
      }, {
        opacity: 0.8,
        scaleY: 1,
        duration: 0.4,
      }, 0.25)
      .fromTo(redBrushRef.current, {
        x: "-120%",
        skewX: -25,
        opacity: 0,
      }, {
        x: "120%",
        skewX: -25,
        opacity: 1,
        duration: 0.7,
        ease: "power2.inOut",
      }, 0.3)
      // 4. Center becomes empty, fragments collapse to edges
      .to(lettersRef.current, {
        opacity: 0,
        duration: 0.2,
      }, 0.6)
      // 5. Large Red Diagonal Shape & Department Reveal underneath
      .fromTo(deptRevealRef.current, {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        opacity: 0,
        scale: 0.95,
        letterSpacing: "0.4em",
      }, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        scale: 1,
        letterSpacing: "0.15em",
        duration: 0.6,
        ease: "power3.out",
      }, 0.55);
    }, containerRef);

    return () => ctx.revert();
  }, [letters.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65svh] sm:h-[85svh] bg-[#0D0D0D] overflow-hidden flex flex-col items-center justify-center select-none pointer-events-none z-1"
    >
      {/* Subtle Background Comic Speed Lines */}
      <svg
        ref={speedLinesRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="#6C3082" strokeWidth="1" strokeDasharray="6 12" />
        <line x1="5%" y1="80%" x2="95%" y2="20%" stroke="#FCFAED" strokeWidth="0.8" strokeDasharray="8 16" opacity="0.4" />
        <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#823A9D" strokeWidth="1.5" strokeDasharray="12 24" />
      </svg>

      {/* Sweeping Purple Brush Stroke */}
      <div
        ref={redBrushRef}
        className="absolute top-1/2 left-0 w-[140%] h-24 sm:h-36 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#6C3082] to-transparent opacity-0 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
      />

      {/* Disintegrating Title Layer */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <h2 className="font-display font-black text-3xl sm:text-6xl md:text-8xl tracking-tight text-[#FCFAED] uppercase flex">
          {letters.map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                lettersRef.current[i] = el;
              }}
              className="inline-block transform-gpu"
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* Reveal Stage for Department */}
      <div
        ref={deptRevealRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center opacity-0"
      >
        <div className="border border-[#6C3082] bg-[#141414]/90 px-6 sm:px-12 py-6 sm:py-8 backdrop-blur-sm max-w-4xl mx-auto shadow-2xl">
          <span className="font-mono-tech text-[10px] sm:text-xs text-[#6C3082] tracking-[0.3em] uppercase block mb-2 font-bold">
            // TRANSITION_CH01 // ORIGIN NODE
          </span>
          <h3 className="font-display font-black text-lg sm:text-3xl md:text-4xl text-[#FCFAED] uppercase leading-tight tracking-wider">
            DEPARTMENT OF ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
          </h3>
          <p className="font-mono-tech text-xs sm:text-sm text-[#888888] tracking-widest mt-2 uppercase">
            {symposiumConfig.college}
          </p>
        </div>
      </div>

      {/* Telemetry Guide Marks */}
      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono-tech text-[9px] text-[#444444]">
        <span>SCROLL_VECTOR // ACTIVE</span>
        <span className="text-[#6C3082]">CHAPTER_01 ➔ CHAPTER_02</span>
      </div>
    </div>
  );
};

export default TransitionHeroDepartment;
