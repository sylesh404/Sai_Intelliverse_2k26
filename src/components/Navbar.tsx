import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import symposiumConfig from '../config/symposiumConfig';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface NavbarProps {
  onOpenRegister: () => void;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onGoHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navLinks = [
    { label: "ABOUT", href: "#about", code: "01", id: "about" },
    { label: "VISION", href: "#vision-mission", code: "02", id: "vision-mission" },
    { label: "EVENTS", href: "#events", code: "03", id: "events" },
    { label: "SCHEDULE", href: "#schedule", code: "04", id: "schedule" },
    { label: "FACULTY", href: "#team", code: "05", id: "team" },
    { label: "GALLERY", href: "#gallery", code: "06", id: "gallery" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['about', 'vision-mission', 'events', 'schedule', 'team', 'gallery'];
    const observers: IntersectionObserver[] = [];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(observerCallback, observerOptions);
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onGoHome?.();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 sm:py-3 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#262626] shadow-2xl'
            : 'py-4 sm:py-6 bg-gradient-to-b from-[#0D0D0D]/95 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo with technical label */}
          <a
            href="/"
            onClick={handleBrandClick}
            className="flex items-center gap-2.5 sm:gap-3 group no-underline cursor-pointer"
            aria-label="SAI INTELLIVERSE 3.0 Home"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FF0022] flex items-center justify-center font-display font-black text-white text-xs sm:text-sm clip-diagonal-right group-hover:bg-[#FF3D00] transition-colors shadow-md shrink-0">
              3.0
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-extrabold text-xs min-[360px]:text-sm sm:text-lg tracking-tight text-[#FCFAED] group-hover:text-white transition-colors leading-tight truncate">
                {symposiumConfig.name}
              </span>
              <span className="font-mono-tech text-[8px] sm:text-[9px] tracking-widest text-[#FF0022] font-semibold truncate">
                {symposiumConfig.edition}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Active Indicator */}
          <nav className="hidden md:flex items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8 font-mono-tech text-[11px] lg:text-xs tracking-wider shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`relative py-1.5 transition-colors group ${
                    isActive ? 'text-white font-bold' : 'text-[#FCFAED]/75 hover:text-white'
                  }`}
                >
                  <span
                    className={`text-[10px] mr-1.5 font-bold transition-opacity ${
                      isActive ? 'text-[#FF0022] opacity-100' : 'text-[#FF0022] opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {link.code}
                  </span>
                  <span>{link.label}</span>

                  {/* Active / Hover Animated Underline Indicator */}
                  {isActive ? (
                    <motion.span
                      layoutId="navActiveIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF0022] shadow-[0_0_8px_rgba(255,0,34,0.7)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF0022] transition-all duration-200 group-hover:w-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-4">
            <MagneticButton
              size="sm"
              variant="primary"
              level={2}
              defaultText="REGISTER"
              hoverText="GOOGLE FORM"
              href={symposiumConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onOpenRegister}
            />
          </div>

          {/* Mobile Actions: Register + Menu Button (Accessible touch targets) */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <MagneticButton
              size="sm"
              variant="primary"
              level={2}
              defaultText="REGISTER"
              href={symposiumConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenRegister()}
              className="!px-2.5 !py-1 text-[11px] sm:text-xs"
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#333333] hover:border-[#FF0022] bg-[#141414] text-[#FCFAED] active:text-[#FF0022] active:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Brutalist Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#0D0D0D] flex flex-col justify-between p-4 sm:p-6 pt-20 sm:pt-24 overflow-y-auto md:hidden"
          >
            {/* Header row in mobile menu */}
            <div className="flex items-center justify-between border-b border-[#262626] pb-3 text-xs font-mono-tech text-[#565656]">
              <span>NAVIGATION DIRECTORY</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] px-3 text-[#FF0022] font-bold uppercase flex items-center gap-1 cursor-pointer hover:text-white active:text-[#FF3D00] transition-colors"
              >
                <span>CLOSE</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Vertically stacked links with min-h-[48px] */}
            <div className="flex flex-col space-y-1 my-auto py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="min-h-[48px] flex items-center justify-between py-2 border-b border-[#1A1A1A] group active:bg-[#141414] px-2 transition-colors cursor-pointer"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono-tech text-xs text-[#FF0022]">
                      {link.code}
                    </span>
                    <span className="font-display font-extrabold text-2xl text-[#FCFAED] group-hover:text-[#FF0022] transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#565656] group-hover:text-[#FF0022]" />
                </a>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#262626] flex flex-col gap-3">
              <MagneticButton
                variant="primary"
                size="md"
                level={3}
                defaultText="REGISTER FOR EVENTS"
                hoverText="GOOGLE FORM"
                href={symposiumConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full min-h-[48px]"
              />

              <div className="flex justify-between text-[10px] font-mono-tech text-[#565656] px-1">
                <span>{symposiumConfig.eventDate}</span>
                <span>{symposiumConfig.venue.split(',')[0]}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
