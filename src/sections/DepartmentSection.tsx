import React from 'react';
import { motion } from 'framer-motion';
import symposiumConfig from '../config/symposiumConfig';
import { Cpu, Network, ShieldCheck, Binary, Sparkles, Terminal } from 'lucide-react';

export const DepartmentSection: React.FC = () => {
  const pillars = [
    {
      code: "LAB-01",
      icon: Cpu,
      title: "AUTONOMOUS SYSTEMS",
      desc: "Edge-AI inference engines, robotic perception pipelines, and embedded decision intelligence systems.",
    },
    {
      code: "LAB-02",
      icon: Network,
      title: "COGNITIVE COMPUTING",
      desc: "High-parameter foundation models, neural reasoning architectures, and localized LLM inference engines.",
    },
    {
      code: "LAB-03",
      icon: Binary,
      title: "DATA ARCHITECTURE",
      desc: "Distributed petabyte-scale stream processing, vector databases, and real-time analytical fabric.",
    },
    {
      code: "LAB-04",
      icon: ShieldCheck,
      title: "AI GOVERNANCE & ETHICS",
      desc: "Transparent algorithmic auditing, adversarial robustness verification, and safety-aligned intelligence.",
    },
  ];

  return (
    <section id="department" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-b border-[#262626] bg-[#0D0D0D] overflow-hidden">
      {/* Subtle background coordinate grid watermark */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C3082]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-col space-y-3 mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-gradient-to-r from-[#8B35AD] to-[#A855F7] shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            <span className="font-mono-tech text-xs tracking-widest text-[#A855F7] uppercase font-bold">
              DEPARTMENT / IDENTITY // EST. 2020
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-2">
              <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#FCFAED] tracking-tight leading-tight uppercase">
                DEPARTMENT OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#E9D5FF]">ARTIFICIAL INTELLIGENCE</span> & MACHINE LEARNING
              </h2>
              <p className="font-mono-tech text-xs sm:text-sm text-[#B8AFC0] tracking-wider uppercase">
                {symposiumConfig.college}
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <div className="inline-block bg-[#19131D] border border-[#2E1F3B] p-3 text-left shadow-md">
                <div className="flex items-center gap-2 font-mono-tech text-[10px] text-[#A855F7] mb-1 font-bold">
                  <Terminal className="w-3 h-3 text-[#C084FC]" />
                  <span>DEPT_MISSION</span>
                </div>
                <p className="font-mono-tech text-xs text-[#FCFAED]/90 leading-relaxed">
                  Engineering frontier intelligence through mathematical rigor, ethical research, and architectural precision.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Laboratory Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="bg-[#19131D] border border-[#2E1F3B] hover:border-[#A855F7] hover:shadow-[0_0_22px_rgba(168,85,247,0.18)] transition-all p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Diagonal subtle corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#A855F7]/15 clip-diagonal-left group-hover:bg-[#A855F7] transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-[10px] text-[#B8AFC0] group-hover:text-[#C084FC] transition-colors font-semibold">
                      {pillar.code}
                    </span>
                    <Icon className="w-5 h-5 text-[#A855F7] group-hover:text-[#C084FC] transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-sm sm:text-base text-[#FCFAED] group-hover:text-white mb-2 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="font-body text-xs text-[#B8AFC0] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#2E1F3B] flex items-center justify-between text-[10px] font-mono-tech text-[#B8AFC0]">
                  <span>NODE_ACTIVE</span>
                  <span className="text-[#A855F7] font-bold">● 100% READY</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Department Accreditations Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-8 sm:mt-10 p-4 sm:p-5 bg-[#19131D] border border-[#2E1F3B] flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs text-[#B8AFC0] shadow-md"
        >
          <div className="flex items-center gap-2 text-[#FCFAED]">
            <Sparkles className="w-4 h-4 text-[#A855F7]" />
            <span className="font-bold">NBA & NAAC A+ ACCREDITED INSTITUTION</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <span className="hover:text-white transition-colors">AUTONOMOUS CURRICULUM</span>
            <span className="text-[#3E294F]">|</span>
            <span className="hover:text-white transition-colors">IEEE CIS CHAPTER</span>
            <span className="text-[#3E294F]">|</span>
            <span className="hover:text-white transition-colors">INDUSTRY COE PARTNERSHIPS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DepartmentSection;
