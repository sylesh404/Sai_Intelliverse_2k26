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
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-20 sm:pt-24 lg:pt-24 pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-6 lg:px-12 border-b border-[#263643] overflow-hidden">
      {/* 1. Controlled Oversized Ghost Typography in Background (Subtle supporting atmosphere) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0 select-none"
      >
        <span className="font-display font-black text-[clamp(6rem,22vw,18rem)] uppercase tracking-tighter text-white/[0.012] leading-none whitespace-nowrap transform -rotate-3 scale-110">
          INTELLIVERSE
        </span>
      </div>

      {/* 2. Fine-Line Circular Geometry with Subtle Rotational Movement (Ice Blue) */}
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
          {/* Concentric ice rings */}
          <circle cx="400" cy="400" r="380" stroke="#35DDF5" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
          <circle cx="400" cy="400" r="300" stroke="#F4FDFF" strokeWidth="0.8" opacity="0.15" />
          <circle cx="400" cy="400" r="220" stroke="#4DE6FF" strokeWidth="1" strokeDasharray="12 12" opacity="0.3" />
          <circle cx="400" cy="400" r="140" stroke="#7DEBFF" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.25" />

          {/* Technical crosshairs & degree markings */}
          <line x1="400" y1="20" x2="400" y2="780" stroke="#35DDF5" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.2" />
          <line x1="20" y1="400" x2="780" y2="400" stroke="#35DDF5" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.2" />
          <circle cx="400" cy="20" r="4" fill="#35DDF5" opacity="0.5" />
          <circle cx="780" cy="400" r="4" fill="#35DDF5" opacity="0.5" />
        </svg>

        {/* Counter-rotating subtle inner reticle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-[45%] h-[45%] animate-spin-slow-reverse" fill="none">
            <polygon points="200,20 380,320 20,320" stroke="#64CFFF" strokeWidth="0.8" opacity="0.25" strokeDasharray="8 8" />
            <polygon points="200,380 20,80 380,80" stroke="#F4FDFF" strokeWidth="0.6" opacity="0.15" strokeDasharray="4 6" />
          </svg>
        </div>
      </div>

      {/* 3. Animated Ice-Blue Graphic Shape Moving Behind Title */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] pointer-events-none z-0 animate-float-slow"
      >
        <div className="w-full h-full bg-gradient-to-br from-[#35DDF5]/12 via-[#7DEBFF]/6 to-transparent clip-diagonal-left blur-3xl" />
      </div>

      {/* 4. Architectural Ice-Blue Diagonal Cut Accent */}
      <div className="absolute top-0 right-0 w-[45%] h-[600px] bg-[#35DDF5] clip-diagonal-left opacity-[0.02] pointer-events-none z-0 hidden sm:block" />

      {/* 5. Concentric Slowly Rotating Geometric Accent Rings (Desktop Only) */}
      <div className="absolute -top-32 -right-32 w-96 h-96 border border-[#4DE6FF]/20 rounded-full pointer-events-none hidden lg:block animate-spin-slow" />
      <div className="absolute -top-20 -right-20 w-72 h-72 border border-dashed border-[#7DEBFF]/20 rounded-full pointer-events-none hidden lg:block animate-spin-slow-reverse" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#35DDF5]/10 rounded-full blur-[90px] pointer-events-none -z-1 hidden lg:block" />

      {/* Subtle Technical Grid Lines & Halftone Quadrant */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 comic-halftone-pattern opacity-10 lg:opacity-15 pointer-events-none z-0 hidden lg:block" />

      {/* Top Editorial Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] sm:text-xs text-[#A9BAC8] border-b border-[#263643] pb-2.5 sm:pb-3 mb-2 sm:mb-4">
        <div className="flex items-center gap-2 text-[#F4FDFF]">
          <span className="w-2 h-2 bg-[#35DDF5] rounded-full animate-ping shadow-[0_0_6px_#35DDF5]" />
          <Radio className="w-3.5 h-3.5 text-[#35DDF5]" />
          <span>BROADCAST // 104.2 MHz</span>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <span>LOCATION: ANEKAL, BANGALORE</span>
          <span className="text-[#7DEBFF] font-semibold">● LIVE TRANSMISSION</span>
        </div>

        <div className="text-right">
          <span className="text-[#A9BAC8] font-bold">{symposiumConfig.edition}</span>
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
              <span className="w-2 h-2 bg-[#35DDF5] clip-diagonal-right inline-block shadow-[0_0_6px_#35DDF5]" />
              <span className="text-xs sm:text-sm font-mono-tech tracking-wider sm:tracking-[0.18em] text-[#7DEBFF] uppercase font-bold block">
                {symposiumConfig.department}
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-mono-tech text-[#A9BAC8] uppercase tracking-wide block pl-4 lg:pl-4">
              {symposiumConfig.college}
            </span>
          </div>

          {/* ==================================================== */}
          {/* 3. SUPPORTING: DATE AND VENUE INFORMATION            */}
          {/* ==================================================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1">
            <div className="inline-flex items-center justify-center gap-2 bg-[#10151D] border border-[#263643] px-3.5 py-2 font-mono-tech text-xs text-[#F4FDFF] shadow-[0_0_15px_rgba(53,221,245,0.15)] hover:border-[#4DE6FF] transition-colors">
              <Calendar className="w-4 h-4 text-[#35DDF5] shrink-0" />
              <span className="font-bold tracking-wide">{symposiumConfig.eventDate}</span>
            </div>
            <div className="inline-flex items-center justify-center gap-2 font-mono-tech text-xs text-[#A9BAC8] bg-[#141C26] border border-[#263643] px-3.5 py-2 text-center">
              <MapPin className="w-4 h-4 text-[#35DDF5] shrink-0" />
              <span className="font-medium text-[#F4FDFF]/90 leading-tight">
                SEMINAR HALL — SRI SAIRAM COLLEGE OF ENGINEERING
              </span>
            </div>
          </div>

          {/* 4. TAGLINE */}
          <div className="space-y-1.5 pt-1 text-center lg:text-left">
            <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-[#F4FDFF] leading-snug">
              {symposiumConfig.tagline}
            </p>
            <p className="text-xs sm:text-sm font-mono-tech text-[#A9BAC8] leading-relaxed max-w-xl mx-auto lg:mx-0">
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
              <ArrowDown className="w-4 h-4 text-[#7DEBFF] transition-colors" />
            </MagneticButton>
          </div>
        </div>

        {/* ==================================================== */}
        {/* 6. COUNTDOWN PANEL: ARCTIC DIGITAL DASHBOARD         */}
        {/* ==================================================== */}
        <div className="lg:col-span-4 min-w-0 w-full mt-4 lg:mt-0">
          <div className="bg-[#10151D] border border-[#263643] hover:border-[#4DE6FF] p-3.5 sm:p-5 font-mono-tech relative overflow-hidden shadow-[0_0_30px_rgba(53,221,245,0.2)] transition-all duration-300">
            {/* Top corner marker */}
            <div className="absolute top-0 right-0 w-6 sm:w-7 h-6 sm:h-7 bg-[#35DDF5] clip-diagonal-left shadow-[0_0_10px_#35DDF5]" />

            {/* Corner Bracket Details */}
            <div className="absolute top-0 left-0 w-3 h-[2px] bg-[#7DEBFF]" />
            <div className="absolute top-0 left-0 w-[2px] h-3 bg-[#7DEBFF]" />
            <div className="absolute bottom-0 right-0 w-3 h-[2px] bg-[#7DEBFF]" />
            <div className="absolute bottom-0 right-0 w-[2px] h-3 bg-[#7DEBFF]" />

            <div className="flex justify-between items-center text-xs text-[#A9BAC8] pb-2.5 border-b border-[#263643] mb-3">
              <span className="uppercase text-[11px] text-[#F4FDFF] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#35DDF5] rounded-full animate-ping shadow-[0_0_6px_#35DDF5]" />
                T-MINUS LAUNCH
              </span>
              <span className="text-[#7DEBFF] text-[10px] font-bold tracking-widest bg-[#141C26] px-2 py-0.5 border border-[#35DDF5]/50">
                LIVE CLOCK
              </span>
            </div>

            {countdown.isPast ? (
              <div className="py-4 px-2 text-center border border-[#4DE6FF]/40 bg-[#141C26] my-1">
                <span className="font-display font-black text-base sm:text-lg text-[#7DEBFF] tracking-wider uppercase block">
                  {countdown.statusMessage}
                </span>
                <span className="text-[10px] text-[#A9BAC8] font-mono-tech uppercase mt-1 block">
                  NOV 06, 2026 // SEMINAR HALL
                </span>
              </div>
            ) : (
              /* Reflowing Digit Boxes (2x2 on <360px, 4-col on >=360px) */
              <div className="grid grid-cols-2 min-[360px]:grid-cols-4 gap-2 text-center">
                <div className="relative bg-[#141C26] border border-[#263643] hover:border-[#4DE6FF] hover:shadow-[0_0_12px_rgba(53,221,245,0.2)] transition-all py-2 sm:py-3 min-w-0 group">
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#35DDF5]/40 group-hover:bg-[#7DEBFF] transition-colors" />
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
                    {countdown.days}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#A9BAC8] uppercase tracking-wider font-semibold block mt-0.5">
                    DAYS
                  </span>
                </div>

                <div className="relative bg-[#141C26] border border-[#263643] hover:border-[#4DE6FF] hover:shadow-[0_0_12px_rgba(53,221,245,0.2)] transition-all py-2 sm:py-3 min-w-0 group">
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#35DDF5]/40 group-hover:bg-[#7DEBFF] transition-colors" />
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
                    {countdown.hours}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#A9BAC8] uppercase tracking-wider font-semibold block mt-0.5">
                    HRS
                  </span>
                </div>

                <div className="relative bg-[#141C26] border border-[#263643] hover:border-[#4DE6FF] hover:shadow-[0_0_12px_rgba(53,221,245,0.2)] transition-all py-2 sm:py-3 min-w-0 group">
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#35DDF5]/40 group-hover:bg-[#7DEBFF] transition-colors" />
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
                    {countdown.minutes}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#A9BAC8] uppercase tracking-wider font-semibold block mt-0.5">
                    MIN
                  </span>
                </div>

                {/* Highlighted SECONDS Box with Luminous Arctic Cyan Treatment */}
                <div className="relative bg-gradient-to-b from-[#071521] to-[#0A111C] border-2 border-[#35DDF5] py-2 sm:py-3 min-w-0 shadow-[0_0_20px_rgba(53,221,245,0.35)] group">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#7DEBFF]" />
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#D9FAFF] to-[#7DEBFF] tracking-tight">
                    {countdown.seconds}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#7DEBFF] uppercase tracking-wider font-bold block mt-0.5">
                    SEC
                  </span>
                </div>
              </div>
            )}

            <div className="mt-3 pt-2.5 border-t border-[#263643] flex justify-between items-center text-[10px] text-[#A9BAC8]">
              <span className="font-semibold uppercase tracking-wider">TOTAL PRIZE POOL</span>
              <span className="font-bold text-[#F4FDFF] text-xs truncate ml-2 bg-[#141C26] px-2 py-0.5 border border-[#35DDF5]/50 shadow-[0_0_10px_rgba(53,221,245,0.15)]">
                {symposiumConfig.stats.prizePool}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Section Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] sm:text-xs text-[#A9BAC8]/70 pt-3 border-t border-[#263643]">
        <div className="flex items-center gap-3">
          <span>PRIZES: {symposiumConfig.stats.prizePool}</span>
          <span className="text-[#263643]">|</span>
          <span>DISCIPLINES: {symposiumConfig.stats.events}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#A9BAC8]">
          <Terminal className="w-3.5 h-3.5 text-[#35DDF5]" />
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
