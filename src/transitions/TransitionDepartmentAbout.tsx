import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TransitionDepartmentAbout: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerTrack1Ref = useRef<HTMLDivElement>(null);
  const tickerTrack2Ref = useRef<HTMLDivElement>(null);
  const gridLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Ticker 1 moves right, Ticker 2 moves left based on scroll
      tl.to(tickerTrack1Ref.current, {
        x: "15%",
        ease: "none",
      }, 0)
      .to(tickerTrack2Ref.current, {
        x: "-15%",
        ease: "none",
      }, 0)
      // Grid layer reveals then folds/skews away
      .fromTo(gridLayerRef.current, {
        opacity: 0,
        scaleY: 0.6,
        rotateX: 45,
      }, {
        opacity: 0.35,
        scaleY: 1,
        rotateX: 0,
        duration: 0.5,
      }, 0.1)
      .to(gridLayerRef.current, {
        opacity: 0,
        scaleY: 1.2,
        skewX: -15,
        duration: 0.4,
      }, 0.6);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[35svh] sm:h-[45svh] bg-[#0D0D0D] overflow-hidden flex flex-col justify-center pointer-events-none select-none z-1 border-y border-[#1A1A1A]"
    >
      {/* 3D Coordinate Grid that folds and slides */}
      <div
        ref={gridLayerRef}
        className="absolute inset-0 opacity-0 pointer-events-none transform-gpu"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(108, 48, 130, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(252, 250, 237, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          perspective: "600px",
        }}
      />

      {/* Kinetic Technical Labels Track 1 (Rightward Scroll Drift) */}
      <div
        ref={tickerTrack1Ref}
        className="flex items-center gap-8 whitespace-nowrap font-mono-tech text-xs sm:text-sm text-[#6C3082] font-bold tracking-[0.25em] opacity-80 uppercase py-2 -translate-x-12"
      >
        <span>DEPARTMENT // 01</span>
        <span className="text-[#333333]">◆</span>
        <span>INTELLIGENCE // 02</span>
        <span className="text-[#333333]">◆</span>
        <span>INNOVATION // 03</span>
        <span className="text-[#333333]">◆</span>
        <span>AUTONOMOUS_NETWORK // 04</span>
        <span className="text-[#333333]">◆</span>
        <span>DEPARTMENT // 01</span>
        <span className="text-[#333333]">◆</span>
        <span>INTELLIGENCE // 02</span>
      </div>

      {/* Kinetic Technical Labels Track 2 (Leftward Scroll Drift) */}
      <div
        ref={tickerTrack2Ref}
        className="flex items-center gap-8 whitespace-nowrap font-mono-tech text-xs sm:text-sm text-[#FCFAED]/60 tracking-[0.2em] uppercase py-2 translate-x-12"
      >
        <span>DATA_SCIENCE_FOUNDRY</span>
        <span className="text-[#6C3082]">///</span>
        <span>COGNITIVE_ARCHITECTURE</span>
        <span className="text-[#6C3082]">///</span>
        <span>TRANSFORMATION_GRID</span>
        <span className="text-[#6C3082]">///</span>
        <span>DATA_SCIENCE_FOUNDRY</span>
        <span className="text-[#6C3082]">///</span>
        <span>COGNITIVE_ARCHITECTURE</span>
      </div>

      {/* Central Horizon Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#6C3082]/40 to-transparent my-2" />
    </div>
  );
};

export default TransitionDepartmentAbout;
