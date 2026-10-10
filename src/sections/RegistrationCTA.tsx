import React from 'react';
import { motion } from 'framer-motion';
import symposiumConfig from '../config/symposiumConfig';
import MagneticButton from '../components/MagneticButton';
import { Terminal, ArrowUpRight } from 'lucide-react';

interface RegistrationCTAProps {
  onOpenRegister: () => void;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#0D0D0D] border-b border-[#262626] overflow-hidden">
      {/* Decorative gradient (safe background) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-gradient-to-l from-[#FF0022]/10 to-transparent pointer-events-none" />

      {/* Retro VHS hazard stripes bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 hazard-stripes opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 font-mono-tech text-xs text-[#FF0022] uppercase tracking-widest mb-6"
        >
          <span className="font-bold">09</span>
          <span>───────────────</span>
          <span>FINAL ADMISSION CALL</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-8 space-y-5"
          >
            <h2 className="font-display font-black tracking-tighter text-[#FCFAED] uppercase leading-[0.9] text-[clamp(2.5rem,8vw,6.5rem)]">
              READY<br />
              TO<br />
              <span className="text-[#FF0022]">COMPETE?</span>
            </h2>

            <p className="text-sm sm:text-lg font-body text-[#FCFAED]/80 max-w-xl leading-relaxed">
              Registration closes once slot capacities are achieved. Secure your institutional delegation pass or individual entry now.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <MagneticButton
                variant="primary"
                size="lg"
                level={3}
                defaultText="REGISTER NOW"
                hoverText="CLAIM DELEGATE PASS"
                href={symposiumConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onOpenRegister}
                className="w-full sm:w-auto min-h-[48px]"
              />

              <MagneticButton
                variant="secondary"
                size="lg"
                level={2}
                href={symposiumConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px]"
              >
                <span>OFFICIAL GOOGLE FORM</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF0022] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right Column: Terminal Verification Box */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-4 bg-[#141414] border border-[#262626] p-5 sm:p-6 space-y-3"
          >
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#FF0022] font-bold">
              <Terminal className="w-4 h-4" />
              <span>TERMINAL // VERIFICATION</span>
            </div>

            <div className="space-y-2.5 font-mono-tech text-xs text-[#888888]">
              <div className="flex justify-between border-b border-[#262626] pb-2">
                <span>EVENT DATE:</span>
                <span className="text-white font-bold">{symposiumConfig.eventDate}</span>
              </div>
              <div className="flex justify-between border-b border-[#262626] pb-2">
                <span>VENUE:</span>
                <span className="text-white font-bold">{symposiumConfig.venue}</span>
              </div>
              <div className="flex justify-between border-b border-[#262626] pb-2">
                <span>ELIGIBILITY:</span>
                <span className="text-white font-bold">ALL UG / PG COLLEGES</span>
              </div>
              <div className="flex justify-between border-b border-[#262626] pb-2">
                <span>FOOD & KITS:</span>
                <span className="text-[#FF0022] font-bold">PROVIDED TO ALL</span>
              </div>
              <div className="flex justify-between">
                <span>CERTIFICATION:</span>
                <span className="text-white font-bold">ACCREDITED</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationCTA;
