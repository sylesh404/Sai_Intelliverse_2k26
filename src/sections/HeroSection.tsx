import React from 'react';
import { motion } from 'framer-motion';
import symposiumConfig from '../config/symposiumConfig';
import { useCountdown } from '../hooks/useCountdown';
import MagneticButton from '../components/MagneticButton';
import IntelliverseTitleLockup from '../components/IntelliverseTitleLockup';
import { Calendar, MapPin, Radio, Terminal, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister }) => {
  const countdown = useCountdown(symposiumConfig.eventDateISO);

  const scrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-20 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 border-b border-[#262626] overflow-hidden">
      {/* Decorative Red Diagonal Architectural Slices (behind content) */}
      <div className="absolute top-0 right-0 w-[45%] h-[600px] bg-[#FF0022] clip-diagonal-left opacity-[0.05] pointer-events-none z-0 hidden sm:block" />

      {/* Top Editorial Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] sm:text-xs text-[#565656] border-b border-[#262626] pb-3 sm:pb-4 mb-4">
        <div className="flex items-center gap-2 text-[#FCFAED]">
          <span className="w-2 h-2 bg-[#FF0022] rounded-full animate-ping" />
          <Radio className="w-3.5 h-3.5 text-[#FF0022]" />
          <span>BROADCAST // 104.2 MHz</span>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <span>LOCATION: ANEKAL, BANGALORE</span>
          <span className="text-[#FF0022]">● LIVE TRANSMISSION</span>
        </div>

        <div className="text-right">
          <span className="text-[#888888] font-bold">{symposiumConfig.edition}</span>
        </div>
      </div>

      {/* Main Hero Body: Mobile Intentional Composition & Desktop Editorial Asymmetry */}
      <div className="relative z-10 my-auto py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        {/* Content Column */}
        <div className="lg:col-span-8 flex flex-col justify-center space-y-4 sm:space-y-6">
          {/* 1. DEPARTMENT NAME */}
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono-tech tracking-wider sm:tracking-[0.2em] text-[#FF0022] uppercase font-bold block">
              {symposiumConfig.department}
            </span>
            <span className="text-[11px] sm:text-xs font-mono-tech text-[#888888] uppercase tracking-wide block">
              {symposiumConfig.college}
            </span>
          </div>

          {/* 2. SYMPOSIUM TITLE LOCKUP: SAI / INTELLIVERSE / 3.0 (NEVER SPLITS) */}
          <div className="relative py-1 sm:py-2">
            <IntelliverseTitleLockup />

            {/* Red Geometric Accent Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              className="h-[2px] sm:h-[3px] bg-gradient-to-r from-transparent via-[#FF0022] to-transparent mt-3 sm:mt-4"
            />
          </div>

          {/* 4. DATE & VENUE BADGE (Inline on mobile, visible and non-overlapping) */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="inline-flex items-center gap-2 bg-[#141414] border border-[#333333] px-3 py-1.5 font-mono-tech text-xs text-[#FCFAED]">
              <Calendar className="w-3.5 h-3.5 text-[#FF0022]" />
              <span className="font-bold">{symposiumConfig.eventDateFormatted || symposiumConfig.eventDate}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#888888]">
              <MapPin className="w-3.5 h-3.5 text-[#FF0022]" />
              <span>
                {symposiumConfig.venue} · {symposiumConfig.college}
              </span>
            </div>
          </div>

          {/* 5. TAGLINE */}
          <div className="space-y-2 pt-1">
            <p className="text-base sm:text-2xl font-display font-medium text-[#FCFAED] leading-snug">
              {symposiumConfig.tagline}
            </p>
            <p className="text-xs sm:text-sm font-mono-tech text-[#888888] leading-relaxed max-w-xl">
              {symposiumConfig.subTagline}
            </p>
          </div>

          {/* 6. REGISTER NOW & EXPLORE ACTIONS */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
            <MagneticButton
              variant="primary"
              size="lg"
              level={3}
              defaultText="REGISTER NOW"
              hoverText="CLAIM PASS"
              href={symposiumConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onOpenRegister}
              className="w-full sm:w-auto min-h-[48px]"
            />

            <MagneticButton
              variant="outline"
              size="lg"
              level={2}
              onClick={scrollToEvents}
              className="w-full sm:w-auto min-h-[48px]"
            >
              <span>EXPLORE EVENTS</span>
              <ArrowDown className="w-4 h-4 text-[#FF0022] group-hover:translate-y-1 transition-transform" />
            </MagneticButton>
          </div>
        </div>

        {/* Right / Secondary Column: Countdown Box (Fluid & fully reflowing) */}
        <div className="lg:col-span-4 w-full mt-4 lg:mt-0">
          <div className="bg-[#141414] border border-[#262626] p-4 sm:p-6 font-mono-tech relative overflow-hidden">
            {/* Top corner marker */}
            <div className="absolute top-0 right-0 w-6 h-6 bg-[#FF0022] clip-diagonal-left" />

            <div className="flex justify-between items-center text-xs text-[#888888] pb-3 border-b border-[#262626] mb-3">
              <span className="uppercase text-[11px] text-[#FCFAED] font-bold">
                T-MINUS LAUNCH
              </span>
              <span className="text-[#FF0022] text-[10px] animate-pulse">
                LIVE CLOCK
              </span>
            </div>

            {countdown.isPast ? (
              <div className="py-4 px-2 text-center border border-[#FF0022]/40 bg-[#0D0D0D] my-1">
                <span className="font-display font-black text-lg sm:text-xl text-[#FF0022] tracking-wider uppercase block">
                  {countdown.statusMessage}
                </span>
                <span className="text-[10px] text-[#888888] font-mono-tech uppercase mt-1 block">
                  NOV 06, 2026 // SEMINAR HALL
                </span>
              </div>
            ) : (
              /* 4 Digit Boxes with guaranteed safe widths */
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#0D0D0D] border border-[#262626] py-2 sm:py-3">
                  <span className="block text-xl sm:text-3xl font-bold font-display text-white">
                    {countdown.days}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#888888] uppercase tracking-wider">
                    DAYS
                  </span>
                </div>

                <div className="bg-[#0D0D0D] border border-[#262626] py-2 sm:py-3">
                  <span className="block text-xl sm:text-3xl font-bold font-display text-white">
                    {countdown.hours}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#888888] uppercase tracking-wider">
                    HRS
                  </span>
                </div>

                <div className="bg-[#0D0D0D] border border-[#262626] py-2 sm:py-3">
                  <span className="block text-xl sm:text-3xl font-bold font-display text-white">
                    {countdown.minutes}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#888888] uppercase tracking-wider">
                    MIN
                  </span>
                </div>

                <div className="bg-[#0D0D0D] border border-[#FF0022]/40 py-2 sm:py-3">
                  <span className="block text-xl sm:text-3xl font-bold font-display text-[#FF0022]">
                    {countdown.seconds}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#FF0022] uppercase tracking-wider">
                    SEC
                  </span>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-[#262626] flex justify-between items-center text-[10px] text-[#888888]">
              <span>TOTAL PRIZE POOL</span>
              <span className="font-bold text-white text-xs">{symposiumConfig.stats.prizePool}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Section Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] sm:text-xs text-[#565656] pt-3 border-t border-[#262626]">
        <div className="flex items-center gap-3">
          <span>PRIZES: {symposiumConfig.stats.prizePool}</span>
          <span className="text-[#333333]">|</span>
          <span>DISCIPLINES: {symposiumConfig.stats.events}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#888888]">
          <Terminal className="w-3.5 h-3.5 text-[#FF0022]" />
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
