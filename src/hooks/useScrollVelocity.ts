import { useState, useEffect, useRef } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    lastTime.current = performance.now();
    let animId: number;

    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const dt = Math.max(1, now - lastTime.current);
      const dy = currentScrollY - lastScrollY.current;

      const rawVelocity = dy / dt; // pixels per ms
      // Dampened target
      velocityRef.current = rawVelocity * 15;

      lastScrollY.current = currentScrollY;
      lastTime.current = now;
    };

    const updateLoop = () => {
      // Smooth decay toward zero
      velocityRef.current *= 0.88;
      if (Math.abs(velocityRef.current) < 0.01) {
        velocityRef.current = 0;
      }
      setVelocity(velocityRef.current);
      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return velocity;
}
