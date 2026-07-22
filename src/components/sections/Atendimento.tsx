import { Check, Monitor, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { GoogleReviews } from "@/components/ui/GoogleReviews";
import { atendimento } from "@/content/home";

function Points({ points }: { points: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {points.map((p) => (
        <li key={p} className="flex items-center gap-3 text-ink-muted">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/12 text-primary">
            <Check className="h-3 w-3" />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

export function Atendimento() {
  return (
    <Section id="atendimento" aria-labelledby="atendimento-titulo">
      <div className="container-p">
        <SectionHeading
          id="atendimento-titulo"
          eyebrow={atendimento.eyebrow}
          title={atendimento.title}
          description={atendimento.lead}
        />

        <RevealGroup className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Online */}
          <RevealItem className="flex flex-col rounded-[1.75rem] border border-line bg-surface p-8 shadow-soft">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Monitor className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-serif text-2xl text-ink">
              {atendimento.online.title}
            </h3>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              {atendimento.online.subtitle}
            </p>
            <p className="mt-4 text-ink-muted">{atendimento.online.text}</p>
            <Points points={atendimento.online.points} />
          </RevealItem>

          {/* Presencial */}
          <RevealItem className="flex flex-col rounded-[1.75rem] border border-line bg-surface p-8 shadow-soft">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <MapPin className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-serif text-2xl text-ink">
              {atendimento.presential.title}
            </h3>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              {atendimento.presential.subtitle}
            </p>
            <p className="mt-4 text-ink-muted">{atendimento.presential.text}</p>
            <Points points={atendimento.presential.points} />
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-6">
          <MapEmbed query="Joinville, Santa Catarina" />
        </Reveal>

        <Reveal className="mt-4">
          <GoogleReviews />
        </Reveal>
      </div>
    </Section>
  );
}
