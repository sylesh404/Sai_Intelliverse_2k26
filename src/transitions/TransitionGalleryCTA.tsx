import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const TransitionGalleryCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftBlockRef = useRef<HTMLDivElement>(null);
  const rightBlockRef = useRef<HTMLDivElement>(null);
  const centerFocalRef = useRef<HTMLDivElement>(null);
  const readyTypeRef = useRef<HTMLDivElement>(null);
  const redSweepRef = useRef<HTMLDivElement>(null);
  const registerPromptRef = useRef<HTMLDivElement>(null);

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

      // 1. Left and right visual blocks compress toward center
      tl.fromTo(leftBlockRef.current, {
        x: "-80%",
        opacity: 0.6,
      }, {
        x: "0%",
        opacity: 1,
        duration: 0.35,
        ease: "power2.inOut",
      }, 0)
      .fromTo(rightBlockRef.current, {
        x: "80%",
        opacity: 0.6,
      }, {
        x: "0%",
        opacity: 1,
        duration: 0.35,
        ease: "power2.inOut",
      }, 0)
      // 2. Converge into a solid black focal block
      .fromTo(centerFocalRef.current, {
        scale: 0.5,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      }, 0.25)
      // 3. ARE YOU READY? typography reveals
      .fromTo(readyTypeRef.current, {
        scale: 1.4,
        opacity: 0,
        letterSpacing: "0.4em",
      }, {
        scale: 1,
        opacity: 1,
        letterSpacing: "0.08em",
        duration: 0.4,
        ease: "power4.out",
      }, 0.3)
      // 4. Red Brush Stroke Sweeps across
      .fromTo(redSweepRef.current, {
        x: "-120%",
        skewX: -25,
      }, {
        x: "120%",
        skewX: -25,
        duration: 0.5,
        ease: "power2.inOut",
      }, 0.45)
      // 5. REGISTER NOW badge arrives
      .fromTo(registerPromptRef.current, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(2)",
      }, 0.65);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65svh] sm:h-[75svh] bg-[#0D0D0D] overflow-hidden flex flex-col items-center justify-center pointer-events-none select-none z-1"
    >
      {/* Compressing Flanking Visual Wings */}
      <div
        ref={leftBlockRef}
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#141414] to-transparent border-r border-[#FF0022]/30 pointer-events-none"
      />
      <div
        ref={rightBlockRef}
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#141414] to-transparent border-l border-[#FF0022]/30 pointer-events-none"
      />

      {/* Center Black Focal Box */}
      <div
        ref={centerFocalRef}
        className="relative z-10 w-[90%] max-w-2xl bg-[#0D0D0D] border border-[#333333] p-8 sm:p-14 text-center shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center"
      >
        {/* Kinetic Typography Stack */}
        <div
          ref={readyTypeRef}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#FCFAED] uppercase leading-none"
        >
          <span>ARE </span>
          <span className="text-[#FF0022]">YOU </span>
          <span>READY?</span>
        </div>

        {/* High-Velocity Red Sweep */}
        <div
          ref={redSweepRef}
          className="w-[140%] h-8 sm:h-12 bg-gradient-to-r from-transparent via-[#FF0022] to-transparent my-4"
        />

        {/* Register Prompt Badge */}
        <div
          ref={registerPromptRef}
          className="inline-flex items-center gap-2 bg-[#FF0022] text-white px-5 py-2.5 font-mono-tech text-xs uppercase tracking-widest font-bold shadow-lg"
        >
          <span>FINAL CONCLAVE REGISTRATION</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default TransitionGalleryCTA;
