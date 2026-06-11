"use client";

import { useEffect, useRef } from "react";

/**
 * Cakto wordmark that draws itself in (anime.js SVG line-drawing + timeline)
 * the first time it scrolls into view. anime.js is loaded on demand.
 * If JS is unavailable the logo simply renders in its final, drawn state.
 */
export function AnimatedLogo({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

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
        const { createTimeline, svg } = await import("animejs");
        const root = ref.current;
        if (!root) return;
        const mark = root.querySelector("svg");
        const path = root.querySelector("path");
        const word = root.querySelector("[data-word]");
        if (!mark || !path || !word) return;

        createTimeline()
          .add(mark, {
            scale: [0.5, 1],
            rotate: [-35, 0],
            opacity: [0, 1],
            duration: 550,
            ease: "outBack",
          })
          .add(
            svg.createDrawable(path),
            { draw: ["0 0", "0 1"], duration: 650, ease: "inOutQuad" },
            "-=350"
          )
          .add(
            word,
            { opacity: [0, 1], x: [-8, 0], duration: 450, ease: "outQuad" },
            "-=400"
          );
      },
      { rootMargin: "0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`} ref={ref}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="8" className="fill-brand-500" />
        <path
          d="M18.5 11.2a4.6 4.6 0 1 0 0 5.6"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span
        data-word
        className="text-[19px] font-semibold tracking-tight text-ink"
      >
        Cakto
      </span>
    </span>
  );
}
