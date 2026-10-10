import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TransitionCTAFooter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const redStemRef = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 0.8,
        },
      });

      // 1. Red stem extends downward
      tl.fromTo(redStemRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
      }, {
        scaleY: 1,
        duration: 0.4,
        ease: "none",
      }, 0)
      // 2. Center Node illuminates
      .fromTo(nodeRef.current, {
        scale: 0,
      }, {
        scale: 1,
        duration: 0.15,
      }, 0.3)
      // 3. Spreads out horizontally to form the footer divider
      .fromTo(dividerLineRef.current, {
        scaleX: 0,
        transformOrigin: "center center",
      }, {
        scaleX: 1,
        duration: 0.45,
        ease: "power2.out",
      }, 0.35);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[20svh] sm:h-[26svh] bg-[#0D0D0D] overflow-hidden flex flex-col items-center justify-between pointer-events-none select-none z-1"
    >
      {/* Downward traveling red technical guide line */}
      <div
        ref={redStemRef}
        className="w-[2px] h-full bg-gradient-to-b from-[#FF0022] to-[#FF3D00] shadow-[0_0_10px_rgba(255,0,34,0.6)]"
      />

      {/* Central Terminal Anchor Node */}
      <div
        ref={nodeRef}
        className="w-3 h-3 rounded-full bg-[#FF0022] -mb-1.5 z-10 scale-0"
      />

      {/* Spreading Footer Divider */}
      <div
        ref={dividerLineRef}
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF0022] to-transparent scale-x-0"
      />
    </div>
  );
};

export default TransitionCTAFooter;
