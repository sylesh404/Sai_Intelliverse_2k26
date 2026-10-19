import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

/**
 * MASTER ICE-BLUE ANIMATED BACKGROUND SYSTEM — SAI INTELLIVERSE 3.0
 *
 * Distinctive ICE-BLUE / ARCTIC-CYAN visual identity:
 * cool, luminous, crystalline, futuristic, elegant, and high-contrast.
 *
 * Multi-layer architecture:
 * Layer 0: Base Deep Arctic Navy & Black (#080A0F, #071521)
 * Layer 1: Crystalline Film & Sub-pixel Paper Texture
 * Layer 2: Slow-Moving Arctic Geometric Outlines & Concentric Rings
 * Layer 3: Technical Blueprint Coordinate Grid & Illuminated Crosshairs
 * Layer 4: Edge-Clustered Arctic Halftone Dot Patterns
 * Layer 5: Luminous Cyan Organic Speedlines & Vector Paths
 * Layer 6: Sparse Crystalline Reticles & Arctic Telemetry Accents
 * Layer 7: Controlled Frozen Cyan Volumetric Ambient Lighting
 * Layer 8: Parallax & Scroll-Velocity Reactivity
 *
 * Strict Constraints:
 * - Palette: #A5F3FF, #7DEBFF, #35DDF5, #D9FAFF, #64CFFF, #F4FDFF, #071521, #080A0F, #263643, #4DE6FF
 * - Central quiet zone maintains 100% typography contrast & readability
 * - Zero distraction, no snowstorms or seasonal holiday tropes
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
  const bgParallax = useTransform(scrollY, [0, 10000], [0, prefersReducedMotion ? 0 : -320]);
  const midParallax = useTransform(scrollY, [0, 10000], [0, prefersReducedMotion ? 0 : -680]);
  const fgParallax = useTransform(scrollY, [0, 10000], [0, prefersReducedMotion ? 0 : -1000]);

  // Velocity-driven breathing factor
  const velocitySqueeze = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    prefersReducedMotion ? [1, 1, 1] : [1.02, 1, 1.02]
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none w-full h-full bg-[#080A0F]"
    >
      {/* ============================================================== */}
      {/* LAYER 0: BASE BLACK BACKGROUND & DEEP ARCTIC VIGNETTE           */}
      {/* ============================================================== */}
      <div className="absolute inset-0 bg-[#080A0F] w-full h-full" />

      {/* Cinematic peripheral vignette: Deep Arctic Navy border glow */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-1"
        style={{
          background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 45%, rgba(7, 21, 33, 0.88) 100%)',
        }}
      />

      {/* ============================================================== */}
      {/* LAYER 1: ICY SUB-PIXEL GRAIN NOISE                             */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-2 comic-grain-bg opacity-20 md:opacity-30"
        style={{
          backgroundSize: '12px 12px',
        }}
      />

      {/* ============================================================== */}
      {/* LAYER 2: SLOW-MOVING ICE-BLUE GEOMETRIC OUTLINES               */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: bgParallax, scale: velocitySqueeze }}
        className="absolute inset-0 w-full h-full pointer-events-none z-3 overflow-hidden"
      >
        {/* Shape A: Crystalline Polygonal Angular Wedge (Top-Left) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [-15, 20, -15],
                  y: [-10, 15, -10],
                  rotate: [-1, 1.5, -1],
                }
          }
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-20 w-[420px] md:w-[680px] h-[360px] md:h-[580px] bg-[#0A111C]/60 border border-[#263643]/50 clip-diagonal-right opacity-30 md:opacity-40"
        />

        {/* Shape B: Concentric Ice-Blue Geometric Ring (Right Margin) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: [0, 360],
                  scale: [1, 1.03, 1],
                }
          }
          transition={{
            duration: 64,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[26%] -right-36 md:-right-48 w-[400px] md:w-[620px] h-[400px] md:h-[620px] rounded-full border-[1.5px] border-dashed border-[#4DE6FF]/25 pointer-events-none"
        >
          {/* Internal concentric crystalline technical rings */}
          <div className="absolute inset-10 rounded-full border border-[#35DDF5]/20" />
          <div className="absolute inset-24 rounded-full border border-dotted border-[#7DEBFF]/25" />
          {/* Luminous cyan vertex nodes */}
          <div className="absolute top-0 left-1/2 w-3.5 h-3.5 bg-[#7DEBFF] -translate-x-1/2 -translate-y-1/2 clip-diagonal-left shadow-[0_0_12px_#7DEBFF]" />
          <div className="absolute bottom-0 right-1/4 w-2 h-2 rounded-full bg-[#35DDF5] shadow-[0_0_10px_#35DDF5]" />
        </motion.div>

        {/* Shape B2: Secondary Geometric Ring (Left Margin, Slow Counter-Rotation) */}
        {!isMobile && (
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    rotate: [360, 0],
                    scale: [1, 1.025, 1],
                  }
            }
            transition={{
              duration: 54,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-[62%] -left-32 w-[340px] md:w-[480px] h-[340px] md:h-[480px] rounded-full border border-dashed border-[#35DDF5]/20 pointer-events-none"
          >
            <div className="absolute inset-8 rounded-full border border-[#7DEBFF]/15" />
            <div className="absolute right-0 top-1/2 w-3 h-3 bg-[#35DDF5] -translate-y-1/2 clip-diagonal-right shadow-[0_0_8px_#35DDF5]" />
          </motion.div>
        )}

        {/* Shape C: Large Crystalline Polygon Fragment (Bottom-Left margin) */}
        {!isMobile && (
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: [12, -20, 12],
                    y: [15, -12, 15],
                    rotate: [1.5, -1.5, 1.5],
                  }
            }
            transition={{
              duration: 48,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-10%] -left-24 w-[520px] h-[480px] bg-[#0A111C]/50 border-t border-r border-[#4DE6FF]/20 clip-skew-corner opacity-30"
          />
        )}

        {/* Shape D: Ghost Crystalline Typographic Watermarks ('3.0' and 'AI') */}
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
          className="absolute top-[18%] left-3 md:left-8 font-display font-black text-[9rem] md:text-[18rem] xl:text-[24rem] leading-none text-[#F4FDFF]/[0.02] select-none pointer-events-none"
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
            className="absolute bottom-[20%] right-4 md:right-10 font-display font-black text-[8rem] md:text-[16rem] xl:text-[22rem] leading-none text-[#35DDF5]/[0.02] select-none pointer-events-none"
          >
            AI
          </motion.div>
        )}
      </motion.div>

      {/* ============================================================== */}
      {/* LAYER 3: TECHNICAL BLUEPRINT GRID & ARCTIC CROSSHAIRS           */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: midParallax }}
        className="absolute inset-0 w-full h-full pointer-events-none z-4 overflow-hidden"
      >
        <svg
          className="absolute inset-0 w-full h-full stroke-[#263643]/30 pointer-events-none"
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
                stroke="rgba(77, 230, 255, 0.05)"
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
                stroke="rgba(165, 243, 255, 0.12)"
              />
              <circle cx="120" cy="120" r="2" fill="none" stroke="rgba(53, 221, 245, 0.3)" strokeWidth="0.5" />
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
            stroke="#A5F3FF"
            strokeWidth="0.5"
            strokeDasharray="16 32"
            opacity={isMobile ? "0.03" : "0.06"}
          />
          <line
            x1="100%"
            y1="12%"
            x2="0"
            y2="74%"
            stroke="#35DDF5"
            strokeWidth="0.5"
            strokeDasharray="10 24"
            opacity={isMobile ? "0.03" : "0.06"}
          />
        </svg>

        {/* Technical Coordinate Stamps near viewport margins */}
        <div className="absolute top-28 left-4 font-mono-tech text-[9px] text-[#A9BAC8]/40 tracking-widest hidden md:block">
          <span>SYS_GRID // 12.9602° N, 80.0573° E // ARCTIC_SYNC</span>
        </div>
        <div className="absolute top-[45%] right-4 font-mono-tech text-[9px] text-[#A9BAC8]/35 tracking-widest hidden lg:block rotate-90 origin-right">
          <span>ATMOSPHERE_LEVEL_3.0 // ICE_BLUE // ACTIVE</span>
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* LAYER 4: FROSTED HALFTONE TEXTURE (EDGE-BASED)                 */}
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
                  x: [0, 10, 0],
                  y: [0, -8, 0],
                  opacity: [0.06, 0.12, 0.06],
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
                    x: [0, -12, 0],
                    y: [0, 10, 0],
                    opacity: [0.05, 0.1, 0.05],
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
      {/* LAYER 5: LUMINOUS CYAN INK SPEEDLINES & TECHNICAL ARCS          */}
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
            stroke="#D9FAFF"
            strokeWidth="1.2"
            strokeDasharray="450"
            animate={
              prefersReducedMotion
                ? { strokeDashoffset: 0 }
                : {
                    strokeDashoffset: [450, 0, -450],
                    opacity: [0, 0.14, 0],
                  }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          />

          {/* Right Margin Ice Speed Hash */}
          <motion.path
            d="M1460,520 Q1240,490 1020,560"
            fill="none"
            stroke="#35DDF5"
            strokeWidth="1.5"
            strokeDasharray="380"
            animate={
              prefersReducedMotion
                ? { strokeDashoffset: 0 }
                : {
                    strokeDashoffset: [-380, 0, 380],
                    opacity: [0, 0.15, 0],
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
            stroke="#7DEBFF"
            strokeWidth="2"
            strokeDasharray="120"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    strokeDashoffset: [120, 0, -120],
                    opacity: [0.05, 0.28, 0.05],
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
      {/* LAYER 6: SPARSED ARCTIC RETICLES & TELEMETRY ACCENTS           */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: fgParallax }}
        className="absolute inset-0 w-full h-full pointer-events-none z-7 overflow-hidden"
      >
        {/* Accent 1: Thin Ice-Blue Diagonal Telemetry Bar (Left margin) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-25, 35, -25],
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
          <div className="w-1.5 h-6 bg-[#35DDF5] clip-diagonal-right shadow-[0_0_8px_#35DDF5]" />
          <div className="w-12 md:w-20 h-[1.5px] bg-[#7DEBFF]/80 shadow-[0_0_6px_#7DEBFF]" />
        </motion.div>

        {/* Accent 2: Small Precision Reticle / Circular Target (Right margin) */}
        {!isMobile && (
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [20, -30, 20],
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
            className="absolute top-[60%] right-6 w-8 h-8 rounded-full border border-[#4DE6FF]/70 shadow-[0_0_12px_rgba(77,230,255,0.35)] flex items-center justify-center pointer-events-none"
          >
            <div className="w-3 h-[1px] bg-[#7DEBFF]" />
            <div className="h-3 w-[1px] bg-[#7DEBFF] absolute" />
          </motion.div>
        )}

        {/* Accent 3: Technical Bracket Marker (Bottom right) */}
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
          className="absolute bottom-8 right-6 font-mono-tech text-[10px] text-[#7DEBFF] tracking-wider hidden md:block"
        >
          [ SEC_RADAR // 3.0 // ICE_SYNC ]
        </motion.div>
      </motion.div>

      {/* ============================================================== */}
      {/* LAYER 7: RESTRAINED ARCTIC CYAN & ICE-BLUE AMBIENT LIGHTING    */}
      {/* Soft blue volumetric illumination behind selected visual areas */}
      {/* ============================================================== */}
      {/* Orb 1: Upper Atmospheric Ice Glow */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { opacity: 0.16 }
            : {
                opacity: [0.14, 0.24, 0.14],
                x: ['-50%', '-48%', '-52%', '-50%'],
                y: ['-20%', '-24%', '-18%', '-20%'],
              }
        }
        transition={{
          duration: 48,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 w-[420px] sm:w-[700px] lg:w-[920px] h-[340px] sm:h-[500px] lg:h-[620px] bg-gradient-to-tr from-[#071521]/40 via-[#35DDF5]/18 to-[#7DEBFF]/12 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none z-2"
      />

      {/* Orb 2: Lower-Right Deep Arctic Navy Volumetric Pool */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { opacity: 0.14 }
            : {
                opacity: [0.12, 0.22, 0.12],
                x: [0, 30, -20, 0],
                y: [0, -35, 18, 0],
              }
        }
        transition={{
          duration: 58,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-1/4 right-1/4 w-[380px] sm:w-[620px] lg:w-[780px] h-[320px] sm:h-[460px] lg:h-[580px] bg-gradient-to-br from-[#071521]/35 via-[#7DEBFF]/15 to-transparent rounded-full blur-[110px] sm:blur-[140px] pointer-events-none z-2"
      />

      {/* Orb 3: Mid-Left Atmospheric Illumination */}
      {!isMobile && (
        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.1 }
              : {
                  opacity: [0.1, 0.18, 0.1],
                  y: [0, 40, -25, 0],
                }
          }
          transition={{
            duration: 62,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[50%] left-[-10%] w-[450px] lg:w-[680px] h-[380px] lg:h-[520px] bg-gradient-to-r from-[#071521]/30 via-[#35DDF5]/12 to-transparent rounded-full blur-[120px] pointer-events-none z-2"
        />
      )}
    </div>
  );
};

export default AnimatedBackground;
