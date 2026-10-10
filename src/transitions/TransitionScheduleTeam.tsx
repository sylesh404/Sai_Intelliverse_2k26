import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TransitionScheduleTeam: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const verticalStemRef = useRef<HTMLDivElement>(null);
  const cornerArcRef = useRef<HTMLDivElement>(null);
  const horizontalBarRef = useRef<HTMLDivElement>(null);
  const boundaryBlockRef = useRef<HTMLDivElement>(null);
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

      // 1. Vertical stem flows down
      tl.fromTo(verticalStemRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
      }, {
        scaleY: 1,
        duration: 0.3,
        ease: "none",
      }, 0)
      // 2. Corner node lights up
      .fromTo(cornerArcRef.current, {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.15,
      }, 0.25)
      // 3. Horizontal line travels outward across screen
      .fromTo(horizontalBarRef.current, {
        width: "0%",
      }, {
        width: "100%",
        duration: 0.45,
        ease: "power2.inOut",
      }, 0.3)
      // 4. Expands into horizontal boundary graphic for TEAM
      .fromTo(boundaryBlockRef.current, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "bottom center",
      }, {
        scaleY: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      }, 0.55)
      // 5. Technical Chapter Label
      .fromTo(labelRef.current, {
        opacity: 0,
        x: -30,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.25,
      }, 0.6);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[35svh] sm:h-[45svh] bg-[#0D0D0D] overflow-hidden flex flex-col justify-between pointer-events-none select-none z-1 px-4 sm:px-6 lg:px-12"
    >
      {/* Upper Path: Vertical Stem descending from Schedule */}
      <div className="relative w-full flex items-start">
        <div className="ml-2.5 sm:ml-4 md:ml-12 flex flex-col items-center">
          <div
            ref={verticalStemRef}
            className="w-[2px] h-20 sm:h-28 bg-[#FF0022] shadow-[0_0_10px_rgba(255,0,34,0.6)]"
          />
          <div
            ref={cornerArcRef}
            className="w-3 h-3 rounded-full border border-[#FF0022] bg-[#FF3D00] shadow-[0_0_8px_#FF0022] -mt-1 opacity-0"
          />
        </div>
      </div>

      {/* Horizontal Underline / Boundary Expanding */}
      <div className="w-full relative my-auto">
        <div
          ref={horizontalBarRef}
          className="h-[2px] bg-gradient-to-r from-[#FF0022] via-[#FF3D00] to-transparent w-0"
        />

        {/* Boundary Graphic Block */}
        <div
          ref={boundaryBlockRef}
          className="mt-3 p-3 sm:p-4 bg-[#141414] border-l-4 border-[#FF0022] border-y border-r border-[#262626] opacity-0 flex flex-wrap items-center justify-between gap-2"
        >
          <div
            ref={labelRef}
            className="font-mono-tech text-[10px] sm:text-xs text-[#FCFAED] tracking-[0.2em] uppercase font-bold flex items-center gap-2"
          >
            <span className="text-[#FF0022]">TIMELINE_AXIS</span>
            <span>➔</span>
            <span>ORGANIZING COMMITTEE // STRUCTURAL BOUNDARY</span>
          </div>
          <span className="font-mono-tech text-[10px] text-[#888888]">
            CHAPTER_04 // TEAM ASSEMBLE
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransitionScheduleTeam;
