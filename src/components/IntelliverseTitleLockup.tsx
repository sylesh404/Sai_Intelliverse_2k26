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
  const measureRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [unscaledWidth, setUnscaledWidth] = useState<number>(0);
  const [prefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Dynamic responsive font-scaling safeguard:
  // Ensures "INTELLIVERSE" ALWAYS fits on ONE SINGLE LINE on every device (320px to 1920px+)
  // with zero clipping on either side.
  useEffect(() => {
    let animationFrameId: number;

    const measureAndScale = () => {
      if (!containerRef.current || !measureRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      // Measure natural unscaled width from the invisible probe
      const naturalWidth = measureRef.current.getBoundingClientRect().width;

      if (naturalWidth > 0) {
        setUnscaledWidth(naturalWidth);
      }

      // Safe buffer margin (12px) to guarantee zero horizontal clipping
      const safeWidth = Math.max(containerWidth - 12, 100);

      if (naturalWidth > safeWidth && naturalWidth > 0 && safeWidth > 0) {
        const calculatedScale = Math.min(1, safeWidth / naturalWidth);
        setScale(calculatedScale);
      } else {
        setScale(1);
      }
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(measureAndScale);
    };

    // 1. Initial measurement
    handleResize();

    // 2. Critical: Recalculate as soon as custom webfonts (Syne 800) are fully loaded
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        handleResize();
      });
    }

    // 3. Observe both container size and font/text metrics via ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (measureRef.current) {
      resizeObserver.observe(measureRef.current);
    }

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
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

  const typographyClasses =
    variant === 'compact'
      ? 'text-[clamp(1.5rem,6vw,3.5rem)]'
      : 'text-[clamp(1.75rem,8.2vw,3.2rem)] sm:text-[clamp(2.8rem,7.5vw,4.5rem)] lg:text-[clamp(3.2rem,5.2vw,4.8rem)] xl:text-[clamp(3.8rem,5.6vw,5.8rem)] 2xl:text-[clamp(4.4rem,6vw,6.8rem)]';

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col select-none overflow-visible ${alignmentClasses} ${className}`}
    >
      {/* Hidden measurement probe to reliably determine true natural font width */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className={`font-display font-black uppercase tracking-tight pointer-events-none invisible absolute left-0 top-0 opacity-0 select-none whitespace-nowrap leading-[0.9] sm:leading-[0.92] ${typographyClasses}`}
        style={{
          letterSpacing: '-0.025em',
        }}
      >
        INTELLIVERSE
      </span>

      {/* ================================================================= */}
      {/* 5. STEP 5 ILLUMINATION: RESTINED SUBTLE PURPLE HALO BEHIND TITLE  */}
      {/* ================================================================= */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.25 } : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[115%] max-w-3xl h-44 pointer-events-none -z-1"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(168, 85, 247, 0.22), rgba(139, 53, 173, 0.1) 50%, transparent 80%)',
          filter: 'blur(30px)',
        }}
      />

      {/* ================================================================= */}
      {/* 1. EYEBROW: SAI (Revealed with animated line-drawing)             */}
      {/* ================================================================= */}
      <div className={`flex items-center ${flexAlignClasses} gap-2 sm:gap-3 mb-1.5 sm:mb-2 z-10`}>
        {/* Left line drawing animation */}
        <svg className="h-[2px] w-6 sm:w-10 shrink-0 overflow-visible" viewBox="0 0 40 2" fill="none">
          <defs>
            <linearGradient id="sai-line-grad-l" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B35AD" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0"
            y1="1"
            x2="40"
            y2="1"
            stroke="url(#sai-line-grad-l)"
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
          className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-[#19131D] border border-[#3D264E] shadow-[0_0_15px_rgba(139,53,173,0.15)]"
        >
          <span className="w-1.5 h-1.5 bg-[#A855F7] clip-diagonal-right inline-block shadow-[0_0_6px_#A855F7]" />
          <span className="font-mono-tech text-xs sm:text-sm font-black text-[#C084FC] tracking-[0.35em] sm:tracking-[0.5em] uppercase pl-1">
            SAI
          </span>
          <span className="text-[10px] text-[#B8AFC0] font-mono-tech uppercase tracking-wider hidden sm:inline border-l border-[#3D264E] pl-2">
            DEPARTMENT OF AI &amp; ML
          </span>
        </motion.div>

        {/* Right line drawing animation (centered or balanced) */}
        <svg className="h-[2px] w-6 sm:w-10 shrink-0 overflow-visible" viewBox="0 0 40 2" fill="none">
          <defs>
            <linearGradient id="sai-line-grad-r" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#8B35AD" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0"
            y1="1"
            x2="40"
            y2="1"
            stroke="url(#sai-line-grad-r)"
            strokeWidth="2"
            initial={prefersReducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* ================================================================= */}
      {/* 2. THE HERO TITLE: INTELLIVERSE (Dominant foreground centerpiece) */}
      {/* Refined vertical clip-path reveal with zero side clipping         */}
      {/* ================================================================= */}
      <div className={`w-full max-w-full flex items-center ${flexAlignClasses} overflow-visible my-0.5 sm:my-1 px-0 z-10`}>
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
                  "drop-shadow(0 0 0px #8B35AD)",
                  "drop-shadow(0 0 30px rgba(168,85,247,0.5))",
                  "drop-shadow(0 0 15px rgba(139,53,173,0.3))",
                ],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
            clipPath: { duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
            filter: { duration: 1.1, delay: 1.1, ease: "easeInOut" },
          }}
          className="inline-block transform-gpu overflow-visible"
          style={
            scale < 1 && unscaledWidth > 0
              ? {
                  width: Math.ceil(unscaledWidth * scale) + 2,
                }
              : undefined
          }
        >
          <h1
            ref={textRef}
            className={`font-display font-black uppercase text-[#FCFAED] tracking-tight leading-[0.9] sm:leading-[0.92] transition-transform duration-100 ${typographyClasses}`}
            style={{
              whiteSpace: 'nowrap',
              display: 'inline-block',
              transform: scale < 1 ? `scale(${scale})` : undefined,
              transformOrigin: 'left center',
              textShadow: '0 4px 35px rgba(0,0,0,0.95), 0 0 40px rgba(168,85,247,0.32), 0 0 80px rgba(108,48,130,0.2)',
              letterSpacing: '-0.025em',
            }}
            aria-label="SAI INTELLIVERSE 3.0"
          >
            INTELLIVERSE
          </h1>
        </motion.div>
      </div>

      {/* ================================================================= */}
      {/* 3. VISUALLY CONNECTED 3.0 EDITION BADGE (Distinctive & Vibrant)    */}
      {/* Coordinated directional entrance                                  */}
      {/* ================================================================= */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.6, ease: "easeOut" }}
        className={`flex flex-wrap items-center ${flexAlignClasses} gap-2.5 sm:gap-3.5 mt-1 sm:mt-1.5 z-10`}
      >
        {/* Distinctive Bright Purple Edition Badge */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 bg-[#19131D] border border-[#8B35AD]/70 px-3 sm:px-4 py-1 shadow-[0_0_20px_rgba(139,53,173,0.3)] hover:border-[#C084FC] transition-colors">
          <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#C084FC] to-[#A855F7] tracking-wider leading-none drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            3.0
          </span>
          <span className="font-mono-tech text-[10px] sm:text-xs text-[#FCFAED]/90 uppercase tracking-widest font-bold">
            EDITION
          </span>
        </div>

        <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-ping hidden min-[380px]:inline-block shadow-[0_0_8px_#A855F7]" />

        {/* National level technical symposium supporting tag */}
        <div className="inline-flex items-center gap-2 font-mono-tech text-[9px] min-[360px]:text-[10px] sm:text-xs text-[#B8AFC0] tracking-wider min-[360px]:tracking-widest uppercase bg-[#151019] px-2.5 sm:px-3 py-1.5 border border-[#33233D] max-w-full">
          <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full shrink-0 shadow-[0_0_6px_#A855F7]" />
          <span className="font-semibold text-[#FCFAED]/90 leading-tight break-words">NATIONAL LEVEL TECHNICAL SYMPOSIUM</span>
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* 4. BRIGHT PURPLE ACCENT DIVIDER LINE WITH TERMINAL NOTCHES         */}
      {/* Smooth line expansion beneath the title                           */}
      {/* ================================================================= */}
      <div className={`relative w-full max-w-xl flex items-center ${flexAlignClasses} mt-2.5 sm:mt-3 px-1 z-10`}>
        <span className="w-2 h-2 bg-[#A855F7] clip-diagonal-right shrink-0 shadow-[0_0_8px_#A855F7]" />
        <motion.div
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
          style={{ originX: align === 'responsive' ? 0 : 0.5 }}
          className="h-[2px] flex-1 bg-gradient-to-r from-[#8B35AD] via-[#C084FC] to-[#8B35AD] shadow-[0_0_12px_rgba(168,85,247,0.6)]"
        />
        <span className="w-2 h-2 bg-[#A855F7] clip-diagonal-left shrink-0 shadow-[0_0_8px_#A855F7]" />
      </div>
    </div>
  );
};

export default IntelliverseTitleLockup;
