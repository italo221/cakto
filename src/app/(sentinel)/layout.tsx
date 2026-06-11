import type { Metadata } from "next";
import "./sentinel.css";

export const metadata: Metadata = {
  title: "Sentinel — Compliance & Risco",
  description:
    "Painel de compliance e risco da carteira Cakto em tempo real: severidade, matriz de risco e fila de ação priorizada.",
  robots: { index: false, follow: false },
};

// Painel operacional (TV): carrega Inter + JetBrains Mono diretamente, pois o
// <canvas> da matriz referencia os nomes literais das fontes ao desenhar.
export default function SentinelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="sentinel-root">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="sentinel-root">{children}</body>
    </html>
  );
}
