import { BlurFade } from "@/components/ui/blur-fade";
import { GradientHeading } from "@/components/ui/gradient-heading";
import {
  TextureCard,
  TextureCardContent,
  TextureCardTitle,
} from "@/components/ui/texture-card";

const steps = [
  {
    step: "01",
    title: "Crie sua conta",
    description:
      "Cadastro 100% online com validação de dados em minutos. Sem papelada e sem mensalidade.",
  },
  {
    step: "02",
    title: "Configure o checkout",
    description:
      "Conecte sua loja ou crie um link de pagamento. Personalize as formas de pagamento e o parcelamento.",
  },
  {
    step: "03",
    title: "Comece a receber",
    description:
      "Acompanhe cada venda no painel e saque o saldo disponível direto para a sua conta bancária.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="border-b border-line bg-surface">
      <div className="container-page py-20 md:py-24">
        <BlurFade inView>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-600">
              Como funciona
            </p>
            <GradientHeading
              as="h2"
              variant="brand"
              size="md"
              weight="semi"
              className="mt-2"
            >
              Da conta criada à primeira venda em um dia
            </GradientHeading>
          </div>
        </BlurFade>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map(({ step, title, description }, i) => (
            <BlurFade key={step} delay={0.1 + i * 0.1} inView>
              <TextureCard className="h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-30px_rgba(11,20,17,0.4)]">
                <TextureCardContent className="px-7 py-7">
                  <span className="text-sm font-semibold text-brand-600">
                    {step}
                  </span>
                  <TextureCardTitle className="mt-3 pl-0 text-xl text-ink">
                    {title}
                  </TextureCardTitle>
                  <p className="mt-2 leading-relaxed text-subtle">
                    {description}
                  </p>
                </TextureCardContent>
              </TextureCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
