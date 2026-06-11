"use client";

import { useEffect, useRef } from "react";

type VantaEffect = { destroy: () => void };

/**
 * Vanta.js RINGS background (three.js + WebGL).
 * - three is loaded on demand (kept out of the initial bundle)
 * - initialised only when scrolled near the viewport (perf)
 * - guarded against environments without WebGL so it can never crash the page
 */
export function VantaRings({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const init = async () => {
      if (effectRef.current || cancelled || !ref.current) return;
      try {
        const THREE = await import("three");
        const RINGS = (await import("vanta/dist/vanta.rings.min")).default;
        if (cancelled || !ref.current || effectRef.current) return;
        effectRef.current = RINGS({
          el: ref.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          backgroundColor: 0x0b1411, // --color-ink
          color: 0x13c374, // --color-brand-500
        });
      } catch {
        // WebGL unavailable — leave the background empty, page stays intact
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void init();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return <div ref={ref} className={className} aria-hidden />;
}
