import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IntakeForm } from "@/components/form/IntakeForm";
import { CrisisNote } from "@/components/ui/CrisisNote";
import { Eyebrow } from "@/components/ui/Section";
import { anamneseIntro } from "@/content/form";

export const metadata: Metadata = {
  title: "Ficha de acolhimento",
  description:
    "Ficha de acolhimento para quem já agendou uma sessão com Juliane Machado.",
  // Página privada (enviada após o agendamento) — não indexar.
  robots: { index: false, follow: false },
};

export default function AnamnesePage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-p">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao início
          </Link>

          <header className="mt-8">
            <Eyebrow>{anamneseIntro.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-[length:var(--text-h1)]">
              {anamneseIntro.title}
            </h1>
            <p className="mt-5 text-[length:var(--text-lead)] text-ink-muted">
              {anamneseIntro.lead}
            </p>
          </header>

          <div className="mt-10">
            <IntakeForm />
          </div>

          <div className="mt-6">
            <CrisisNote />
          </div>
        </div>
      </div>
    </div>
  );
}
