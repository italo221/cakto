import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";

type Stat = {
  prefix?: string;
  value: number;
  decimalPlaces?: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { prefix: "R$ ", value: 2, suffix: " bi+", label: "processados por ano" },
  { value: 98.7, decimalPlaces: 1, suffix: "%", label: "de aprovação no Pix" },
  { value: 1, suffix: " dia útil", label: "para o saque cair" },
  { prefix: "+", value: 30, suffix: " mil", label: "negócios ativos" },
];

export function Stats() {
  return (
    <section className="border-b border-line">
      <div className="container-page py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ prefix, value, decimalPlaces, suffix, label }, i) => (
            <BlurFade key={label} delay={i * 0.08} inView>
              <div className="text-center sm:text-left">
                <p className="text-4xl font-semibold tracking-tight text-ink">
                  {prefix}
                  <NumberTicker
                    value={value}
                    decimalPlaces={decimalPlaces}
                    locale="pt-BR"
                    className="text-ink tracking-tight"
                  />
                  {suffix}
                </p>
                <p className="mt-1 text-sm text-subtle">{label}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
