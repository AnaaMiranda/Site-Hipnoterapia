import Link from "next/link";
import { Instagram, Linkedin, MapPin, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { CrisisNote } from "@/components/ui/CrisisNote";

export function Footer() {
  const year = 2025;

  return (
    <footer className="border-t border-line bg-surface-2/40">
      <div className="container-p py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Marca + frase */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-ink-muted">
              Um espaço seguro para reencontrar a sua calma. Hipnoterapia com
              base científica, escuta e acolhimento — online para todo o Brasil
              e presencial em {site.location.city}.
            </p>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Navegar
            </h2>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#agendar"
                  className="text-ink-muted transition-colors hover:text-ink"
                >
                  Agendar conversa
                </Link>
              </li>
              <li>
                <Link
                  href="/anamnese"
                  className="text-ink-muted transition-colors hover:text-ink"
                >
                  Ficha de acolhimento
                  <span className="block text-xs text-ink-soft/70">
                    para quem já agendou
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Contato
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-3 text-ink-muted transition-colors hover:text-ink"
                >
                  <MessageCircle className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    WhatsApp
                    <br />
                    <span className="text-ink">{site.contact.whatsappDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-3 text-ink-muted transition-colors hover:text-ink"
                >
                  <Instagram className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    Instagram
                    <br />
                    <span className="text-ink">{site.contact.instagramHandle}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-3 text-ink-muted transition-colors hover:text-ink"
                >
                  <Linkedin className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    LinkedIn
                    <br />
                    <span className="text-ink">Juliane Machado</span>
                  </span>
                </a>
              </li>
              <li className="inline-flex items-start gap-3 text-ink-muted">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <span>
                  {site.location.city} — {site.location.stateLong}
                  <br />
                  <span className="text-ink">e online, todo o Brasil</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="breath-line my-10" />

        <div className="mb-8 rounded-2xl border border-line bg-bg/50 p-4">
          <CrisisNote />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 text-sm text-ink-soft sm:flex-row sm:items-center">
          <p>
            © {year} {site.name} · {site.role}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/politica-de-privacidade"
              className="transition-colors hover:text-ink"
            >
              Política de Privacidade
            </Link>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <p className="max-w-md text-ink-soft/80">
              Este site tem caráter informativo e não substitui acompanhamento
              médico ou psicológico.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-ink-soft/70 sm:text-left">
          Site criado por{" "}
          <a
            href={site.credit.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink-soft underline decoration-line-strong underline-offset-2 hover:text-ink"
          >
            {site.credit.name}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
