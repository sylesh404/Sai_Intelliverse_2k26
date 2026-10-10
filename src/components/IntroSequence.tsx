import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import symposiumConfig from '../config/symposiumConfig';
import { FastForward, Terminal } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [cycleYear, setCycleYear] = useState<number>(24);

  useEffect(() => {
    // If user prefers reduced motion, finish immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    // Fast cycling number effect
    let yearInterval: ReturnType<typeof setInterval>;
    const yearSequence = [22, 23, 24, 25, 27, 28, 25, 26];
    let yearIdx = 0;

    const t1 = setTimeout(() => {
      setStep(1); // Technical labels and lines appear
      yearInterval = setInterval(() => {
        if (yearIdx < yearSequence.length) {
          setCycleYear(yearSequence[yearIdx]);
          yearIdx++;
        } else {
          setCycleYear(26);
          clearInterval(yearInterval);
        }
      }, 90);
    }, 500);

    const t2 = setTimeout(() => {
      setStep(2); // Large typography assembling
    }, 1500);

    const t3 = setTimeout(() => {
      setStep(3); // Diagonal red sweep
    }, 2400);

    const t4 = setTimeout(() => {
      setStep(4); // Department, date & finalize
    }, 3100);

    const t5 = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      if (yearInterval) clearInterval(yearInterval);
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };


  const symposiumLetters = symposiumConfig.name.split('');

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 bg-[#0D0D0D] flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden text-[#FCFAED] select-none"
      >
        {/* Skip button with 48px touch target */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
          <button
            onClick={handleSkip}
            className="flex items-center gap-2 min-h-[44px] px-3.5 py-2 bg-[#1A1A1A] border border-[#333333] hover:border-[#FF0022] text-xs font-mono-tech uppercase tracking-widest text-[#FCFAED] transition-all hover:bg-[#FF0022] hover:text-white cursor-pointer active:scale-95"
            aria-label="Skip Introduction Sequence"
          >
            <span>SKIP INTRO</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1. Thin white/red lines drawing across screen */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current opacity-30">
          <motion.line
            x1="0"
            y1="25%"
            x2="100%"
            y2="25%"
            stroke="#565656"
            strokeWidth="1"
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.line
            x1="15%"
            y1="0"
            x2="15%"
            y2="100%"
            stroke="#FF0022"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
          />
          <motion.line
            x1="85%"
            y1="0"
            x2="85%"
            y2="100%"
            stroke="#333333"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          />
        </svg>

        {/* Diagonal Red Geometric Sweep (safe animation zone) */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ x: "-100%", skewX: -20 }}
              animate={{ x: "200%", skewX: -20 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 w-1/2 bg-[#FF0022] opacity-70 pointer-events-none z-10"
            />
          )}
        </AnimatePresence>

        {/* Top Technical Metadata */}
        <div className="relative z-20 flex flex-wrap justify-between items-center gap-2 text-[10px] sm:text-xs font-mono-tech text-[#565656] pt-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[#FCFAED]"
          >
            <span className="w-2 h-2 bg-[#FF0022] rounded-full animate-ping" />
            <Terminal className="w-3.5 h-3.5 text-[#FF0022]" />
            <span>SYSTEM // 001 — READY</span>
          </motion.div>

          <div className="text-[#FF0022] font-bold text-right pr-28 sm:pr-0">
            STATUS: ACTIVE
          </div>
        </div>

        {/* Central Assembling Typography & Cycling Year - Mobile Scaled */}
        <div className="relative z-20 my-auto text-center flex flex-col items-center justify-center max-w-full px-2">
          {/* Rapid Cycling Year */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <span className="text-6xl sm:text-8xl md:text-9xl font-display font-extrabold tracking-tighter text-[#1A1A1A] select-none leading-none">
              '{cycleYear}
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base sm:text-2xl font-mono-tech font-bold text-[#FF0022] tracking-widest bg-[#0D0D0D]/95 px-3 py-1 border border-[#FF0022]/40">
                {symposiumConfig.edition}
              </span>
            </div>
          </motion.div>

          {/* Assembling Letters: clamped font size so never overflows 320px viewport */}
          <div className="flex flex-wrap justify-center items-center overflow-hidden my-3 max-w-full px-2">
            {symposiumLetters.map((char, index) => {
              const yOffset = index % 2 === 0 ? -60 : 60;

              return (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: yOffset }}
                  animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-[#FCFAED]"
                >
                  {char}
                </motion.span>
              );
            })}
          </div>

          {/* Department Name and Date Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="max-w-xl px-2 text-center"
          >
            <p className="text-[10px] sm:text-xs font-mono-tech tracking-wider text-[#FF0022] uppercase mb-1">
              {symposiumConfig.department}
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#FCFAED]">
              {symposiumConfig.college}
            </p>
            <p className="text-[10px] sm:text-xs font-mono-tech text-[#888888] mt-1">
              BANGALORE · {symposiumConfig.eventDate}
            </p>
          </motion.div>
        </div>

        {/* Bottom Technical Grid Bar */}
        <div className="relative z-20 flex justify-between items-center border-t border-[#262626] pt-3 font-mono-tech text-[10px] sm:text-[11px] text-[#565656]">
          <div>
            <span>SYSTEM / {symposiumConfig.year}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#FCFAED]">
            <span className="w-1.5 h-1.5 bg-[#FF0022]" />
            <span>ONLINE</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroSequence;
