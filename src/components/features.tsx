import {
  siPix,
  siVisa,
  siMastercard,
  siAmericanexpress,
  siNubank,
  siPicpay,
  siMercadopago,
  siPaypal,
  siWhatsapp,
  siInstagram,
  siTelegram,
} from "simple-icons";
import {
  BoltIcon,
  CardIcon,
  ChartIcon,
  CheckIcon,
  LinkIcon,
  ShieldIcon,
  SplitIcon,
} from "./icons";
import { BrandIcon } from "./brand-icon";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Marquee } from "@/components/ui/marquee";
import { Ripple } from "@/components/ui/ripple";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";

/* backgrounds live only in the TOP half of each card, so they never touch the
   title/description that sit anchored at the bottom */
const topZone = "pointer-events-none absolute inset-x-0 top-0 h-[54%] overflow-hidden";

function LogoPill({
  icon,
  label,
}: {
  icon: (typeof siPix);
  label: string;
}) {
  return (
    <span className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 shadow-sm">
      <BrandIcon icon={icon} colored title={label} className="h-4 w-4" />
      <span className="text-xs font-semibold text-ink-soft">{label}</span>
    </span>
  );
}

const payments = [
  { icon: siPix, label: "Pix" },
  { icon: siVisa, label: "Visa" },
  { icon: siMastercard, label: "Mastercard" },
  { icon: siAmericanexpress, label: "Amex" },
  { icon: siNubank, label: "Nubank" },
  { icon: siPicpay, label: "PicPay" },
  { icon: siMercadopago, label: "Mercado Pago" },
  { icon: siPaypal, label: "PayPal" },
];

function PaymentMarquee() {
  return (
    <div className={`${topZone} flex flex-col justify-center gap-2.5`}>
      <Marquee className="[--duration:28s] [--gap:0.6rem]">
        {payments.slice(0, 4).map((p) => (
          <LogoPill key={p.label} {...p} />
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:28s] [--gap:0.6rem]">
        {payments.slice(4).map((p) => (
          <LogoPill key={p.label} {...p} />
        ))}
      </Marquee>
    </div>
  );
}

function AntifraudRipple() {
  return (
    <div className={`${topZone} h-[62%]`}>
      <Ripple mainCircleSize={110} numCircles={6} />
    </div>
  );
}

const splitNodes = ["40%", "35%", "25%"];

function SplitOrbit() {
  return (
    <div className={`${topZone} flex items-center justify-center`}>
      <div className="relative flex h-[150px] w-[150px] items-center justify-center">
        <span className="z-10 grid size-12 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white shadow-lg">
          R$
        </span>
        <OrbitingCircles radius={58} iconSize={34} duration={22} path>
          {splitNodes.map((n) => (
            <span
              key={n}
              className="grid size-full place-items-center rounded-full border border-line bg-white text-[10px] font-bold text-brand-700 shadow-sm"
            >
              {n}
            </span>
          ))}
        </OrbitingCircles>
      </div>
    </div>
  );
}

const sales = [
  { name: "Marina A.", amount: "R$ 297,00" },
  { name: "Rafael C.", amount: "R$ 1.490,00" },
  { name: "Juliana P.", amount: "R$ 89,90" },
  { name: "Diego M.", amount: "R$ 2.350,00" },
];

function ApprovalsFeed() {
  return (
    <div className={`${topZone} h-[58%] flex flex-col justify-start gap-2 px-5 pt-5`}>
      <AnimatedList delay={1800}>
        {sales.map((s, i) => (
          <AnimatedListItem key={i}>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2 shadow-sm">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                <CheckIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-ink">
                  Venda aprovada · {s.name}
                </p>
              </div>
              <span className="text-xs font-semibold text-brand-600">
                +{s.amount}
              </span>
            </div>
          </AnimatedListItem>
        ))}
      </AnimatedList>
    </div>
  );
}

const bars = [38, 55, 44, 68, 52, 80, 64, 90, 74];

function PanelChart() {
  return (
    <div className={`${topZone} h-[56%]`}>
      <div className="flex h-full items-end gap-1.5 border-b border-line px-7 pt-9 pb-0">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brand-200 to-brand-500"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

const channels = [
  { icon: siWhatsapp, label: "WhatsApp" },
  { icon: siInstagram, label: "Instagram" },
  { icon: siTelegram, label: "Telegram" },
];

function ChannelsMarquee() {
  return (
    <div className={`${topZone} h-[60%] flex items-center justify-center`}>
      <Marquee
        vertical
        className="h-full [--duration:14s] [--gap:0.6rem] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_70%,transparent)]"
      >
        {channels.map((c) => (
          <LogoPill key={c.label} {...c} />
        ))}
      </Marquee>
    </div>
  );
}

const features = [
  {
    Icon: CardIcon,
    name: "Checkout transparente",
    description:
      "Pix, cartão e boleto na sua própria página, sem redirecionamento.",
    href: "#",
    cta: "Saiba mais",
    className: "md:col-span-2",
    background: <PaymentMarquee />,
  },
  {
    Icon: ShieldIcon,
    name: "Antifraude integrado",
    description: "Análise de risco em cada transação para reduzir chargebacks.",
    href: "#",
    cta: "Saiba mais",
    className: "md:col-span-1",
    background: <AntifraudRipple />,
  },
  {
    Icon: SplitIcon,
    name: "Split de pagamento",
    description: "Divida cada venda entre sócios, afiliados e parceiros.",
    href: "#",
    cta: "Saiba mais",
    className: "md:col-span-1",
    background: <SplitOrbit />,
  },
  {
    Icon: BoltIcon,
    name: "Saque rápido",
    description: "Receba o saldo disponível em 1 dia útil, sob demanda.",
    href: "#",
    cta: "Saiba mais",
    className: "md:col-span-2",
    background: <ApprovalsFeed />,
  },
  {
    Icon: ChartIcon,
    name: "Painel de vendas",
    description:
      "Faturamento, aprovação e reembolsos em relatórios em tempo real.",
    href: "#",
    cta: "Saiba mais",
    className: "md:col-span-2",
    background: <PanelChart />,
  },
  {
    Icon: LinkIcon,
    name: "Link de pagamento",
    description: "Gere um link ou QR Code e venda por qualquer canal.",
    href: "#",
    cta: "Saiba mais",
    className: "md:col-span-1",
    background: <ChannelsMarquee />,
  },
];

export function Features() {
  return (
    <section id="recursos" className="border-b border-line">
      <div className="container-page py-20 md:py-24">
        <BlurFade inView>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-600">Recursos</p>
            <GradientHeading
              as="h2"
              variant="brand"
              size="md"
              weight="semi"
              className="mt-2"
            >
              Tudo o que sua operação financeira precisa
            </GradientHeading>
            <p className="mt-4 text-lg text-subtle">
              Uma plataforma única para cobrar, proteger e distribuir o seu
              faturamento — sem integrar dez serviços diferentes.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <BentoGrid className="mt-12 grid-cols-1 auto-rows-[19rem] md:grid-cols-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </BlurFade>
      </div>
    </section>
  );
}
