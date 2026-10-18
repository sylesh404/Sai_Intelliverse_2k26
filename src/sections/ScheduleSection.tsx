import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import scheduleData from '../data/schedule';
import symposiumConfig from '../config/symposiumConfig';
import { Clock, MapPin } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section
      id="schedule"
      ref={containerRef}
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0D0D0D] border-b border-[#262626] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-16 border-b border-[#262626] pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-3 font-mono-tech text-xs text-[#6C3082] uppercase tracking-widest mb-2 sm:mb-3">
              <span className="font-bold">03</span>
              <span>───────────────</span>
              <span>SYNCHRONIZED TIMELINE</span>
            </div>
            <h2 className="font-display font-black tracking-tight text-[#FCFAED] uppercase text-[clamp(2rem,6vw,4.5rem)] leading-none">
              DAY ITINERARY
            </h2>
            <p className="font-mono-tech text-xs sm:text-sm text-[#6C3082] font-bold tracking-wider mt-2 uppercase">
              {symposiumConfig.eventDateFormatted} · {symposiumConfig.tagline}
            </p>
          </div>

          <div className="font-mono-tech text-xs text-[#888888] sm:text-right">
            <span className="text-white block font-bold">DATE: {symposiumConfig.eventDate}</span>
            <span className="text-[#6C3082] block font-bold">VENUE: {symposiumConfig.venue}</span>
            <span className="text-[11px] text-[#888888] block">{symposiumConfig.college}</span>
          </div>
        </div>

        {/* Timeline Container with guaranteed safe padding */}
        <div className="relative pl-8 sm:pl-10 md:pl-20">
          {/* Background Track Line */}
          <div className="absolute left-3 sm:left-4 md:left-8 top-2 bottom-2 w-[2px] bg-[#2E1F3B]" />

          {/* Scroll-Linked Progress Line with Vibrant Electric Purple Glow */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-3 sm:left-4 md:left-8 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#8B35AD] via-[#A855F7] to-[#C084FC] origin-top shadow-[0_0_12px_rgba(168,85,247,0.7)]"
          />

          {/* Schedule Timeline Items */}
          <div className="space-y-6 sm:space-y-10">
            {scheduleData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative group min-w-0"
              >
                {/* Node Marker centered on the line */}
                <div className="absolute -left-[27px] sm:-left-[31px] md:-left-[55px] top-4 w-4 h-4 rounded-full bg-[#151019] border-2 border-[#8B35AD] group-hover:border-[#C084FC] flex items-center justify-center transition-colors shrink-0 shadow-[0_0_8px_rgba(139,53,173,0.3)]">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.isHighlight ? 'bg-[#C084FC] animate-ping shadow-[0_0_6px_#C084FC]' : 'bg-[#A855F7] group-hover:bg-[#C084FC]'}`} />
                </div>

                {/* Editorial Content Card with natural height */}
                <div className={`bg-[#19131D] border border-[#2E1F3B] hover:border-[#C084FC] p-4 sm:p-6 transition-all duration-300 relative overflow-hidden min-w-0 hover:shadow-[0_0_24px_rgba(168,85,247,0.25)] ${
                  item.isHighlight ? 'border-[#8B35AD]/60 shadow-[0_0_20px_rgba(139,53,173,0.2)]' : ''
                }`}>
                  {item.isHighlight && (
                    <div className="inline-block mb-2 bg-gradient-to-r from-[#8B35AD] to-[#A855F7] text-white px-2.5 py-0.5 font-mono-tech text-[9px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                      KEY EVENT
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
                    {/* Time & Category */}
                    <div className="md:col-span-4 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 font-mono-tech text-xs text-[#C084FC] font-bold">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-[#A855F7]" />
                        <span>{item.time}</span>
                      </div>
                      <span className="inline-block font-mono-tech text-[10px] text-[#B8AFC0] bg-[#151019] px-2 py-0.5 border border-[#3D264E]">
                        {item.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="md:col-span-8 min-w-0 space-y-1.5">
                      <h3 className="text-base sm:text-xl lg:text-2xl font-display font-extrabold text-[#FCFAED] group-hover:text-white transition-colors leading-tight break-words">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-[#FCFAED]/85 leading-relaxed break-words">
                        {item.description}
                      </p>
                      {item.venue && (
                        <div className="flex items-center gap-1.5 pt-1 font-mono-tech text-xs text-[#B8AFC0]">
                          <MapPin className="w-3.5 h-3.5 text-[#A855F7] shrink-0" />
                          <span className="line-clamp-1">{item.venue}</span>
                        </div>
                      )}
                    </div>
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

export default ScheduleSection;
