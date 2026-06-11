"use client";

import { useRef } from "react";

/**
 * Lightweight 3D tilt-on-hover wrapper (no library). Rotates up to ~5deg
 * toward the cursor with a soft spring-back on leave. No-op for touch and
 * for users who prefer reduced motion.
 */
export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 450ms cubic-bezier(.2,.8,.3,1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 80ms linear";
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform" }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}
