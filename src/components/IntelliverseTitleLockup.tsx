import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntelliverseTitleLockupProps {
  className?: string;
  variant?: 'hero' | 'intro' | 'compact';
  align?: 'center' | 'left' | 'responsive';
}

export const IntelliverseTitleLockup: React.FC<IntelliverseTitleLockupProps> = ({
  className = '',
  variant = 'hero',
  align = 'responsive',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [prefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Dynamic responsive font-scaling safeguard:
  // Ensures "INTELLIVERSE" ALWAYS fits on ONE SINGLE LINE on every device (320px to 1920px)
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !textRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const textWidth = textRef.current.scrollWidth;

      // Safe buffer margin
      const targetWidth = Math.max(containerWidth - 20, 200);

      if (textWidth > targetWidth && textWidth > 0) {
        const calculatedScale = Math.min(1, targetWidth / textWidth);
        setScale(calculatedScale);
      } else {
        setScale(1);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const alignmentClasses = {
    center: 'items-center text-center justify-center',
    left: 'items-start text-left justify-start',
    responsive: 'items-center lg:items-start text-center lg:text-left justify-center lg:justify-start',
  }[align];

  const flexAlignClasses = {
    center: 'justify-center',
    left: 'justify-start',
    responsive: 'justify-center lg:justify-start',
  }[align];

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col select-none ${alignmentClasses} ${className}`}
    >
      {/* ================================================================= */}
      {/* 1. EYEBROW: SAI (Revealed with animated line-drawing)             */}
      {/* ================================================================= */}
      <div className={`flex items-center ${flexAlignClasses} gap-2 sm:gap-3 mb-1.5 sm:mb-2 z-10`}>
        {/* Left line drawing animation */}
        <svg className="h-[2px] w-6 sm:w-10 shrink-0 overflow-visible" viewBox="0 0 40 2" fill="none">
          <motion.line
            x1="0"
            y1="1"
            x2="40"
            y2="1"
            stroke="#FF0022"
            strokeWidth="2"
            initial={prefersReducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </svg>

        {/* Eyebrow badge */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-[#141414] border border-[#2E2E2E] shadow-sm"
        >
          <span className="w-1.5 h-1.5 bg-[#FF0022] clip-diagonal-right inline-block" />
          <span className="font-mono-tech text-xs sm:text-sm font-black text-[#FF0022] tracking-[0.35em] sm:tracking-[0.5em] uppercase pl-1">
            SAI
          </span>
          <span className="text-[10px] text-[#888888] font-mono-tech uppercase tracking-wider hidden sm:inline border-l border-[#2E2E2E] pl-2">
            DEPARTMENT OF AI &amp; ML
          </span>
        </motion.div>

        {/* Right line drawing animation (centered or balanced) */}
        <svg className="h-[2px] w-6 sm:w-10 shrink-0 overflow-visible" viewBox="0 0 40 2" fill="none">
          <motion.line
            x1="0"
            y1="1"
            x2="40"
            y2="1"
            stroke="#FF0022"
            strokeWidth="2"
            initial={prefersReducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* ================================================================= */}
      {/* 2. THE HERO TITLE: INTELLIVERSE (Dominant foreground centerpiece) */}
      {/* Refined vertical clip-path reveal with no layout shift            */}
      {/* ================================================================= */}
      <div className={`w-full max-w-full flex items-center ${flexAlignClasses} overflow-hidden my-0.5 sm:my-1 px-0 z-10`}>
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }
              : { opacity: 0, clipPath: "inset(100% 0% 0% 0%)", y: 15 }
          }
          animate={{
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            filter: prefersReducedMotion
              ? undefined
              : [
                  "drop-shadow(0 0 0px #FF0022)",
                  "drop-shadow(0 0 24px rgba(255,0,34,0.45))",
                  "drop-shadow(0 0 10px rgba(255,0,34,0.2))",
                ],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
            clipPath: { duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
            filter: { duration: 1.1, delay: 1.1, ease: "easeInOut" },
          }}
          className="inline-block transform-gpu"
        >
          <h1
            ref={textRef}
            className={`font-display font-black uppercase text-[#FCFAED] tracking-tight leading-[0.9] sm:leading-[0.92] transition-transform duration-100 ${
              variant === 'compact'
                ? 'text-[clamp(1.75rem,7vw,4rem)]'
                : 'text-[clamp(2.1rem,9vw,3.8rem)] sm:text-[clamp(3.4rem,8.4vw,5.5rem)] lg:text-[clamp(4.2rem,6.8vw,6.8rem)] xl:text-[clamp(4.8rem,7vw,7.8rem)]'
            }`}
            style={{
              whiteSpace: 'nowrap',
              display: 'inline-block',
              transform: scale < 1 ? `scale(${scale})` : undefined,
              transformOrigin: align === 'responsive' ? 'left center' : 'center center',
              textShadow: '0 4px 35px rgba(0,0,0,0.95), 0 0 45px rgba(255,0,34,0.22)',
              letterSpacing: '-0.025em',
            }}
            aria-label="SAI INTELLIVERSE 3.0"
          >
            INTELLIVERSE
          </h1>
        </motion.div>
      </div>

      {/* ================================================================= */}
      {/* 3. VISUALLY CONNECTED 3.0 EDITION BADGE (Cohesive brand identity) */}
      {/* Coordinated directional entrance                                  */}
      {/* ================================================================= */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.6, ease: "easeOut" }}
        className={`flex flex-wrap items-center ${flexAlignClasses} gap-2.5 sm:gap-3.5 mt-1 sm:mt-1.5 z-10`}
      >
        {/* Bold Signal Red Edition */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 bg-[#141414] border border-[#2E2E2E] px-3 sm:px-4 py-1 shadow-md">
          <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-[#FF0022] tracking-wider leading-none drop-shadow-[0_0_20px_rgba(255,0,34,0.4)]">
            3.0
          </span>
          <span className="font-mono-tech text-[10px] sm:text-xs text-[#FCFAED]/90 uppercase tracking-widest font-bold">
            EDITION
          </span>
        </div>

        <span className="w-1.5 h-1.5 bg-[#FF3D00] rounded-full animate-ping hidden min-[380px]:inline-block" />

        {/* National level technical symposium supporting tag */}
        <div className="inline-flex items-center gap-2 font-mono-tech text-[9px] min-[360px]:text-[10px] sm:text-xs text-[#888888] tracking-wider min-[360px]:tracking-widest uppercase bg-[#0D0D0D]/90 px-2.5 sm:px-3 py-1.5 border border-[#262626] max-w-full">
          <span className="w-1.5 h-1.5 bg-[#FF0022] rounded-full shrink-0" />
          <span className="font-semibold text-[#FCFAED]/85 leading-tight break-words">NATIONAL LEVEL TECHNICAL SYMPOSIUM</span>
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* 4. RED ACCENT DIVIDER LINE WITH TERMINAL NOTCHES                  */}
      {/* Smooth line expansion beneath the title                           */}
      {/* ================================================================= */}
      <div className={`relative w-full max-w-xl flex items-center ${flexAlignClasses} mt-2.5 sm:mt-3 px-1 z-10`}>
        <span className="w-2 h-2 bg-[#FF0022] clip-diagonal-right shrink-0 shadow-[0_0_8px_#FF0022]" />
        <motion.div
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
          style={{ originX: align === 'responsive' ? 0 : 0.5 }}
          className="h-[2px] flex-1 bg-gradient-to-r from-[#FF0022] via-[#FF3D00] to-[#FF0022] shadow-[0_0_10px_rgba(255,0,34,0.4)]"
        />
        <span className="w-2 h-2 bg-[#FF0022] clip-diagonal-left shrink-0 shadow-[0_0_8px_#FF0022]" />
      </div>
    </div>
  );
};

export default IntelliverseTitleLockup;
