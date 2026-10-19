import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, Sparkles, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#080A0F] border-b border-[#263643] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 font-mono-tech text-xs text-[#35DDF5] uppercase tracking-widest mb-8 sm:mb-10 font-bold"
        >
          <span className="text-[#7DEBFF]">01</span>
          <span className="text-[#35DDF5]/40">───────────────</span>
          <span className="text-[#D9FAFF] tracking-wider">ABOUT THE EXPERIENCE</span>
        </motion.div>

        {/* Editorial Layout: Large Statement vs Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 min-w-0 space-y-4"
          >
            <h2 className="font-display font-black tracking-tight text-[#F4FDFF] uppercase leading-[0.96] text-[clamp(2rem,6.5vw,3.5rem)] lg:text-[clamp(2.2rem,3.5vw,3.8rem)] xl:text-[clamp(2.6rem,3.8vw,4.4rem)] break-words">
              ONE DEPARTMENT.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35DDF5] via-[#7DEBFF] to-[#D9FAFF]">ONE STAGE.</span><br />
              COUNTLESS IDEAS.
            </h2>

            <div className="w-20 h-1 bg-gradient-to-r from-[#35DDF5] via-[#7DEBFF] to-[#A5F3FF] rounded-full shadow-[0_0_12px_rgba(125,235,255,0.6)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-6 min-w-0 space-y-5 font-body text-sm sm:text-base text-[#F4FDFF]/90 leading-relaxed"
          >
            <p>
              SAI INTELLIVERSE 3.0 is the annual technical symposium organized by the Department of Artificial Intelligence and Machine Learning at Sri Sairam College of Engineering. It brings together curious minds, creative thinkers, and aspiring innovators to explore emerging technologies, exchange ideas, and showcase their skills through engaging technical and non-technical events. More than a symposium, it is a platform for collaboration, experimentation, and innovation.
            </p>

            <blockquote className="font-mono-tech text-xs sm:text-sm text-[#F4FDFF]/95 border-l-2 border-[#35DDF5] pl-4 py-2.5 italic bg-[#10151D]/90 shadow-inner">
              &ldquo;An idea is only the beginning. Innovation happens when curiosity, creativity, and collaboration come together.&rdquo;
            </blockquote>
          </motion.div>
        </div>

        {/* ==================================================== */}
        {/* SYMPOSIUM PILLARS (FOUR CORE ARENAS)                 */}
        {/* ==================================================== */}
        <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-[#263643]">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 font-mono-tech text-xs text-[#35DDF5] uppercase tracking-widest mb-6 sm:mb-8"
          >
            <span className="font-bold text-[#7DEBFF]">01.1</span>
            <span className="text-[#35DDF5]/50">//</span>
            <span className="font-bold text-[#F4FDFF]">SYMPOSIUM PILLARS</span>
            <span className="hidden sm:inline text-[#263643]">───────────────</span>
            <span className="hidden sm:inline text-[10px] text-[#A9BAC8]">FOUR CORE ARENAS</span>
          </motion.div>

          {/* Feature highlights: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono-tech text-xs">
            {[
              { icon: Terminal, label: "01 — TECHNICAL EVENTS", desc: "Code, debug & architect frontier systems" },
              { icon: Zap, label: "02 — NON-TECHNICAL EVENTS", desc: "Strategy, gaming & quick-witted battles" },
              { icon: Sparkles, label: "03 — CREATIVE THINKING", desc: "Paper presentations & multimodal prompts" },
              { icon: Users, label: "04 — COLLABORATION", desc: "Peer conclaves & collective engineering" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex flex-col justify-between text-[#F4FDFF] bg-[#10151D] p-4 border border-[#263643] hover:border-[#4DE6FF] hover:shadow-[0_0_20px_rgba(53,221,245,0.2)] transition-all group relative overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 right-0 w-6 h-6 bg-[#35DDF5]/15 clip-diagonal-left group-hover:bg-[#35DDF5] transition-colors" />

                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon className="w-4 h-4 text-[#35DDF5] group-hover:text-[#7DEBFF] transition-colors shrink-0" />
                    <span className="font-bold tracking-wide text-white group-hover:text-[#A5F3FF] transition-colors">{item.label}</span>
                  </div>

                  <p className="text-[11px] text-[#A9BAC8] font-body mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
