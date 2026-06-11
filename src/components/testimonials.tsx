import { Marquee } from "@/components/ui/marquee";
import { BlurFade } from "@/components/ui/blur-fade";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ShineBorder } from "@/components/ui/shine-border";

type Review = {
  name: string;
  role: string;
  body: string;
};

const reviews: Review[] = [
  {
    name: "Marina Alves",
    role: "Loja de cosméticos",
    body: "Migrei o checkout para a Cakto e a aprovação no cartão subiu de cara. O dinheiro cai rápido e sem dor de cabeça.",
  },
  {
    name: "Rafael Costa",
    role: "Infoprodutor",
    body: "O split automático resolveu o pagamento dos meus afiliados. Antes era planilha; hoje é tudo na plataforma.",
  },
  {
    name: "Juliana Prado",
    role: "Moda fitness",
    body: "Checkout dentro da minha marca fez diferença na conversão. O cliente nem percebe que mudou de página.",
  },
  {
    name: "Diego Martins",
    role: "Eletrônicos",
    body: "O antifraude derrubou meus chargebacks sem bloquear venda boa. Suporte responde de verdade.",
  },
  {
    name: "Camila Souza",
    role: "Cursos online",
    body: "Comecei com CPF, sem mensalidade, e fui crescendo. O painel mostra tudo que eu preciso num lugar só.",
  },
  {
    name: "Bruno Ferreira",
    role: "Marketplace de nicho",
    body: "Integração rápida com a minha loja e saque em 1 dia útil. Mudou o fluxo de caixa do negócio.",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

function ReviewCard({ name, role, body }: Review) {
  return (
    <figure className="relative w-80 shrink-0 overflow-hidden rounded-card border border-line bg-white p-6 shadow-[0_12px_40px_-30px_rgba(11,20,17,0.4)]">
      <ShineBorder
        borderWidth={1}
        duration={12}
        shineColor={["#2cdd8d", "#057a46"]}
      />
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <figcaption>
          <p className="text-sm font-semibold text-ink">{name}</p>
          <p className="text-xs text-subtle">{role}</p>
        </figcaption>
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-ink-soft">
        “{body}”
      </blockquote>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-page py-20 md:py-24">
        <BlurFade inView>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-brand-600">Depoimentos</p>
            <GradientHeading
              as="h2"
              variant="brand"
              size="md"
              weight="semi"
              className="mt-2"
            >
              Negócios de todo o Brasil crescem com a Cakto
            </GradientHeading>

            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex -space-x-2.5">
                {reviews.slice(0, 5).map((r, i) => (
                  <span
                    key={r.name}
                    className="grid size-9 place-items-center rounded-full border-2 border-surface text-xs font-semibold text-white transition-transform duration-200 hover:-translate-y-1"
                    style={{
                      backgroundColor: ["#057a46", "#0a6e42", "#046a3e", "#035932", "#34433c"][i],
                      zIndex: 5 - i,
                    }}
                  >
                    {r.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                ))}
              </div>
              <p className="text-sm text-subtle">
                <span className="font-semibold text-ink">+30 mil</span>{" "}
                negócios ativos
              </p>
            </div>
          </div>
        </BlurFade>

        <div className="relative mt-12 flex flex-col gap-5 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s] [--gap:1.25rem]">
            {firstRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            className="[--duration:40s] [--gap:1.25rem]"
          >
            {secondRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-surface to-transparent" />
        </div>
      </div>
    </section>
  );
}
