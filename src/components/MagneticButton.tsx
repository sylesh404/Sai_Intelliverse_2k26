import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface MagneticButtonProps {
  children?: React.ReactNode;
  defaultText?: string;
  hoverText?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ivory';
  size?: 'sm' | 'md' | 'lg';
  level?: 1 | 2 | 3;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

interface ClickImpact {
  id: number;
  x: number;
  y: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  defaultText = "REGISTER NOW",
  hoverText,
  variant = 'primary',
  size = 'md',
  level = 2,
  onClick,
  href,
  target,
  rel,
  className = '',
  id,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  const [impacts, setImpacts] = useState<ClickImpact[]>([]);

  useEffect(() => {
    const fineQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateCapabilities = () => {
      setIsFinePointer(fineQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    };

    fineQuery.addEventListener('change', updateCapabilities);
    motionQuery.addEventListener('change', updateCapabilities);

    return () => {
      fineQuery.removeEventListener('change', updateCapabilities);
      motionQuery.removeEventListener('change', updateCapabilities);
    };
  }, []);

  // Stationary cursor illumination tracking without moving button position
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || !isFinePointer || prefersReducedMotion) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const posX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const posY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x: posX, y: posY });
  }, [isFinePointer, prefersReducedMotion]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Tactile stationary click flash without layout shifts or displacement
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;

    if (level >= 2 && !prefersReducedMotion && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const newImpact: ClickImpact = {
        id: Date.now() + Math.random(),
        x: clickX,
        y: clickY,
      };

      setImpacts((prev) => [...prev, newImpact]);

      setTimeout(() => {
        setImpacts((prev) => prev.filter((item) => item.id !== newImpact.id));
      }, 350);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const variantStyles = {
    primary:
      "bg-[#FF0022] hover:bg-[#FF3D00] text-white border border-[#FF0022] hover:border-[#FF3D00] hover:shadow-[0_0_24px_rgba(255,61,0,0.45)]",
    secondary:
      "bg-[#141414] hover:bg-[#1a1a1a] text-[#FCFAED] border border-[#333333] hover:border-[#FF3D00] hover:shadow-[0_0_20px_rgba(255,61,0,0.3)]",
    outline:
      "bg-transparent text-[#FCFAED] border border-[#565656] hover:border-[#FF3D00] hover:text-white hover:shadow-[0_0_20px_rgba(255,61,0,0.3)]",
    ivory:
      "bg-[#FCFAED] text-[#0D0D0D] border border-[#FCFAED] hover:bg-white font-semibold hover:shadow-[0_0_20px_rgba(252,250,237,0.35)]",
  };

  const sizeStyles = {
    sm: "min-h-[44px] px-4 py-2 text-xs",
    md: "min-h-[48px] px-5 sm:px-6 py-3 text-xs sm:text-sm",
    lg: "min-h-[48px] sm:min-h-[56px] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-base font-bold",
  };

  const buttonContent = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center gap-2.5 font-mono-tech tracking-wider uppercase select-none transition-all duration-300 overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {/* 1. Corner Architectural Notch */}
      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#0D0D0D] clip-diagonal-left pointer-events-none z-20" />

      {/* 2. Directional Orange Reveal Fill (for outline & secondary) */}
      {(variant === 'outline' || variant === 'secondary') && (
        <span className="absolute inset-0 bg-gradient-to-r from-[#FF0022] to-[#FF3D00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
      )}

      {/* 3. Cursor-Position Aware Highlight (Stationary, subtle surface lighting) */}
      {isFinePointer && !prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-1"
          style={{
            opacity: isHovered ? 1 : 0,
            background:
              variant === 'primary'
                ? `radial-gradient(circle 90px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.28), transparent 70%)`
                : `radial-gradient(circle 90px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 61, 0, 0.25), transparent 70%)`,
          }}
        />
      )}

      {/* 4. Animated Border Sweep on Hover (Level 2 & 3, stationary border drawing) */}
      {level >= 2 && !prefersReducedMotion && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible">
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            fill="none"
            stroke={variant === 'primary' ? '#FFFFFF' : '#FF3D00'}
            strokeWidth="1.5"
            strokeDasharray="360"
            strokeDashoffset={isHovered ? 0 : 360}
            className="transition-all duration-500 ease-out opacity-85"
          />
        </svg>
      )}

      {/* 5. Button Internal Content (Stationary text & icon, smooth color illumination) */}
      <div className="relative z-10 flex items-center gap-2">
        {children ? (
          children
        ) : (
          <>
            <span className="relative inline-block transition-colors duration-200">
              {isHovered && hoverText ? hoverText : defaultText}
              {/* Subtle underline illumination */}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-current transition-all duration-300 group-hover:w-full opacity-80" />
            </span>

            {/* Stationary Icon with Subtle Glow */}
            <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-current transition-colors duration-200" />
            </div>
          </>
        )}
      </div>

      {/* 6. Stationary Click Flash Indicator */}
      <AnimatePresence>
        {impacts.map((impact) => (
          <motion.div
            key={impact.id}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              left: impact.x - 30,
              top: impact.y - 30,
            }}
            className="absolute pointer-events-none z-30 w-16 h-16 rounded-full bg-white/20 blur-sm"
          />
        ))}
      </AnimatePresence>

      {/* 7. Subtle Bottom Baseline Accent */}
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
    </div>
  );

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        onClick={handleClick}
        aria-label={ariaLabel || (typeof defaultText === 'string' ? defaultText : undefined)}
        className="inline-block no-underline"
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      aria-label={ariaLabel || (typeof defaultText === 'string' ? defaultText : undefined)}
      className="inline-block bg-transparent p-0 border-0 cursor-pointer text-left"
    >
      {buttonContent}
    </button>
  );
};

export default MagneticButton;
