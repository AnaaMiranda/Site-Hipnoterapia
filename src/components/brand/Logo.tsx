import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Marca da Juliane Machado — ilustração em linha contínua (rosto + mente),
 * com fundo transparente para funcionar no modo claro e escuro.
 */
export function Logo({
  className,
  compact = false,
  size = 46,
}: {
  className?: string;
  compact?: boolean;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/images/logo.png"
        alt=""
        aria-hidden
        width={size}
        height={size}
        sizes={`${size}px`}
        style={{ width: size, height: size }}
        className="shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.15rem] tracking-tight text-ink">
          Juliane Machado
        </span>
        {!compact && (
          <span className="mt-0.5 whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink-soft">
            Hipnoterapia Sistêmica
          </span>
        )}
      </span>
    </span>
  );
}
