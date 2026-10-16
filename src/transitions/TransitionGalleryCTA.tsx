import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Ticket } from 'lucide-react';

import m5 from '../assets/m5.JPG';
import m6 from '../assets/m6.JPG';
import m7 from '../assets/m7.JPG';
import m8 from '../assets/m8.JPG';

gsap.registerPlugin(ScrollTrigger);

export const TransitionGalleryCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesLayerRef = useRef<HTMLDivElement>(null);
  const leftBlockRef = useRef<HTMLDivElement>(null);
  const rightBlockRef = useRef<HTMLDivElement>(null);
  const centerFocalRef = useRef<HTMLDivElement>(null);
  const readyTypeRef = useRef<HTMLDivElement>(null);
  const redSweepRef = useRef<HTMLDivElement>(null);
  const registerPromptRef = useRef<HTMLDivElement>(null);

  const recedingImages = [m5, m6, m7, m8];

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

      // 1. Gallery images recede backward: scale down and fade into dark void
      tl.fromTo(imagesLayerRef.current, {
        scale: 1.15,
        opacity: 0.75,
        filter: "blur(0px) contrast(110%)",
      }, {
        scale: 0.8,
        opacity: 0.08,
        filter: "blur(8px) contrast(80%)",
        duration: 0.5,
        ease: "power2.inOut",
      }, 0)
      // 2. Flanking visual wings close in
      .fromTo(leftBlockRef.current, {
        x: "-80%",
        opacity: 0.4,
      }, {
        x: "0%",
        opacity: 1,
        duration: 0.35,
        ease: "power2.inOut",
      }, 0.1)
      .fromTo(rightBlockRef.current, {
        x: "80%",
        opacity: 0.4,
      }, {
        x: "0%",
        opacity: 1,
        duration: 0.35,
        ease: "power2.inOut",
      }, 0.1)
      // 3. Focal registration block emerges forward
      .fromTo(centerFocalRef.current, {
        scale: 0.7,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      }, 0.25)
      // 4. ARE YOU READY? typography reveals
      .fromTo(readyTypeRef.current, {
        scale: 1.3,
        opacity: 0,
        letterSpacing: "0.3em",
      }, {
        scale: 1,
        opacity: 1,
        letterSpacing: "0.05em",
        duration: 0.35,
        ease: "power4.out",
      }, 0.3)
      // 5. Red Brush Stroke Sweeps across
      .fromTo(redSweepRef.current, {
        x: "-120%",
        skewX: -25,
      }, {
        x: "120%",
        skewX: -25,
        duration: 0.5,
        ease: "power2.inOut",
      }, 0.4)
      // 6. REGISTER NOW badge arrives with bounce
      .fromTo(registerPromptRef.current, {
        y: 25,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(2)",
      }, 0.6);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65svh] sm:h-[75svh] bg-[#0D0D0D] overflow-hidden flex flex-col items-center justify-center pointer-events-none select-none z-1 border-t border-[#1F1F1F]"
    >
      {/* Receding Gallery Mosaic in Background */}
      <div
        ref={imagesLayerRef}
        className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 pointer-events-none z-0 transform-gpu"
      >
        {recedingImages.map((img, i) => (
          <div key={i} className="relative w-full h-full overflow-hidden bg-black/60 border border-[#222222]">
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover grayscale opacity-60"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#0D0D0D]/60" />
          </div>
        ))}
      </div>

      {/* Compressing Flanking Visual Wings */}
      <div
        ref={leftBlockRef}
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#0D0D0D] via-[#141414]/90 to-transparent border-r border-[#FF0022]/30 pointer-events-none z-5"
      />
      <div
        ref={rightBlockRef}
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#0D0D0D] via-[#141414]/90 to-transparent border-l border-[#FF0022]/30 pointer-events-none z-5"
      />

      {/* Center Black Focal Box */}
      <div
        ref={centerFocalRef}
        className="relative z-10 w-[92%] max-w-2xl bg-[#0D0D0D]/95 backdrop-blur-md border border-[#333333] p-6 sm:p-10 md:p-12 text-center shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Architectural corner notches */}
        <div className="absolute top-0 right-0 w-6 h-6 bg-[#FF0022] clip-diagonal-left" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FF0022]" />

        <div className="font-mono-tech text-[10px] sm:text-xs text-[#FF0022] tracking-[0.3em] uppercase font-bold mb-3 flex items-center gap-2">
          <Ticket className="w-3.5 h-3.5" />
          <span>CHRONICLE_ARCHIVE ➔ FINAL_CALL</span>
        </div>

        {/* Kinetic Typography Stack */}
        <div
          ref={readyTypeRef}
          className="font-display font-black text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl text-[#FCFAED] uppercase leading-none"
        >
          <span>ARE </span>
          <span className="text-[#FF0022]">YOU </span>
          <span>READY?</span>
        </div>

        {/* High-Velocity Red Sweep */}
        <div
          ref={redSweepRef}
          className="w-[140%] h-6 sm:h-10 bg-gradient-to-r from-transparent via-[#FF0022] to-transparent my-3 sm:my-4"
        />

        {/* Register Prompt Badge */}
        <div
          ref={registerPromptRef}
          className="inline-flex items-center gap-2 bg-[#FF0022] text-white px-5 sm:px-6 py-2.5 font-mono-tech text-xs uppercase tracking-widest font-bold shadow-lg"
        >
          <span>CLAIM YOUR DELEGATE PASS</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default TransitionGalleryCTA;
