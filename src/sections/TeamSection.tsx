import React from 'react';
import { motion } from 'framer-motion';
import { facultyData, facultyRowGroups } from '../data/faculty';
import type { FacultyMember } from '../types';
import { UserCheck, Award } from 'lucide-react';

interface FacultyCardProps {
  member: FacultyMember;
  featured?: boolean;
  index: number;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ member, featured = false, index }) => {
  const padIndex = (index < 9 ? `0${index + 1}` : `${index + 1}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: (index % 5) * 0.05, ease: "easeOut" }}
      className={`group bg-[#141414] border border-[#262626] hover:border-[#FF0022] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-[0_0_22px_rgba(255,0,34,0.16)] min-w-0 w-full relative ${
        featured ? 'ring-1 ring-[#FF0022]/40 shadow-xl' : ''
      }`}
    >
      {/* Interactive Top Red Scanline on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF0022] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none" />

      {/* Portrait Container - Consistent ~4:5 Ratio */}
      <div className={`relative aspect-[4/5] w-full overflow-hidden bg-[#0A0A0A] ${featured ? 'bg-[#0D0D0D]' : ''}`}>
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          /* Technical Minimalist Placeholder for Unfilled Positions */
          <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-[#141414] via-[#0E0E0E] to-[#0A0A0A] border-b border-[#222222]">
            <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full border border-[#2B2B2B] group-hover:border-[#FF0022]/60 flex items-center justify-center bg-[#181818] text-[#555555] group-hover:text-[#FF0022] transition-colors mb-1 sm:mb-3">
              <UserCheck className="w-4 h-4 sm:w-7 sm:h-7" />
            </div>
            <span className="font-mono-tech text-[8px] sm:text-[10px] text-[#777777] uppercase tracking-widest text-center">
              PORTRAIT PENDING
            </span>
            <span className="font-mono-tech text-[7px] sm:text-[9px] text-[#444444] tracking-wider mt-0.5 sm:mt-1">
              // POS_{padIndex}
            </span>
          </div>
        )}

        {/* Diagonal Corner Accent */}
        <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 bg-[#FF0022]/10 clip-diagonal-left group-hover:bg-[#FF0022] transition-colors pointer-events-none z-10" />

        {/* Numbered Position Badge */}
        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-[#0D0D0D]/90 backdrop-blur-xs px-1.5 py-0.5 font-mono-tech text-[8px] sm:text-[10px] text-[#888888] group-hover:text-[#FF0022] border border-[#262626] font-bold z-10">
          {padIndex}
        </div>

        {/* Lead Badge for Featured Member */}
        {featured && (
          <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-[#FF0022] text-white px-1.5 sm:px-2 py-0.5 font-mono-tech text-[8px] sm:text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg z-10">
            <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>HOD</span>
          </div>
        )}
      </div>

      {/* Faculty Information Details */}
      <div className={`p-2.5 sm:p-3 lg:p-3.5 xl:p-4 bg-[#0D0D0D] border-t border-[#262626] flex flex-col justify-between flex-grow space-y-1 sm:space-y-1.5 min-w-0 ${
        featured ? 'bg-[#101010] p-3.5 sm:p-5' : ''
      }`}>
        <div className="min-w-0">
          <h3 className={`font-display font-extrabold text-[#FCFAED] group-hover:text-white transition-colors uppercase leading-snug break-words ${
            featured ? 'text-base sm:text-xl font-black text-white' : 'text-[11px] sm:text-xs lg:text-[13px] xl:text-sm'
          }`}>
            {member.name}
          </h3>

          {member.designation && (
            <div className={`font-mono-tech uppercase font-semibold tracking-wide leading-tight mt-0.5 sm:mt-1 break-words text-[#FF0022] ${
              featured ? 'text-xs sm:text-sm' : 'text-[8px] sm:text-[9px] lg:text-[10px] xl:text-[11px]'
            }`}>
              {member.designation}
            </div>
          )}
        </div>

        {member.department && (
          <div className={`font-mono-tech text-[#888888] uppercase pt-1 border-t border-[#1C1C1C] leading-tight break-words flex items-center justify-between ${
            featured ? 'text-[10px] sm:text-xs' : 'text-[7px] sm:text-[8px] lg:text-[9px] xl:text-[10px]'
          }`}>
            <span>{member.department}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0022]/40 group-hover:bg-[#FF0022] transition-colors" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const TeamSection: React.FC = () => {
  return (
    <section
      id="team"
      className="relative py-16 sm:py-24 px-2.5 sm:px-6 lg:px-12 bg-[#0D0D0D] border-b border-[#262626] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-16 border-b border-[#262626] pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-3 font-mono-tech text-xs text-[#FF0022] uppercase tracking-widest mb-2 sm:mb-3">
              <span className="font-bold">04</span>
              <span>───────────────</span>
              <span>THE PEOPLE BEHIND THE SYMPOSIUM</span>
            </div>
            <h2 className="font-display font-black tracking-tight text-[#FCFAED] uppercase text-[clamp(2.2rem,6.5vw,4.8rem)] leading-none">
              FACULTY COMMITTEE
            </h2>
          </div>

          <div className="font-mono-tech text-xs text-[#888888] max-w-sm">
            <span className="text-[#FF0022] font-bold block mb-1">
              [DEPARTMENT LEADERSHIP & CONVENORS]
            </span>
            <p className="leading-relaxed">
              Guiding academic rigor, computational research, and institutional excellence for SAI INTELLIVERSE 3.0.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP LAYOUT (VISIBLE ON LG+, EXACT COMPOSITION: 1 → 5 → 5 → 4 → 3)     */}
        {/* ========================================================================= */}
        <div className="hidden lg:block space-y-10">
          {/* ROW 1: 1 PHOTO — CENTERED AND STANDALONE FEATURE (FACULTY 01) */}
          <div className="flex justify-center">
            <div className="w-full max-w-[340px]">
              {facultyRowGroups.row1.map((member, idx) => (
                <FacultyCard
                  key={member.id}
                  member={member}
                  featured={true}
                  index={idx}
                />
              ))}
            </div>
          </div>

          {/* ROW 2: 5 PHOTOS — EVENLY DISTRIBUTED IN ONE ROW (FACULTY 02 - 06) */}
          <div>
            <div className="grid grid-cols-5 gap-3 lg:gap-3.5 xl:gap-5">
              {facultyRowGroups.row2.map((member, idx) => (
                <FacultyCard
                  key={member.id}
                  member={member}
                  index={idx + 1}
                />
              ))}
            </div>
          </div>

          {/* ROW 3: 5 PHOTOS — EVENLY DISTRIBUTED IN ONE ROW (FACULTY 07 - 11) */}
          <div>
            <div className="grid grid-cols-5 gap-3 lg:gap-3.5 xl:gap-5">
              {facultyRowGroups.row3.map((member, idx) => (
                <FacultyCard
                  key={member.id}
                  member={member}
                  index={idx + 6}
                />
              ))}
            </div>
          </div>

          {/* ROW 4: 4 PHOTOS — EVENLY DISTRIBUTED & CENTERED (FACULTY 12 - 15) */}
          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-4 gap-3 lg:gap-3.5 xl:gap-5">
                {facultyRowGroups.row4.map((member, idx) => (
                  <FacultyCard
                    key={member.id}
                    member={member}
                    index={idx + 11}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ROW 5: 3 PHOTOS — CENTERED AND BALANCED (FACULTY 16 - 18) */}
          <div className="flex justify-center">
            <div className="w-full max-w-[780px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-3.5 xl:gap-5">
                {facultyRowGroups.row5.map((member, idx) => (
                  <FacultyCard
                    key={member.id}
                    member={member}
                    index={idx + 15}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET LAYOUT (VISIBLE ON < LG)                                  */}
        {/* 1. HOD ALONE IN ROW 1, CENTERED                                           */}
        {/* 2. REMAINING FACULTY IN 3-COLUMN CSS GRID                                 */}
        {/* 3. CRITICAL FINAL ROW: FACULTY 16, 17, 18 TOGETHER IN ONE SINGLE ROW      */}
        {/* ========================================================================= */}
        <div className="block lg:hidden space-y-3 sm:space-y-4">
          {/* ROW 1: 1 PHOTO — HOD STANDALONE CENTERED CARD (FACULTY 01) */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="w-full max-w-[240px] sm:max-w-[300px]">
              <FacultyCard
                member={facultyData[0]}
                featured={true}
                index={0}
              />
            </div>
          </div>

          {/* REMAINING FACULTY ROWS 1 - 4 (FACULTY 02 - 13): 3-COLUMN CSS GRID */}
          <div
            className="grid grid-cols-3 gap-2 sm:gap-3 w-full"
            style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
          >
            {facultyData.slice(1, 13).map((member, idx) => (
              <FacultyCard
                key={member.id}
                member={member}
                index={idx + 1}
              />
            ))}
          </div>

          {/* INTERMEDIATE ROW (FACULTY 14 - 15): 2 CARDS BALANCED & CENTERED */}
          <div className="flex justify-center gap-2 sm:gap-3 w-full">
            <div className="w-[calc((100%-1rem)/3)] sm:w-[calc((100%-1.5rem)/3)] min-w-0">
              <FacultyCard
                member={facultyData[13]}
                index={13}
              />
            </div>
            <div className="w-[calc((100%-1rem)/3)] sm:w-[calc((100%-1.5rem)/3)] min-w-0">
              <FacultyCard
                member={facultyData[14]}
                index={14}
              />
            </div>
          </div>

          {/* CRITICAL FINAL ROW (FACULTY 16 - 18): 3 CARDS IN ONE SINGLE ROW */}
          <div
            className="grid grid-cols-3 gap-2 sm:gap-3 w-full"
            style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
          >
            {facultyData.slice(15, 18).map((member, idx) => (
              <FacultyCard
                key={member.id}
                member={member}
                index={idx + 15}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
export default TeamSection;
