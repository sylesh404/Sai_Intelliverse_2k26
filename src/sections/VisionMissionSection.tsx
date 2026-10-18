import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Target, Compass, Cpu, ShieldCheck } from 'lucide-react';

const missions = [
  {
    id: "M-01",
    num: "MISSION 01",
    label: "PROFESSIONAL EXCELLENCE",
    icon: Target,
    statement: "To evolve professional who is proficient in the area of AI & ML.",
    metric: "CORE COMPETENCE",
  },
  {
    id: "M-02",
    num: "MISSION 02",
    label: "CONTINUOUS LEARNING",
    icon: Compass,
    statement: "To inspire and nurture students, with up-to-date knowledge in AI & ML.",
    metric: "CURRICULUM RIGOR",
  },
  {
    id: "M-03",
    num: "MISSION 03",
    label: "SKILL & INNOVATION",
    icon: Cpu,
    statement: "To impart skill-based and value-based education and contribute to the innovation of computing and learning-based systems.",
    metric: "COMPUTING SYSTEMS",
  },
  {
    id: "M-04",
    num: "MISSION 04",
    label: "TECHNICAL COMPETENCE",
    icon: ShieldCheck,
    statement: "To transform the students into technically competent professionals and help them to imbibe the creative spirit.",
    metric: "CREATIVE SPIRIT",
  },
];

