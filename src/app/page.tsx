import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { VelocityBand } from "@/components/velocity-band";
import { Features } from "@/components/features";
import { Integrations } from "@/components/integrations";
import { Dashboard } from "@/components/dashboard";
import { Manifesto } from "@/components/manifesto";
import { HowItWorks } from "@/components/how-it-works";
import { Stats } from "@/components/stats";
import { GlobalReach } from "@/components/global-reach";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <VelocityBand />
        <Features />
        <Integrations />
        <Dashboard />
        <Manifesto />
        <HowItWorks />
        <Stats />
        <GlobalReach />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
