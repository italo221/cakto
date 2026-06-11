import {
  siShopify,
  siWoocommerce,
  siWix,
  siNubank,
  siMercadopago,
  siPaypal,
  siPicpay,
  siWhatsapp,
} from "simple-icons";
import { Marquee } from "@/components/ui/marquee";
import { BrandIcon } from "./brand-icon";

const logos = [
  { icon: siShopify, label: "Shopify" },
  { icon: siWoocommerce, label: "WooCommerce" },
  { icon: siWix, label: "Wix" },
  { icon: siNubank, label: "Nubank" },
  { icon: siMercadopago, label: "Mercado Pago" },
  { icon: siPaypal, label: "PayPal" },
  { icon: siPicpay, label: "PicPay" },
  { icon: siWhatsapp, label: "WhatsApp" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-page py-10">
        <p className="text-center text-sm text-subtle">
          Funciona com as ferramentas que você já usa
        </p>

        <div className="relative mt-7 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:34s] [--gap:3.5rem]">
            {logos.map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-subtle transition-colors hover:text-ink"
                title={label}
              >
                <BrandIcon icon={icon} className="h-6 w-6" />
                <span className="text-base font-semibold tracking-tight">
                  {label}
                </span>
              </div>
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent" />
        </div>
      </div>
    </section>
  );
}
