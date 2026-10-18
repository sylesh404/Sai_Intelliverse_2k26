import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export type CursorMode = 'default' | 'hover' | 'view' | 'open' | 'drag';

export const CustomCursor: React.FC = () => {
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false
  );

  // Smooth spring physics for cursor position
  const cursorX = useSpring(0, { stiffness: 450, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 450, damping: 30 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');

    const updatePointer = () => {
      setHasFinePointer(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', updatePointer);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const customMode = cursorTarget.getAttribute('data-cursor') as CursorMode;
        setMode(customMode || 'hover');
      } else if (target.closest('a, button, [role="button"], input, select')) {
        setMode('hover');
      } else {
        setMode('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  // Completely disabled on mobile and touch devices
  if (!hasFinePointer || !isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          animate={{
            scale: mode === 'default' ? 1 : mode === 'hover' ? 0.5 : 0,
            opacity: mode === 'view' || mode === 'open' ? 0 : 1,
            backgroundColor: mode === 'hover' ? '#A855F7' : '#FFFFFF',
          }}
          transition={{ duration: 0.15 }}
          className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
        />
      </motion.div>

      {/* Outer Follower Ring / Badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono-tech"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: mode === 'view' || mode === 'open' ? 76 : mode === 'hover' ? 44 : 28,
          height: mode === 'view' || mode === 'open' ? 76 : mode === 'hover' ? 44 : 28,
          backgroundColor: mode === 'view' || mode === 'open' ? '#8B35AD' : 'transparent',
          borderColor: mode === 'hover' ? '#C084FC' : 'rgba(255, 255, 255, 0.4)',
          borderWidth: mode === 'view' || mode === 'open' ? 0 : 1.5,
          borderRadius: '9999px',
          boxShadow: mode === 'hover' ? '0 0 16px rgba(168, 85, 247, 0.4)' : (mode === 'view' || mode === 'open' ? '0 0 25px rgba(139, 53, 173, 0.6)' : 'none'),
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {mode === 'view' && (
          <span className="text-white text-[11px] font-bold tracking-widest uppercase">
            VIEW
          </span>
        )}
        {mode === 'open' && (
          <span className="text-white text-[11px] font-bold tracking-widest uppercase">
            OPEN
          </span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
