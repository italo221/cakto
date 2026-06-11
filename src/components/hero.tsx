import { ArrowRightIcon, CheckIcon } from "./icons";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { AuroraText } from "@/components/ui/aurora-text";
import { WordRotate } from "@/components/ui/word-rotate";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { VantaNet } from "@/components/vanta-net";

const highlights = [
  "Sem mensalidade",
  "Aprovação otimizada",
  "Saque em 1 dia útil",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* subtle background wash + flickering grid, no purple */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_-10%,var(--color-brand-50),transparent)]"
      />
      {/* tech network mesh (Vanta NET), faded so it never competes with the copy */}
      <VantaNet className="absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,white,white_35%,transparent_85%)]" />

      <div className="container-page grid items-center gap-14 py-16 md:grid-cols-2 md:py-24">
        <div>
          <BlurFade delay={0.05} inView>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              <AnimatedShinyText className="text-ink-soft">
                Pagamentos para o mercado brasileiro
              </AnimatedShinyText>
            </div>
          </BlurFade>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            <TextAnimate
              as="span"
              by="word"
              animation="blurInUp"
              once
              delay={0.15}
              className="inline"
            >
              Receba pagamentos sem fricção e
            </TextAnimate>{" "}
            <AuroraText
              colors={["#057a46", "#0a6e42", "#035932", "#057a46"]}
              speed={1.2}
            >
              venda mais
            </AuroraText>
          </h1>

          <BlurFade delay={0.5} inView>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 text-lg font-medium text-ink-soft">
              Feito para quem vende
              <WordRotate
                words={[
                  "infoprodutos",
                  "e-commerce",
                  "SaaS",
                  "serviços",
                  "mentorias",
                ]}
                className="font-semibold text-brand-600"
              />
            </p>
          </BlurFade>

          <BlurFade delay={0.18} inView>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-subtle">
              Checkout transparente, antifraude integrado e repasses
              automáticos. A Cakto cuida da operação financeira para você focar
              no produto.
            </p>
          </BlurFade>

          <BlurFade delay={0.24} inView>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#precos" className="inline-block">
                <ShimmerButton
                  background="#057a46"
                  shimmerColor="#a4e5c8"
                  className="px-6 py-3 text-sm font-semibold"
                >
                  <span className="flex items-center gap-2">
                    Criar conta grátis
                    <ArrowRightIcon className="size-[1em]" />
                  </span>
                </ShimmerButton>
              </a>
              <a href="#como-funciona">
                <InteractiveHoverButton className="border-line text-sm text-ink">
                  Ver como funciona
                </InteractiveHoverButton>
              </a>
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <CheckIcon className="size-[1em] text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} inView className="md:justify-self-end">
          <CheckoutMock />
        </BlurFade>
      </div>
    </section>
  );
}

function CheckoutMock() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-[0_24px_60px_-30px_rgba(11,20,17,0.35)]">
        <BorderBeam
          size={90}
          duration={7}
          colorFrom="#2cdd8d"
          colorTo="#057a46"
          borderWidth={1.5}
        />
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-subtle">Pagamento</span>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            Seguro
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between border-b border-line pb-5">
          <div>
            <p className="text-sm text-subtle">Total a pagar</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
              R$ 297,00
            </p>
          </div>
          <span className="text-xs text-subtle">em até 12x</span>
        </div>

        <div className="mt-5 space-y-3">
          <MockField label="Cartão de crédito" value="•••• •••• •••• 4029" />
          <div className="grid grid-cols-2 gap-3">
            <MockField label="Validade" value="08/29" />
            <MockField label="CVV" value="•••" />
          </div>
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white"
        >
          Pagar R$ 297,00
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-subtle">
          <CheckIcon className="size-[1em] text-brand-600" />
          Aprovação processada em segundos
        </div>
      </div>

      {/* floating receipt chip — sits above the card, clear of its content */}
      <div className="absolute -top-6 left-4 hidden items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-2.5 shadow-[0_18px_40px_-24px_rgba(11,20,17,0.45)] sm:flex">
        <span className="grid size-7 place-items-center rounded-full bg-brand-50 text-brand-600">
          <CheckIcon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[11px] leading-none text-subtle">Venda aprovada</p>
          <p className="text-sm font-semibold leading-tight text-ink">
            + R$ 297,00
          </p>
        </div>
      </div>
    </div>
  );
}

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2.5">
      <p className="text-[11px] font-medium uppercase tracking-wide text-subtle">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-ink">{value}</p>
    </div>
  );
}
