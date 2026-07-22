"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-line py-2.5"
          : "border-b border-transparent py-4",
      )}
    >
      <nav
        className="container-p flex items-center justify-between gap-4"
        aria-label="Navegação principal"
      >
        <Link
          href="#top"
          aria-label="Juliane Machado — início"
          className="rounded-lg"
        >
          <Logo />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors duration-300 hover:bg-surface-2/70 hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 lg:flex">
          <ThemeToggle />
          <Button href="#agendar" size="md">
            Agendar conversa
          </Button>
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          "fixed inset-x-0 top-[calc(100%+1px)] origin-top glass border-b border-line transition-all duration-300 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <ul className="container-p flex flex-col gap-1 py-5">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-lg font-medium text-ink hover:bg-surface-2/70"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-3">
            <Button
              href="#agendar"
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Agendar conversa
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
