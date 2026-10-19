import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const TransitionTeamPrizes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const typographyStackRef = useRef<HTMLDivElement>(null);
  const num03Ref = useRef<HTMLDivElement>(null);
  const prizeRevealRef = useRef<HTMLDivElement>(null);
  const maskBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.8,
        },
      });

      // 1. Kinetic Typography Stack "WHO MAKES IT HAPPEN?" appears
      tl.fromTo(typographyStackRef.current, {
        scale: 1.2,
        opacity: 0,
        letterSpacing: "0.2em",
      }, {
        scale: 1,
        opacity: 1,
        letterSpacing: "0.05em",
        duration: 0.35,
        ease: "power2.out",
      }, 0)
      // 2. Typography stack compresses vertically & collapses
      .to(typographyStackRef.current, {
        scaleY: 0.1,
        scaleX: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      }, 0.3)
      // 3. Number 03 appears and rapidly expands
      .fromTo(num03Ref.current, {
        scale: 0.2,
        opacity: 0,
        rotate: -10,
      }, {
        scale: 2.2,
        opacity: 0.9,
        rotate: 0,
        duration: 0.35,
        ease: "power2.inOut",
      }, 0.35)
      // 4. Red Mask Bar slices across
      .fromTo(maskBarRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      }, {
        scaleX: 1,
        duration: 0.3,
        ease: "power3.inOut",
      }, 0.5)
      // 5. Number 03 morphs into PRIZES typography
      .to(num03Ref.current, {
        scale: 4,
        opacity: 0,
        duration: 0.2,
      }, 0.6)
      .fromTo(prizeRevealRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.9,
        letterSpacing: "0.3em",
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        letterSpacing: "0.1em",
        duration: 0.35,
        ease: "power3.out",
      }, 0.65);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[55svh] sm:h-[65svh] bg-[#080A0F] overflow-hidden flex flex-col items-center justify-center pointer-events-none select-none z-1"
    >
      {/* 1. Typography Stack: WHO MAKES IT HAPPEN? */}
      <div
        ref={typographyStackRef}
        className="absolute flex flex-col items-center justify-center text-center font-display font-black leading-none uppercase text-2xl sm:text-5xl md:text-6xl text-[#F4FDFF]/90 opacity-0"
      >
        <span className="text-[#A9BAC8]">WHO</span>
        <span className="text-[#F4FDFF]">MAKES</span>
        <span className="text-[#35DDF5]">IT</span>
        <span className="text-[#F4FDFF]">HAPPEN?</span>
      </div>

      {/* 2. Kinetic Number 03 Expanding */}
      <div
        ref={num03Ref}
        className="absolute font-display font-black text-8xl sm:text-[12rem] text-[#35DDF5] opacity-0 tracking-tighter"
      >
        03
      </div>

      {/* 3. Horizontal Cyan Mask Bar */}
      <div
        ref={maskBarRef}
        className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-[#35DDF5] to-transparent scale-x-0"
      />

      {/* 4. Target Destination Title: PRIZES */}
      <div
        ref={prizeRevealRef}
        className="absolute flex flex-col items-center justify-center text-center opacity-0"
      >
        <span className="font-mono-tech text-[10px] sm:text-xs text-[#35DDF5] tracking-[0.3em] uppercase mb-1 font-bold">
          // CHAPTER_05 // BOUNTY ACCELERATION
        </span>
        <h2 className="font-display font-black text-3xl sm:text-6xl md:text-7xl text-[#F4FDFF] uppercase tracking-wider">
          PRIZES & RECOGNITION
        </h2>
        <span className="font-mono-tech text-xs sm:text-sm text-[#7DEBFF] tracking-widest mt-2 uppercase font-bold">
          ₹1,50,000+ CASH POOL
        </span>
      </div>
    </div>
  );
};

export default TransitionTeamPrizes;
