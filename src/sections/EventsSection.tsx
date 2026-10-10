import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import type { EventItem } from '../types';
import eventsData from '../data/events';
import { ArrowUpRight, Zap, Trophy } from 'lucide-react';

interface EventsSectionProps {
  onSelectEvent: (event: EventItem) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onSelectEvent }) => {
  const [hoveredEvent, setHoveredEvent] = useState<EventItem | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Inertia spring position for floating preview image (desktop only)
  const previewX = useSpring(0, { stiffness: 240, damping: 22 });
  const previewY = useSpring(0, { stiffness: 240, damping: 22 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setIsFinePointer(fine);

    if (!fine) return;

    const handleMouseMove = (e: MouseEvent) => {
      previewX.set(e.clientX + 24);
      previewY.set(e.clientY - 90);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [previewX, previewY]);

  // Exact separation: 4 Technical, 4 Non-Technical
  const technicalEvents = eventsData.filter((e) => e.category === 'TECHNICAL');
  const nonTechnicalEvents = eventsData.filter((e) => e.category === 'NON-TECHNICAL');

  return (
    <section
      id="events"
      className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-12 bg-[#0D0D0D] border-b border-[#262626] overflow-hidden"
    >
      {/* Floating Hover Image Preview with Inertia (Strictly Desktop with fine pointer) */}
      {isFinePointer && hoveredEvent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.15 }}
          style={{
            x: previewX,
            y: previewY,
          }}
          className="fixed pointer-events-none z-40 w-64 sm:w-72 h-44 bg-[#141414] border-2 border-[#FF0022] overflow-hidden shadow-2xl hidden lg:block"
        >
          <img
            src={hoveredEvent.image}
            alt={hoveredEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-[#0D0D0D]/95 px-3 py-1.5 font-mono-tech text-[10px] text-[#FCFAED] border-t border-[#FF0022] flex justify-between items-center">
            <span className="text-[#FF0022] font-bold">TOP PRIZE:</span>
            <span>{hoveredEvent.prizes.first.split('+')[0]}</span>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-16 border-b border-[#262626] pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-3 font-mono-tech text-xs text-[#FF0022] uppercase tracking-widest mb-2 sm:mb-3">
              <span className="font-bold">02</span>
              <span>───────────────</span>
              <span>COMPETITIVE DISCIPLINES</span>
            </div>
            <h2 className="font-display font-black tracking-tight text-[#FCFAED] uppercase text-[clamp(2.1rem,6.5vw,4.8rem)] leading-none">
              THE EVENTS ARENA
            </h2>
          </div>

          <div className="font-mono-tech text-xs text-[#888888] max-w-sm">
            <span className="text-[#FF0022] font-bold block mb-1">
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
          {/* Category Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-8 border-b-2 border-[#FF0022] pb-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#FF0022] clip-diagonal-right" />
              <h3 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-[#FCFAED] tracking-tight uppercase">
                TECHNICAL <span className="text-[#FF0022]">EVENTS</span>
              </h3>
            </div>
            <span className="font-mono-tech text-[10px] sm:text-xs text-[#888888] uppercase tracking-widest">
              // 04 DISCIPLINES
            </span>
          </div>

          {/* 2-COLUMN GRID (MOBILE & DESKTOP: ALWAYS 2 PER ROW) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:gap-8">
            {technicalEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => onSelectEvent(event)}
                className="group relative bg-[#141414] border border-[#262626] hover:border-[#FF0022] p-3 sm:p-5 lg:p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 shadow-md hover:shadow-[0_0_25px_rgba(255,0,34,0.15)] overflow-hidden"
              >
                {/* Diagonal subtle corner accent */}
                <div className="absolute top-0 right-0 w-6 sm:w-10 h-6 sm:h-10 bg-[#FF0022]/10 clip-diagonal-left group-hover:bg-[#FF0022] transition-colors" />

                <div>
                  {/* Top telemetry row */}
                  <div className="flex items-center justify-between font-mono-tech text-[9px] sm:text-xs mb-2 sm:mb-3">
                    <span className="text-[#FF0022] font-black tracking-widest bg-[#0D0D0D] px-1.5 sm:px-2 py-0.5 border border-[#FF0022]/30">
                      {event.code}
                    </span>
                    <span className="hidden sm:inline-block text-[#565656] uppercase">
                      TECH
                    </span>
                  </div>

                  {/* Event Title: Guaranteed visible, never clipped, natural word wrap */}
                  <h4 className="font-display font-black text-sm sm:text-xl lg:text-2xl text-[#FCFAED] group-hover:text-white leading-tight uppercase mb-1.5 sm:mb-2 transition-colors">
                    {event.title}
                  </h4>

                  {/* Subtitle / Tagline */}
                  <div className="font-mono-tech text-[9px] sm:text-xs text-[#FF0022] tracking-wider uppercase font-semibold mb-2 sm:mb-3 leading-snug">
                    {event.tagline || event.subtitle}
                  </div>

                  {/* Short Description */}
                  <p className="font-body text-[11px] sm:text-xs lg:text-sm text-[#888888] group-hover:text-[#FCFAED]/80 leading-relaxed mb-3 sm:mb-4 transition-colors line-clamp-3 sm:line-clamp-none">
                    {event.shortDescription}
                  </p>
                </div>

                {/* Bottom Meta & Action */}
                <div className="pt-2.5 sm:pt-3 border-t border-[#222222] flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-mono-tech">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[#FCFAED]/70">
                    <Trophy className="w-3 h-3 text-[#FF0022] shrink-0" />
                    <span className="font-bold text-[#FCFAED]">
                      {event.prizes.first.split('+')[0].trim()}
                    </span>
                  </div>

                  <div className="relative inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0D0D0D] border border-[#FF0022]/40 group-hover:border-[#FF0022] text-[#FF0022] group-hover:text-white group-hover:bg-[#FF0022] transition-all duration-200 font-bold">
                    <span className="hidden xs:inline">VIEW</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* IN-SECTION TRANSITION: TECHNICAL ➔ NON-TECHNICAL DIVIDER        */}
        {/* ============================================================== */}
        <div className="relative my-10 sm:my-16 py-4 flex flex-col items-center justify-center select-none pointer-events-none">
          {/* Sweeping center accent lines */}
          <div className="w-full flex items-center justify-center gap-3">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FF0022]/40 to-[#FF0022]" />
            <div className="px-3 py-1 bg-[#141414] border border-[#FF0022] flex items-center gap-2 font-mono-tech text-[9px] sm:text-xs text-[#FCFAED]">
              <Zap className="w-3 h-3 text-[#FF0022] animate-pulse" />
              <span className="tracking-[0.2em] uppercase font-bold text-[#FF0022]">
                DISCIPLINE_SHIFT
              </span>
              <span className="hidden sm:inline text-[#888888]">
                // EXPANDING TO STRATEGY & CREATIVITY
              </span>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#FF0022]/40 to-[#FF0022]" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. NON-TECHNICAL EVENTS BLOCK (2 PER ROW ON DESKTOP & MOBILE)  */}
        {/* ============================================================== */}
        <div>
          {/* Category Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-8 border-b-2 border-[#FCFAED]/40 pb-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#FCFAED] clip-diagonal-right" />
              <h3 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-[#FCFAED] tracking-tight uppercase">
                NON-TECHNICAL <span className="text-[#FF3D00]">EVENTS</span>
              </h3>
            </div>
            <span className="font-mono-tech text-[10px] sm:text-xs text-[#888888] uppercase tracking-widest">
              // 04 DISCIPLINES
            </span>
          </div>

          {/* 2-COLUMN GRID (MOBILE & DESKTOP: ALWAYS 2 PER ROW) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:gap-8">
            {nonTechnicalEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => onSelectEvent(event)}
                className="group relative bg-[#141414] border border-[#262626] hover:border-[#FF3D00] p-3 sm:p-5 lg:p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 shadow-md hover:shadow-[0_0_25px_rgba(255,61,0,0.15)] overflow-hidden"
              >
                {/* Diagonal subtle corner accent */}
                <div className="absolute top-0 right-0 w-6 sm:w-10 h-6 sm:h-10 bg-[#FF3D00]/10 clip-diagonal-left group-hover:bg-[#FF3D00] transition-colors" />

                <div>
                  {/* Top telemetry row */}
                  <div className="flex items-center justify-between font-mono-tech text-[9px] sm:text-xs mb-2 sm:mb-3">
                    <span className="text-[#FF3D00] font-black tracking-widest bg-[#0D0D0D] px-1.5 sm:px-2 py-0.5 border border-[#FF3D00]/30">
                      {event.code}
                    </span>
                    <span className="hidden sm:inline-block text-[#565656] uppercase">
                      NON-TECH
                    </span>
                  </div>

                  {/* Event Title: Guaranteed visible, never clipped, natural word wrap */}
                  <h4 className="font-display font-black text-sm sm:text-xl lg:text-2xl text-[#FCFAED] group-hover:text-white leading-tight uppercase mb-1.5 sm:mb-2 transition-colors">
                    {event.title}
                  </h4>

                  {/* Subtitle / Tagline */}
                  <div className="font-mono-tech text-[9px] sm:text-xs text-[#FF3D00] tracking-wider uppercase font-semibold mb-2 sm:mb-3 leading-snug">
                    {event.tagline || event.subtitle}
                  </div>

                  {/* Short Description */}
                  <p className="font-body text-[11px] sm:text-xs lg:text-sm text-[#888888] group-hover:text-[#FCFAED]/80 leading-relaxed mb-3 sm:mb-4 transition-colors line-clamp-3 sm:line-clamp-none">
                    {event.shortDescription}
                  </p>
                </div>

                {/* Bottom Meta & Action */}
                <div className="pt-2.5 sm:pt-3 border-t border-[#222222] flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-mono-tech">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                    <div className="flex items-center gap-1 bg-[#0D0D0D] px-1.5 sm:px-2 py-0.5 border border-[#FF3D00]/40">
                      <Trophy className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#FF3D00] shrink-0" />
                      <span className="text-[#FF3D00] font-bold">1ST:</span>
                      <span className="font-bold text-[#FCFAED]">{event.prizes.first}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#0D0D0D] px-1.5 sm:px-2 py-0.5 border border-[#262626]">
                      <span className="text-[#888888] font-bold">2ND:</span>
                      <span className="font-bold text-[#FCFAED]">{event.prizes.second}</span>
                    </div>
                  </div>

                  <div className="relative shrink-0 inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 bg-[#0D0D0D] border border-[#FF3D00]/40 group-hover:border-[#FF3D00] text-[#FF3D00] group-hover:text-white group-hover:bg-[#FF3D00] transition-all duration-200 font-bold">
                    <span className="hidden xs:inline">VIEW</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
