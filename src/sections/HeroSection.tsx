import React from 'react';
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
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-20 sm:pt-24 lg:pt-24 pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-6 lg:px-12 border-b border-[#262626] overflow-hidden">
      {/* 1. Controlled Oversized Ghost Typography in Background (Subtle supporting atmosphere) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0 select-none"
      >
        <span className="font-display font-black text-[clamp(6rem,22vw,18rem)] uppercase tracking-tighter text-white/[0.012] leading-none whitespace-nowrap transform -rotate-3 scale-110">
          INTELLIVERSE
        </span>
      </div>

      {/* 2. Fine-Line Circular Geometry with Subtle Rotational Movement */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] pointer-events-none z-0 opacity-15 sm:opacity-20"
      >
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full animate-spin-slow"
          fill="none"
          stroke="currentColor"
        >
          {/* Concentric rings */}
          <circle cx="400" cy="400" r="380" stroke="#FF0022" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
          <circle cx="400" cy="400" r="300" stroke="#FCFAED" strokeWidth="0.8" opacity="0.15" />
          <circle cx="400" cy="400" r="220" stroke="#FF0022" strokeWidth="1" strokeDasharray="12 12" opacity="0.3" />
          <circle cx="400" cy="400" r="140" stroke="#FCFAED" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.2" />

          {/* Technical crosshairs & degree markings */}
          <line x1="400" y1="20" x2="400" y2="780" stroke="#FF0022" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.2" />
          <line x1="20" y1="400" x2="780" y2="400" stroke="#FF0022" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.2" />
          <circle cx="400" cy="20" r="4" fill="#FF0022" opacity="0.5" />
          <circle cx="780" cy="400" r="4" fill="#FF0022" opacity="0.5" />
        </svg>

        {/* Counter-rotating subtle inner reticle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-[45%] h-[45%] animate-spin-slow-reverse" fill="none">
            <polygon points="200,20 380,320 20,320" stroke="#FF3D00" strokeWidth="0.8" opacity="0.25" strokeDasharray="8 8" />
            <polygon points="200,380 20,80 380,80" stroke="#FCFAED" strokeWidth="0.6" opacity="0.15" strokeDasharray="4 6" />
          </svg>
        </div>
      </div>

      {/* 3. Animated Red Brutalist Graphic Shape Moving Behind Title */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] pointer-events-none z-0 animate-float-slow"
      >
        <div className="w-full h-full bg-gradient-to-br from-[#FF0022]/10 via-[#FF3D00]/5 to-transparent clip-diagonal-left blur-3xl" />
      </div>

      {/* 4. Architectural Red Diagonal Cut Accent */}
      <div className="absolute top-0 right-0 w-[45%] h-[600px] bg-[#FF0022] clip-diagonal-left opacity-[0.03] pointer-events-none z-0 hidden sm:block" />

      {/* 5. Subtle Technical Grid Lines & Halftone Quadrant */}
      <div className="absolute inset-0 tech-grid-bg opacity-25 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 comic-halftone-pattern opacity-5 lg:opacity-10 pointer-events-none z-0 hidden lg:block" />

      {/* Top Editorial Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] sm:text-xs text-[#565656] border-b border-[#262626] pb-2.5 sm:pb-3 mb-2 sm:mb-4">
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
      <div className="relative z-10 my-auto py-2 sm:py-4 lg:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Content Column */}
        <div className="lg:col-span-8 min-w-0 flex flex-col justify-center space-y-4 sm:space-y-5">
          {/* ==================================================== */}
          {/* 1. PRIMARY FOCUS: SAI INTELLIVERSE 3.0 TITLE LOCKUP */}
          {/* ==================================================== */}
          <div className="relative w-full max-w-full overflow-visible py-1 sm:py-2">
            <IntelliverseTitleLockup align="responsive" />
          </div>

          {/* ==================================================== */}
          {/* 2. SECONDARY: DEPARTMENT INFORMATION                 */}
          {/* ==================================================== */}
          <div className="space-y-1 pt-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 bg-[#FF0022] clip-diagonal-right inline-block" />
              <span className="text-xs sm:text-sm font-mono-tech tracking-wider sm:tracking-[0.18em] text-[#FF0022] uppercase font-bold block">
                {symposiumConfig.department}
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-mono-tech text-[#888888] uppercase tracking-wide block pl-4 lg:pl-4">
              {symposiumConfig.college}
            </span>
          </div>

          {/* ==================================================== */}
          {/* 3. SUPPORTING: DATE AND VENUE INFORMATION            */}
          {/* ==================================================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1">
            <div className="inline-flex items-center justify-center gap-2 bg-[#141414] border border-[#333333] px-3.5 py-2 font-mono-tech text-xs text-[#FCFAED] shadow-sm hover:border-[#FF0022]/60 transition-colors">
              <Calendar className="w-4 h-4 text-[#FF0022] shrink-0" />
              <span className="font-bold tracking-wide">{symposiumConfig.eventDate}</span>
            </div>
            <div className="inline-flex items-center justify-center gap-2 font-mono-tech text-xs text-[#888888] bg-[#0D0D0D]/90 border border-[#262626] px-3.5 py-2 text-center">
              <MapPin className="w-4 h-4 text-[#FF0022] shrink-0" />
              <span className="font-medium text-[#FCFAED]/90 leading-tight">
                SEMINAR HALL — SRI SAIRAM COLLEGE OF ENGINEERING
              </span>
            </div>
          </div>

          {/* 4. TAGLINE */}
          <div className="space-y-1.5 pt-1 text-center lg:text-left">
            <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-[#FCFAED] leading-snug">
              {symposiumConfig.tagline}
            </p>
            <p className="text-xs sm:text-sm font-mono-tech text-[#888888] leading-relaxed max-w-xl mx-auto lg:mx-0">
              {symposiumConfig.subTagline}
            </p>
          </div>

          {/* ==================================================== */}
          {/* 5. PROMINENT ACTIONS: REGISTER NOW & EXPLORE EVENTS  */}
          {/* ==================================================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
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
              <ArrowDown className="w-4 h-4 text-[#FF0022] transition-colors" />
            </MagneticButton>
          </div>
        </div>

        {/* ==================================================== */}
        {/* 6. SUPPORTING: COUNTDOWN PANEL (Right / Secondary)   */}
        {/* ==================================================== */}
        <div className="lg:col-span-4 min-w-0 w-full mt-4 lg:mt-0">
          <div className="bg-[#141414] border border-[#262626] p-3.5 sm:p-5 font-mono-tech relative overflow-hidden shadow-2xl hover:border-[#FF0022]/60 transition-colors">
            {/* Top corner marker */}
            <div className="absolute top-0 right-0 w-6 sm:w-7 h-6 sm:h-7 bg-[#FF0022] clip-diagonal-left" />

            {/* Corner Bracket Details */}
            <div className="absolute top-0 left-0 w-3 h-[2px] bg-[#FF0022]" />
            <div className="absolute top-0 left-0 w-[2px] h-3 bg-[#FF0022]" />
            <div className="absolute bottom-0 right-0 w-3 h-[2px] bg-[#FF0022]" />
            <div className="absolute bottom-0 right-0 w-[2px] h-3 bg-[#FF0022]" />

            <div className="flex justify-between items-center text-xs text-[#888888] pb-2.5 border-b border-[#262626] mb-3">
              <span className="uppercase text-[11px] text-[#FCFAED] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FF0022] rounded-full animate-ping" />
                T-MINUS LAUNCH
              </span>
              <span className="text-[#FF0022] text-[10px] font-bold tracking-widest bg-[#0D0D0D] px-2 py-0.5 border border-[#FF0022]/30">
                LIVE CLOCK
              </span>
            </div>

            {countdown.isPast ? (
              <div className="py-4 px-2 text-center border border-[#FF0022]/40 bg-[#0D0D0D] my-1">
                <span className="font-display font-black text-base sm:text-lg text-[#FF0022] tracking-wider uppercase block">
                  {countdown.statusMessage}
                </span>
                <span className="text-[10px] text-[#888888] font-mono-tech uppercase mt-1 block">
                  NOV 06, 2026 // SEMINAR HALL
                </span>
              </div>
            ) : (
              /* Reflowing Digit Boxes (2x2 on <360px, 4-col on >=360px) */
              <div className="grid grid-cols-2 min-[360px]:grid-cols-4 gap-2 text-center">
                <div className="relative bg-[#0D0D0D] border border-[#262626] hover:border-[#FF0022]/50 transition-colors py-2 sm:py-3 min-w-0 group">
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#FF0022]/40 group-hover:bg-[#FF0022] transition-colors" />
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
                    {countdown.days}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#888888] uppercase tracking-wider font-semibold block mt-0.5">
                    DAYS
                  </span>
                </div>

                <div className="relative bg-[#0D0D0D] border border-[#262626] hover:border-[#FF0022]/50 transition-colors py-2 sm:py-3 min-w-0 group">
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#FF0022]/40 group-hover:bg-[#FF0022] transition-colors" />
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
                    {countdown.hours}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#888888] uppercase tracking-wider font-semibold block mt-0.5">
                    HRS
                  </span>
                </div>

                <div className="relative bg-[#0D0D0D] border border-[#262626] hover:border-[#FF0022]/50 transition-colors py-2 sm:py-3 min-w-0 group">
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#FF0022]/40 group-hover:bg-[#FF0022] transition-colors" />
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
                    {countdown.minutes}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#888888] uppercase tracking-wider font-semibold block mt-0.5">
                    MIN
                  </span>
                </div>

                <div className="relative bg-[#0D0D0D] border border-[#FF0022]/60 py-2 sm:py-3 min-w-0 shadow-[0_0_15px_rgba(255,0,34,0.12)]">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF0022]" />
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-bold font-display text-[#FF0022] tracking-tight">
                    {countdown.seconds}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#FF0022] uppercase tracking-wider font-semibold block mt-0.5">
                    SEC
                  </span>
                </div>
              </div>
            )}

            <div className="mt-3 pt-2.5 border-t border-[#262626] flex justify-between items-center text-[10px] text-[#888888]">
              <span className="font-semibold uppercase tracking-wider">TOTAL PRIZE POOL</span>
              <span className="font-bold text-[#FCFAED] text-xs truncate ml-2 bg-[#0D0D0D] px-2 py-0.5 border border-[#333333]">
                {symposiumConfig.stats.prizePool}
              </span>
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
