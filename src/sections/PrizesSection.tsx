import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import symposiumConfig from '../config/symposiumConfig';
import prizesData from '../data/prizes';
import { Zap } from 'lucide-react';

export const PrizesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bigTotalRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bigTotalRef.current,
        {
          scale: 1.8,
          color: "#6C3082",
          transformOrigin: "right center",
        },
        {
          scale: 1,
          color: "#FFFFFF",
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0D0D0D] border-b border-[#262626] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono-tech text-xs text-[#A855F7] uppercase tracking-widest mb-6 font-bold">
          <span className="text-[#C084FC]">05</span>
          <span className="text-[#8B35AD]/40">───────────────</span>
          <span className="text-[#E9D5FF]">BOUNTIES &amp; RECOGNITION</span>
        </div>

        {/* Dramatic Typography Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-10 sm:mb-16 border-b border-[#262626] pb-6 sm:pb-10">
          <div className="lg:col-span-8">
            <h2 className="font-display font-black tracking-tight text-[#FCFAED] uppercase leading-[0.9] text-[clamp(2.5rem,8vw,6.5rem)]">
              THE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#E9D5FF]">PRIZE</span><br />
              POOL
            </h2>
          </div>

          <div className="lg:col-span-4 text-left lg:text-right space-y-1">
            <span className="font-mono-tech text-xs text-[#B8AFC0] uppercase tracking-wider block">
              TOTAL ACCUMULATED PURSE
            </span>
            <span
              ref={bigTotalRef}
              className="text-3xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FCFAED] via-[#E9D5FF] to-[#C084FC] block transform-gpu drop-shadow-[0_0_20px_rgba(192,132,252,0.4)]"
            >
              {symposiumConfig.stats.prizePool}
            </span>
            <span className="font-mono-tech text-xs text-[#A855F7] block font-bold tracking-wide">
              + INCUBATION &amp; CLOUD CREDITS
            </span>
          </div>
        </div>

        {/* Prize Cards: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {prizesData.map((prize, idx) => (
            <motion.div
              key={prize.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative bg-[#19131D] border p-5 sm:p-6 flex flex-col justify-between group transition-all duration-300 ${
                idx === 0
                  ? 'border-[#A855F7] shadow-[0_0_35px_rgba(168,85,247,0.3)] ring-1 ring-[#C084FC]/40'
                  : 'border-[#2E1F3B] hover:border-[#8B35AD] hover:shadow-[0_0_20px_rgba(139,53,173,0.2)]'
              }`}
            >
              {idx === 0 && (
                <div className="absolute top-0 right-0 w-10 h-10 bg-[#A855F7]/20 clip-diagonal-left pointer-events-none" />
              )}

              <div>
                <div className="flex justify-between items-center font-mono-tech text-xs mb-3">
                  <span className={`font-bold ${idx === 0 ? 'text-[#C084FC]' : 'text-[#B8AFC0]'}`}>
                    {prize.tier}
                  </span>
                  <span className="text-xl sm:text-2xl font-display font-extrabold text-[#B8AFC0]/50 group-hover:text-[#A855F7] transition-colors">
                    {prize.rank}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-2xl sm:text-4xl font-display font-black text-white group-hover:text-[#C084FC] transition-colors tracking-tight">
                    {prize.amount}
                  </div>
                  <h3 className="text-xs font-mono-tech font-bold text-[#FCFAED] mt-1.5 uppercase tracking-wide">
                    {prize.title}
                  </h3>
                </div>

                <ul className="space-y-2 pt-3 border-t border-[#2E1F3B] font-mono-tech text-xs text-[#B8AFC0]">
                  {prize.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#A855F7] shrink-0 mt-0.5" />
                      <span className="leading-snug">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-[#2E1F3B] flex justify-between items-center text-[10px] font-mono-tech text-[#B8AFC0]">
                <span>SAI INTELLIVERSE 3.0</span>
                <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-[#C084FC] shadow-[0_0_6px_rgba(192,132,252,0.9)] animate-pulse' : 'bg-[#A855F7]'}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
