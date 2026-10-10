import React, { useRef, useState, useEffect } from 'react';

interface IntelliverseTitleLockupProps {
  className?: string;
  variant?: 'hero' | 'intro' | 'compact';
}

export const IntelliverseTitleLockup: React.FC<IntelliverseTitleLockupProps> = ({
  className = '',
  variant = 'hero',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [scale, setScale] = useState<number>(1);

  // Responsive font size engine: guarantees INTELLIVERSE fits on ONE SINGLE LINE without wrapping or clipping
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !textRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const textWidth = textRef.current.scrollWidth;

      // Allow 16px safe buffer
      const targetWidth = Math.max(containerWidth - 24, 240);

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

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center text-center select-none ${className}`}
    >
      {/* 1. TOP BRAND: SAI */}
      <div className="flex items-center justify-center gap-3 mb-1 sm:mb-2">
        <span className="w-4 sm:w-8 h-[2px] bg-[#FF0022]" />
        <span className="font-mono-tech text-xs sm:text-lg md:text-xl font-black text-[#FF0022] tracking-[0.4em] sm:tracking-[0.6em] uppercase">
          SAI
        </span>
        <span className="w-4 sm:w-8 h-[2px] bg-[#FF0022]" />
      </div>

      {/* 2. THE HERO WORD: INTELLIVERSE (NEVER SPLITS, ALWAYS ONE LINE) */}
      <div className="w-full flex items-center justify-center overflow-visible my-1 sm:my-2">
        <h1
          ref={textRef}
          className={`font-display font-black uppercase text-[#FCFAED] tracking-tight leading-none transition-transform duration-100 transform-gpu ${
            variant === 'compact'
              ? 'text-[clamp(1.5rem,7vw,4.5rem)]'
              : 'text-[clamp(1.85rem,10.2vw,9.5rem)]'
          }`}
          style={{
            whiteSpace: 'nowrap',
            display: 'inline-block',
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'center center',
            textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 0 20px rgba(255,0,34,0.15)',
          }}
          aria-label="SAI INTELLIVERSE 3.0"
        >
          INTELLIVERSE
        </h1>
      </div>

      {/* 3. BOTTOM EDITION: 3.0 */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 mt-1 sm:mt-2">
        <div className="flex items-baseline gap-2">
          <span className="font-display font-black text-2xl sm:text-5xl md:text-6xl text-[#FF0022] tracking-wider leading-none">
            3.0
          </span>
          <span className="font-mono-tech text-[10px] sm:text-xs text-[#FCFAED]/70 uppercase tracking-widest font-semibold">
            // EDITION
          </span>
        </div>

        <span className="w-1.5 h-1.5 bg-[#FF3D00] rounded-full animate-ping" />

        <div className="hidden sm:inline-block font-mono-tech text-[10px] sm:text-xs text-[#888888] tracking-widest uppercase border-l border-[#333333] pl-4">
          NATIONAL LEVEL SYMPOSIUM
        </div>
      </div>
    </div>
  );
};

export default IntelliverseTitleLockup;
