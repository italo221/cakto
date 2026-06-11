"use client";

import { useEffect, useRef } from "react";

type VantaEffect = { destroy: () => void };

/**
 * Vanta.js NET background (three.js + WebGL) — a connected-nodes mesh for a
 * "tech" feel on light surfaces. Same safeguards as VantaRings:
 * three loaded on demand, initialised when near the viewport, WebGL-guarded.
 */
export function VantaNet({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced-motion: skip the WebGL animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;

    // run after the main thread is idle so three.js never competes with the LCP
    const whenIdle = (cb: () => void) => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(cb, { timeout: 2500 });
      } else {
        setTimeout(cb, 1200);
      }
    };

    const init = async () => {
      if (effectRef.current || cancelled || !ref.current) return;
      try {
        const THREE = await import("three");
        const NET = (await import("vanta/dist/vanta.net.min")).default;
        if (cancelled || !ref.current || effectRef.current) return;
        effectRef.current = NET({
          el: ref.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          backgroundAlpha: 0, // transparent — let the hero background show through
          color: 0x13c374, // --color-brand-500
          points: 9,
          maxDistance: 22,
          spacing: 17,
          showDots: true,
        });
      } catch {
        // WebGL unavailable — leave the background empty, page stays intact
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          whenIdle(() => void init());
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
