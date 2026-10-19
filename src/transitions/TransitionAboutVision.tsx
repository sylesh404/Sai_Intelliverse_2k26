import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const TransitionAboutVision: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const centerNodeRef = useRef<HTMLDivElement>(null);
  const maskRevealRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

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

      // 1. Two technical dividing lines meet from left and right
      tl.fromTo(leftLineRef.current, {
        x: "-100%",
        opacity: 0,
      }, {
        x: "0%",
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      }, 0)
      .fromTo(rightLineRef.current, {
        x: "100%",
        opacity: 0,
      }, {
        x: "0%",
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      }, 0)
      // 2. Center illuminated node pulses
      .fromTo(centerNodeRef.current, {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "back.out(2)",
      }, 0.25)
      // 3. Directional mask reveals the Vision & Mission preview banner
      .fromTo(maskRevealRef.current, {
        clipPath: "inset(0% 50% 0% 50%)",
        opacity: 0,
        scale: 0.95,
      }, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "power3.inOut",
      }, 0.3)
      // 4. Staggered chapter label appears
      .fromTo(labelRef.current, {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.25,
      }, 0.55);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[38svh] sm:h-[48svh] bg-[#080A0F] overflow-hidden flex flex-col items-center justify-center pointer-events-none select-none z-1 px-4"
    >
      {/* Animated divider lines meeting in center */}
      <div className="w-full max-w-5xl flex items-center justify-center relative">
        <div
          ref={leftLineRef}
          className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#35DDF5] to-[#7DEBFF]"
        />

        <div
          ref={centerNodeRef}
          className="mx-3 w-4 h-4 rounded-full border-2 border-[#4DE6FF] bg-[#080A0F] flex items-center justify-center shadow-[0_0_12px_#35DDF5] z-10 shrink-0"
        >
          <span className="w-1.5 h-1.5 bg-[#35DDF5] rounded-full animate-ping" />
        </div>

        <div
          ref={rightLineRef}
          className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#35DDF5] to-[#7DEBFF]"
        />
      </div>

      {/* Directional Mask Reveal Panel */}
      <div
        ref={maskRevealRef}
        className="mt-6 bg-[#10151D] border border-[#263643] p-4 sm:p-6 max-w-2xl w-full text-center shadow-[0_0_30px_rgba(53,221,245,0.15)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-6 h-6 bg-[#35DDF5]/20 clip-diagonal-left" />

        <div className="flex items-center justify-center gap-2 font-mono-tech text-[10px] sm:text-xs text-[#35DDF5] uppercase tracking-[0.25em] font-bold mb-2">
          <Target className="w-3.5 h-3.5" />
          <span>TRANSITION_VECTOR // 01.1 ➔ 01.2</span>
          <Compass className="w-3.5 h-3.5" />
        </div>

        <h3 className="font-display font-black text-lg sm:text-2xl text-[#F4FDFF] uppercase tracking-wide">
          CONNECTING VISION &amp; STRATEGIC MISSION
        </h3>

        <p className="font-mono-tech text-[10px] sm:text-xs text-[#A9BAC8] tracking-widest mt-1 uppercase">
          AI &amp; MACHINE LEARNING &bull; QUALITY EDUCATION &bull; INNOVATION
        </p>
      </div>

      {/* Technical Labels */}
      <div
        ref={labelRef}
        className="mt-4 flex items-center gap-4 font-mono-tech text-[9px] sm:text-[10px] text-[#A9BAC8]/60 tracking-widest uppercase"
      >
        <span>[01.1] ABOUT</span>
        <span className="text-[#35DDF5]">───►</span>
        <span>[01.2] VISION &amp; MISSION</span>
        <span className="text-[#35DDF5]">───►</span>
        <span>[02.0] EVENTS</span>
      </div>
    </div>
  );
};

export default TransitionAboutVision;
