import { Logo } from "./icons";

const columns = [
  {
    title: "Produto",
    links: ["Checkout", "Link de pagamento", "Antifraude", "Split", "Preços"],
  },
  {
    title: "Empresa",
    links: ["Sobre", "Carreiras", "Blog", "Imprensa", "Contato"],
  },
  {
    title: "Suporte",
    links: ["Central de ajuda", "Status", "Documentação", "API"],
  },
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-subtle">
              A plataforma de pagamentos para quem vende online no Brasil.
              Checkout, antifraude e repasses em um só lugar.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-ink">{col.title}</p>
                <ul className="mt-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-flex min-h-11 items-center text-sm text-subtle transition-colors hover:text-ink"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-subtle sm:flex-row sm:items-center">
          <p>© 2026 Cakto Pagamentos. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a
              href="#"
              className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-ink"
            >
              Termos
            </a>
            <a
              href="#"
              className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-ink"
            >
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
