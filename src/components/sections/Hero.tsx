"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { hero } from "@/content/home";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-28"
      aria-label="Apresentação"
    >
      {/* Fundos suaves e decorativos */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-10%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--highlight)_18%,transparent),transparent_62%)] blur-2xl" />
        <div className="absolute bottom-[-20%] left-[-12%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--primary)_16%,transparent),transparent_60%)] blur-2xl" />
      </div>

      <div className="container-p grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Coluna de texto */}
        <div className="max-w-xl">
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent"
          >
            <span className="h-px w-6 bg-[var(--highlight)] opacity-70" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 text-[length:var(--text-display)] font-normal leading-[1.05]"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-ink-muted"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            {...rise(0.24)}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#agendar" size="lg" data-cta="hero-agendar">
              {hero.primaryCta}
            </Button>
            <Button href="#hipnoterapia" variant="outline" size="lg">
              {hero.secondaryCta}
            </Button>
          </motion.div>

          <motion.p
            {...rise(0.32)}
            className="mt-5 flex items-center gap-2 text-sm text-ink-soft"
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            {hero.reassurance}
          </motion.p>

          {/* Credenciais discretas */}
          <motion.ul
            {...rise(0.4)}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6"
          >
            {site.credentials.map((c) => (
              <li
                key={c.short}
                className="text-sm font-medium text-ink-muted"
              >
                {c.short}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Coluna da imagem */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
            <SmartImage
              name="hero"
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="aspect-[4/5] w-full"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
            />
          </div>

          {/* Chip flutuante de nome/função */}
          <div className="glass absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-line px-4 py-3 shadow-soft">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg text-ink">
                {site.name}
              </span>
              <span className="block text-xs uppercase tracking-[0.16em] text-ink-soft">
                {site.role}
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
