import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollVelocity } from '../hooks/useScrollVelocity';

interface MarqueeTickerProps {
  items?: string[];
  reverse?: boolean;
  className?: string;
  theme?: 'dark' | 'red' | 'ivory';
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items = [
    "COGNITIVE INTELLIGENCE",
    "DEEP LEARNING",
    "AGENTIC SYSTEMS",
    "BRUTALIST DESIGN",
    "HIGH-THROUGHPUT COMPUTE",
    "ALGORITHMIC COMBAT",
    "HARDWARE REVERSE LABS",
    "SAI INTELLIVERSE 3.0",
  ],
  reverse = false,
  className = "",
  theme = 'dark',
}) => {
  const velocity = useScrollVelocity();
  const [isFinePointer] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false
  );

  // Safe subtle skew only on fine pointer devices, never causing horizontal overflow
  const skewX = isFinePointer ? Math.max(-5, Math.min(5, velocity * 0.2)) : 0;

  const themeClasses = {
    dark: "bg-[#141414] text-[#FCFAED] border-y border-[#262626]",
    red: "bg-[#FF0022] text-white border-y border-[#FF3D00]",
    ivory: "bg-[#FCFAED] text-[#0D0D0D] border-y border-[#FCFAED]",
  };

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full max-w-full overflow-hidden py-3 sm:py-4 select-none ${themeClasses[theme]} ${className}`}
    >
      <div
        className="flex w-max"
        style={{
          transform: `skewX(${skewX}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <motion.div
          animate={{
            x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
          className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-mono-tech tracking-widest uppercase font-bold whitespace-nowrap"
        >
          {repeatedItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-white transition-colors">
                {item}
              </span>
              <span className="w-1.5 h-1.5 bg-[#FF0022] rounded-full inline-block shrink-0" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarqueeTicker;
