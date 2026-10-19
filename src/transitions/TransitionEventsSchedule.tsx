import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TransitionEventsSchedule: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const pulseNodeRef = useRef<HTMLDivElement>(null);
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

      // 1. Horizontal event connecting line contracts toward center
      tl.fromTo(horizontalLineRef.current, {
        width: "100%",
        opacity: 0.8,
      }, {
        width: "60px",
        opacity: 1,
        duration: 0.35,
        ease: "power2.inOut",
      }, 0)
      // 2. Pulse node activates at center intersection
      .fromTo(pulseNodeRef.current, {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
      }, 0.3)
      // 3. Line transforms into vertical schedule timeline extending downward
      .fromTo(verticalLineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
      }, {
        scaleY: 1,
        duration: 0.45,
        ease: "power3.out",
      }, 0.35)
      // 4. Telemetry badge appears
      .fromTo(labelRef.current, {
        opacity: 0,
        y: -10,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.2,
      }, 0.4);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[35svh] sm:h-[45svh] bg-[#080A0F] overflow-hidden flex flex-col items-center justify-center pointer-events-none select-none z-1"
    >
      {/* Horizontal Line from Events */}
      <div
        ref={horizontalLineRef}
        className="h-[2px] bg-gradient-to-r from-[#35DDF5] via-[#7DEBFF] to-[#35DDF5] transition-all"
      />

      {/* Central Connector Node */}
      <div
        ref={pulseNodeRef}
        className="w-4 h-4 rounded-full border-2 border-[#4DE6FF] bg-[#080A0F] flex items-center justify-center -my-2 z-10 opacity-0"
      >
        <span className="w-1.5 h-1.5 bg-[#35DDF5] rounded-full animate-ping" />
      </div>

      {/* Vertical Timeline Guide extending downward */}
      <div
        ref={verticalLineRef}
        className="w-[2px] h-32 sm:h-48 bg-gradient-to-b from-[#35DDF5] to-[#7DEBFF] opacity-90 shadow-[0_0_12px_rgba(53,221,245,0.6)]"
      />

      {/* Technical Morph Label */}
      <div
        ref={labelRef}
        className="mt-3 font-mono-tech text-[10px] sm:text-xs text-[#A9BAC8] tracking-widest uppercase flex items-center gap-2 opacity-0"
      >
        <span className="text-[#35DDF5]">EVENT_CONNECTION_LINE</span>
        <span>➔</span>
        <span className="text-[#F4FDFF]">SCHEDULE_TIMELINE</span>
      </div>
    </div>
  );
};

export default TransitionEventsSchedule;