export const VisionMissionSection: React.FC = () => {
  return (
    <section
      id="vision-mission"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0D0D0D] border-b border-[#262626] overflow-hidden"
    >
      {/* Background Architectural Watermarks */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#6C3082]/[0.025] rounded-full blur-3xl pointer-events-none z-0"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-72 h-72 comic-halftone-pattern opacity-5 pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16 border-b border-[#262626] pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-3 font-mono-tech text-xs text-[#A855F7] uppercase tracking-widest mb-2 sm:mb-3 font-bold">
              <span className="flex items-center gap-1.5 text-[#C084FC]">
                <span className="w-2 h-2 bg-[#A855F7] clip-diagonal-right inline-block animate-pulse shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                01.2
              </span>
              <span className="text-[#8B35AD]/40">───────────────</span>
              <span className="text-[#E9D5FF]">DEPARTMENT IDENTITY &amp; MANDATE</span>
            </div>
            <h2 className="font-display font-black tracking-tight text-[#FCFAED] uppercase text-[clamp(2rem,6vw,4.2rem)] leading-none">
              VISION &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#E9D5FF]">MISSION</span>
            </h2>
            <p className="font-mono-tech text-xs sm:text-sm text-[#B8AFC0] tracking-wider mt-2 uppercase">
              DEPARTMENT OF ARTIFICIAL INTELLIGENCE &amp; MACHINE LEARNING // SRI SAIRAM COLLEGE OF ENGINEERING
            </p>
          </div>

          <div className="font-mono-tech text-xs text-[#B8AFC0] max-w-sm">
            <span className="text-[#A855F7] font-bold block mb-1">
              [GOVERNING EDUCATIONAL ETHOS]
            </span>
            <p className="leading-relaxed">
              Standard of quality education, ethical technological innovation, and societal impact.
            </p>
          </div>
        </div>

        {/* ==================================================== */}
        {/* 1. DEPARTMENT VISION STATEMENT PANEL                */}
        {/* ==================================================== */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center gap-3 font-mono-tech text-xs text-[#A855F7] uppercase tracking-widest mb-6 font-bold">
            <span className="w-2 h-2 bg-[#A855F7] clip-diagonal-right shadow-[0_0_6px_rgba(168,85,247,0.7)]" />
            <span className="text-[#FCFAED]">DEPARTMENT VISION</span>
            <span className="hidden sm:inline text-[#333333]">───────────────</span>
            <span className="hidden sm:inline text-[10px] text-[#B8AFC0]">PRIMARY MANDATE</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#19131D] border border-[#2E1F3B] p-6 sm:p-10 lg:p-12 group hover:border-[#A855F7] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 shadow-2xl overflow-hidden"
          >
            {/* Animated SVG Border Line-Drawing Accent on View */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="#A855F7"
                strokeWidth="1.5"
                strokeDasharray="200 1000"
                initial={{ strokeDashoffset: 1200 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </svg>

            {/* Corner Architectural Brackets */}
            <div className="absolute top-0 right-0 w-8 sm:w-10 h-8 sm:h-10 bg-[#A855F7]/15 clip-diagonal-left group-hover:bg-[#A855F7] transition-colors pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#A855F7] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
              <div className="lg:col-span-9 space-y-4">
                <div className="flex items-center gap-2 font-mono-tech text-[10px] sm:text-xs text-[#A855F7] tracking-wider uppercase font-semibold">
                  <span className="w-2 h-2 bg-[#A855F7] rounded-full animate-ping" />
                  <span>MANDATE_DECLARATION // CORE_VISION</span>
                </div>

                <div className="overflow-hidden">
                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="font-display font-extrabold text-lg sm:text-2xl lg:text-3xl text-[#FCFAED] leading-relaxed tracking-tight group-hover:text-white transition-colors border-0 p-0 m-0"
                  >
                    &ldquo;To accomplish an admirable standard of quality education by utilizing the latest technologies, innovations to be applicable for academia and industry which helps society in large.&rdquo;
                  </motion.blockquote>
                </div>
              </div>

              <div className="lg:col-span-3 lg:border-l lg:border-[#2E1F3B] lg:pl-8 pt-4 lg:pt-0 border-t border-[#2E1F3B] lg:border-t-0 font-mono-tech text-xs space-y-2.5 text-[#B8AFC0]">
                <div className="text-[#A855F7] font-bold text-xs flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#C084FC]" />
                  <span>STATUS // CODIFIED</span>
                </div>
                <div className="text-[#FCFAED] font-bold text-xs">
                  DEPT OF ARTIFICIAL INTELLIGENCE &amp; MACHINE LEARNING
                </div>
                <p className="text-[11px] text-[#888888] leading-normal pt-1">
                  Sri Sairam College of Engineering, Anekal, Bangalore
                </p>
                <div className="pt-2">
                  <span className="inline-block bg-[#151019] px-2.5 py-1 border border-[#A855F7]/50 text-[#C084FC] text-[10px] font-bold shadow-sm">
                    ACADEMIA &bull; INDUSTRY &bull; SOCIETY
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==================================================== */}
        {/* 2. DEPARTMENT MISSION CARDS (4 STRATEGIC NODES)     */}
        {/* ==================================================== */}
        <div>
          <div className="flex items-center gap-3 font-mono-tech text-xs text-[#A855F7] uppercase tracking-widest mb-6 font-bold">
            <span className="w-2 h-2 bg-[#A855F7] clip-diagonal-right shadow-[0_0_6px_rgba(168,85,247,0.7)]" />
            <span className="text-[#FCFAED]">DEPARTMENT MISSION</span>
            <span className="hidden sm:inline text-[#333333]">───────────────</span>
            <span className="hidden sm:inline text-[10px] text-[#B8AFC0]">04 PILLARS OF EXCELLENCE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {missions.map((mission, idx) => {
              const Icon = mission.icon;
              return (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#19131D] border border-[#2E1F3B] hover:border-[#A855F7] p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-lg hover:shadow-[0_0_28px_rgba(168,85,247,0.22)]"
                >
                  {/* Thin animated corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#A855F7]/10 clip-diagonal-left group-hover:bg-[#A855F7] transition-colors pointer-events-none" />

                  {/* Top Scanline effect on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono-tech text-xs font-bold text-[#C084FC] bg-[#151019] px-2.5 py-1 border border-[#2E1F3B] group-hover:border-[#A855F7] transition-colors">
                          {mission.id}
                        </span>
                        <span className="font-mono-tech text-xs text-[#B8AFC0] tracking-wider uppercase font-semibold">
                          {mission.num}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Icon className="w-4 h-4 text-[#A855F7] group-hover:text-[#C084FC] transition-colors" />
                        <span className="font-mono-tech text-[10px] sm:text-xs text-[#FCFAED]/80 group-hover:text-[#E9D5FF] tracking-wider uppercase transition-colors font-semibold">
                          {mission.label}
                        </span>
                      </div>
                    </div>

                    <p className="font-body text-sm sm:text-base text-[#FCFAED]/90 leading-relaxed group-hover:text-white transition-colors">
                      {mission.statement}
                    </p>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-[#2E1F3B] flex items-center justify-between text-[10px] font-mono-tech text-[#B8AFC0] relative z-10">
                    <span className="uppercase tracking-wider">{mission.metric}</span>
                    <span className="text-[#A855F7] flex items-center gap-1.5 font-bold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] group-hover:animate-ping shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                      ACTIVE_OBJECTIVE
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
