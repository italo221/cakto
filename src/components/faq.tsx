import { BlurFade } from "@/components/ui/blur-fade";
import { GradientHeading } from "@/components/ui/gradient-heading";

const faqs = [
  {
    q: "Preciso ter CNPJ para usar a Cakto?",
    a: "Não. Você pode começar como pessoa física (CPF) e migrar para CNPJ quando quiser, sem perder o histórico da conta.",
  },
  {
    q: "Quanto tempo leva para o dinheiro cair?",
    a: "O saldo de vendas no Pix e cartão fica disponível para saque em 1 dia útil. Você pode sacar sob demanda ou agendar saques automáticos.",
  },
  {
    q: "Existe taxa de mensalidade?",
    a: "Não cobramos mensalidade nem taxa de adesão. Você paga apenas uma taxa por transação aprovada, conforme a forma de pagamento.",
  },
  {
    q: "Como funciona o antifraude?",
    a: "Cada transação passa por uma análise de risco automática. Compras suspeitas são sinalizadas antes da aprovação, reduzindo chargebacks sem bloquear vendas legítimas.",
  },
  {
    q: "Consigo integrar com a minha loja?",
    a: "Sim. A Cakto oferece integração com as principais plataformas de e-commerce e uma API para conectar o seu próprio sistema.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export function Faq() {
  return (
    <section id="duvidas" className="border-b border-line">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-page py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <BlurFade inView>
            <div>
              <p className="text-sm font-semibold text-brand-600">Dúvidas</p>
              <GradientHeading
                as="h2"
                variant="brand"
                size="md"
                weight="semi"
                className="mt-2"
              >
                Perguntas frequentes
              </GradientHeading>
              <p className="mt-4 text-subtle">
                Não encontrou o que procurava? Fale com o nosso time em{" "}
                <a
                  href="mailto:contato@cakto.com.br"
                  className="font-medium text-brand-600 hover:text-brand-700"
                >
                  contato@cakto.com.br
                </a>
                .
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <div className="divide-y divide-line border-y border-line">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-ink">
                    {q}
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-subtle transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pr-10 leading-relaxed text-subtle">{a}</p>
                </details>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
