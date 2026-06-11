"use client";

import { useEffect, useRef } from "react";

const rates = [
  { method: "Pix", rate: "0,99%", note: "por transação aprovada" },
  { method: "Cartão", rate: "3,99%", note: "+ R$ 0,49 por venda" },
  { method: "Boleto", rate: "R$ 2,49", note: "por boleto compensado" },
];

export function PriceRates() {
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
        // anime.js loaded on demand (kept out of the initial bundle)
        const { animate, stagger } = await import("animejs");
        if (!ref.current) return;
        animate(ref.current.querySelectorAll("[data-rate]"), {
          opacity: [0, 1],
          scale: [0.85, 1],
          y: [14, 0],
          delay: stagger(110),
          duration: 700,
          ease: "outBack",
        });
      },
      { rootMargin: "-12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid md:grid-cols-3">
      {rates.map(({ method, rate, note }) => (
        <div
          key={method}
          data-rate
          className="group border-b border-line p-8 text-center transition-colors duration-300 last:border-b-0 hover:bg-brand-50/60 md:border-b-0 md:border-r md:last:border-r-0"
        >
          <p className="text-sm font-medium text-subtle">{method}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-600">
            {rate}
          </p>
          <p className="mt-1 text-sm text-subtle">{note}</p>
        </div>
      ))}
    </div>
  );
}
