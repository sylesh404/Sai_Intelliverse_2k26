import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { GalleryItem } from '../types';
import { galleryData } from '../data/gallery';
import { Maximize2, ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  onSelectItem: (item: GalleryItem) => void;
}

// ============================================================================
// DESKTOP: CINEMATIC CARD WITH SCROLL REVEAL, PARALLAX & CURSOR DEPTH
// ============================================================================
interface DesktopCardProps {
  item: GalleryItem;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  prefersReducedMotion: boolean;
}

const DesktopCinematicCard: React.FC<DesktopCardProps> = ({
  item,
  index,
  isActive,
  onSelect,
  prefersReducedMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const padIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, clipPath: "inset(8% 0% 8% 0%)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.65,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onSelect}
      className={`group relative bg-[#10151D] border transition-colors duration-300 cursor-pointer overflow-hidden flex flex-col justify-between shadow-lg ${isActive
          ? 'border-[#4DE6FF] shadow-[0_0_28px_rgba(77,230,255,0.35)] ring-1 ring-[#7DEBFF]/60'
          : 'border-[#263643] hover:border-[#7DEBFF] hover:shadow-[0_0_24px_rgba(53,221,245,0.25)]'
        }`}
    >
      <div className="w-full h-full flex flex-col justify-between">
        {/* Top Accent Scanline on Hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7DEBFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

        {/* Image Frame */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500 ease-out"
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

          {/* Technical Corner Badge */}
          <div className="absolute top-2.5 left-2.5 bg-[#071521]/90 backdrop-blur-xs border border-[#263643] group-hover:border-[#4DE6FF] px-2.5 py-0.5 font-mono-tech text-[10px] text-[#F4FDFF] uppercase tracking-wider flex items-center gap-1.5 transition-colors z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35DDF5] animate-pulse shadow-[0_0_6px_#35DDF5]" />
            <span>{padIndex} // ARCHIVE</span>
          </div>

          {/* Expand Icon */}
          <div className="absolute top-2.5 right-2.5 p-1.5 bg-[#071521]/90 backdrop-blur-xs text-white border border-[#263643] group-hover:border-[#7DEBFF] group-hover:text-[#7DEBFF] transition-all z-10">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>

          {/* Diagonal Corner Accent */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#35DDF5]/25 clip-diagonal-left group-hover:bg-[#35DDF5] transition-colors z-10 shadow-[0_0_8px_#35DDF5]" />
        </div>

        {/* Metadata Details Bar */}
        <div className="p-3.5 sm:p-4 bg-[#10151D] border-t border-[#263643] flex items-center justify-between z-10 gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-display font-black text-white group-hover:text-[#7DEBFF] transition-colors uppercase tracking-wider truncate">
              {item.title}
            </h3>
            <p className="font-mono-tech text-[10px] text-[#A9BAC8] uppercase tracking-widest mt-0.5 truncate">
              SYMPOSIUM CHRONICLE
            </p>
          </div>
          <span className="font-mono-tech text-[10px] text-[#A9BAC8] group-hover:text-[#F4FDFF] border border-[#263643] px-2 py-0.5 transition-colors shrink-0">
            {padIndex} / 08
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MOBILE: STACKED CARD-SWIPING EXPERIENCE (PHYSICAL PHOTOGRAPHIC STACK)
// ============================================================================
interface MobileStackedGalleryProps {
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectCard: (index: number) => void;
  onExpand: (item: GalleryItem) => void;
  prefersReducedMotion: boolean;
}

const MobileStackedGallery: React.FC<MobileStackedGalleryProps> = ({
  activeIndex,
  onNext,
  onPrev,
  onSelectCard,
  onExpand,
  prefersReducedMotion,
}) => {
  const dragX = useMotionValue(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);

  // Rotation derived smoothly from drag distance
  const dragRotate = useTransform(dragX, [-200, 200], [-12, 12]);
  const dragOpacity = useTransform(dragX, [-220, -120, 0, 120, 220], [0.4, 0.9, 1, 0.9, 0.4]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
    dragStartXRef.current = dragX.get();
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    // Threshold detection: deliberate horizontal gesture
    if (offsetX < -50 || velocityX < -320) {
      onNext();
    } else if (offsetX > 50 || velocityX > 320) {
      onPrev();
    }

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);
  };

  // Stack calculation: relative offset from active card (0 = active, 1 = behind, 2 = 2nd behind, etc.)
  const getStackStyle = (cardIndex: number) => {
    const total = galleryData.length;
    const diff = (cardIndex - activeIndex + total) % total;

    if (diff === 0) {
      // Active Card (Front & Center)
      return {
        zIndex: 30,
        y: 0,
        scale: 1,
        opacity: 1,
        pointerEvents: 'auto' as const,
        visibility: 'visible' as const,
      };
    } else if (diff === 1) {
      // Card 1 directly behind
      return {
        zIndex: 20,
        y: 18,
        scale: 0.93,
        opacity: 0.85,
        pointerEvents: 'none' as const,
        visibility: 'visible' as const,
      };
    } else if (diff === 2) {
      // Card 2 behind
      return {
        zIndex: 10,
        y: 34,
        scale: 0.86,
        opacity: 0.58,
        pointerEvents: 'none' as const,
        visibility: 'visible' as const,
      };
    } else if (diff === 3) {
      // Card 3 behind
      return {
        zIndex: 5,
        y: 48,
        scale: 0.79,
        opacity: 0.32,
        pointerEvents: 'none' as const,
        visibility: 'visible' as const,
      };
    } else {
      // Remaining queued cards in stack
      return {
        zIndex: 0,
        y: 54,
        scale: 0.74,
        opacity: 0,
        pointerEvents: 'none' as const,
        visibility: 'hidden' as const,
      };
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Visual Stack Container with controlled height to prevent vertical jitter and button overlap */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[360px] sm:h-[405px] flex items-start justify-center pt-2">
        {galleryData.map((item, idx) => {
          const stack = getStackStyle(idx);
          const isActive = idx === activeIndex;
          const padIdx = String(idx + 1).padStart(2, '0');

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                y: stack.y,
                scale: stack.scale,
                opacity: stack.opacity,
                zIndex: stack.zIndex,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.1 }
                  : { type: "spring", stiffness: 300, damping: 28, mass: 0.8 }
              }
              style={{
                zIndex: stack.zIndex,
                pointerEvents: stack.pointerEvents,
                visibility: stack.visibility,
                touchAction: 'pan-y', // CRITICAL: Does NOT hijack vertical page scrolling!
                x: isActive ? dragX : 0,
                rotate: isActive ? dragRotate : 0,
                opacity: isActive ? dragOpacity : stack.opacity,
              }}
              {...(isActive
                ? {
                  drag: "x" as const,
                  dragDirectionLock: true,
                  dragConstraints: { left: 0, right: 0 },
                  dragElastic: 0.65,
                  onDragStart: handleDragStart,
                  onDragEnd: handleDragEnd,
                }
                : {})}
              onClick={() => {
                if (isActive && !isDraggingRef.current) {
                  onExpand(item);
                }
              }}
              className={`absolute top-0 w-full bg-[#10151D] border rounded-xs overflow-hidden select-none cursor-grab active:cursor-grabbing ${isActive
                  ? 'border-[#4DE6FF] shadow-[0_16px_36px_rgba(0,0,0,0.95),0_0_28px_rgba(53,221,245,0.4)] ring-1 ring-[#7DEBFF]/50'
                  : 'border-[#263643] shadow-[0_12px_28px_rgba(0,0,0,0.7)]'
                }`}
            >
              {/* Photo Area */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />

                {/* Top Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Position Index Badge */}
                <div className="absolute top-2.5 left-2.5 bg-[#071521]/90 backdrop-blur-xs border border-[#263643] px-2 py-0.5 font-mono-tech text-[10px] text-[#F4FDFF] uppercase tracking-wider flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#35DDF5] animate-pulse shadow-[0_0_6px_#35DDF5]' : 'bg-[#666666]'}`} />
                  <span>{padIdx} // ARCHIVE</span>
                </div>

                {/* Lightbox / Expand Badge */}
                <div className="absolute top-2.5 right-2.5 p-1.5 bg-[#071521]/90 backdrop-blur-xs text-white border border-[#263643]">
                  <Maximize2 className="w-3.5 h-3.5 text-[#7DEBFF]" />
                </div>

                {/* Swipe Direction Indicators (Active Card Only) */}
                {isActive && (
                  <div className="absolute bottom-2 inset-x-3 flex justify-between items-center pointer-events-none text-[9px] font-mono-tech text-[#7DEBFF]/80 uppercase tracking-widest font-semibold">
                    <span>❮ SWIPE PREV</span>
                    <span>SWIPE NEXT ❯</span>
                  </div>
                )}
              </div>

              {/* Caption and Information Footer */}
              <div className="p-3 bg-[#0A111C] border-t border-[#263643] flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-display font-black text-white uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="font-mono-tech text-[9px] text-[#A9BAC8] uppercase tracking-widest">
                    SYMPOSIUM ARCHIVE
                  </p>
                </div>
                <span className="font-mono-tech text-[10px] text-[#35DDF5] font-bold border border-[#263643] px-2 py-0.5">
                  {padIdx} / 08
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Controls & Navigation Toolbar */}
      <div className="w-full max-w-[340px] sm:max-w-[380px] mt-3 flex flex-col items-center gap-3">
        {/* Previous / Next Button Bar */}
        <div className="w-full flex items-center justify-between gap-3">
          <button
            onClick={onPrev}
            aria-label="Previous memory"
            className="flex-1 py-2.5 px-3 bg-[#10151D] border border-[#263643] hover:border-[#35DDF5] active:bg-[#35DDF5]/10 text-white hover:text-[#7DEBFF] font-mono-tech text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]"
          >
            <ChevronLeft className="w-4 h-4 text-[#35DDF5]" />
            <span>PREV</span>
          </button>

          {/* Central Counter Display */}
          <div className="px-3.5 py-2 bg-[#0A111C] border border-[#263643] font-mono-tech text-xs tracking-widest flex items-center gap-1.5 min-h-[44px]">
            <span className="text-[#35DDF5] font-black">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="text-[#444444]">/</span>
            <span className="text-[#888888]">08</span>
          </div>

          <button
            onClick={onNext}
            aria-label="Next memory"
            className="flex-1 py-2.5 px-3 bg-[#10151D] border border-[#263643] hover:border-[#35DDF5] active:bg-[#35DDF5]/10 text-white hover:text-[#7DEBFF] font-mono-tech text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4 text-[#35DDF5]" />
          </button>
        </div>

        {/* Pagination Dots (Clickable for Instant Jump) */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {galleryData.map((_, i) => (
            <button
              key={i}
              onClick={() => onSelectCard(i)}
              aria-label={`Jump to memory ${i + 1}`}
              className={`transition-all cursor-pointer ${i === activeIndex
                  ? 'w-6 h-1.5 bg-[#35DDF5] rounded-xs shadow-[0_0_8px_rgba(53,221,245,0.6)]'
                  : 'w-2 h-1.5 bg-[#263643] hover:bg-[#4DE6FF]/40 rounded-xs'
                }`}
            />
          ))}
        </div>

        {/* User Interaction Hint */}
        <p className="font-mono-tech text-[9px] text-[#A9BAC8] tracking-widest uppercase text-center mt-0.5">
          TAP CARD FOR FULLSCREEN LIGHTBOX
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN GALLERY SECTION (RESPONSIVE: CINEMATIC DESKTOP + STACKED MOBILE)
// ============================================================================
export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectItem }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isTransitioningRef = useRef(false);

  // Check user preference for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const total = galleryData.length;

  const handleNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setActiveIndex((prev) => (prev + 1) % total);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 280);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 280);
  }, [total]);

  const handleSelectCard = useCallback((index: number) => {
    if (isTransitioningRef.current) return;
    setActiveIndex(index);
  }, []);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      id="gallery"
      className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-12 bg-[#080A0F] border-b border-[#263643] overflow-hidden memory-gallery"
    >
      {/* Subtle Cinematic Gallery Background Enhancement (Halftone Grid & Ice-Blue Accent Haze) */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#263643 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#35DDF5]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14 border-b border-[#263643] pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-3 font-mono-tech text-xs text-[#35DDF5] uppercase tracking-widest mb-2 sm:mb-3">
              <span className="font-bold">05</span>
              <span>───────────────</span>
              <span>SYMPOSIUM ARCHIVE</span>
            </div>
            <h2 className="font-display font-black tracking-tight text-[#F4FDFF] uppercase text-[clamp(2rem,6vw,4.5rem)] leading-none">
              MEMORY GALLERY
            </h2>
          </div>

          {/* Desktop View Navigation Bar */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="font-mono-tech text-xs text-[#A9BAC8] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#35DDF5]" />
              <span>CLICK TO EXPAND HIGH-RES LIGHTBOX</span>
            </div>

            <div className="flex items-center gap-2 border border-[#263643] bg-[#10151D] p-1">
              <button
                onClick={handlePrev}
                aria-label="Previous memory"
                className="p-1.5 hover:bg-[#141C26] hover:text-[#7DEBFF] text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono-tech text-xs px-2 text-[#F4FDFF] tracking-widest font-bold">
                {String(activeIndex + 1).padStart(2, '0')} / 08
              </span>
              <button
                onClick={handleNext}
                aria-label="Next memory"
                className="p-1.5 hover:bg-[#141C26] hover:text-[#7DEBFF] text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Header Subtitle */}
          <div className="block lg:hidden font-mono-tech text-xs text-[#A9BAC8]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#35DDF5]" />
              <span>STACKED PHOTO ARCHIVE // SWIPE TO EXPLORE</span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* DESKTOP LAYOUT (VISIBLE ON LG+): CINEMATIC 4-COLUMN PARALLAX GRID     */}
        {/* ===================================================================== */}
        <div className="hidden lg:grid grid-cols-4 gap-5">
          {galleryData.map((item, idx) => (
            <DesktopCinematicCard
              key={item.id}
              item={item}
              index={idx}
              isActive={idx === activeIndex}
              onSelect={() => {
                setActiveIndex(idx);
                onSelectItem(item);
              }}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* ===================================================================== */}
        {/* MOBILE & TABLET LAYOUT (VISIBLE ON < LG): PHYSICAL STACKED CARDS      */}
        {/* ===================================================================== */}
        <div className="block lg:hidden py-4">
          <MobileStackedGallery
            activeIndex={activeIndex}
            onNext={handleNext}
            onPrev={handlePrev}
            onSelectCard={handleSelectCard}
            onExpand={(item) => onSelectItem(item)}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
