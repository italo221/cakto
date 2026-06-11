"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./icons";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#recursos", label: "Recursos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#precos", label: "Preços" },
  { href: "#duvidas", label: "Dúvidas" },
];

/* animated underline: scales in from the left on hover */
const underline =
  "relative after:absolute after:inset-x-1 after:bottom-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand-600 after:transition-transform after:duration-300 hover:after:scale-x-100";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md transition-[box-shadow,border-color] duration-300",
        scrolled
          ? "border-line shadow-[0_8px_30px_-18px_rgba(11,20,17,0.25)]"
          : "border-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="Cakto — página inicial"
          className="inline-flex min-h-11 items-center transition-transform duration-300 hover:scale-[1.03]"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "inline-flex min-h-11 items-center px-1 text-sm font-medium text-subtle transition-colors hover:text-ink",
                underline
              )}
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
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-600 hover:shadow-[0_8px_24px_-10px_rgba(5,122,70,0.6)]"
          >
            Criar conta
          </a>
        </div>
      </div>
    </header>
  );
}
