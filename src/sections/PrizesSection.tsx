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
          color: "#FF0022",
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
        <div className="flex items-center gap-3 font-mono-tech text-xs text-[#FF0022] uppercase tracking-widest mb-6">
          <span className="font-bold">05</span>
          <span>───────────────</span>
          <span>BOUNTIES & RECOGNITION</span>
        </div>

        {/* Dramatic Typography Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-10 sm:mb-16 border-b border-[#262626] pb-6 sm:pb-10">
          <div className="lg:col-span-8">
            <h2 className="font-display font-black tracking-tight text-[#FCFAED] uppercase leading-[0.9] text-[clamp(2.5rem,8vw,6.5rem)]">
              THE<br />
              <span className="text-[#FF0022]">PRIZE</span><br />
              POOL
            </h2>
          </div>

          <div className="lg:col-span-4 text-left lg:text-right space-y-1">
            <span className="font-mono-tech text-xs text-[#888888] uppercase tracking-wider block">
              TOTAL ACCUMULATED PURSE
            </span>
            <span
              ref={bigTotalRef}
              className="text-3xl sm:text-5xl font-display font-black text-white block transform-gpu"
            >
              {symposiumConfig.stats.prizePool}
            </span>
            <span className="font-mono-tech text-xs text-[#FF0022] block font-bold">
              + INCUBATION & CLOUD CREDITS
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
              className={`relative bg-[#141414] border p-5 sm:p-6 flex flex-col justify-between group transition-all duration-200 ${
                idx === 0
                  ? 'border-[#FF0022] shadow-[0_0_20px_rgba(255,0,34,0.15)]'
                  : 'border-[#262626] hover:border-[#565656]'
              }`}
            >
              <div>
                <div className="flex justify-between items-center font-mono-tech text-xs mb-3">
                  <span className={`font-bold ${idx === 0 ? 'text-[#FF0022]' : 'text-[#888888]'}`}>
                    {prize.tier}
                  </span>
                  <span className="text-xl sm:text-2xl font-display font-extrabold text-[#565656] group-hover:text-white transition-colors">
                    {prize.rank}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-2xl sm:text-4xl font-display font-black text-white group-hover:text-[#FF0022] transition-colors">
                    {prize.amount}
                  </div>
                  <h3 className="text-xs font-mono-tech font-bold text-[#FCFAED] mt-1.5 uppercase tracking-wide">
                    {prize.title}
                  </h3>
                </div>

                <ul className="space-y-2 pt-3 border-t border-[#262626] font-mono-tech text-xs text-[#888888]">
                  {prize.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#FF0022] shrink-0 mt-0.5" />
                      <span className="leading-snug">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1F1F1F] flex justify-between items-center text-[10px] font-mono-tech text-[#565656]">
                <span>SAI INTELLIVERSE 3.0</span>
                <span className="w-1.5 h-1.5 bg-[#FF0022]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
