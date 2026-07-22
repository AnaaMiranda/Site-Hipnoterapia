import { HeartHandshake, Lock, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContatoForm } from "@/components/form/ContatoForm";
import { CrisisNote } from "@/components/ui/CrisisNote";
import { contatoIntro } from "@/content/form";

const trust = [
  { icon: Lock, title: "Sigilo total", text: "Suas respostas são confidenciais." },
  { icon: HeartHandshake, title: "Sem julgamento", text: "Um espaço seguro, de verdade." },
  { icon: Clock, title: "Sem compromisso", text: "O primeiro contato é só uma conversa." },
];

export function Agendar() {
  return (
    <Section id="agendar" tone="surface" aria-labelledby="agendar-titulo">
      <div className="container-p">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>{contatoIntro.eyebrow}</Eyebrow>
              <h2
                id="agendar-titulo"
                className="mt-4 text-[length:var(--text-h2)]"
              >
                {contatoIntro.title}
              </h2>
              <p className="mt-5 text-[length:var(--text-lead)] text-ink-muted">
                {contatoIntro.lead}
              </p>

              <ul className="mt-9 space-y-5">
                {trust.map((t) => (
                  <li key={t.title} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <t.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-medium text-ink">{t.title}</p>
                      <p className="text-sm text-ink-muted">{t.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Formulário curto + rede de segurança */}
          <Reveal direction="left">
            <ContatoForm />
            <div className="mt-6">
              <CrisisNote />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
