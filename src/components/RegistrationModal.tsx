import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import symposiumConfig from '../config/symposiumConfig';
import eventsData from '../data/events';
import { X, CheckCircle, ExternalLink, Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';
import MagneticButton from './MagneticButton';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedEventId?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  preSelectedEventId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(preSelectedEventId || eventsData[0]?.id);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !college) return;

    const passCode = `IV30-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(passCode);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A5F3FF', '#7DEBFF', '#35DDF5', '#64CFFF', '#F4FDFF'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-lg bg-[#10151D] border border-[#263643] text-[#F4FDFF] z-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(53,221,245,0.2)] my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top header bar */}
          <div className="flex items-center justify-between border-b border-[#263643] bg-[#0A111C] px-4 sm:px-6 py-3 shrink-0">
            <div className="flex items-center gap-2 font-mono-tech text-xs">
              <span className="w-2 h-2 bg-[#35DDF5] rounded-full animate-pulse shadow-[0_0_6px_rgba(53,221,245,0.8)]" />
              <span className="font-bold text-[#F4FDFF]">PORTAL // REGISTRATION</span>
              <span className="text-[#A9BAC8]">[{symposiumConfig.year}]</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              aria-label="Close Registration Portal"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#263643] hover:border-[#4DE6FF] hover:bg-[#35DDF5]/20 text-[#A9BAC8] hover:text-[#7DEBFF] cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
            {!isSubmitted ? (
              <>
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#F4FDFF] mb-1">
                    CLAIM DELEGATE PASS
                  </h3>
                  <p className="text-xs font-mono-tech text-[#A9BAC8]">
                    Register directly or access the verified Google Form.
                  </p>
                </div>

                {/* External Form Direct Link */}
                <div className="bg-[#0A111C] border border-[#263643] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="text-xs font-mono-tech">
                    <span className="text-white block font-bold">OFFICIAL INSTITUTION FORM</span>
                    <span className="text-[#A9BAC8]">For group contingent registrations</span>
                  </div>
                  <MagneticButton
                    variant="primary"
                    size="sm"
                    level={2}
                    href={symposiumConfig.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <span>OPEN FORM</span>
                    <ExternalLink className="w-3.5 h-3.5 text-current" />
                  </MagneticButton>
                </div>

                <div className="relative flex items-center justify-center my-4 border-t border-[#263643]">
                  <span className="bg-[#10151D] px-2.5 font-mono-tech text-[10px] text-[#A9BAC8] uppercase font-bold">
                    OR INSTANT PASS GENERATION
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 font-mono-tech text-xs">
                  <div>
                    <label className="block text-[#A9BAC8] uppercase mb-1">FULL NAME *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. SAKTHI SYLESH"
                      className="w-full min-h-[44px] bg-[#0A111C] border border-[#263643] focus:border-[#4DE6FF] px-3 text-[#F4FDFF] outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#A9BAC8] uppercase mb-1">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="delegate@institution.edu"
                        className="w-full min-h-[44px] bg-[#0A111C] border border-[#263643] focus:border-[#4DE6FF] px-3 text-[#F4FDFF] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A9BAC8] uppercase mb-1">PHONE NUMBER *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98400 12345"
                        className="w-full min-h-[44px] bg-[#0A111C] border border-[#263643] focus:border-[#4DE6FF] px-3 text-[#F4FDFF] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#A9BAC8] uppercase mb-1">INSTITUTION / COLLEGE *</label>
                    <input
                      type="text"
                      required
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. SRI SAIRAM COLLEGE OF ENGINEERING"
                      className="w-full min-h-[44px] bg-[#0A111C] border border-[#263643] focus:border-[#4DE6FF] px-3 text-[#F4FDFF] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A9BAC8] uppercase mb-1">PRIMARY TRACK SELECTION</label>
                    <select
                      value={selectedEventId}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                      className="w-full min-h-[44px] bg-[#0A111C] border border-[#263643] focus:border-[#4DE6FF] px-3 text-[#F4FDFF] outline-none cursor-pointer"
                    >
                      {eventsData.map((evt) => (
                        <option key={evt.id} value={evt.id} className="bg-[#10151D] text-white">
                          [{evt.code}] {evt.title} ({evt.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      size="md"
                      level={3}
                      defaultText="GENERATE PASS NOW"
                      hoverText="CONFIRM REGISTRATION"
                      className="w-full min-h-[48px]"
                    />
                  </div>
                </form>
              </>
            ) : (
              /* Success Confirmation Card */
              <div className="text-center py-2 space-y-4">
                <div className="w-12 h-12 bg-[#35DDF5]/15 border border-[#35DDF5] text-[#7DEBFF] mx-auto flex items-center justify-center shadow-[0_0_15px_rgba(53,221,245,0.3)]">
                  <CheckCircle className="w-6 h-6" />
                </div>

                <div>
                  <span className="font-mono-tech text-[10px] text-[#35DDF5] uppercase tracking-wider block mb-1 font-bold">
                    TRANSMISSION VERIFIED
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#F4FDFF]">
                    DELEGATE PASS ISSUED
                  </h3>
                  <p className="text-xs font-mono-tech text-[#A9BAC8] mt-1">
                    Present this pass identifier at the registration desk on {symposiumConfig.eventDate}.
                  </p>
                </div>

                {/* Digital Ticket Pass */}
                <div className="bg-[#0A111C] border border-dashed border-[#4DE6FF] p-4 text-left font-mono-tech space-y-2.5 shadow-lg">
                  <div className="flex justify-between items-center border-b border-[#263643] pb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Ticket className="w-3.5 h-3.5 text-[#35DDF5]" />
                      <span>{symposiumConfig.name} {symposiumConfig.year}</span>
                    </div>
                    <span className="text-xs text-[#7DEBFF] font-bold">{ticketId}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-[#A9BAC8] block">DELEGATE</span>
                      <span className="text-[#F4FDFF] font-bold uppercase truncate block">{name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A9BAC8] block">COLLEGE</span>
                      <span className="text-[#F4FDFF] font-bold truncate block">{college}</span>
                    </div>
                  </div>

                  <div className="border-t border-[#263643] pt-2 flex justify-between text-[10px] text-[#A9BAC8]">
                    <span>STATUS: VALIDATED</span>
                    <span>VENUE: {symposiumConfig.venue.split(',')[0]}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                  <MagneticButton
                    variant="secondary"
                    size="sm"
                    level={1}
                    onClick={handleReset}
                    defaultText="CLOSE PORTAL"
                    className="min-h-[44px]"
                  />
                  <MagneticButton
                    variant="primary"
                    size="sm"
                    level={2}
                    href={symposiumConfig.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px]"
                  >
                    <span>GOOGLE FORM</span>
                    <ExternalLink className="w-3.5 h-3.5 text-current" />
                  </MagneticButton>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RegistrationModal;
