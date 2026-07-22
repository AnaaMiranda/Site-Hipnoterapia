import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-ink-soft/70 transition-colors duration-200 focus:border-primary focus:outline-2 focus:outline-offset-1 focus:outline-[var(--ring)]";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </label>
      {hint && <p className="text-xs text-ink-soft">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

/** Cartões selecionáveis (radio ou checkbox visual). */
export function OptionCard({
  active,
  children,
  onClick,
  as = "button",
  ...rest
}: {
  active: boolean;
  children: ReactNode;
  onClick?: () => void;
  as?: "button" | "label";
  [key: string]: unknown;
}) {
  const Comp = as as "button";
  return (
    <Comp
      type={as === "button" ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "cursor-pointer select-none rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
        active
          ? "border-primary bg-primary/8 text-ink shadow-soft"
          : "border-line bg-bg text-ink-muted hover:border-primary/40 hover:text-ink",
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
