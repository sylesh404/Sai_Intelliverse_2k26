import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Film } from 'lucide-react';

import m1 from '../assets/m1.jpg';
import m2 from '../assets/m2.jpg';
import m3 from '../assets/m3.jpg';
import m4 from '../assets/m4.jpg';

gsap.registerPlugin(ScrollTrigger);

export const TransitionFacultyGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const filmstripTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);

  const archivePreviews = [
    { label: "CHRONICLE // 01", tag: "SYMPOSIUM ARCHIVE", img: m1 },
    { label: "CHRONICLE // 02", tag: "KEYNOTE & CONCLAVE", img: m2 },
    { label: "CHRONICLE // 03", tag: "CODE CLASH ARENA", img: m3 },
    { label: "CHRONICLE // 04", tag: "EXCELLENCE HONORS", img: m4 },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.8,
        },
      });

      // 1. Filmstrip slides across horizontally
      tl.fromTo(filmstripTrackRef.current, {
        x: "35%",
      }, {
        x: "-25%",
        ease: "none",
        duration: 0.8,
      }, 0)
      // 2. Camera reticle focuses in center
      .fromTo(reticleRef.current, {
        scale: 1.6,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }, 0.15)
      // 3. Memory cards pop and scale with slight organic rotation
      .fromTo(cardRefs.current, {
        scale: 0.8,
        opacity: 0.3,
        y: 30,
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.45,
        ease: "power2.out",
      }, 0.1)
      // 4. Chapter label fades in
      .fromTo(labelRef.current, {
        opacity: 0,
        y: 15,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.25,
      }, 0.3);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[45svh] sm:h-[55svh] bg-[#0D0D0D] overflow-hidden flex flex-col justify-center pointer-events-none select-none z-1 border-y border-[#1A1A1A]"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D] z-10" />

      {/* Top Telemetry Header */}
      <div
        ref={labelRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full mb-4 flex items-center justify-between font-mono-tech text-[10px] sm:text-xs text-[#888888] relative z-20 opacity-0"
      >
        <div className="flex items-center gap-2 text-[#FCFAED]">
          <Film className="w-3.5 h-3.5 text-[#6C3082]" />
          <span className="font-bold tracking-wider">
            TRANSITION // FACULTY COMMITTEE ➔ SYMPOSIUM ARCHIVE
          </span>
        </div>
        <span className="text-[#6C3082] font-semibold hidden sm:inline">
          CHAPTER_04 ──► CHAPTER_05
        </span>
      </div>

      {/* Center Camera Reticle */}
      <div
        ref={reticleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 sm:w-64 sm:h-44 border border-[#6C3082]/40 z-20 pointer-events-none flex items-center justify-center opacity-0"
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#6C3082]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#6C3082]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#6C3082]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#6C3082]" />
        <div className="w-2 h-2 rounded-full bg-[#6C3082] animate-ping" />
        <span className="absolute bottom-1 right-2 font-mono-tech text-[8px] text-[#6C3082] font-bold">
          REC ● 24FPS
        </span>
      </div>

      {/* Continuous Horizontal Photographic Filmstrip */}
      <div
        ref={filmstripTrackRef}
        className="flex items-center gap-4 sm:gap-6 px-6 relative z-10"
      >
        {archivePreviews.map((preview, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="w-52 sm:w-72 h-36 sm:h-48 shrink-0 bg-[#141414] border border-[#2E2E2E] p-1.5 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
          >
            <img
              src={preview.img}
              alt={preview.label}
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-70"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/30 to-transparent" />

            {/* Top metadata */}
            <div className="relative z-10 flex justify-between items-center text-[9px] font-mono-tech">
              <span className="bg-[#6C3082] text-white px-1.5 py-0.5 font-bold tracking-wider">
                {preview.tag}
              </span>
              <span className="text-[#FCFAED] bg-[#0D0D0D]/80 px-1 border border-[#333333]">
                0{idx + 1} // MEMORY
              </span>
            </div>

            {/* Bottom title */}
            <div className="relative z-10 flex items-center justify-between font-mono-tech text-[10px] text-[#FCFAED] font-bold">
              <span>{preview.label}</span>
              <Camera className="w-3.5 h-3.5 text-[#6C3082]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransitionFacultyGallery;
