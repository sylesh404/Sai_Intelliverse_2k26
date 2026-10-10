import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, Sparkles, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0D0D0D] border-b border-[#262626] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 font-mono-tech text-xs text-[#FF0022] uppercase tracking-widest mb-8 sm:mb-10"
        >
          <span className="font-bold">01</span>
          <span>───────────────</span>
          <span>ABOUT THE EXPERIENCE</span>
        </motion.div>

        {/* Editorial Layout: Large Statement vs Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 space-y-4"
          >
            <h2 className="font-display font-black tracking-tight text-[#FCFAED] uppercase leading-[0.95] text-[clamp(2.1rem,6.5vw,4.8rem)]">
              ONE DEPARTMENT.<br />
              <span className="text-[#FF0022]">ONE STAGE.</span><br />
              COUNTLESS IDEAS.
            </h2>

            <div className="w-20 h-1 bg-[#FF0022]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-6 space-y-5 font-body text-sm sm:text-base text-[#FCFAED]/85 leading-relaxed"
          >
            <p>
              SAI INTELLIVERSE 3.0 is the annual technical symposium organized by the Department of Artificial Intelligence and Machine Learning at Sri Sairam College of Engineering. It brings together curious minds, creative thinkers, and aspiring innovators to explore emerging technologies, exchange ideas, and showcase their skills through engaging technical and non-technical events. More than a symposium, it is a platform for collaboration, experimentation, and innovation.
            </p>

            <blockquote className="font-mono-tech text-xs sm:text-sm text-[#FCFAED]/90 border-l-2 border-[#FF0022] pl-4 py-2.5 italic bg-[#141414]/60">
              "An idea is only the beginning. Innovation happens when curiosity, creativity, and collaboration come together."
            </blockquote>

            {/* Feature highlights: 1 col on mobile, 2 col on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono-tech text-xs">
              {[
                { icon: Terminal, label: "01 — TECHNICAL EVENTS" },
                { icon: Zap, label: "02 — NON-TECHNICAL EVENTS" },
                { icon: Sparkles, label: "03 — CREATIVE THINKING" },
                { icon: Users, label: "04 — INNOVATION & COLLABORATION" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-center gap-2.5 text-[#FCFAED] bg-[#141414] p-3 border border-[#262626] hover:border-[#FF0022]/60 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#FF0022] shrink-0" />
                    <span className="font-semibold tracking-wide">{item.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
