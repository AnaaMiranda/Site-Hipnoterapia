import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { icons } from "@/lib/icons";
import { etapas, etapasIntro } from "@/content/etapas";

export function ComoFunciona() {
  return (
    <Section id="como-funciona" aria-labelledby="como-titulo">
      <div className="container-p">
        <SectionHeading
          id="como-titulo"
          eyebrow={etapasIntro.eyebrow}
          title={etapasIntro.title}
          description={etapasIntro.lead}
        />

        <div className="relative mt-16">
          {/* Linha conectora (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block"
          />
          <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {etapas.map((e) => {
              const Icon = icons[e.icon];
              return (
                <RevealItem key={e.step} className="relative">
                  <div className="flex items-center gap-4 lg:block">
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-primary shadow-soft">
                      {Icon && <Icon className="h-5 w-5" aria-hidden />}
                    </span>
                    <span className="font-serif text-3xl text-line-strong lg:mt-6 lg:block lg:text-4xl lg:text-[color-mix(in_srgb,var(--ink)_14%,transparent)]">
                      {e.step}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-ink">{e.title}</h3>
                  <p className="mt-2 text-ink-muted">{e.text}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <Reveal className="mt-16 flex justify-center">
          <Button href="#agendar" size="lg">
            Começar pelo primeiro contato
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
