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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const navLinks = [
    { label: "DEPT", href: "#department", code: "00" },
    { label: "ABOUT", href: "#about", code: "01" },
    { label: "EVENTS", href: "#events", code: "02" },
    { label: "SCHEDULE", href: "#schedule", code: "03" },
    { label: "FACULTY", href: "#team", code: "04" },
    { label: "GALLERY", href: "#gallery", code: "05" },
  ];

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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'py-2.5 sm:py-3 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#262626]'
            : 'py-4 sm:py-6 bg-gradient-to-b from-[#0D0D0D]/90 to-transparent'
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
            <div className="w-8 h-8 bg-[#FF0022] flex items-center justify-center font-display font-black text-white text-sm clip-diagonal-right group-hover:bg-[#FF3D00] transition-colors">
              3.0
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-[#FCFAED] group-hover:text-white transition-colors leading-tight">
                {symposiumConfig.name}
              </span>
              <span className="font-mono-tech text-[9px] tracking-widest text-[#FF0022]">
                {symposiumConfig.edition}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 font-mono-tech text-xs tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="relative text-[#FCFAED]/80 hover:text-white transition-colors py-1 group"
              >
                <span className="text-[#FF0022] text-[10px] mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.code}
                </span>
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF0022] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
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

          {/* Mobile Actions: Register + Menu Button (48px touch targets) */}
          <div className="flex md:hidden items-center gap-2">
            <MagneticButton
              size="sm"
              variant="primary"
              level={2}
              defaultText="REGISTER"
              href={symposiumConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenRegister()}
              className="!px-3 !py-1.5 text-xs"
            />
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#333333] hover:border-[#FF0022] bg-[#141414] text-[#FCFAED] active:text-[#FF0022] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
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
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] px-3 text-[#FF0022] font-bold uppercase flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
              >
                <span>CLOSE</span>
                <X className="w-4 h-4" />
              </motion.button>
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
