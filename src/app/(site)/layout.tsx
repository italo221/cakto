import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cakto.com.br"),
  title: {
    default: "Cakto — Pagamentos e checkout para quem vende online",
    template: "%s · Cakto",
  },
  description:
    "A plataforma de pagamentos da Cakto reúne checkout, antifraude, split e saques rápidos em um só lugar. Comece a vender em minutos.",
  keywords: [
    "pagamentos",
    "checkout",
    "gateway",
    "split de pagamento",
    "antifraude",
    "vender online",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://cakto.com.br",
    siteName: "Cakto",
    title: "Cakto — Pagamentos e checkout para quem vende online",
    description:
      "Checkout, antifraude, split e saques rápidos em uma só plataforma.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cakto — Pagamentos e checkout para quem vende online",
    description:
      "Checkout, antifraude, split e saques rápidos em uma só plataforma.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://cakto.com.br/#organization",
      name: "Cakto",
      url: "https://cakto.com.br",
      description:
        "Plataforma brasileira de pagamentos e checkout: checkout transparente, antifraude, split de pagamento e saque rápido.",
      email: "contato@cakto.com.br",
      areaServed: "BR",
    },
    {
      "@type": "WebSite",
      "@id": "https://cakto.com.br/#website",
      url: "https://cakto.com.br",
      name: "Cakto",
      inLanguage: "pt-BR",
      publisher: { "@id": "https://cakto.com.br/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full font-sans antialiased`}
    >
      <body className="min-h-full flex flex-col bg-page text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress className="h-1 from-brand-400 via-brand-500 to-brand-600" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
