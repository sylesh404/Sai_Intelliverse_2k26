import React from 'react';
import symposiumConfig from '../config/symposiumConfig';
import MagneticButton from '../components/MagneticButton';
import { ArrowUp, Mail, Phone, MapPin, UserCheck, Users } from 'lucide-react';
import { facultyCoordinators, studentCoordinators } from '../data/coordinators';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080A0F] border-t-2 border-[#263643] pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-12 font-mono-tech text-xs text-[#A9BAC8] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Top Tier: Logo + Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#263643] pb-8 sm:pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#35DDF5] to-[#7DEBFF] text-[#080A0F] flex items-center justify-center font-display font-black text-sm clip-diagonal-right shadow-[0_0_12px_rgba(53,221,245,0.5)]">
                3.0
              </div>
              <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                {symposiumConfig.name}
              </span>
              <span className="text-[#7DEBFF] font-mono-tech text-xs bg-[#35DDF5]/15 px-2 py-0.5 border border-[#35DDF5]/40 font-bold">
                {symposiumConfig.edition}
              </span>
            </div>
            <p className="text-xs text-[#A9BAC8] max-w-md uppercase leading-relaxed">
              {symposiumConfig.department} · {symposiumConfig.college}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              variant="primary"
              size="sm"
              level={2}
              defaultText="REGISTER NOW"
              hoverText="GOOGLE FORM"
              href={symposiumConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
            />

            <MagneticButton
              variant="secondary"
              size="sm"
              level={1}
              onClick={scrollToTop}
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-4 h-4 text-current group-hover:-translate-y-1 transition-transform" />
            </MagneticButton>
          </div>
        </div>

        {/* Middle Tier: Strictly stacked on mobile, 4-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Venue & Location */}
          <div className="space-y-2.5">
            <span className="text-[#F4FDFF] font-bold uppercase block text-xs">EVENT VENUE</span>
            <div className="text-sm font-bold text-white tracking-wide">
              {symposiumConfig.venue}
            </div>
            <div className="flex items-start gap-2 text-xs text-[#F4FDFF]/85 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#35DDF5] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#F4FDFF] uppercase">{symposiumConfig.college}</p>
                <p className="text-[11px] text-[#A9BAC8] mt-1 leading-relaxed">
                  {symposiumConfig.address}
                </p>
              </div>
            </div>
          </div>

          {/* Direct Contact with word wrapping */}
          <div className="space-y-2.5">
            <span className="text-[#F4FDFF] font-bold uppercase block text-xs">HOTLINES</span>
            <div className="space-y-2">
              <a
                href={`mailto:${symposiumConfig.contactEmail}`}
                className="flex items-center gap-2 text-[#F4FDFF]/90 hover:text-[#7DEBFF] transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#35DDF5] shrink-0" />
                <span>{symposiumConfig.contactEmail}</span>
              </a>
            </div>
          </div>

          {/* Socials with 48px touch targets */}
          <div className="space-y-2.5">
            <span className="text-[#F4FDFF] font-bold uppercase block text-xs">COMMUNICATION RADAR</span>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={symposiumConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#263643] hover:border-[#4DE6FF] text-[#A9BAC8] hover:text-[#7DEBFF] bg-[#10151D] hover:bg-[#141C26] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={symposiumConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#263643] hover:border-[#4DE6FF] text-[#A9BAC8] hover:text-[#7DEBFF] bg-[#10151D] hover:bg-[#141C26] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={symposiumConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#263643] hover:border-[#4DE6FF] text-[#A9BAC8] hover:text-[#7DEBFF] bg-[#10151D] hover:bg-[#141C26] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={symposiumConfig.socials.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#263643] hover:border-[#4DE6FF] text-[#A9BAC8] hover:text-[#7DEBFF] bg-[#10151D] hover:bg-[#141C26] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Technical Telemetry */}
          <div className="space-y-2.5">
            <span className="text-[#F4FDFF] font-bold uppercase block text-xs">SYSTEM METRICS</span>
            <div className="text-[11px] space-y-1 text-[#A9BAC8]">
              <div>ENGINE: REACT + TAILWIND + FRAMER</div>
              <div>RENDER: GSAP + LENIS SMOOTH</div>
              <div>STATUS: SYSTEM VERIFIED // 3.0</div>
              <div className="text-[#35DDF5] font-bold">EVENT SYSTEM // 3.0 // ONLINE</div>
            </div>
          </div>
        </div>

        {/* Coordinators Section */}
        <div className="border-t border-[#263643] pt-8 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Faculty Co-ordinators */}
            <div className="lg:col-span-5 bg-[#10151D] border border-[#263643] p-4 sm:p-5 relative overflow-hidden min-w-0 shadow-md">
              <div className="absolute top-0 right-0 w-6 h-6 bg-[#35DDF5]/15 clip-diagonal-left" />
              <div className="flex items-center gap-2 text-xs font-bold text-[#F4FDFF] uppercase mb-3.5 tracking-wider border-b border-[#263643] pb-2.5">
                <UserCheck className="w-4 h-4 text-[#35DDF5]" />
                <span>FACULTY CO-ORDINATORS</span>
              </div>
              <div className="space-y-2.5 font-mono-tech">
                {facultyCoordinators.map((fac, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs bg-[#0A111C] p-2.5 border border-[#263643] hover:border-[#4DE6FF]/50 transition-colors min-w-0">
                    <span className="font-bold text-[#F4FDFF] truncate">{idx + 1}. {fac.name}</span>
                    <a
                      href={`tel:${fac.tel}`}
                      className="inline-flex items-center gap-1.5 text-[#F4FDFF]/90 hover:text-[#7DEBFF] transition-colors py-0.5 shrink-0"
                    >
                      <Phone className="w-3 h-3 text-[#35DDF5]" />
                      <span>{fac.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Co-ordinators */}
            <div className="lg:col-span-7 bg-[#10151D] border border-[#263643] p-4 sm:p-5 relative overflow-hidden min-w-0 shadow-md">
              <div className="absolute top-0 right-0 w-6 h-6 bg-[#35DDF5]/15 clip-diagonal-left" />
              <div className="flex items-center gap-2 text-xs font-bold text-[#F4FDFF] uppercase mb-3.5 tracking-wider border-b border-[#263643] pb-2.5">
                <Users className="w-4 h-4 text-[#35DDF5]" />
                <span>STUDENT CO-ORDINATORS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono-tech">
                {studentCoordinators.map((stu, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs bg-[#0A111C] p-2.5 border border-[#263643] hover:border-[#4DE6FF]/50 transition-colors min-w-0">
                    <span className="font-bold text-[#F4FDFF] truncate">{idx + 1}. {stu.name}</span>
                    <a
                      href={`tel:${stu.tel}`}
                      className="inline-flex items-center gap-1.5 text-[#F4FDFF]/90 hover:text-[#7DEBFF] transition-colors py-0.5 shrink-0"
                    >
                      <Phone className="w-3 h-3 text-[#35DDF5]" />
                      <span>{stu.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Technical signature */}
        <div className="border-t border-[#263643] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#A9BAC8]">
          <div className="leading-relaxed">
            © 2026 {symposiumConfig.department}, {symposiumConfig.college}. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-2">
            <span>END OF EXPERIENCE</span>
            <span className="w-1.5 h-1.5 bg-[#35DDF5] rounded-full shadow-[0_0_6px_rgba(53,221,245,0.8)]" />
            <span className="text-[#F4FDFF] font-bold">SAI INTELLIVERSE 3.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
