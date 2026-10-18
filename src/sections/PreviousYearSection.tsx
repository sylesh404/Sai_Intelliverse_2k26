import React from 'react';
import { motion } from 'framer-motion';
import { previousYearArchive } from '../data/gallery';

export const PreviousYearSection: React.FC = () => {
  return (
    <section
      id="retrospective"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0D0D0D] border-b border-[#262626] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-16 border-b border-[#262626] pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-3 font-mono-tech text-xs text-[#6C3082] uppercase tracking-widest mb-2 sm:mb-3">
              <span className="font-bold">08</span>
              <span>───────────────</span>
              <span>CINEMATIC ARCHIVE</span>
            </div>
            <h2 className="font-display font-black tracking-tight text-[#FCFAED] uppercase text-[clamp(2rem,6vw,4.5rem)] leading-none">
              LAST EDITIONS
            </h2>
          </div>

          <div className="font-mono-tech text-xs text-[#888888]">
            <span className="text-[#6C3082] font-bold block">A GLIMPSE OF WHAT HAPPENED.</span>
            <span>A CONTINUOUS TRADITION OF TECHNICAL DISTINCTION</span>
          </div>
        </div>

        {/* Stack of Editions: 1 col on mobile, 3 col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {previousYearArchive.map((archive, idx) => (
            <motion.div
              key={archive.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-[#141414] border border-[#262626] hover:border-[#6C3082] transition-colors p-5 sm:p-6 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-baseline mb-3 border-b border-[#262626] pb-2.5">
                  <span className="text-4xl sm:text-5xl font-display font-black text-white group-hover:text-[#6C3082] transition-colors">
                    '{archive.year.slice(2)}
                  </span>
                  <span className="font-mono-tech text-xs text-[#888888] font-bold uppercase">
                    {archive.title}
                  </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-black border border-[#262626]">
                  <img
                    src={archive.image}
                    alt={archive.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="font-mono-tech text-xs text-[#6C3082] mb-1.5 font-bold">
                  {archive.stats}
                </div>

                <p className="font-body text-xs sm:text-sm text-[#FCFAED]/75 leading-relaxed">
                  {archive.highlight}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1F1F1F] flex justify-between items-center text-[10px] font-mono-tech text-[#565656]">
                <span>ARCHIVE LOG RECORDED</span>
                <span className="w-1.5 h-1.5 bg-[#6C3082]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviousYearSection;
