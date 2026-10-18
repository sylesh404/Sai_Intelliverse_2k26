import React from 'react';
import { motion } from 'framer-motion';
import speakersData from '../data/speakers';

export const SpeakersSection: React.FC = () => {
  return (
    <section
      id="speakers"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0D0D0D] border-b border-[#262626] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-16 border-b border-[#262626] pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-3 font-mono-tech text-xs text-[#6C3082] uppercase tracking-widest mb-2 sm:mb-3">
              <span className="font-bold">05</span>
              <span>───────────────</span>
              <span>DISTINGUISHED LUMINARIES</span>
            </div>
            <h2 className="font-display font-black tracking-tight text-[#FCFAED] uppercase text-[clamp(2rem,6vw,4.5rem)] leading-none">
              KEYNOTES & GUESTS
            </h2>
          </div>

          <div className="font-mono-tech text-xs text-[#888888]">
            <span>PIONEERS IN COGNITIVE SYSTEMS & BRUTALIST ARCHITECTURES</span>
          </div>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {speakersData.map((speaker, idx) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="group bg-[#141414] border border-[#262626] hover:border-[#6C3082] transition-colors overflow-hidden flex flex-col justify-between"
            >
              {/* Image Frame with controlled aspect ratio */}
              <div className="relative aspect-[4/3] sm:aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-300"
                />

                {/* Badge */}
                <div className="absolute top-2 left-2 bg-[#0D0D0D] border border-[#262626] px-2.5 py-0.5 font-mono-tech text-[9px] text-[#6C3082] font-bold uppercase tracking-wider">
                  {speaker.badge}
                </div>
              </div>

              {/* Information Text Block in normal document flow below image */}
              <div className="p-4 sm:p-5 space-y-2 border-t border-[#262626] bg-[#0D0D0D]">
                <h3 className="text-lg sm:text-xl font-display font-black text-white group-hover:text-[#6C3082] transition-colors uppercase leading-tight">
                  {speaker.name}
                </h3>
                <div className="font-mono-tech text-xs text-[#6C3082] font-bold">
                  {speaker.role}
                </div>
                <div className="font-mono-tech text-xs text-[#888888]">
                  {speaker.organization}
                </div>
                <div className="font-mono-tech text-[11px] text-[#FCFAED]/90 bg-[#141414] p-2 border border-[#262626]">
                  <span className="text-[#6C3082] font-bold block text-[10px]">TOPIC</span>
                  {speaker.topic}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
