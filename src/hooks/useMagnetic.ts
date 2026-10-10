import { useRef, useState, useEffect } from 'react';

export function useMagnetic(strength = 0.25) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Only enable magnetic pull on precision fine-pointer devices (desktop mice)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.hypot(deltaX, deltaY);
      const magnetRadius = Math.max(rect.width, rect.height) * 1.2;

      if (distance < magnetRadius) {
        // Clamp maximum displacement to 12px so button never leaves container
        const clampedX = Math.max(-12, Math.min(12, deltaX * strength));
        const clampedY = Math.max(-12, Math.min(12, deltaY * strength));
        setPosition({ x: clampedX, y: clampedY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return { ref, position };
}
