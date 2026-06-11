"use client";

import dynamic from "next/dynamic";
import { BlurFade } from "@/components/ui/blur-fade";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { CheckIcon } from "./icons";

// dotted-map carries world geometry — load it only when the section renders
const WorldMapSales = dynamic(() => import("@/components/world-map-sales"), {
  ssr: false,
  loading: () => <div className="aspect-[198/100] w-full" />,
});

const points = [
  "Receba de clientes em qualquer país",
  "Conversão de moeda automática",
  "Conformidade com o Banco Central",
];

export function GlobalReach() {
  return (
    <section className="overflow-hidden border-b border-line bg-surface">
      <div className="container-page py-20 md:py-24">
        <BlurFade inView>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-brand-600">
              Alcance global
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
            <p className="mt-4 text-lg text-subtle">
              Vendas chegando de todos os fusos, processadas na hora — cada
              cometa no mapa é um pagamento aprovado.
            </p>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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

        <BlurFade delay={0.15} inView>
          <div className="mx-auto mt-10 w-full max-w-4xl">
            <WorldMapSales />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
