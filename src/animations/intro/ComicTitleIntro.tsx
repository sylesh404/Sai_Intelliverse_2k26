import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import symposiumConfig from '../../config/symposiumConfig';
import { comicBurstRays, inkSplatters, comicBrushPaths } from './comicAssets';
import { FastForward, Zap } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import './intro.css';

gsap.registerPlugin(ScrollTrigger);

interface ComicTitleIntroProps {
  onComplete: () => void;
}

export const ComicTitleIntro: React.FC<ComicTitleIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Layer references
  const scratchLayerRef = useRef<SVGSVGElement>(null);
  const drawingLayerRef = useRef<SVGSVGElement>(null);
  const burstGroupRef = useRef<SVGGElement>(null);
  const fragmentsLayerRef = useRef<HTMLDivElement>(null);
  const fragment1Ref = useRef<HTMLDivElement>(null);
  const fragment2Ref = useRef<HTMLDivElement>(null);
  const fragment3Ref = useRef<HTMLDivElement>(null);
  const brushSweepRef = useRef<HTMLDivElement>(null);
  const halftoneRef = useRef<HTMLDivElement>(null);
  const chaosWordRef = useRef<HTMLDivElement>(null);
  const impactFlashRef = useRef<HTMLDivElement>(null);
  const finalLockRef = useRef<HTMLDivElement>(null);
  const transitionWipeRef = useRef<HTMLDivElement>(null);

  const [isSkipped, setIsSkipped] = useState(false);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Purge any legacy storage keys to guarantee fresh execution every visit
    try {
      localStorage.removeItem('hasSeenIntro_2026');
      localStorage.removeItem('introSeen');
      sessionStorage.removeItem('hasSeenIntro_2026');
      sessionStorage.removeItem('introSeen');
    } catch {
      // Safe fallback
    }

    // 1. Reset all GSAP tweens for intro elements only
    if (containerRef.current) {
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(containerRef.current.querySelectorAll('*'));
    }

    // 2. Explicitly clear all props on animated elements to start fresh from Frame 0
    const elementsToReset = [
      containerRef.current,
      scratchLayerRef.current,
      drawingLayerRef.current,
      burstGroupRef.current,
      fragmentsLayerRef.current,
      fragment1Ref.current,
      fragment2Ref.current,
      fragment3Ref.current,
      brushSweepRef.current,
      halftoneRef.current,
      chaosWordRef.current,
      impactFlashRef.current,
      finalLockRef.current,
      transitionWipeRef.current,
    ];
    elementsToReset.forEach((el) => {
      if (el) gsap.set(el, { clearProps: "all" });
    });

    // 3. Safety fallback timer: prevents user ever getting trapped if tab is backgrounded
    safetyTimerRef.current = setTimeout(() => {
      onComplete();
    }, 6200);

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      const t = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(t);
    }

    // Build Master Comic Animation Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
          onComplete();
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 50);
        },
      });
      timelineRef.current = tl;



      // ==========================================
      // SCENE 01: BLACK FRAME & MICRO FILM SCRATCHES (0.0s - 0.4s)
      // ==========================================
      tl.set(containerRef.current, { opacity: 1 })
        .set([
          drawingLayerRef.current,
          burstGroupRef.current,
          fragmentsLayerRef.current,
          brushSweepRef.current,
          halftoneRef.current,
          chaosWordRef.current,
          impactFlashRef.current,
          finalLockRef.current,
          transitionWipeRef.current,
        ], { opacity: 0 })
        .fromTo(
          scratchLayerRef.current,
          { opacity: 0.2 },
          { opacity: 0.7, duration: 0.35, ease: "rough({ template: none.out, strength: 2, points: 10 })" }
        )
        .to(scratchLayerRef.current, { opacity: 0, duration: 0.1 });

      // ==========================================
      // SCENE 02: COMIC DRAWING BEGINS (0.45s - 1.25s)
      // Rapid scribbles, speed lines, ink splatters, registration crosshairs
      // ==========================================
      tl.set(drawingLayerRef.current, { opacity: 1 }, 0.45)
        .fromTo(
          ".comic-draw-stroke",
          { strokeDashoffset: 400, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
          0.45
        )
        .fromTo(
          ".comic-ink-dot",
          { scale: 0, transformOrigin: "center center" },
          { scale: 1, duration: 0.2, stagger: 0.03, ease: "back.out(2)" },
          0.65
        )
        .fromTo(
          ".comic-reg-mark",
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.2, ease: "steps(2)" },
          0.75
        );

      // ==========================================
      // SCENE 03: COMIC ACTION BURST (1.25s - 1.85s)
      // Radial speed lines shooting outward in 8 directions
      // ==========================================
      tl.set(burstGroupRef.current, { opacity: 1 }, 1.25)
        .fromTo(
          burstGroupRef.current,
          { scale: 0.1, transformOrigin: "50% 50%" },
          { scale: 1.15, duration: 0.45, ease: "power3.out" },
          1.25
        )
        .fromTo(
          ".burst-ray",
          { strokeDashoffset: 300, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.3, stagger: 0.015, ease: "power4.out" },
          1.25
        )
        .to(burstGroupRef.current, { opacity: 0, duration: 0.15 }, 1.7);

      // ==========================================
      // SCENE 04: FIRST FRAGMENT LETTER REVEALS (1.85s - 2.55s)
      // Fragments: INT -> ELL -> IVE -> RSE stamped physically
      // ==========================================
      tl.set(fragmentsLayerRef.current, { opacity: 1 }, 1.85)
        // Fragment 1: INT
        .fromTo(
          fragment1Ref.current,
          { opacity: 0, scale: 1.4, y: -25, skewX: -10 },
          { opacity: 1, scale: 1, y: 0, skewX: 0, duration: 0.22, ease: "back.out(2.2)" },
          1.85
        )
        // Fragment 2: ELL
        .fromTo(
          fragment2Ref.current,
          { opacity: 0, scale: 1.5, x: 30, rotation: 8 },
          { opacity: 1, scale: 1, x: 0, rotation: 0, duration: 0.2, ease: "power3.out" },
          2.08
        )
        // Fragment 3: IVE RSE
        .fromTo(
          fragment3Ref.current,
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: "back.out(2.5)" },
          2.28
        );

      // ==========================================
      // SCENE 05: HAND-DRAWN ORGANIC BRUSH MASK (2.55s - 3.15s)
      // Reveal -> Obscure -> Reveal sweeping across viewport
      // ==========================================
      tl.set(brushSweepRef.current, { opacity: 1 }, 2.55)
        .fromTo(
          brushSweepRef.current,
          { x: "-120%", skewX: -25 },
          { x: "140%", skewX: -15, duration: 0.55, ease: "power2.inOut" },
          2.55
        )
        // Letters flicker as ink sweeps
        .to(fragmentsLayerRef.current, { opacity: 0.35, duration: 0.1 }, 2.7)
        .to(fragmentsLayerRef.current, { opacity: 1, duration: 0.15 }, 2.85)
        .set(fragmentsLayerRef.current, { opacity: 0 }, 3.15);

      // ==========================================
      // SCENE 06: COMIC HALFTONE PATTERN BURST (3.15s - 3.55s)
      // Rapid flash of authentic comic halftone dots behind word
      // ==========================================
      tl.set(halftoneRef.current, { opacity: 1 }, 3.15)
        .fromTo(
          halftoneRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1.05, opacity: 0.65, duration: 0.2, ease: "power2.out" },
          3.15
        )
        .to(halftoneRef.current, { opacity: 0, duration: 0.2 }, 3.35);

      // ==========================================
      // SCENE 07: TYPOGRAPHIC CHAOS & COMIC DISTORTION (3.45s - 3.95s)
      // Tactile ink bounce, character spacing twitch, red shadow offset
      // ==========================================
      tl.set(chaosWordRef.current, { opacity: 1 }, 3.45)
        .fromTo(
          chaosWordRef.current,
          { scale: 1.1, skewX: 6, letterSpacing: "0.2em" },
          { scale: 1, skewX: -3, letterSpacing: "-0.04em", duration: 0.25, ease: "elastic.out(1, 0.4)" },
          3.45
        )
        .to(chaosWordRef.current, { x: 5, y: -4, duration: 0.06 }, 3.7)
        .to(chaosWordRef.current, { x: -4, y: 3, duration: 0.06 }, 3.76)
        .to(chaosWordRef.current, { x: 0, y: 0, duration: 0.08 }, 3.82)
        .set(chaosWordRef.current, { opacity: 0 }, 3.95);

      // ==========================================
      // SCENE 08: SIGNAL RED IMPACT FRAME (3.95s - 4.25s)
      // Fullscreen high-contrast shock frame
      // ==========================================
      tl.set(impactFlashRef.current, { opacity: 1 }, 3.95)
        .fromTo(
          impactFlashRef.current,
          { scale: 1.3, rotation: -4 },
          { scale: 1, rotation: 0, duration: 0.25, ease: "power4.out" },
          3.95
        )
        .to(impactFlashRef.current, { opacity: 0, duration: 0.08 }, 4.22);

      // ==========================================
      // SCENE 09: FINAL REVEAL & IDENTITY LOCK (4.25s - 4.95s)
      // Pitch black calm. Pure sharp, bold INTELLIVERSE title lock.
      // ==========================================
      tl.set(finalLockRef.current, { opacity: 1 }, 4.25)
        .fromTo(
          finalLockRef.current,
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" },
          4.25
        )
        .fromTo(
          ".final-lock-sub",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          4.45
        );

      // ==========================================
      // SCENE 10: COMIC PANEL BRUSH WIPE INTO HOMEPAGE (4.95s - 5.5s)
      // Large sweeping red & ivory brush slash peeling away intro
      // ==========================================
      tl.set(transitionWipeRef.current, { opacity: 1 }, 4.95)
        .fromTo(
          transitionWipeRef.current,
          { x: "-110%", skewX: -20 },
          { x: "110%", skewX: -20, duration: 0.55, ease: "power3.inOut" },
          4.95
        )
        .to(containerRef.current, { opacity: 0, duration: 0.2 }, 5.3);
    }, containerRef);

    return () => {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      ctx.revert();
    };
  }, [onComplete]);


  // Clean, instantaneous Skip Handler (applies ONLY to current load)
  const handleSkip = () => {
    if (isSkipped) return;
    setIsSkipped(true);
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
    }
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    if (containerRef.current) {
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(containerRef.current.querySelectorAll('*'));
    }
    // Immediate clean exit without storage persistence
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          onComplete();
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 50);
        },
      });
    } else {
      onComplete();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  };


  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#0D0D0D] text-[#FCFAED] overflow-hidden select-none flex items-center justify-center"
      style={{ touchAction: "none" }}
    >
      {/* Paper Grain & Micro Scratches Layer */}
      <div className="absolute inset-0 comic-grain-bg pointer-events-none opacity-40 z-0" />

      {/* Skip Button: Always Accessible, Minimum 48px Touch Target */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
        <MagneticButton
          variant="secondary"
          size="sm"
          level={1}
          onClick={handleSkip}
          aria-label="Skip Cinematic Title Intro"
          className="shadow-lg"
        >
          <span>SKIP INTRO</span>
          <FastForward className="w-3.5 h-3.5 text-current group-hover:translate-x-0.5 transition-transform" />
        </MagneticButton>
      </div>

      {/* SCENE 01: Micro Film Scratch SVG */}
      <svg
        ref={scratchLayerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 stroke-[#FCFAED] opacity-0"
      >
        <line x1="12%" y1="0" x2="14%" y2="100%" strokeWidth="0.75" strokeDasharray="15 30" opacity="0.6" />
        <line x1="82%" y1="0" x2="80%" y2="100%" strokeWidth="0.5" strokeDasharray="25 40" opacity="0.5" />
        <line x1="0" y1="45%" x2="100%" y2="46%" strokeWidth="0.5" strokeDasharray="40 60" opacity="0.4" />
      </svg>

      {/* SCENE 02: Hand-Drawn Comic Drawing Marks */}
      <svg
        ref={drawingLayerRef}
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-0"
      >
        {/* Speed lines & rough brush strokes */}
        <path
          d="M100,120 Q300,90 500,130 T900,110"
          fill="none"
          stroke="#FCFAED"
          strokeWidth="3"
          strokeDasharray="400"
          className="comic-draw-stroke"
        />
        <path
          d="M150,480 Q450,510 750,470 T950,490"
          fill="none"
          stroke="#FF0022"
          strokeWidth="4"
          strokeDasharray="400"
          className="comic-draw-stroke"
        />
        <path
          d="M80,280 Q200,260 320,300"
          fill="none"
          stroke="#FCFAED"
          strokeWidth="2.5"
          strokeDasharray="300"
          className="comic-draw-stroke"
        />
        <path
          d="M680,290 Q800,320 920,280"
          fill="none"
          stroke="#FF3D00"
          strokeWidth="3.5"
          strokeDasharray="300"
          className="comic-draw-stroke"
        />

        {/* Hand scribbles & registration crosses */}
        <g className="comic-reg-mark" stroke="#FF0022" strokeWidth="2">
          <line x1="80" y1="70" x2="80" y2="100" />
          <line x1="65" y1="85" x2="95" y2="85" />
          <circle cx="80" cy="85" r="8" fill="none" />
        </g>
        <g className="comic-reg-mark" stroke="#FCFAED" strokeWidth="2">
          <line x1="920" y1="510" x2="920" y2="540" />
          <line x1="905" y1="525" x2="935" y2="525" />
          <circle cx="920" cy="525" r="8" fill="none" />
        </g>

        {/* Ink drops and splatters */}
        {inkSplatters.map((dot, idx) => (
          <circle
            key={idx}
            cx={500 + dot.cx}
            cy={300 + dot.cy}
            r={dot.r}
            fill={dot.color}
            className="comic-ink-dot"
          />
        ))}
      </svg>

      {/* SCENE 03: Radial Comic Burst Rays */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      >
        <g ref={burstGroupRef} transform="translate(500, 300)" opacity="0">
          {comicBurstRays.map((ray, idx) => {
            const rad = (ray.angle * Math.PI) / 180;
            const x1 = Math.cos(rad) * 60;
            const y1 = Math.sin(rad) * 60;
            const x2 = Math.cos(rad) * ray.length;
            const y2 = Math.sin(rad) * ray.length;
            const isRed = idx % 3 === 0;

            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isRed ? "#FF0022" : "#FCFAED"}
                strokeWidth={ray.width}
                strokeDasharray="300"
                className="burst-ray"
              />
            );
          })}
          {/* Inner comic impact star */}
          <polygon
            points="0,-25 7,-7 25,0 7,7 0,25 -7,7 -25,0 -7,-7"
            fill="#FF0022"
          />
        </g>
      </svg>

      {/* SCENE 04: Fragmented Letter Reveals */}
      <div
        ref={fragmentsLayerRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4 opacity-0 max-w-full"
      >
        <div className="flex flex-wrap justify-center items-baseline font-display font-black tracking-tight uppercase leading-none select-none text-[clamp(2.4rem,8.5vw,7.5rem)]">
          <div ref={fragment1Ref} className="text-[#FF0022] inline-block mr-1 sm:mr-3">
            INT
          </div>
          <div ref={fragment2Ref} className="text-[#FCFAED] inline-block mr-1 sm:mr-3">
            ELL
          </div>
          <div ref={fragment3Ref} className="text-white inline-block">
            IVERSE
          </div>
        </div>
      </div>

      {/* SCENE 05: Organic Hand-Drawn Brush Mask Sweep */}
      <div
        ref={brushSweepRef}
        className="absolute inset-y-0 w-3/4 pointer-events-none z-30 opacity-0"
      >
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="w-full h-full">
          <path
            d={comicBrushPaths.organicSweep}
            fill="#FF0022"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* SCENE 06: Authentic Comic Halftone Dot Pattern */}
      <div
        ref={halftoneRef}
        className="absolute inset-0 pointer-events-none z-25 comic-halftone-pattern opacity-0"
      />

      {/* SCENE 07: Typographic Chaos & Comic Misregistration */}
      <div
        ref={chaosWordRef}
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-4 opacity-0 max-w-full"
      >
        <h1
          className="font-display font-black uppercase tracking-tight text-[clamp(2rem,8.2vw,7.2rem)] text-[#FCFAED] comic-print-offset select-none text-center inline-block"
          style={{ whiteSpace: 'nowrap' }}
        >
          INTELLIVERSE
        </h1>
      </div>

      {/* SCENE 08: Signal Red Impact Shock Frame */}
      <div
        ref={impactFlashRef}
        className="absolute inset-0 z-40 bg-[#FF0022] flex items-center justify-center p-6 opacity-0"
      >
        <div className="relative text-center">
          <div className="absolute inset-0 bg-[#0D0D0D] -rotate-3 scale-110 pointer-events-none" />
          <h1
            className="relative z-10 font-display font-black text-white text-[clamp(2rem,8.5vw,7.5rem)] uppercase tracking-tight leading-none inline-block"
            style={{ whiteSpace: 'nowrap' }}
          >
            INTELLIVERSE
          </h1>
          <div className="relative z-10 block mt-3">
            <span className="font-mono-tech text-xs sm:text-base font-bold text-[#FF0022] tracking-widest bg-[#FCFAED] px-3 py-1 inline-block">
              SAI INTELLIVERSE 3.0 // IMPACT
            </span>
          </div>
        </div>
      </div>

      {/* SCENE 09: Final Reveal & Identity Lock (SAI / INTELLIVERSE / 3.0) */}
      <div
        ref={finalLockRef}
        className="relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-5xl opacity-0"
      >
        {/* SAI */}
        <div className="inline-flex items-center gap-2 font-mono-tech text-xs sm:text-base text-[#FF0022] uppercase tracking-[0.35em] font-black mb-1 final-lock-sub">
          <Zap className="w-3.5 h-3.5 text-[#FF0022] fill-current" />
          <span>SAI</span>
          <Zap className="w-3.5 h-3.5 text-[#FF0022] fill-current" />
        </div>

        {/* INTELLIVERSE: Guaranteed single line, never wraps */}
        <h1
          className="font-display font-black tracking-tight text-[#FCFAED] uppercase leading-none select-none text-[clamp(2rem,9.5vw,7.8rem)] comic-ink-glow inline-block"
          style={{ whiteSpace: 'nowrap' }}
        >
          INTELLIVERSE
        </h1>

        {/* 3.0 EDITION */}
        <div className="mt-2 sm:mt-3 flex items-center justify-center gap-3 final-lock-sub">
          <span className="font-display font-black text-2xl sm:text-5xl text-[#FF0022] tracking-wider leading-none">
            3.0
          </span>
          <span className="w-8 h-[2px] bg-[#FF3D00]" />
          <span className="font-mono-tech text-[10px] sm:text-xs text-[#FCFAED]/80 uppercase tracking-widest font-semibold">
            NATIONAL LEVEL SYMPOSIUM
          </span>
        </div>

        {/* Subtitle & Department */}
        <div className="mt-4 sm:mt-6 space-y-1 final-lock-sub">
          <p className="text-xs sm:text-sm font-mono-tech text-[#FF0022] tracking-wider uppercase font-bold">
            {symposiumConfig.department}
          </p>
          <p className="text-xs sm:text-sm font-mono-tech text-[#888888] uppercase tracking-wide">
            {symposiumConfig.college}
          </p>
        </div>
      </div>

      {/* SCENE 10: Comic Panel Brush Wipe into Homepage */}
      <div
        ref={transitionWipeRef}
        className="absolute inset-y-0 w-[140%] pointer-events-none z-50 opacity-0"
      >
        <svg viewBox="0 0 1400 800" preserveAspectRatio="none" className="w-full h-full">
          {/* Layer 1: Warm Ivory rough brush */}
          <path
            d="M-50,0 L1200,0 L1450,800 L-50,800 Z"
            fill="#FCFAED"
          />
          {/* Layer 2: Signal Red inner slash */}
          <path
            d="M-50,0 L1050,0 L1300,800 L-50,800 Z"
            fill="#FF0022"
          />
          {/* Layer 3: Deep Black leading edge */}
          <path
            d="M-50,0 L900,0 L1150,800 L-50,800 Z"
            fill="#0D0D0D"
          />
        </svg>
      </div>
    </div>
  );
};

export default ComicTitleIntro;
