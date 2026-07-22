import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { sobre } from "@/content/home";

export function Sobre() {
  return (
    <Section id="sobre" tone="surface" aria-labelledby="sobre-titulo">
      <div className="container-p">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Imagem + citação */}
          <Reveal direction="right" className="lg:sticky lg:top-28">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-lift">
                <SmartImage
                  name="sobre"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="aspect-[4/5]"
                />
              </div>
              <figure className="glass absolute -bottom-6 -right-2 max-w-[15rem] rounded-2xl border border-line p-4 shadow-soft sm:right-4">
                <blockquote className="font-serif text-[1.05rem] leading-snug text-ink">
                  “A mudança começa quando alguém finalmente se sente ouvido.”
                </blockquote>
              </figure>
            </div>
          </Reveal>

          {/* Texto */}
          <div>
            <Eyebrow>{sobre.eyebrow}</Eyebrow>
            <h2
              id="sobre-titulo"
              className="mt-4 text-[length:var(--text-h2)]"
            >
              {sobre.title}
              <span className="mt-2 block text-[length:var(--text-h3)] text-ink-soft">
                {sobre.role}
              </span>
            </h2>
            <p className="mt-6 text-[length:var(--text-lead)] font-medium text-ink">
              {sobre.lead}
            </p>
            <div className="mt-5 space-y-4 text-ink-muted">
              {sobre.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            {/* Valores */}
            <h3 className="mt-12 text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {sobre.valuesTitle}
            </h3>
            <RevealGroup className="mt-5 grid gap-4 sm:grid-cols-2">
              {sobre.values.map((v) => (
                <RevealItem
                  key={v.title}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <p className="font-serif text-lg text-ink">{v.title}</p>
                  <p className="mt-1.5 text-sm text-ink-muted">{v.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Linha do tempo */}
        <div className="mt-24">
          <Reveal>
            <h3 className="text-center font-serif text-[length:var(--text-h3)] text-ink">
              Uma trajetória, quatro formações
            </h3>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {sobre.timeline.map((item, i) => (
              <RevealItem key={item.title} className="relative px-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-ink">
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {item.year}
                  </span>
                </div>
                <div
                  aria-hidden
                  className="my-4 hidden h-px w-full bg-line lg:block"
                />
                <h4 className="mt-3 font-serif text-lg text-ink lg:mt-0">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm text-ink-muted">{item.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
