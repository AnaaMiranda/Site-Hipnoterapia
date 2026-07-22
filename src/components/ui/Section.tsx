import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Fundo alternado para ritmo visual entre seções. */
  tone?: "base" | "surface" | "deep";
  /** Espaçamento vertical. */
  spacing?: "md" | "lg";
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  base: "bg-bg",
  surface: "bg-surface-2/45",
  deep: "bg-surface-2",
};

export function Section({
  id,
  children,
  className,
  tone = "base",
  spacing = "lg",
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24",
        tones[tone],
        spacing === "lg" ? "py-20 sm:py-28 lg:py-32" : "py-14 sm:py-20",
        className,
      )}
      {...aria}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

/** Cabeçalho de seção padronizado: eyebrow + título serif + descrição. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="text-[length:var(--text-h2)] font-normal"
        style={{ maxWidth: "20ch" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-ink-muted text-[length:var(--text-lead)] leading-relaxed",
            align === "center" ? "mx-auto" : "",
            "prose-measure",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

/** Rótulo curto acima do título — com traço e ponto âmbar. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      <span
        aria-hidden
        className="h-px w-6 bg-[var(--highlight)] opacity-70"
      />
      {children}
    </span>
  );
}
