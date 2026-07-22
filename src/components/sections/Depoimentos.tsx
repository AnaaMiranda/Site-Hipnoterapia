"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { depoimentos, depoimentosIntro } from "@/content/depoimentos";

export function Depoimentos() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const total = depoimentos.length;

  function go(next: number) {
    setDir(next > index || (index === total - 1 && next === 0) ? 1 : -1);
    setIndex((next + total) % total);
  }

  const current = depoimentos[index];

  return (
    <Section id="depoimentos" tone="deep" aria-labelledby="depo-titulo">
      <div className="container-p">
        <SectionHeading
          id="depo-titulo"
          eyebrow={depoimentosIntro.eyebrow}
          title={depoimentosIntro.title}
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote
            aria-hidden
            className="mx-auto mb-6 h-10 w-10 text-[color-mix(in_srgb,var(--accent)_45%,transparent)]"
          />

          <div
            className="min-h-[13rem] text-center"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="font-serif text-[length:var(--text-h3)] leading-snug text-ink">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-6 text-ink-muted">
                  <span className="font-semibold text-ink">{current.author}</span>
                  <span className="mx-2 text-line-strong">·</span>
                  {current.context}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controles */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Depoimento anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-primary hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Depoimentos">
              {depoimentos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Ir para o depoimento ${i + 1}`}
                  onClick={() => go(i)}
                  className={
                    "h-2 rounded-full transition-all duration-300 " +
                    (i === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-line-strong hover:bg-ink-soft")
                  }
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Próximo depoimento"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-primary hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
