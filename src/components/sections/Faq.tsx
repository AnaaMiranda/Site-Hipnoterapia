"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/content/faq";
import { site } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" aria-labelledby="faq-titulo">
      <div className="container-p">
        <SectionHeading
          id="faq-titulo"
          eyebrow="Perguntas frequentes"
          title="O que costuma passar pela cabeça antes de começar"
        />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-line rounded-[1.5rem] border border-line bg-surface">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-ink">{item.q}</span>
                    <span
                      className={
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-primary transition-transform duration-300 " +
                        (isOpen ? "rotate-45 bg-primary/10" : "")
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-ink-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-ink-muted">Ficou com alguma dúvida que não está aqui?</p>
          <Button href={site.contact.whatsappUrl} variant="outline" size="lg">
            Perguntar no WhatsApp
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
