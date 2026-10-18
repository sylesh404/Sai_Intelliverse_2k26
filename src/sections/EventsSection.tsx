import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import type { EventItem } from '../types';
import eventsData from '../data/events';
import { ArrowUpRight, Zap, Trophy, Sparkles } from 'lucide-react';

interface EventsSectionProps {
  onSelectEvent: (event: EventItem) => void;
}

interface EventCardProps {
  event: EventItem;
  idx: number;
  isTechnical: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
  isFinePointer: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  idx,
  isTechnical,
  onSelect,
  onHover,
  onLeave,
  isFinePointer,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  // Track cursor position purely for stationary internal radial lighting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    setMousePos({ x: relX, y: relY });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    onHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
  };

  // Vibrant purple theme accents
  const accentColor = isTechnical ? '#8B35AD' : '#A855F7';
  const secondaryColor = isTechnical ? '#A855F7' : '#C084FC';

  // Desktop subtle perspective tilt
  const tiltX = isFinePointer && isHovered && !prefersReducedMotion && cardRef.current
    ? ((mousePos.y / Math.max(cardRef.current.clientHeight, 1)) - 0.5) * -8
    : 0;
  const tiltY = isFinePointer && isHovered && !prefersReducedMotion && cardRef.current
    ? ((mousePos.x / Math.max(cardRef.current.clientWidth, 1)) - 0.5) * 8
    : 0;

  // Smooth scroll entrance (stationary once revealed)
  const isEven = idx % 2 === 0;
  const initialMotion = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 24, x: isEven ? -12 : 12 };
  const whileInViewMotion = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, x: 0 };
  const transitionConfig = {
    duration: prefersReducedMotion ? 0.2 : 0.5,
    delay: prefersReducedMotion ? 0 : (idx % 2) * 0.1 + Math.floor(idx / 2) * 0.08,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <motion.div
      ref={cardRef}
      initial={initialMotion}
      whileInView={whileInViewMotion}
      viewport={{ once: true, margin: "-40px" }}
      transition={transitionConfig}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        transform: isFinePointer && !prefersReducedMotion
          ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
          : undefined,
        transition: isHovered
          ? 'transform 0.12s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
          : 'transform 0.4s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className={`group relative bg-[#19131D] border p-4 sm:p-6 lg:p-7 flex flex-col justify-between cursor-pointer overflow-hidden min-w-0 ${isTechnical
        ? 'border-[#2E1F3B] hover:border-[#C084FC] hover:shadow-[0_0_32px_rgba(139,53,173,0.35)]'
        : 'border-[#2E1F3B] hover:border-[#C084FC] hover:shadow-[0_0_32px_rgba(168,85,247,0.4)]'
        }`}
    >
      {/* ========================================================================= */}
      {/* 1. LAYERED BACKGROUND & STATIONARY CURSOR SPOTLIGHT                       */}
      {/* ========================================================================= */}
      {/* Subtle fine technical grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-500 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${accentColor} 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Stationary cursor-following spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: isFinePointer
            ? `radial-gradient(340px circle at ${mousePos.x}px ${mousePos.y}px, ${accentColor}25, transparent 70%)`
            : `radial-gradient(circle at 50% 50%, ${accentColor}18, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Ambient corner glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none z-0"
        style={{ backgroundColor: secondaryColor }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 2. STATIONARY DIAGONAL GLASS SHINE SWEEP                                  */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-20 select-none"
        aria-hidden="true"
      >
        <div className="w-[180%] h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000 ease-out group-hover:translate-x-full" />
      </div>

      {/* ========================================================================= */}
      {/* 3. STATIONARY BORDER ILLUMINATION & CORNER ACCENTS                        */}
      {/* ========================================================================= */}
      {/* Top running scanline border highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
        style={{
          background: `linear-gradient(to right, transparent, ${accentColor}, ${secondaryColor}, transparent)`,
        }}
      />

      {/* Top-Right Architectural Corner Notch */}
      <div
        className="absolute top-0 right-0 w-8 sm:w-11 h-8 sm:h-11 clip-diagonal-left transition-colors duration-300 pointer-events-none z-10"
        style={{
          backgroundColor: isHovered ? accentColor : `${accentColor}1A`,
        }}
      >
        <span
          className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full transition-colors"
          style={{
            backgroundColor: isHovered ? '#FCFAED' : `${accentColor}88`,
          }}
        />
      </div>

      {/* Top-Left Cybernetic Corner Crosshair */}
      <div
        className="absolute top-2 left-2 text-[9px] font-mono-tech select-none pointer-events-none opacity-30 group-hover:opacity-90 transition-opacity z-10"
        style={{ color: secondaryColor }}
        aria-hidden="true"
      >
        +
      </div>

      {/* Bottom-Left L-shaped Bracket */}
      <div
        className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ borderColor: accentColor }}
      />

      {/* Bottom-Right Watermark Coordinate */}
      <span
        className="absolute bottom-1 right-2 font-mono-tech text-[8px] text-[#2E2E2E] group-hover:text-[#444444] tracking-widest select-none pointer-events-none transition-colors z-0"
        aria-hidden="true"
      >
        SYS_{event.code}
      </span>

      {/* ========================================================================= */}
      {/* 4. CONTENT BODY & TYPOGRAPHY                                              */}
      {/* ========================================================================= */}
      <div className="min-w-0 relative z-10">
        {/* Telemetry Row: Event Number + Category Label */}
        <div className="flex items-center justify-between font-mono-tech text-[9px] sm:text-xs mb-3">
          <div
            className="flex items-center gap-1.5 bg-[#0D0D0D] px-2.5 py-1 border transition-colors shadow-xs"
            style={{
              borderColor: isHovered ? accentColor : `${accentColor}66`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            <span
              className="font-black tracking-widest uppercase transition-colors"
              style={{ color: isHovered ? '#FFFFFF' : accentColor }}
            >
              EVT_{event.code}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[#666666] group-hover:text-[#999999] uppercase font-semibold tracking-wider text-[10px] transition-colors">
            <span
              className="w-1 h-1 rounded-full opacity-60"
              style={{ backgroundColor: secondaryColor }}
            />
            <span>{isTechnical ? '// TECH_CORE' : '// STRATEGY_ARENA'}</span>
          </div>
        </div>

        {/* Event Title (Stationary with refined text glow on hover) */}
        <h4 className="font-display font-black text-base sm:text-xl lg:text-2xl text-[#FCFAED] group-hover:text-white leading-snug uppercase mb-1.5 transition-colors duration-300 break-words drop-shadow-sm">
          {event.title}
        </h4>

        {/* Subtitle / Tagline */}
        <div
          className="font-mono-tech text-[10px] sm:text-xs tracking-wider uppercase font-bold mb-2.5 sm:mb-3 leading-snug break-words transition-colors"
          style={{ color: secondaryColor }}
        >
          {event.tagline || event.subtitle}
        </div>

        {/* Short Description */}
        <p className="font-body text-xs sm:text-[13px] lg:text-sm text-[#B8AFC0] group-hover:text-[#FCFAED] leading-relaxed mb-4 transition-colors line-clamp-3 sm:line-clamp-none break-words">
          {event.shortDescription}
        </p>

        {/* ========================================================================= */}
        {/* 5. INTERACTIVE REGISTRATION FEE CONTAINER (STATIONARY)                    */}
        {/* ========================================================================= */}
        <div
          className="group/fee mb-3 p-2.5 bg-[#151019] border border-[#2E1F3B] group-hover/fee:border-[#A855F7]/70 group-hover:border-[#3D264E] transition-colors duration-200 font-mono-tech text-[10px] sm:text-xs"
        >
          <div className="flex items-center justify-between gap-2 text-[#B8AFC0]">
            <span className="text-[#B8AFC0] group-hover/fee:text-[#FCFAED] uppercase text-[9px] sm:text-[10px] font-semibold tracking-wider transition-colors">
              ENTRY FEE:
            </span>
            <span className="font-bold text-[#FCFAED] group-hover/fee:text-white uppercase transition-colors">
              {event.entryFee}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM META & ACTION (STATIONARY WITH PURPLE GLOW HOVER)               */}
      {/* ========================================================================= */}
      <div className="pt-3 border-t border-[#2E1F3B] group-hover:border-[#3D264E] flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-2.5 text-[9px] sm:text-xs font-mono-tech relative z-10 transition-colors">
        {/* Prize / Winner Reward Display */}
        {event.prizes?.first ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#FCFAED] min-w-0">
            <div className="flex items-center gap-1.5">
              <Trophy
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: accentColor }}
              />
              <span className="text-[#B8AFC0] text-[9px] sm:text-[10px]">1ST:</span>
              <span className="font-bold text-[#FCFAED] group-hover:text-white transition-colors">
                {event.prizes.first}
              </span>
            </div>
            {event.prizes?.second && (
              <div className="flex items-center gap-1.5">
                <span className="text-[#B8AFC0] text-[9px] sm:text-[10px]">2ND:</span>
                <span className="font-bold text-[#FCFAED] group-hover:text-white transition-colors">
                  {event.prizes.second}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[#FCFAED] min-w-0">
            <Trophy className="w-3.5 h-3.5 text-[#A855F7] shrink-0" />
            <span className="font-bold text-[#FCFAED] group-hover:text-white truncate transition-colors">
              {event.winnerRewards || 'Mementos for Winners'}
            </span>
          </div>
        )}

        {/* Stationary View Button with Luminous Purple Glow Hover */}
        <div
          className="relative inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#151019] border text-[#FCFAED] transition-all duration-300 font-bold shrink-0 shadow-sm group-hover:shadow-[0_0_18px_rgba(168,85,247,0.5)] self-start min-[380px]:self-auto"
          style={{
            borderColor: isHovered ? '#C084FC' : `${secondaryColor}99`,
            color: isHovered ? '#FFFFFF' : secondaryColor,
            backgroundColor: isHovered ? accentColor : '#151019',
          }}
        >
          <span className="text-[10px] sm:text-[11px] tracking-wide">VIEW</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-current shrink-0" />
        </div>
      </div>
    </motion.div>
  );
};

