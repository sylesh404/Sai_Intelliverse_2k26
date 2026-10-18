import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

/**
 * MASTER ANIMATED BACKGROUND SYSTEM — SAI INTELLIVERSE 3.0
 *
 * Multi-layer architecture:
 * Layer 0: Base Deep Black & Subtle Cinematic Atmosphere
 * Layer 1: Film & Paper Grain Texture
 * Layer 2: Large Slow-Moving Abstract Editorial Forms
 * Layer 3: Technical Blueprint Coordinate Grid
 * Layer 4: Comic Halftone Dot Pattern (Edge Clustered)
 * Layer 5: Hand-Drawn Irregular Ink Speedlines
 * Layer 6: Intentional Red Graphic Accents
 * Layer 7: Subtle Atmospheric Radial Breathing Glow
 * Layer 8: Parallax & Scroll-Velocity Reactivity
 *
 * Strict Constraints:
 * - Palette: #6C3082, #823A9D, #0D0D0D, #FCFAED, #FFFFFF, #565656
 * - Supporting atmosphere only: Central "quiet zone" keeps all content 100% legible
 * - Edge-based motion playground (left/right margins and corners)
 * - 60 FPS GPU-accelerated transforms & SVG stroke animations
 * - Responsive: Mobile-optimized with reduced density
 * - Accessibility: Full prefers-reduced-motion support
 */

