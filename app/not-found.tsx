import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-32">
      <div className="max-w-md text-center">
        <p className="font-serif text-6xl text-primary">404</p>
        <h1 className="mt-4 font-serif text-[length:var(--text-h2)]">
          Esta página se perdeu no caminho.
        </h1>
        <p className="mt-4 text-ink-muted">
          O endereço que você procurou não existe ou foi movido. Vamos voltar
          para um lugar seguro?
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-ink transition-colors hover:bg-primary-hover"
          >
            <Home className="h-4 w-4" /> Voltar ao início
          </Link>
          <a
            href={site.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-primary"
          >
            <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
