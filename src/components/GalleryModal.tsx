import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  item,
  items,
  onClose,
  onSelect,
}) => {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

  const handleNext = () => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
  };

  const handlePrev = () => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIdx]);
  };

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex !== -1) {
        const nextIdx = (currentIndex + 1) % items.length;
        onSelect(items[nextIdx]);
      }
      if (e.key === 'ArrowLeft' && currentIndex !== -1) {
        const prevIdx = (currentIndex - 1 + items.length) % items.length;
        onSelect(items[prevIdx]);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, currentIndex, items, onClose, onSelect]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/92 backdrop-blur-md"
        />

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-4xl w-full max-h-[92vh] bg-[#141414] border border-[#262626] overflow-hidden flex flex-col z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#262626] bg-[#0D0D0D] font-mono-tech text-xs shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[#FF0022] font-bold">ARCHIVE // {item.year}</span>
              <span className="text-[#565656]">|</span>
              <span className="text-[#888888]">{item.category}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#565656] text-[11px]">
                {currentIndex + 1} / {items.length}
              </span>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                aria-label="Close Preview"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#333333] hover:border-[#FF0022] text-[#FCFAED] hover:bg-[#FF0022] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Image & Navigation Area */}
          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[260px] sm:min-h-[420px] p-2">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[55vh] sm:max-h-[65vh] w-auto max-w-full object-contain select-none"
            />

            {/* Left Nav Button with 48px touch target */}
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              onClick={handlePrev}
              aria-label="Previous Image"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-2.5 bg-black/70 hover:bg-[#FF0022] text-white border border-[#333333] hover:border-[#FF0022] transition-colors cursor-pointer flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Right Nav Button with 48px touch target */}
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              onClick={handleNext}
              aria-label="Next Image"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-2.5 bg-black/70 hover:bg-[#FF0022] text-white border border-[#333333] hover:border-[#FF0022] transition-colors cursor-pointer flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="p-4 sm:p-6 bg-[#0D0D0D] border-t border-[#262626] shrink-0">
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-[#FCFAED] mb-1 leading-tight">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono-tech text-[#888888] leading-relaxed">
              {item.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GalleryModal;
