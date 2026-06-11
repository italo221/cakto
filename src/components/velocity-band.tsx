import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

export function VelocityBand() {
  return (
    <section className="overflow-hidden border-b border-line bg-ink py-10">
      <ScrollVelocityContainer className="text-3xl font-bold tracking-tight sm:text-5xl">
        <ScrollVelocityRow
          baseVelocity={6}
          direction={1}
          className="py-1 text-white/90"
        >
          CHECKOUT&nbsp;&nbsp;·&nbsp;&nbsp;PIX&nbsp;&nbsp;·&nbsp;&nbsp;ANTIFRAUDE&nbsp;&nbsp;·&nbsp;&nbsp;SPLIT&nbsp;&nbsp;·&nbsp;&nbsp;SAQUE&nbsp;RÁPIDO&nbsp;&nbsp;·&nbsp;&nbsp;
        </ScrollVelocityRow>
        <ScrollVelocityRow
          baseVelocity={6}
          direction={-1}
          className="py-1 text-brand-500"
        >
          CARTÃO&nbsp;&nbsp;·&nbsp;&nbsp;BOLETO&nbsp;&nbsp;·&nbsp;&nbsp;LINK&nbsp;DE&nbsp;PAGAMENTO&nbsp;&nbsp;·&nbsp;&nbsp;API&nbsp;&nbsp;·&nbsp;&nbsp;DASHBOARD&nbsp;&nbsp;·&nbsp;&nbsp;
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
}
