import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { icons } from "@/lib/icons";
import { beneficios, beneficiosIntro } from "@/content/beneficios";

export function Beneficios() {
  return (
    <Section id="beneficios" tone="surface" aria-labelledby="beneficios-titulo">
      <div className="container-p">
        <SectionHeading
          id="beneficios-titulo"
          eyebrow={beneficiosIntro.eyebrow}
          title={beneficiosIntro.title}
          description={beneficiosIntro.lead}
        />

        <RevealGroup
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.05}
        >
          {beneficios.map((b) => {
            const Icon = icons[b.icon];
            return (
              <RevealItem
                key={b.title}
                className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[var(--accent)] to-[var(--highlight)] transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-ink">
                  {Icon && <Icon className="h-6 w-6" aria-hidden />}
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink">{b.title}</h3>
                <p className="mt-2 text-ink-muted">{b.text}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
