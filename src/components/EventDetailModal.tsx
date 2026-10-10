import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EventItem } from '../types';
import symposiumConfig from '../config/symposiumConfig';
import { X, Clock, Users, Award, ShieldCheck, Phone, Calendar, FileText, AlertTriangle, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegister: (eventId: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegister,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/90 backdrop-blur-md">
        {/* Backdrop click area */}
        <div
          onClick={onClose}
          className="fixed inset-0 -z-10 bg-transparent"
        />

        <div className="min-h-full w-full flex items-start justify-center p-3 sm:p-6 lg:py-10 lg:px-8">
          {/* Modal Container: Natural height, single smooth page scroll without internal scrollbar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-[#141414] border border-[#262626] text-[#FCFAED] z-10 shadow-2xl h-auto max-h-none overflow-visible my-auto flex flex-col"
          >
            {/* Top Sticky Header Bar */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#262626] bg-[#0D0D0D]/95 backdrop-blur-md px-4 sm:px-6 py-3 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 font-mono-tech text-xs">
                <span className="bg-[#FF0022] text-white px-2 py-0.5 font-bold">
                  EVT // {event.code}
                </span>
                <span className="text-[#888888] font-bold">{event.category}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                aria-label="Close Event Details"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#333333] hover:border-[#FF0022] bg-[#1A1A1A] hover:bg-[#FF0022] text-[#FCFAED] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Modal Natural Flow Body (Natural height, no nested scrollbar) */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 h-auto max-h-none overflow-visible">
            {/* 1. Header Information & Title */}
            <div className="space-y-2">
              {event.tagline ? (
                <div className="inline-flex items-center gap-2 text-xs font-mono-tech tracking-wider text-[#FF0022] uppercase font-bold bg-[#FF0022]/10 px-2.5 py-1 border border-[#FF0022]/30">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF0022]" />
                  <span>{event.tagline}</span>
                </div>
              ) : (
                <span className="text-xs font-mono-tech tracking-wider text-[#FF0022] uppercase font-bold block">
                  {event.subtitle}
                </span>
              )}
              <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-[#FCFAED] leading-tight">
                {event.title}
              </h2>
            </div>

            {/* Image (Responsive banner on mobile/desktop) */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden border border-[#262626] bg-black">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute top-2 right-2 bg-[#FF0022] text-white px-3 py-1 font-mono-tech text-xs font-bold uppercase tracking-wider">
                ENTRY: {event.entryFee}
              </div>
            </div>

            {/* 2. Key Metadata Quick Grid (Balanced 2-Column: TEAM & DATE) */}
            <div className="grid grid-cols-2 gap-3 font-mono-tech text-xs">
              <div className="bg-[#0D0D0D] border border-[#262626] p-3 sm:p-3.5">
                <div className="flex items-center gap-1.5 text-[#888888] mb-1">
                  <Users className="w-3.5 h-3.5 text-[#FF0022]" />
                  <span className="tracking-wider">TEAM</span>
                </div>
                <span className="font-bold text-[#FCFAED] block text-sm sm:text-base">{event.teamSize}</span>
              </div>

              <div className="bg-[#0D0D0D] border border-[#262626] p-3 sm:p-3.5">
                <div className="flex items-center gap-1.5 text-[#888888] mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FF0022]" />
                  <span className="tracking-wider">DATE</span>
                </div>
                <span className="font-bold text-[#FCFAED] block text-sm sm:text-base">{event.date}</span>
              </div>
            </div>

            {/* 3. About the Event */}
            <div className="space-y-2">
              <span className="font-mono-tech text-xs text-[#888888] uppercase block">
                ABOUT THE EVENT
              </span>
              <p className="text-sm sm:text-base text-[#FCFAED]/85 leading-relaxed font-body">
                {event.fullDescription}
              </p>
            </div>

            {/* 4. Team Format (if specified) */}
            {event.teamFormat && event.teamFormat.length > 0 && (
              <div className="border-t border-[#262626] pt-5 space-y-3">
                <div className="flex items-center gap-2 font-mono-tech text-xs sm:text-sm text-[#FF0022] font-bold">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>TEAM FORMAT & ELIGIBILITY</span>
                </div>
                <ul className="space-y-2 font-mono-tech text-xs text-[#FCFAED]/85">
                  {event.teamFormat.map((format, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-[#0D0D0D] p-2.5 border-l-2 border-[#555555]">
                      <span className="text-[#FF0022] font-bold shrink-0">•</span>
                      <span>{format}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 5. Round Details (if specified) */}
            {event.rounds && event.rounds.length > 0 && (
              <div className="border-t border-[#262626] pt-5 space-y-4">
                <div className="flex items-center gap-2 font-mono-tech text-xs sm:text-sm text-[#FF0022] font-bold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>ROUND DETAILS</span>
                </div>
                <div className="space-y-3">
                  {event.rounds.map((round, idx) => (
                    <div key={idx} className="bg-[#0D0D0D] border border-[#262626] p-4 space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-display font-bold text-sm sm:text-base text-[#FCFAED] tracking-wide">
                          {round.title}
                        </h4>
                        {round.duration && (
                          <span className="bg-[#FF0022]/15 text-[#FF0022] border border-[#FF0022]/40 text-[10px] px-2 py-0.5 font-mono-tech font-bold uppercase">
                            {round.duration}
                          </span>
                        )}
                      </div>
                      {round.description && (
                        <p className="text-xs sm:text-sm text-[#888888] font-body leading-relaxed">
                          {round.description}
                        </p>
                      )}
                      {round.points && round.points.length > 0 && (
                        <ul className="space-y-1.5 pt-1">
                          {round.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-xs font-mono-tech text-[#FCFAED]/80">
                              <span className="text-[#FF0022] font-bold shrink-0">→</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Paper Submission Requirements (e.g. Intellipaper) */}
            {event.submissionRequirements && event.submissionRequirements.length > 0 && (
              <div className="border-t border-[#262626] pt-5 space-y-3">
                <div className="flex items-center gap-2 font-mono-tech text-xs sm:text-sm text-[#FF0022] font-bold">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>PAPER SUBMISSION REQUIREMENTS</span>
                </div>
                <ul className="space-y-2 font-mono-tech text-xs text-[#FCFAED]/85">
                  {event.submissionRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-[#0D0D0D] p-2.5 border-l-2 border-[#FF0022]">
                      <span className="text-[#FF0022] font-bold shrink-0">{idx + 1}.</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 7. Presentation Format (e.g. Intellipaper) */}
            {event.presentationFormat && event.presentationFormat.length > 0 && (
              <div className="border-t border-[#262626] pt-5 space-y-3">
                <div className="flex items-center gap-2 font-mono-tech text-xs sm:text-sm text-[#FF0022] font-bold">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>PRESENTATION FORMAT (POWERPOINT)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {event.presentationFormat.map((slide, idx) => (
                    <div key={idx} className="bg-[#0D0D0D] border border-[#262626] p-2.5 font-mono-tech text-xs text-[#FCFAED]/90">
                      {slide}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Time Limits (e.g. Intellipaper) */}
            {event.timeLimits && event.timeLimits.length > 0 && (
              <div className="border-t border-[#262626] pt-5 space-y-3">
                <div className="flex items-center gap-2 font-mono-tech text-xs sm:text-sm text-[#FF0022] font-bold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>TIME LIMITS</span>
                </div>
                <ul className="space-y-2 font-mono-tech text-xs text-[#FCFAED]/85">
                  {event.timeLimits.map((limit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-[#0D0D0D] p-2.5 border-l-2 border-[#555555]">
                      <span className="text-[#FF0022] font-bold shrink-0">⏱</span>
                      <span>{limit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 9. Rules and Regulations */}
            <div className="border-t border-[#262626] pt-5 space-y-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs sm:text-sm text-[#FF0022] font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>RULES & REGULATIONS</span>
              </div>
              <ul className="space-y-2 font-mono-tech text-xs text-[#FCFAED]/85">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-[#0D0D0D] p-2.5 border-l-2 border-[#FF0022]">
                    <span className="text-[#FF0022] font-bold shrink-0">{idx + 1}.</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 10. Judging Criteria (if specified) */}
            {event.judgingCriteria && event.judgingCriteria.length > 0 && (
              <div className="border-t border-[#262626] pt-5 space-y-3">
                <div className="flex items-center gap-2 font-mono-tech text-xs sm:text-sm text-[#FF0022] font-bold">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>JUDGING CRITERIA & EVALUATION</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {event.judgingCriteria.map((criterion, idx) => (
                    <div key={idx} className="bg-[#0D0D0D] border border-[#262626] p-2.5 flex items-center gap-2 font-mono-tech text-xs text-[#FCFAED]/90">
                      <span className="w-1.5 h-1.5 bg-[#FF0022] shrink-0" />
                      <span>{criterion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. Important Notes & Notices */}
            {event.importantNotes && event.importantNotes.length > 0 && (
              <div className="border-t border-[#262626] pt-5 space-y-2">
                <div className="flex items-center gap-2 font-mono-tech text-xs sm:text-sm text-[#FF0022] font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>IMPORTANT NOTES</span>
                </div>
                <div className="bg-[#191113] border border-[#FF0022]/40 p-3.5 space-y-1.5">
                  {event.importantNotes.map((note, idx) => (
                    <p key={idx} className="text-xs font-mono-tech text-[#FCFAED]/90 leading-relaxed flex items-start gap-2">
                      <span className="text-[#FF0022] font-bold shrink-0">!</span>
                      <span>{note}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* 12. Closing Line */}
            {event.closingLine && (
              <div className="p-3 bg-[#0D0D0D] border-l-2 border-[#FF0022] text-xs font-mono-tech text-[#FCFAED] tracking-wide font-semibold italic">
                "{event.closingLine}"
              </div>
            )}

            {/* 13. Prizes */}
            <div className="border-t border-[#262626] pt-5 space-y-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs sm:text-sm text-[#FF0022] font-bold tracking-wider">
                <Award className="w-4 h-4 shrink-0" />
                <span>PRIZE POOL</span>
              </div>
              <div className={`grid grid-cols-1 ${event.prizes.third ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-3 font-mono-tech`}>
                <div className="bg-[#0D0D0D] border border-[#FF0022]/60 p-3.5 relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-[#FCFAED] uppercase font-bold tracking-wider">🥇 FIRST PRIZE</span>
                    <span className="text-[10px] text-[#FF0022] font-bold">WINNER</span>
                  </div>
                  <span className="text-base sm:text-xl font-bold text-[#FCFAED] block mt-1 tracking-tight">
                    {event.prizes.first}
                  </span>
                </div>

                <div className="bg-[#0D0D0D] border border-[#262626] p-3.5 relative overflow-hidden group hover:border-[#404040]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-[#FCFAED] uppercase font-bold tracking-wider">🥈 SECOND PRIZE</span>
                    <span className="text-[10px] text-[#888888] font-bold">RUNNER-UP</span>
                  </div>
                  <span className="text-base sm:text-xl font-bold text-[#FCFAED] block mt-1 tracking-tight">
                    {event.prizes.second}
                  </span>
                </div>

                {event.prizes.third && (
                  <div className="bg-[#0D0D0D] border border-[#262626] p-3.5 relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-[#FCFAED] uppercase font-bold tracking-wider">🥉 THIRD PRIZE</span>
                      <span className="text-[10px] text-[#888888] font-bold">SPECIAL</span>
                    </div>
                    <span className="text-base sm:text-xl font-bold text-[#FCFAED] block mt-1 tracking-tight">
                      {event.prizes.third}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 14. Coordinator Information */}
            <div className="border-t border-[#262626] pt-6">
              <div className="flex items-center gap-2 mb-3.5 font-mono-tech text-xs text-[#FF0022] uppercase tracking-wider font-bold">
                <span>//</span>
                <span>EVENT COORDINATORS</span>
              </div>

              <div className={`grid gap-3 ${
                (event.coordinators && event.coordinators.length === 3)
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
                {(event.coordinators || (event.coordinator ? [event.coordinator] : [])).map((coord, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0D0D0D] p-3.5 sm:p-4 border border-[#262626] hover:border-[#FF0022]/60 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono-tech text-[#888888] uppercase block">
                        COORDINATOR 0{idx + 1}
                      </span>
                      <span className="font-bold text-[#FCFAED] text-sm block mt-1 break-words">
                        {coord.name}
                      </span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#1C1C1C]">
                      <a
                        href={`tel:${coord.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#FCFAED] hover:text-[#FF0022] transition-colors py-1 min-h-[38px]"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#FF0022] shrink-0" />
                        <span className="tracking-wide font-semibold">{coord.phone}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="border-t border-[#262626] bg-[#0D0D0D] px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="min-h-[44px] px-3 font-mono-tech text-xs text-[#888888] hover:text-[#FCFAED] uppercase cursor-pointer transition-colors"
            >
              ← RETURN TO EVENTS
            </motion.button>

            <MagneticButton
              variant="primary"
              size="md"
              level={3}
              defaultText="REGISTER FOR THIS EVENT"
              hoverText="GOOGLE FORM"
              href={symposiumConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onRegister(event.id)}
              className="w-full sm:w-auto min-h-[48px]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </AnimatePresence>
  );
};

export default EventDetailModal;
