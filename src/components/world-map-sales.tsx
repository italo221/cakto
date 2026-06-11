"use client";

import { useEffect, useMemo, useRef } from "react";
import DottedMap from "dotted-map";

/**
 * Dotted world map with "comets" falling onto cities — each impact pings and
 * shows a small sale chip, representing live global sales.
 *
 * - Map dots + pin coordinates come from dotted-map (same 198x100 viewBox for
 *   the overlay, so impacts land exactly on the grid — no manual projection).
 * - Comets are pure WAAPI (element.animate), no animation lib needed.
 * - Loop only runs while the section is on screen; reduced motion gets a
 *   static map with lit city dots.
 */

const SALES: { city: string; lat: number; lng: number; amount: string }[] = [
  { city: "São Paulo", lat: -23.55, lng: -46.63, amount: "+R$ 297" },
  { city: "Rio de Janeiro", lat: -22.91, lng: -43.17, amount: "+R$ 89" },
  { city: "Buenos Aires", lat: -34.6, lng: -58.38, amount: "+US$ 35" },
  { city: "Cidade do México", lat: 19.43, lng: -99.13, amount: "+US$ 59" },
  { city: "Miami", lat: 25.76, lng: -80.19, amount: "+US$ 120" },
  { city: "Nova York", lat: 40.71, lng: -74.0, amount: "+US$ 240" },
  { city: "Toronto", lat: 43.65, lng: -79.38, amount: "+US$ 75" },
  { city: "Lisboa", lat: 38.72, lng: -9.14, amount: "+€ 149" },
  { city: "Londres", lat: 51.5, lng: -0.13, amount: "+£ 89" },
  { city: "Madri", lat: 40.42, lng: -3.7, amount: "+€ 65" },
  { city: "Berlim", lat: 52.52, lng: 13.4, amount: "+€ 110" },
  { city: "Dubai", lat: 25.2, lng: 55.27, amount: "+US$ 180" },
  { city: "Singapura", lat: 1.35, lng: 103.82, amount: "+US$ 95" },
  { city: "Tóquio", lat: 35.68, lng: 139.69, amount: "+US$ 130" },
  { city: "Sydney", lat: -33.87, lng: 151.21, amount: "+US$ 70" },
];

const SVG_NS = "http://www.w3.org/2000/svg";

function el<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number>
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

export default function WorldMapSales() {
  const overlayRef = useRef<SVGSVGElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  // Build the dotted map + projected city pins once
  const { mapSvg, pins } = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const svg = map.getSVG({
      radius: 0.22,
      color: "#b9c9bf",
      shape: "circle",
      backgroundColor: "transparent",
    });
    const projected = SALES.flatMap((s) => {
      const pin = map.getPin({ lat: s.lat, lng: s.lng });
      return pin ? [{ ...s, x: pin.x, y: pin.y }] : [];
    });
    return { mapSvg: svg, pins: projected };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const host = hostRef.current;
    if (!overlay || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let running = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let order = [...pins].sort(() => Math.random() - 0.5);
    let i = 0;

    // comet travel direction: falls in from the upper right
    const DX = 13;
    const DY = -27;
    const LEN = Math.hypot(DX, DY);
    const ux = DX / LEN;
    const uy = DY / LEN;

    const spawn = () => {
      if (!running) return;
      const t = order[i % order.length];
      i += 1;
      if (i % order.length === 0) order = [...pins].sort(() => Math.random() - 0.5);

      // — comet (tail + bright core + head), translated from sky to target
      const comet = el("g", { transform: `translate(${t.x + DX} ${t.y + DY})` });
      comet.appendChild(
        el("line", {
          x1: 0, y1: 0, x2: ux * 9, y2: uy * 9,
          stroke: "#2cdd8d", "stroke-width": 0.45, "stroke-linecap": "round", "stroke-opacity": 0.25,
        })
      );
      comet.appendChild(
        el("line", {
          x1: 0, y1: 0, x2: ux * 4.5, y2: uy * 4.5,
          stroke: "#2cdd8d", "stroke-width": 0.5, "stroke-linecap": "round", "stroke-opacity": 0.6,
        })
      );
      comet.appendChild(el("circle", { cx: 0, cy: 0, r: 0.7, fill: "#13c374" }));
      overlay.appendChild(comet);

      const fall = comet.animate(
        [
          { transform: `translate(${t.x + DX}px, ${t.y + DY}px)`, opacity: 0 },
          { transform: `translate(${t.x + DX * 0.85}px, ${t.y + DY * 0.85}px)`, opacity: 1, offset: 0.12 },
          { transform: `translate(${t.x}px, ${t.y}px)`, opacity: 1 },
        ],
        { duration: 750, easing: "cubic-bezier(.55,0,.85,.6)" }
      );

      fall.onfinish = () => {
        comet.remove();

        // — impact ping
        const ping = el("circle", {
          cx: t.x, cy: t.y, r: 0.8,
          fill: "none", stroke: "#13c374", "stroke-width": 0.35,
        });
        overlay.appendChild(ping);
        const grow = ping.animate(
          [
            { r: 0.8, opacity: 0.65 },
            { r: 6, opacity: 0 },
          ],
          { duration: 850, easing: "ease-out" }
        );
        grow.onfinish = () => ping.remove();

        // — sale chip ("+R$ 297 · São Paulo")
        const label = `${t.amount}`;
        const w = label.length * 1.45 + 3;
        const chip = el("g", { transform: `translate(${t.x} ${t.y})`, opacity: 0 });
        chip.appendChild(
          el("rect", {
            x: -w / 2, y: -7.4, width: w, height: 4.4, rx: 2.2,
            fill: "#ffffff", stroke: "#e4eae6", "stroke-width": 0.18,
          })
        );
        const text = el("text", {
          x: 0, y: -4.2, "text-anchor": "middle",
          "font-size": 2.7, "font-weight": 600, fill: "#035932",
          "font-family": "var(--font-sans)",
        });
        text.textContent = label;
        chip.appendChild(text);
        overlay.appendChild(chip);
        const float = chip.animate(
          [
            { opacity: 0, transform: `translate(${t.x}px, ${t.y + 1.5}px)` },
            { opacity: 1, transform: `translate(${t.x}px, ${t.y}px)`, offset: 0.18 },
            { opacity: 1, transform: `translate(${t.x}px, ${t.y - 0.6}px)`, offset: 0.8 },
            { opacity: 0, transform: `translate(${t.x}px, ${t.y - 2}px)` },
          ],
          { duration: 1500, easing: "ease-out" }
        );
        float.onfinish = () => chip.remove();
      };

      timer = setTimeout(spawn, 950 + Math.random() * 500);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible && !running) {
          running = true;
          spawn();
        } else if (!visible && running) {
          running = false;
          if (timer) clearTimeout(timer);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(host);

    return () => {
      running = false;
      if (timer) clearTimeout(timer);
      io.disconnect();
    };
  }, [pins]);

  return (
    <div ref={hostRef} className="relative w-full select-none" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(mapSvg)}`}
        alt=""
        draggable={false}
        className="h-auto w-full [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_88%,transparent)]"
      />
      <svg
        ref={overlayRef}
        viewBox="0 0 198 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {/* lit city dots */}
        {pins.map((p) => (
          <g key={p.city}>
            <circle cx={p.x} cy={p.y} r={1.6} fill="#13c374" opacity={0.15} />
            <circle cx={p.x} cy={p.y} r={0.55} fill="#057a46" />
          </g>
        ))}
      </svg>
    </div>
  );
}
