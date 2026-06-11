import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";
import { ConfettiButton } from "@/components/ui/confetti";
import { VantaRings } from "@/components/vanta-rings";

export function CtaBand() {
  return (
    <section className="border-b border-line">
      <div className="container-page py-20 md:py-24">
        <BlurFade inView>
          <div className="relative overflow-hidden rounded-card bg-ink px-8 py-16 text-center md:px-16">
            {/* Vanta RINGS (lazy three.js/WebGL) */}
            <VantaRings className="absolute inset-0" />
            {/* dark radial scrim keeps the white text ≥AA over the bright rings */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,rgba(11,20,17,0.7),rgba(11,20,17,0.15))]"
            />
            <div className="relative">
              <SparklesText
                colors={{ first: "#2cdd8d", second: "#13c374" }}
                sparklesCount={8}
                className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Comece a receber pagamentos hoje
              </SparklesText>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                Crie sua conta gratuitamente e ative o checkout em minutos. Sem
                mensalidade e sem compromisso.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConfettiButton
                  options={{
                    colors: ["#13c374", "#2cdd8d", "#a4e5c8", "#ffffff"],
                  }}
                  className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Criar conta grátis
                </ConfettiButton>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Falar com vendas
                </a>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
