"use client";

import type { COBEOptions } from "cobe";
import dynamic from "next/dynamic";
import { BlurFade } from "@/components/ui/blur-fade";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { CheckIcon } from "./icons";

// Lazy-load the globe (cobe + WebGL) — heavy and purely decorative, below the fold
const Globe = dynamic(
  () => import("@/components/ui/globe").then((m) => m.Globe),
  { ssr: false, loading: () => <div className="size-full" /> }
);

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 1.1,
  mapSamples: 16000,
  mapBrightness: 1.7,
  baseColor: [0.58, 0.66, 0.61],
  markerColor: [19 / 255, 195 / 255, 116 / 255],
  glowColor: [0.85, 0.93, 0.88],
  markers: [
    { location: [-23.5505, -46.6333], size: 0.12 }, // São Paulo
    { location: [-22.9068, -43.1729], size: 0.08 }, // Rio
    { location: [-15.7939, -47.8828], size: 0.07 }, // Brasília
    { location: [-8.0476, -34.877], size: 0.06 }, // Recife
    { location: [-30.0346, -51.2177], size: 0.06 }, // Porto Alegre
    { location: [-3.119, -60.0217], size: 0.05 }, // Manaus
    { location: [38.7223, -9.1393], size: 0.05 }, // Lisboa
    { location: [40.7128, -74.006], size: 0.05 }, // NY
    { location: [51.5074, -0.1278], size: 0.04 }, // Londres
  ],
};

const points = [
  "Receba de clientes em qualquer estado",
  "Conversão de moeda automática",
  "Conformidade com o Banco Central",
];

export function GlobalReach() {
  return (
    <section className="overflow-hidden border-b border-line bg-surface">
      <div className="container-page grid items-center gap-12 py-20 md:grid-cols-2 md:py-24">
        <BlurFade inView>
          <div>
            <p className="text-sm font-semibold text-brand-600">
              Alcance nacional
            </p>
            <GradientHeading
              as="h2"
              variant="brand"
              size="md"
              weight="semi"
              className="mt-2"
            >
              Do seu Pix ao mundo, sem fronteiras
            </GradientHeading>
            <p className="mt-4 max-w-md text-lg text-subtle">
              Processamos pagamentos de todas as regiões do Brasil com a mesma
              velocidade — e estrutura pronta para você escalar para fora.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <CheckIcon className="size-[1em] shrink-0 text-brand-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </BlurFade>

        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <Globe config={GLOBE_CONFIG} />
        </div>
      </div>
    </section>
  );
}
