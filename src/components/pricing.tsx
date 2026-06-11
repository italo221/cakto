import { ArrowRightIcon, CheckIcon } from "./icons";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PriceRates } from "./price-rates";

const included = [
  "Sem mensalidade ou taxa de adesão",
  "Pix, cartão de crédito e boleto",
  "Antifraude e split inclusos",
  "Painel e relatórios completos",
  "Suporte por e-mail e chat",
];

export function Pricing() {
  return (
    <section id="precos" className="border-b border-line bg-surface">
      <div className="container-page py-20 md:py-24">
        <BlurFade inView>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-brand-600">Preços</p>
            <GradientHeading
              as="h2"
              variant="brand"
              size="md"
              weight="semi"
              className="mt-2"
            >
              Você só paga quando vende
            </GradientHeading>
            <p className="mt-4 text-lg text-subtle">
              Taxas transparentes, sem surpresas no fim do mês. Comece grátis e
              escale conforme o seu faturamento cresce.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-card border border-line bg-white shadow-[0_24px_60px_-40px_rgba(11,20,17,0.35)]">
            <BorderBeam
              size={120}
              duration={8}
              colorFrom="#2cdd8d"
              colorTo="#057a46"
              borderWidth={1.5}
            />
            <PriceRates />

            <div className="grid gap-8 border-t border-line bg-white p-8 md:grid-cols-[1fr_auto] md:items-center">
              <ul className="grid gap-2 sm:grid-cols-2">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-ink-soft"
                  >
                    <CheckIcon className="size-[1em] shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Criar conta grátis
                <ArrowRightIcon className="size-[1em]" />
              </a>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
