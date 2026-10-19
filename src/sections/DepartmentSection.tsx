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
    <section id="department" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-b border-[#263643] bg-[#080A0F] overflow-hidden">
      {/* Subtle background coordinate grid watermark */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#35DDF5]/[0.03] rounded-full blur-3xl pointer-events-none" />

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
            <span className="w-2.5 h-2.5 bg-gradient-to-r from-[#35DDF5] to-[#7DEBFF] shadow-[0_0_8px_rgba(53,221,245,0.6)]" />
            <span className="font-mono-tech text-xs tracking-widest text-[#35DDF5] uppercase font-bold">
              DEPARTMENT / IDENTITY // EST. 2020
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-2">
              <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#F4FDFF] tracking-tight leading-tight uppercase">
                DEPARTMENT OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5F3FF] via-[#7DEBFF] to-[#35DDF5]">ARTIFICIAL INTELLIGENCE</span> & MACHINE LEARNING
              </h2>
              <p className="font-mono-tech text-xs sm:text-sm text-[#A9BAC8] tracking-wider uppercase">
                {symposiumConfig.college}
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <div className="inline-block bg-[#10151D] border border-[#263643] p-3 text-left shadow-md">
                <div className="flex items-center gap-2 font-mono-tech text-[10px] text-[#35DDF5] mb-1 font-bold">
                  <Terminal className="w-3 h-3 text-[#7DEBFF]" />
                  <span>DEPT_MISSION</span>
                </div>
                <p className="font-mono-tech text-xs text-[#F4FDFF]/90 leading-relaxed">
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
                className="bg-[#10151D] border border-[#263643] hover:border-[#4DE6FF] hover:shadow-[0_0_22px_rgba(77,230,255,0.25)] transition-all p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Diagonal subtle corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#35DDF5]/15 clip-diagonal-left group-hover:bg-[#35DDF5] transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-[10px] text-[#A9BAC8] group-hover:text-[#7DEBFF] transition-colors font-semibold">
                      {pillar.code}
                    </span>
                    <Icon className="w-5 h-5 text-[#35DDF5] group-hover:text-[#7DEBFF] transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-sm sm:text-base text-[#F4FDFF] group-hover:text-white mb-2 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="font-body text-xs text-[#A9BAC8] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#263643] flex items-center justify-between text-[10px] font-mono-tech text-[#A9BAC8]">
                  <span>NODE_ACTIVE</span>
                  <span className="text-[#35DDF5] font-bold">● 100% READY</span>
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
          className="mt-8 sm:mt-10 p-4 sm:p-5 bg-[#10151D] border border-[#263643] flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs text-[#A9BAC8] shadow-md"
        >
          <div className="flex items-center gap-2 text-[#F4FDFF]">
            <Sparkles className="w-4 h-4 text-[#35DDF5]" />
            <span className="font-bold">NBA & NAAC A+ ACCREDITED INSTITUTION</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <span className="hover:text-white transition-colors">AUTONOMOUS CURRICULUM</span>
            <span className="text-[#263643]">|</span>
            <span className="hover:text-white transition-colors">IEEE CIS CHAPTER</span>
            <span className="text-[#263643]">|</span>
            <span className="hover:text-white transition-colors">INDUSTRY COE PARTNERSHIPS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DepartmentSection;
