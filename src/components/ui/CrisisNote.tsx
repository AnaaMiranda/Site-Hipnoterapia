import { LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Rede de segurança em crise. Linha discreta e responsável, exibida perto
 * dos formulários e no rodapé. CVV 188 (24h) e emergência 192.
 */
export function CrisisNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft",
        className,
      )}
    >
      <LifeBuoy className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
      <span>
        Se você está passando por um momento de crise ou por pensamentos de se
        machucar, procure ajuda imediata:{" "}
        <a
          href="tel:188"
          className="font-medium text-ink underline decoration-line-strong underline-offset-2 hover:text-accent"
        >
          CVV 188
        </a>{" "}
        (ligação gratuita, 24h) ou{" "}
        <a
          href="tel:192"
          className="font-medium text-ink underline decoration-line-strong underline-offset-2 hover:text-accent"
        >
          emergência 192
        </a>
        .
      </span>
    </p>
  );
}
