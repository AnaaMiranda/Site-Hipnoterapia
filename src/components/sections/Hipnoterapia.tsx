import { Check, X } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { hipnoterapia } from "@/content/home";

export function Hipnoterapia() {
  return (
    <Section id="hipnoterapia" aria-labelledby="hipno-titulo">
      <div className="container-p">
        <SectionHeading
          id="hipno-titulo"
          eyebrow={hipnoterapia.eyebrow}
          title={hipnoterapia.title}
          description={hipnoterapia.lead}
        />

        {/* Imagem + o que acontece na sessão */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <SmartImage
                name="ciencia-livro"
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="aspect-[4/5]"
              />
            </div>
          </Reveal>

          <div>
            <h3 className="font-serif text-[length:var(--text-h3)] text-ink">
              {hipnoterapia.sessionTitle}
            </h3>
            <RevealGroup className="mt-8 space-y-6">
              {hipnoterapia.session.map((s, i) => (
                <RevealItem key={s.title} className="flex gap-5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-serif text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-medium text-ink">{s.title}</h4>
                    <p className="mt-1 text-ink-muted">{s.text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Mitos e verdades */}
        <div className="mt-24">
          <Reveal>
            <h3 className="text-center font-serif text-[length:var(--text-h3)] text-ink">
              {hipnoterapia.mythsTitle}
            </h3>
          </Reveal>
          <RevealGroup className="mx-auto mt-10 grid max-w-4xl gap-4">
            {hipnoterapia.myths.map((m) => (
              <RevealItem
                key={m.myth}
                className="grid overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-2"
              >
                <div className="flex items-start gap-3 border-b border-line p-5 sm:border-b-0 sm:border-r">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                    <X className="h-4 w-4" />
                  </span>
                  <p className="text-ink-muted line-through decoration-accent/40">
                    {m.myth}
                  </p>
                </div>
                <div className="flex items-start gap-3 p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="font-medium text-ink">{m.truth}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
