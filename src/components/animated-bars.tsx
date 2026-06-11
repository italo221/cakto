"use client";

import { useEffect, useRef } from "react";

/**
 * Bar chart whose bars grow from the baseline (anime.js stagger) the first
 * time it scrolls into view. anime.js is loaded on demand; without JS (or
 * with reduced motion) the bars simply render at full height.
 */
export function AnimatedBars({
  bars,
  className,
  barClassName = "flex-1 rounded-t-[3px] bg-gradient-to-t from-brand-200 to-brand-500",
}: {
  bars: number[];
  className?: string;
  barClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let done = false;
    const io = new IntersectionObserver(
      async (entries) => {
        if (done || !entries.some((e) => e.isIntersecting)) return;
        done = true;
        io.disconnect();
        const { animate, stagger } = await import("animejs");
        if (!ref.current) return;
        animate(ref.current.querySelectorAll("[data-bar]"), {
          scaleY: [0, 1],
          delay: stagger(70),
          duration: 800,
          ease: "outQuart",
        });
      },
      { rootMargin: "-10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {bars.map((h, i) => (
        <div
          key={i}
          data-bar
          className={`origin-bottom ${barClassName}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
