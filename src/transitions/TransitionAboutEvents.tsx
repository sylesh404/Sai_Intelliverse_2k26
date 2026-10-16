import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TransitionAboutEvents: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const num01Ref = useRef<HTMLDivElement>(null);
  const num02Ref = useRef<HTMLDivElement>(null);
  const labelAboutRef = useRef<HTMLDivElement>(null);
  const labelEventsRef = useRef<HTMLDivElement>(null);
  const speedLinesGroupRef = useRef<SVGSVGElement>(null);

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

      // 1. Label ABOUT drifts left
      tl.to(labelAboutRef.current, {
        x: () => (window.innerWidth < 640 ? -50 : -120),
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      }, 0)
      // 2. Number 01 appears and scales up dramatically
      .fromTo(num01Ref.current, {
        scale: 0.6,
        opacity: 0,
      }, {
        scale: 1.8,
        opacity: 0.9,
        duration: 0.4,
        ease: "power2.inOut",
      }, 0.1)
      // 3. Converging Red Comic Speed Lines shooting inward
      .fromTo(speedLinesGroupRef.current, {
        scale: 1.6,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      }, 0.2)
      // 4. Number 01 morphs/collapses into 02
      .to(num01Ref.current, {
        scale: 3,
        opacity: 0,
        duration: 0.25,
        ease: "power4.in",
      }, 0.45)
      .fromTo(num02Ref.current, {
        scale: 0.3,
        opacity: 0,
      }, {
        scale: 1.2,
        opacity: 1,
        duration: 0.35,
        ease: "back.out(2)",
      }, 0.5)
      // 5. Speed lines disappear & Label EVENTS arrives
      .to(speedLinesGroupRef.current, {
        opacity: 0,
        duration: 0.2,
      }, 0.7)
      .fromTo(labelEventsRef.current, {
        y: 40,
        opacity: 0,
        letterSpacing: "0.4em",
      }, {
        y: 0,
        opacity: 1,
        letterSpacing: "0.15em",
        duration: 0.3,
        ease: "power2.out",
      }, 0.75);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[50svh] sm:h-[60svh] bg-[#0D0D0D] overflow-hidden flex flex-col items-center justify-center pointer-events-none select-none z-1"
    >
      {/* Red Comic Speed Lines Inward Converging */}
      <svg
        ref={speedLinesGroupRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#FF0022" strokeWidth="2" strokeDasharray="30 15">
          <line x1="0" y1="0" x2="480" y2="280" />
          <line x1="1000" y1="0" x2="520" y2="280" />
          <line x1="0" y1="600" x2="480" y2="320" />
          <line x1="1000" y1="600" x2="520" y2="320" />
          <line x1="500" y1="0" x2="500" y2="260" stroke="#FF3D00" strokeWidth="3" />
          <line x1="500" y1="600" x2="500" y2="340" stroke="#FF3D00" strokeWidth="3" />
          <line x1="0" y1="300" x2="460" y2="300" stroke="#FCFAED" strokeWidth="1" />
          <line x1="1000" y1="300" x2="540" y2="300" stroke="#FCFAED" strokeWidth="1" />
        </g>
      </svg>

      {/* Chapter Indicator Backdrop */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Departure Label */}
        <div
          ref={labelAboutRef}
          className="font-mono-tech text-xs tracking-widest text-[#888888] uppercase mb-2"
        >
          CHAPTER_01 // ABOUT SYMPOSIUM
        </div>

        {/* Morphing Giant Numbers (01 ➔ 02) */}
        <div className="relative w-48 h-36 sm:w-72 sm:h-48 flex items-center justify-center">
          <div
            ref={num01Ref}
            className="absolute font-display font-black text-7xl sm:text-9xl text-[#FCFAED] tracking-tighter opacity-0"
          >
            01
          </div>

          <div
            ref={num02Ref}
            className="absolute font-display font-black text-7xl sm:text-9xl text-[#FF0022] tracking-tighter opacity-0"
          >
            02
          </div>
        </div>

        {/* Arrival Label */}
        <div
          ref={labelEventsRef}
          className="font-display font-black text-xl sm:text-3xl text-[#FCFAED] tracking-wider uppercase opacity-0"
        >
          ENTER EVENTS ARENA
        </div>
      </div>
    </div>
  );
};

export default TransitionAboutEvents;
