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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [impacts, setImpacts] = useState<ClickImpact[]>([]);

  // Check hardware capabilities: pointer: fine & prefers-reduced-motion
  useEffect(() => {
    const fineQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsFinePointer(fineQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

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

  // Magnetic displacement calculation (desktop only, bounded safely)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || !isFinePointer || prefersReducedMotion) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Relative mouse position percentage inside button for highlight tracking
    const posX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const posY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x: posX, y: posY });

    // Strength depends on level (Level 1: 0.15, Level 2: 0.22, Level 3: 0.3)
    const strengthMultiplier = level === 1 ? 0.15 : level === 3 ? 0.28 : 0.22;
    const maxMoveX = level === 1 ? 5 : level === 3 ? 10 : 8;
    const maxMoveY = level === 1 ? 4 : level === 3 ? 8 : 6;

    const boundedX = Math.max(-maxMoveX, Math.min(maxMoveX, deltaX * strengthMultiplier));
    const boundedY = Math.max(-maxMoveY, Math.min(maxMoveY, deltaY * strengthMultiplier));

    setPosition({ x: boundedX, y: boundedY });
    // Text/content shifts an extra subtle 2-3px for internal physical parallax
    setContentOffset({ x: boundedX * 0.45, y: boundedY * 0.45 });
  }, [isFinePointer, prefersReducedMotion, level]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
    setContentOffset({ x: 0, y: 0 });
  };

  // Tactile click handler + Comic Impact Burst for Level 3 CTAs
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;

    // Trigger subtle comic impact burst on Level 2 & 3 buttons
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
    primary: "bg-[#FF0022] hover:bg-[#FF3D00] text-white border border-[#FF0022] active:bg-[#D9001D]",
    secondary: "bg-[#141414] hover:bg-[#1f1f1f] text-[#FCFAED] border border-[#333333] hover:border-[#FF0022] active:bg-[#0D0D0D]",
    outline: "bg-transparent text-[#FCFAED] border border-[#565656] hover:border-[#FF0022] hover:text-white active:bg-white/5",
    ivory: "bg-[#FCFAED] text-[#0D0D0D] border border-[#FCFAED] hover:bg-white font-semibold active:bg-[#FCFAED]/90",
  };

  const sizeStyles = {
    sm: "min-h-[44px] px-4 py-2 text-xs",
    md: "min-h-[48px] px-5 sm:px-6 py-3 text-xs sm:text-sm",
    lg: "min-h-[48px] sm:min-h-[56px] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-base font-bold",
  };

  const buttonContent = (
    <motion.div
      ref={buttonRef}
      style={{
        x: isFinePointer && !prefersReducedMotion ? position.x : 0,
        y: isFinePointer && !prefersReducedMotion ? position.y : 0,
      }}
      whileTap={{ scale: 0.96, y: 1.5 }}
      transition={{ type: "spring", stiffness: 450, damping: 26 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center gap-2.5 font-mono-tech tracking-wider uppercase select-none transition-colors duration-200 overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0022] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {/* 1. Corner Architectural Notch */}
      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#0D0D0D] clip-diagonal-left pointer-events-none z-20" />

      {/* 2. Cursor-Position Aware Highlight (Desktop Only, matches existing color palette) */}
      {isFinePointer && !prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-1"
          style={{
            opacity: isHovered ? 1 : 0,
            background: variant === 'primary'
              ? `radial-gradient(circle 80px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.28), transparent 70%)`
              : `radial-gradient(circle 80px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 0, 34, 0.22), transparent 70%)`,
          }}
        />
      )}

      {/* 3. Hand-Drawn Comic Border Sweep on Hover (Level 2 & 3) */}
      {level >= 2 && !prefersReducedMotion && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible">
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            fill="none"
            stroke={variant === 'primary' ? '#FFFFFF' : '#FF0022'}
            strokeWidth="1.5"
            strokeDasharray="360"
            strokeDashoffset={isHovered ? 0 : 360}
            className="transition-all duration-400 ease-out opacity-75"
          />
        </svg>
      )}

      {/* 4. Button Internal Content with Parallax Micro-Shift */}
      <motion.div
        style={{
          x: isFinePointer && !prefersReducedMotion ? contentOffset.x : 0,
          y: isFinePointer && !prefersReducedMotion ? contentOffset.y : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="relative z-10 flex items-center gap-2"
      >
        {children ? (
          children
        ) : (
          <>
            <span className="inline-block transition-transform duration-200">
              {isHovered && hoverText ? hoverText : defaultText}
            </span>

            {/* Direction-Aware Arrow Animation */}
            <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center shrink-0">
              <motion.span
                animate={isHovered && !prefersReducedMotion ? { x: [0, 16, -16, 0] } : { x: 0 }}
                transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
                className="inline-flex items-center"
              >
                <ArrowRight className="w-4 h-4 text-current" />
              </motion.span>
            </div>
          </>
        )}
      </motion.div>

      {/* 5. Comic Tactile Impact Burst on Click */}
      <AnimatePresence>
        {impacts.map((impact) => (
          <motion.div
            key={impact.id}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            style={{
              left: impact.x - 20,
              top: impact.y - 20,
            }}
            className="absolute pointer-events-none z-30 w-10 h-10 flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full border border-[#FCFAED] bg-[#FF3D00]/20" />
            <div className="absolute w-12 h-[1.5px] bg-[#FF0022] rotate-45" />
            <div className="absolute w-12 h-[1.5px] bg-[#FF0022] -rotate-45" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 6. Subtle Bottom Baseline Accent */}
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
    </motion.div>
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
