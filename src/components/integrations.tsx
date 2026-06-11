"use client";

import { forwardRef, useRef } from "react";
import {
  siShopify,
  siWoocommerce,
  siWix,
  siWhatsapp,
  siInstagram,
  siMercadopago,
} from "simple-icons";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { BrandIcon } from "./brand-icon";
import { Logo } from "./icons";

const Node = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 grid size-14 place-items-center rounded-2xl border border-line bg-white shadow-[0_12px_30px_-18px_rgba(11,20,17,0.5)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Node.displayName = "Node";

const leftBrands = [
  { icon: siShopify, label: "Shopify" },
  { icon: siWoocommerce, label: "WooCommerce" },
  { icon: siWix, label: "Wix" },
];
const rightBrands = [
  { icon: siWhatsapp, label: "WhatsApp" },
  { icon: siInstagram, label: "Instagram" },
  { icon: siMercadopago, label: "Mercado Pago" },
];

const beamProps = {
  gradientStartColor: "#2cdd8d",
  gradientStopColor: "#057a46",
  pathColor: "#cdd8d1",
  duration: 4,
} as const;

export function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const l0 = useRef<HTMLDivElement>(null);
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const r0 = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);

  return (
    <section className="border-b border-line bg-surface">
      <div className="container-page py-20 md:py-24">
        <BlurFade inView>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-brand-600">Integrações</p>
            <GradientHeading
              as="h2"
              variant="brand"
              size="md"
              weight="semi"
              className="mt-2"
            >
              Conecte tudo o que você já usa
            </GradientHeading>
            <p className="mt-4 text-lg text-subtle">
              Plug-and-play com as principais plataformas de venda. A Cakto vira
              o centro financeiro da sua operação.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <div
            ref={containerRef}
            className="relative mx-auto mt-14 flex h-[360px] w-full max-w-2xl items-center justify-between px-2 sm:px-10"
          >
            <DotPattern
              className="text-brand-200/50 [mask-image:radial-gradient(320px_circle_at_center,white,transparent)]"
              cr={1}
            />
            <div className="flex flex-col justify-center gap-8">
              <Node ref={l0}>
                <BrandIcon icon={leftBrands[0].icon} colored title={leftBrands[0].label} className="h-8 w-8" />
              </Node>
              <Node ref={l1}>
                <BrandIcon icon={leftBrands[1].icon} colored title={leftBrands[1].label} className="h-8 w-8" />
              </Node>
              <Node ref={l2}>
                <BrandIcon icon={leftBrands[2].icon} colored title={leftBrands[2].label} className="h-8 w-8" />
              </Node>
            </div>

            <Node
              ref={center}
              className="size-20 rounded-2xl border-brand-200 bg-white"
            >
              <Logo className="flex-col gap-1 [&>span:last-child]:text-[11px]" />
            </Node>

            <div className="flex flex-col justify-center gap-8">
              <Node ref={r0}>
                <BrandIcon icon={rightBrands[0].icon} colored title={rightBrands[0].label} className="h-8 w-8" />
              </Node>
              <Node ref={r1}>
                <BrandIcon icon={rightBrands[1].icon} colored title={rightBrands[1].label} className="h-8 w-8" />
              </Node>
              <Node ref={r2}>
                <BrandIcon icon={rightBrands[2].icon} colored title={rightBrands[2].label} className="h-8 w-8" />
              </Node>
            </div>

            <AnimatedBeam containerRef={containerRef} fromRef={l0} toRef={center} curvature={-40} delay={0} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={l1} toRef={center} curvature={0} delay={0.4} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={l2} toRef={center} curvature={40} delay={0.8} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={center} toRef={r0} curvature={-40} delay={0.2} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={center} toRef={r1} curvature={0} delay={0.6} {...beamProps} />
            <AnimatedBeam containerRef={containerRef} fromRef={center} toRef={r2} curvature={40} delay={1} {...beamProps} />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