export const EventsSection: React.FC<EventsSectionProps> = ({ onSelectEvent }) => {
  const [hoveredEvent, setHoveredEvent] = useState<EventItem | null>(null);
  const [isFinePointer] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false
  );

  // Inertia spring position for floating preview image (desktop only)
  const previewX = useSpring(0, { stiffness: 240, damping: 22 });
  const previewY = useSpring(0, { stiffness: 240, damping: 22 });

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      previewX.set(e.clientX + 24);
      previewY.set(e.clientY - 90);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFinePointer, previewX, previewY]);

  // Exact separation: 4 Technical, 4 Non-Technical
  const technicalEvents = eventsData.filter((e) => e.category === 'TECHNICAL');
  const nonTechnicalEvents = eventsData.filter((e) => e.category === 'NON-TECHNICAL');

  return (
    <section
      id="events"
      className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-12 bg-[#0D0D0D] border-b border-[#262626] overflow-hidden"
    >
      {/* Background Ghost Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden pointer-events-none z-0 select-none"
      >
        <span className="font-display font-black text-[clamp(6rem,20vw,16rem)] uppercase tracking-tighter text-white/[0.015] leading-none whitespace-nowrap">
          COMPETE
        </span>
      </div>

      {/* Floating Hover Image Preview with Inertia (Strictly Desktop with fine pointer) */}
      {isFinePointer && hoveredEvent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.18 }}
          style={{
            x: previewX,
            y: previewY,
          }}
          className="fixed pointer-events-none z-40 w-64 sm:w-72 h-44 bg-[#141414] border-2 border-[#823A9D] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(108,48,130,0.35)] hidden lg:block"
        >
          <img
            src={hoveredEvent.image}
            alt={hoveredEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-[#0D0D0D]/95 px-3 py-1.5 font-mono-tech text-[10px] text-[#FCFAED] border-t border-[#823A9D] flex justify-between items-center">
            {hoveredEvent.prizes?.first ? (
              <>
                <span className="text-[#6C3082] font-bold">TOP PRIZE:</span>
                <span>{hoveredEvent.prizes.first.split('+')[0]}</span>
              </>
            ) : (
              <>
                <span className="text-[#823A9D] font-bold">REWARDS:</span>
                <span>Mementos for Winners</span>
              </>
            )}
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ============================================================== */}
        {/* MAIN SECTION HEADER                                            */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16 border-b border-[#262626] pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-3 font-mono-tech text-xs text-[#6C3082] uppercase tracking-widest mb-2 sm:mb-3">
              <span className="font-bold">02</span>
              <span>───────────────</span>
              <span className="text-[#823A9D] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                COMPETITIVE DISCIPLINES
              </span>
            </div>
            <h2 className="font-display font-black tracking-tight text-[#FCFAED] uppercase text-[clamp(2.1rem,6.5vw,4.8rem)] leading-none">
              THE EVENTS ARENA
            </h2>
          </div>

          <div className="font-mono-tech text-xs text-[#888888] max-w-sm">
            <span className="text-[#823A9D] font-bold block mb-1">
              [8 CORE COMPETITIONS // 2x2 GRIDS]
            </span>
            <p className="leading-relaxed">
              Select any event card to view full regulations, timeline, and prize allocations.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 1. TECHNICAL EVENTS BLOCK (2 EVENTS PER ROW ON DESKTOP & MOBILE) */}
        {/* ============================================================== */}
        <div className="mb-14 sm:mb-20">
          {/* Category Header with Animated Purple Line */}
          <div className="flex items-center justify-between mb-5 sm:mb-8 border-b-2 border-[#6C3082] pb-3.5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#6C3082] clip-diagonal-right shadow-[0_0_8px_#6C3082]" />
              <h3 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-[#FCFAED] tracking-tight uppercase">
                TECHNICAL <span className="text-[#6C3082] drop-shadow-[0_0_15px_rgba(108,48,130,0.35)]">EVENTS</span>
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono-tech text-[10px] sm:text-xs text-[#888888] uppercase tracking-widest bg-[#141414] px-2.5 py-1 border border-[#262626]">
              <span className="w-1.5 h-1.5 bg-[#6C3082] rounded-full animate-ping" />
              <span>// 04 DISCIPLINES</span>
            </div>
          </div>

          {/* RESPONSIVE GRID (1-COL ON MOBILE, 2-COL ON TABLET & DESKTOP) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {technicalEvents.map((event, idx) => (
              <EventCard
                key={event.id}
                event={event}
                idx={idx}
                isTechnical={true}
                onSelect={() => onSelectEvent(event)}
                onHover={() => setHoveredEvent(event)}
                onLeave={() => setHoveredEvent(null)}
                isFinePointer={isFinePointer}
              />
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* IN-SECTION TRANSITION: TECHNICAL ➔ NON-TECHNICAL DIVIDER        */}
        {/* ============================================================== */}
        <div className="relative my-10 sm:my-16 py-4 flex flex-col items-center justify-center select-none pointer-events-none">
          {/* Sweeping center accent lines with purple gradient glow */}
          <div className="w-full flex items-center justify-center gap-3">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#823A9D]/50 to-[#823A9D]" />
            <div className="px-3.5 py-1.5 bg-[#141414] border border-[#823A9D] flex items-center gap-2 font-mono-tech text-[9px] sm:text-xs text-[#FCFAED] shadow-[0_0_15px_rgba(108,48,130,0.25)]">
              <Zap className="w-3.5 h-3.5 text-[#823A9D] animate-pulse" />
              <span className="tracking-[0.2em] uppercase font-bold text-[#823A9D]">
                DISCIPLINE_SHIFT
              </span>
              <span className="hidden sm:inline text-[#888888]">
                // EXPANDING TO STRATEGY &amp; CREATIVITY
              </span>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#823A9D]/50 to-[#823A9D]" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. NON-TECHNICAL EVENTS BLOCK (2 PER ROW ON DESKTOP & MOBILE)  */}
        {/* ============================================================== */}
        <div>
          {/* Category Header with Animated Purple Accent */}
          <div className="flex items-center justify-between mb-5 sm:mb-8 border-b-2 border-[#823A9D] pb-3.5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#823A9D] clip-diagonal-right shadow-[0_0_8px_#823A9D]" />
              <h3 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-[#FCFAED] tracking-tight uppercase">
                NON-TECHNICAL <span className="text-[#823A9D] drop-shadow-[0_0_15px_rgba(130,58,157,0.35)]">EVENTS</span>
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono-tech text-[10px] sm:text-xs text-[#888888] uppercase tracking-widest bg-[#141414] px-2.5 py-1 border border-[#262626]">
              <span className="w-1.5 h-1.5 bg-[#823A9D] rounded-full animate-ping" />
              <span>// 04 DISCIPLINES</span>
            </div>
          </div>

          {/* RESPONSIVE GRID (1-COL ON MOBILE, 2-COL ON TABLET & DESKTOP) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {nonTechnicalEvents.map((event, idx) => (
              <EventCard
                key={event.id}
                event={event}
                idx={idx}
                isTechnical={false}
                onSelect={() => onSelectEvent(event)}
                onHover={() => setHoveredEvent(event)}
                onLeave={() => setHoveredEvent(null)}
                isFinePointer={isFinePointer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
