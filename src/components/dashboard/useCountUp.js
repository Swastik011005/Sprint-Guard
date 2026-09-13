import { useEffect, useRef, useState } from 'react';

// Animates a numeric value from its previous number up (or down) to the
// new one over a short duration. Only meant for plain integers ("7", "10")
// — non-numeric values (like "1.8 days") are the caller's job to skip.
// Respects prefers-reduced-motion by jumping straight to the target.
export function useCountUp(target, duration = 500) {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || fromRef.current === target) {
      setDisplay(target);
      fromRef.current = target;
      return;
    }

    const from = fromRef.current;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - (1 - progress) * (1 - progress); // ease-out
      const current = Math.round(from + (target - from) * eased);
      setDisplay(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return display;
}
