import { Safari } from "@/components/ui/safari";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { BlurFade } from "@/components/ui/blur-fade";
import { GradientHeading } from "@/components/ui/gradient-heading";

const bars = [40, 58, 46, 70, 54, 82, 66, 92, 76, 88];

function Tile({
  label,
  prefix,
  value,
  decimals,
  suffix,
  trend,
  down,
}: {
  label: string;
  prefix?: string;
  value: number;
  decimals?: number;
  suffix?: string;
  trend: string;
  down?: boolean;
}) {
  return (
    <div className="rounded-xl border border-line bg-white px-3 py-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wide text-subtle">
        {label}
      </p>
      <p className="mt-1 text-base font-semibold tracking-tight text-ink sm:text-lg">
        {prefix}
        <NumberTicker
          value={value}
          decimalPlaces={decimals}
          locale="pt-BR"
          className="text-ink tracking-tight"
        />
        {suffix}
      </p>
      <p
        className={`mt-1 text-[10px] font-medium ${down ? "text-subtle" : "text-brand-600"}`}
      >
        {down ? "↓" : "↑"} {trend} vs. ontem
      </p>
    </div>
  );
}

function DashboardUI() {
  return (
    <div className="flex h-full flex-col gap-3 bg-surface p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Painel · Cakto</p>
        <span className="flex items-center gap-1.5 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
          <span className="size-1.5 animate-pulse rounded-full bg-brand-500" />
          Ao vivo
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile label="Vendas hoje" prefix="R$ " value={48} suffix=" mil" trend="12%" />
        <Tile label="Pedidos" value={1284} trend="8%" />
        <Tile label="Ticket médio" prefix="R$ " value={297} trend="3%" />
        <Tile label="Reembolsos" value={0.4} decimals={1} suffix="%" trend="0,1%" down />
      </div>

      <div className="grid flex-1 grid-cols-3 gap-3">
        <div className="col-span-2 flex flex-col rounded-xl border border-line bg-white p-3">
          <p className="text-xs font-medium text-ink">
            Faturamento · últimos 10 dias
          </p>
          <div className="mt-2 flex flex-1 items-end gap-1.5 border-b border-line">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brand-200 to-brand-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-line bg-white p-3">
          <AnimatedCircularProgressBar
            value={98}
            max={100}
            min={0}
            gaugePrimaryColor="#057a46"
            gaugeSecondaryColor="#e4eae6"
            className="size-20 text-base"
          />
          <p className="text-center text-[11px] font-medium text-subtle">
            Aprovação no Pix
          </p>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <section className="border-b border-line">
      <div className="container-page py-20 md:py-24">
        <BlurFade inView>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-brand-600">Seu painel</p>
            <GradientHeading
              as="h2"
              variant="brand"
              size="md"
              weight="semi"
              className="mt-2"
            >
              Toda a sua operação em uma tela
            </GradientHeading>
            <p className="mt-4 text-lg text-subtle">
              Acompanhe vendas, aprovação e saldo em tempo real — do celular ou
              do computador.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <div className="relative mx-auto mt-12 w-full max-w-4xl">
            <Safari url="app.cakto.com.br" className="w-full" mode="simple" />
            <div className="absolute inset-x-[0.3%] bottom-[0.4%] top-[6.9%] z-20 overflow-hidden rounded-b-[11px]">
              <DashboardUI />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