export const AnimatedBackground: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor viewport width and reduced motion preferences
  useEffect(() => {
    const checkCapabilities = () => {
      setIsMobile(window.innerWidth < 768);
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkCapabilities();
    window.addEventListener('resize', checkCapabilities);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkCapabilities);

    return () => {
      window.removeEventListener('resize', checkCapabilities);
      motionQuery.removeEventListener('change', checkCapabilities);
    };
  }, []);

  // Global Scroll & Velocity Tracking for Parallax
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Multi-tier Parallax Displacements
  // Background layer (0.04x)
  const bgParallax = useTransform(scrollY, [0, 10000], [0, prefersReducedMotion ? 0 : -350]);
  // Midground layer (0.08x)
  const midParallax = useTransform(scrollY, [0, 10000], [0, prefersReducedMotion ? 0 : -750]);
  // Foreground layer (0.12x)
  const fgParallax = useTransform(scrollY, [0, 10000], [0, prefersReducedMotion ? 0 : -1100]);

  // Subtle velocity-driven breathing factor
  const velocitySqueeze = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    prefersReducedMotion ? [1, 1, 1] : [1.025, 1, 1.025]
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none w-full h-full bg-[#0D0D0D]"
    >
      {/* ============================================================== */}
      {/* LAYER 0: BASE DEEP BLACK & ATMOSPHERIC LIGHTING                */}
      {/* ============================================================== */}
      <div className="absolute inset-0 bg-[#0D0D0D] w-full h-full" />

      {/* Cinematic peripheral vignette: frames content like an editorial poster */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-1"
        style={{
          background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 45%, rgba(13, 13, 13, 0.85) 100%)',
        }}
      />

      {/* ============================================================== */}
      {/* LAYER 1: VINTAGE FILM & PAPER NOISE GRAIN                       */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-2 comic-grain-bg opacity-25 md:opacity-35"
        style={{
          backgroundSize: '12px 12px',
        }}
      />

      {/* ============================================================== */}
      {/* LAYER 2: LARGE SLOW-MOVING ABSTRACT EDITORIAL FORMS             */}
      {/* Non-synchronized, long-duration movements (26s, 38s, 52s)     */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: bgParallax, scale: velocitySqueeze }}
        className="absolute inset-0 w-full h-full pointer-events-none z-3 overflow-hidden"
      >
        {/* Shape A: Large Angular Editorial Wedge (Top-Left quadrant) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [-20, 25, -20],
                  y: [-15, 20, -15],
                  rotate: [-1, 2, -1],
                }
          }
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-20 w-[420px] md:w-[680px] h-[360px] md:h-[580px] bg-[#141414] border border-[#262626]/30 clip-diagonal-right opacity-30 md:opacity-40"
        />

        {/* Shape B: Oversized Concentric Geometric Ring (Right margin) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: [0, 360],
                  scale: [1, 1.04, 1],
                }
          }
          transition={{
            duration: 64,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[28%] -right-36 md:-right-48 w-[400px] md:w-[620px] h-[400px] md:h-[620px] rounded-full border-[1.5px] border-dashed border-[#A855F7]/20 pointer-events-none"
        >
          {/* Internal concentric technical rings */}
          <div className="absolute inset-10 rounded-full border border-[#8B35AD]/20" />
          <div className="absolute inset-24 rounded-full border border-dotted border-[#C084FC]/25" />
          <div className="absolute top-0 left-1/2 w-3.5 h-3.5 bg-[#C084FC] -translate-x-1/2 -translate-y-1/2 clip-diagonal-left shadow-[0_0_10px_#C084FC]" />
          <div className="absolute bottom-0 right-1/4 w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
        </motion.div>

        {/* Shape B2: Secondary Geometric Ring (Left Margin, Slow Counter-Rotation) */}
        {!isMobile && (
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    rotate: [360, 0],
                    scale: [1, 1.03, 1],
                  }
            }
            transition={{
              duration: 52,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-[65%] -left-32 w-[340px] md:w-[480px] h-[340px] md:h-[480px] rounded-full border border-dashed border-[#8B35AD]/20 pointer-events-none"
          >
            <div className="absolute inset-8 rounded-full border border-[#A855F7]/15" />
            <div className="absolute right-0 top-1/2 w-3 h-3 bg-[#A855F7] -translate-y-1/2 clip-diagonal-right shadow-[0_0_8px_#A855F7]" />
          </motion.div>
        )}

        {/* Shape C: Large Geometric Fragment (Bottom-Left margin) */}
        {!isMobile && (
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: [15, -25, 15],
                    y: [20, -15, 20],
                    rotate: [2, -2, 2],
                  }
            }
            transition={{
              duration: 48,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-10%] -left-24 w-[520px] h-[480px] bg-[#151019] border-t border-r border-[#8B35AD]/25 clip-skew-corner opacity-35"
          />
        )}

        {/* Shape D: Ghost Typographic Watermarks ('3.0' and 'AI') */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-10, 15, -10],
                }
          }
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[18%] left-3 md:left-8 font-display font-black text-[9rem] md:text-[18rem] xl:text-[24rem] leading-none text-[#FCFAED]/[0.025] select-none pointer-events-none"
        >
          3.0
        </motion.div>

        {!isMobile && (
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [15, -15, 15],
                  }
            }
            transition={{
              duration: 34,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[20%] right-4 md:right-10 font-display font-black text-[8rem] md:text-[16rem] xl:text-[22rem] leading-none text-[#6C3082]/[0.02] select-none pointer-events-none"
          >
            AI
          </motion.div>
        )}
      </motion.div>

      {/* ============================================================== */}
      {/* LAYER 3: TECHNICAL BLUEPRINT GRID & CROSSHAIRS                  */}
      {/* Fades toward the center safe corridor via radial mask          */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: midParallax }}
        className="absolute inset-0 w-full h-full pointer-events-none z-4 overflow-hidden"
      >
        <svg
          className="absolute inset-0 w-full h-full stroke-[#565656]/20 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fine Blueprint Coordinate Grid pattern */}
            <pattern
              id="bg-blueprint-grid"
              width={isMobile ? "40" : "60"}
              height={isMobile ? "40" : "60"}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={isMobile ? "M 40 0 L 0 0 0 40" : "M 60 0 L 0 0 0 60"}
                fill="none"
                strokeWidth="0.5"
                stroke="rgba(255, 255, 255, 0.04)"
              />
            </pattern>

            {/* Precision Crosshair Target Pattern */}
            <pattern
              id="bg-crosshairs"
              width={isMobile ? "160" : "240"}
              height={isMobile ? "160" : "240"}
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 120 112 L 120 128 M 112 120 L 128 120"
                strokeWidth="0.75"
                stroke="rgba(252, 250, 237, 0.12)"
              />
              <circle cx="120" cy="120" r="2" fill="none" stroke="rgba(108, 48, 130, 0.25)" strokeWidth="0.5" />
            </pattern>

            {/* Center Quiet Zone Mask: protects central readability */}
            <radialGradient id="center-quiet-mask" cx="50%" cy="50%" r="55%">
              <stop offset="30%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </radialGradient>

            <mask id="blueprint-mask">
              <rect width="100%" height="100%" fill="url(#center-quiet-mask)" />
            </mask>
          </defs>

          {/* Render blueprint grid masked out of center */}
          <rect width="100%" height="100%" fill="url(#bg-blueprint-grid)" mask="url(#blueprint-mask)" />
          <rect width="100%" height="100%" fill="url(#bg-crosshairs)" mask="url(#blueprint-mask)" />

          {/* Architectural diagonal guide lines running across viewport */}
          <line
            x1="0"
            y1="18%"
            x2="100%"
            y2="82%"
            stroke="#FCFAED"
            strokeWidth="0.5"
            strokeDasharray="16 32"
            opacity={isMobile ? "0.03" : "0.06"}
          />
          <line
            x1="100%"
            y1="12%"
            x2="0"
            y2="74%"
            stroke="#6C3082"
            strokeWidth="0.5"
            strokeDasharray="10 24"
            opacity={isMobile ? "0.03" : "0.06"}
          />
        </svg>

        {/* Technical Coordinate Stamps near viewport margins */}
        <div className="absolute top-28 left-4 font-mono-tech text-[9px] text-[#565656]/60 tracking-widest hidden md:block">
          <span>SYS_GRID // 12.9602° N, 80.0573° E</span>
        </div>
        <div className="absolute top-[45%] right-4 font-mono-tech text-[9px] text-[#565656]/50 tracking-widest hidden lg:block rotate-90 origin-right">
          <span>ATMOSPHERE_LEVEL_3.0 // ACTIVE</span>
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* LAYER 4: COMIC HALFTONE TEXTURE (EDGE-BASED)                    */}
      {/* Mimics authentic retro comic newsprint near margins             */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: midParallax }}
        className="absolute inset-0 w-full h-full pointer-events-none z-5 overflow-hidden"
      >
        {/* Top-Right Halftone cluster */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, 12, 0],
                  y: [0, -10, 0],
                  opacity: [0.08, 0.13, 0.08],
                }
          }
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-72 md:w-[480px] h-72 md:h-[480px] comic-halftone-pattern pointer-events-none"
          style={{
            maskImage: 'radial-gradient(circle at 100% 0%, black 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at 100% 0%, black 25%, transparent 75%)',
          }}
        />

        {/* Bottom-Left Halftone cluster */}
        {!isMobile && (
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: [0, -15, 0],
                    y: [0, 12, 0],
                    opacity: [0.06, 0.11, 0.06],
                  }
            }
            transition={{
              duration: 42,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-12 left-0 w-64 md:w-[420px] h-64 md:h-[420px] comic-halftone-pattern pointer-events-none"
            style={{
              maskImage: 'radial-gradient(circle at 0% 100%, black 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(circle at 0% 100%, black 20%, transparent 75%)',
            }}
          />
        )}
      </motion.div>

      {/* ============================================================== */}
      {/* LAYER 5: HAND-DRAWN INK SPEEDLINES & MARKS                      */}
      {/* SVG strokes that draw and retract organically                   */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: fgParallax }}
        className="absolute inset-0 w-full h-full pointer-events-none z-6 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="w-full h-full pointer-events-none"
        >
          {/* Top-Left Hand-Drawn Speedline Arc */}
          <motion.path
            d="M-20,180 Q180,140 380,210 T720,170"
            fill="none"
            stroke="#FCFAED"
            strokeWidth="1.2"
            strokeDasharray="450"
            animate={
              prefersReducedMotion
                ? { strokeDashoffset: 0 }
                : {
                    strokeDashoffset: [450, 0, -450],
                    opacity: [0, 0.12, 0],
                  }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          />

          {/* Right Margin Ink Speed Hash */}
          <motion.path
            d="M1460,520 Q1240,490 1020,560"
            fill="none"
            stroke="#6C3082"
            strokeWidth="1.5"
            strokeDasharray="380"
            animate={
              prefersReducedMotion
                ? { strokeDashoffset: 0 }
                : {
                    strokeDashoffset: [-380, 0, 380],
                    opacity: [0, 0.14, 0],
                  }
            }
            transition={{
              duration: 29,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
              times: [0, 0.5, 1],
            }}
          />

          {/* Center-Left Technical Marker Dash */}
          <motion.line
            x1="40"
            y1="640"
            x2="160"
            y2="640"
            stroke="#823A9D"
            strokeWidth="2"
            strokeDasharray="120"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    strokeDashoffset: [120, 0, -120],
                    opacity: [0.05, 0.25, 0.05],
                  }
            }
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </svg>
      </motion.div>

      {/* ============================================================== */}
      {/* LAYER 6: INTENTIONAL PURPLE GRAPHIC ACCENTS                     */}
      {/* 1 to 3 sparse, high-end editorial purple accents at any time    */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: fgParallax }}
        className="absolute inset-0 w-full h-full pointer-events-none z-7 overflow-hidden"
      >
        {/* Purple Accent 1: Thin Purple Diagonal Telemetry Bar (Left margin) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-30, 40, -30],
                  opacity: [0.45, 0.85, 0.45],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[35%] left-3 md:left-6 flex items-center gap-2 pointer-events-none"
        >
          <div className="w-1.5 h-6 bg-[#A855F7] clip-diagonal-right shadow-[0_0_8px_#A855F7]" />
          <div className="w-12 md:w-20 h-[1.5px] bg-[#A855F7]/80 shadow-[0_0_6px_#A855F7]" />
        </motion.div>

        {/* Purple Accent 2: Small Precision Reticle / Circular Target (Right margin) */}
        {!isMobile && (
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [25, -35, 25],
                    rotate: [0, 180, 360],
                    opacity: [0.35, 0.75, 0.35],
                  }
            }
            transition={{
              duration: 34,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute top-[60%] right-6 w-8 h-8 rounded-full border border-[#C084FC]/70 shadow-[0_0_12px_rgba(168,85,247,0.3)] flex items-center justify-center pointer-events-none"
          >
            <div className="w-3 h-[1px] bg-[#C084FC]" />
            <div className="h-3 w-[1px] bg-[#C084FC] absolute" />
          </motion.div>
        )}

        {/* Purple Accent 3: Technical Bracket Marker (Bottom right) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.35, 0.75, 0.35],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 right-6 font-mono-tech text-[10px] text-[#C084FC] tracking-wider hidden md:block"
        >
          [ SEC_RADAR // 3.0 // VIBRANT ]
        </motion.div>
      </motion.div>

      {/* ============================================================== */}
      {/* LAYER 7: VIBRANT ATMOSPHERIC VOLUMETRIC AMBIENT LIGHTING        */}
      {/* Dynamic, warm, high-contrast purple & lavender illumination     */}
      {/* ============================================================== */}
      {/* Orb 1: Upper Atmospheric Purple Glow */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { opacity: 0.18 }
            : {
                opacity: [0.16, 0.28, 0.16],
                x: ['-50%', '-48%', '-52%', '-50%'],
                y: ['-20%', '-25%', '-18%', '-20%'],
              }
        }
        transition={{
          duration: 48,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 w-[420px] sm:w-[700px] lg:w-[920px] h-[340px] sm:h-[500px] lg:h-[620px] bg-gradient-to-tr from-[#6C3082]/25 via-[#8B35AD]/30 to-[#A855F7]/20 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none z-2"
      />

      {/* Orb 2: Lower-Right Warm Purple Volumetric Pool */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { opacity: 0.15 }
            : {
                opacity: [0.14, 0.25, 0.14],
                x: [0, 35, -25, 0],
                y: [0, -40, 20, 0],
              }
        }
        transition={{
          duration: 58,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-1/4 right-1/4 w-[380px] sm:w-[620px] lg:w-[780px] h-[320px] sm:h-[460px] lg:h-[580px] bg-gradient-to-br from-[#8B35AD]/25 via-[#A855F7]/20 to-transparent rounded-full blur-[110px] sm:blur-[140px] pointer-events-none z-2"
      />

      {/* Orb 3: Mid-Left Atmospheric Illumination (Supporting Content Corridor) */}
      {!isMobile && (
        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.12 }
              : {
                  opacity: [0.12, 0.22, 0.12],
                  y: [0, 45, -30, 0],
                }
          }
          transition={{
            duration: 62,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[50%] left-[-10%] w-[450px] lg:w-[680px] h-[380px] lg:h-[520px] bg-gradient-to-r from-[#6C3082]/20 via-[#8B35AD]/18 to-transparent rounded-full blur-[120px] pointer-events-none z-2"
        />
      )}
    </div>
  );
};

export default AnimatedBackground;
