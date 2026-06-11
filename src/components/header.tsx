import Link from "next/link";
import { Logo } from "./icons";

const navLinks = [
  { href: "#recursos", label: "Recursos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#precos", label: "Preços" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="Cakto — página inicial"
          className="inline-flex min-h-11 items-center"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center px-1 text-sm font-medium text-subtle transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden min-h-11 items-center px-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:inline-flex"
          >
            Entrar
          </a>
          <a
            href="#precos"
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Criar conta
          </a>
        </div>
      </div>
    </header>
  );
}
