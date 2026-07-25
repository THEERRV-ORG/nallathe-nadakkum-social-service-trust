import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface CountUpStatProps {
  /** Target display string, e.g. "400+", "5,000+", "10". */
  value: string;
  className?: string;
  /** Animation length in ms. */
  duration?: number;
}

/**
 * Splits a stat like "5,000+" into its numeric target (5000) and any
 * trailing suffix ("+"). Non-numeric values fall back to a plain render.
 */
function parseStat(value: string): { num: number; suffix: string } {
  const match = value.replace(/,/g, '').match(/^(\d+)(.*)$/);
  if (!match) return { num: NaN, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] ?? '' };
}

/**
 * Animates a statistic from 0 up to its target value once, the first time it
 * scrolls into view. Respects prefers-reduced-motion by showing the final
 * value immediately, and keeps thousands formatting (e.g. 5,000).
 */
export default function CountUpStat({ value, className, duration = 1600 }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  // once:false so the count-up replays every time the section re-enters view.
  const inView = useInView(ref, { once: false, margin: '-40px' });
  const { num, suffix } = parseStat(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (Number.isNaN(num)) return;

    // Reset to zero whenever the stat scrolls out of view, so it animates
    // fresh on the next visit rather than only on the first load.
    if (!inView) {
      setDisplay(0);
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplay(num);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(Math.round(eased * num));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, duration]);

  if (Number.isNaN(num)) {
    return <div ref={ref} className={className}>{value}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {display.toLocaleString('en-IN')}{suffix}
    </div>
  );
}
