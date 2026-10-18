import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const TransitionPrizesGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const filmstripTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);

  const memoryFrames = [
    { label: "EDITION // 2024", tag: "FINALS", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80" },
    { label: "EDITION // 2025", tag: "AI CONCLAVE", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80" },
    { label: "CODE // CLASH", tag: "BOUNTY ARENA", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80" },
    { label: "CHAMPIONS", tag: "GRAND TROPHY", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80" },
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

      // 1. Filmstrip slides in horizontally
      tl.fromTo(filmstripTrackRef.current, {
        x: "40%",
      }, {
        x: "-20%",
        ease: "none",
        duration: 0.8,
      }, 0)
      // 2. Memory cards pop and scale sequentially creating visual trail
      .fromTo(cardRefs.current, {
        scale: 0.7,
        opacity: 0,
        y: 40,
        rotate: (i) => (i % 2 === 0 ? -4 : 4),
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: 0,
        stagger: 0.12,
        duration: 0.45,
        ease: "power2.out",
      }, 0.1)
      // 3. Technical label fade-in
      .fromTo(labelRef.current, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.3,
      }, 0.3);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[45svh] sm:h-[55svh] bg-[#0D0D0D] overflow-hidden flex flex-col justify-center pointer-events-none select-none z-1"
    >
      {/* Background Visual Trail Scanlines */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#141414]/50 to-[#0D0D0D]" />

      {/* Chapter Indicator */}
      <div
        ref={labelRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full mb-4 flex items-center justify-between font-mono-tech text-[10px] sm:text-xs text-[#888888] opacity-0"
      >
        <span className="text-[#6C3082]">VISUAL_MEMORY_STREAM // ARCHIVE LOADING</span>
        <span>CHAPTER_05 ➔ GALLERY ARENA</span>
      </div>

      {/* Horizontal Cinematic Trail */}
      <div
        ref={filmstripTrackRef}
        className="flex items-center gap-4 sm:gap-6 px-4"
      >
        {memoryFrames.map((frame, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="w-48 sm:w-64 h-32 sm:h-40 shrink-0 bg-[#141414] border border-[#333333] p-1.5 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {/* Background image preview */}
            <img
              src={frame.image}
              alt={frame.label}
              className="absolute inset-0 w-full h-full object-cover opacity-60 filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />

            <div className="relative z-10 flex justify-between items-center text-[9px] font-mono-tech">
              <span className="bg-[#6C3082] text-white px-1.5 py-0.5 font-bold">
                {frame.tag}
              </span>
              <span className="text-[#FCFAED]">0{idx + 1}</span>
            </div>

            <div className="relative z-10 font-mono-tech text-[10px] text-[#FCFAED] font-bold">
              {frame.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransitionPrizesGallery;
