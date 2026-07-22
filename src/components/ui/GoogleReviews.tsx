import { Star } from "lucide-react";
import { site } from "@/lib/site";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

/** Bloco de avaliações do Google — exibe a nota real se configurada em site.ts. */
export function GoogleReviews() {
  const { rating, count, url } = site.reviews;
  const hasRating = typeof rating === "number";
  const full = hasRating ? Math.round(rating as number) : 5;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:flex-row sm:text-left"
    >
      <div className="flex items-center gap-4">
        <GoogleG className="h-9 w-9 shrink-0" />
        <div>
          <p className="font-medium text-ink">
            {hasRating ? (
              <>
                {(rating as number).toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                })}{" "}
                de 5 no Google
              </>
            ) : (
              "Avaliações no Google"
            )}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    "h-4 w-4 " +
                    (i < full
                      ? "fill-[var(--highlight)] text-[var(--highlight)]"
                      : "text-line-strong")
                  }
                />
              ))}
            </span>
            {hasRating && count ? (
              <span className="text-sm text-ink-soft">
                {count} avaliações
              </span>
            ) : (
              <span className="text-sm text-ink-soft">
                Quem já passou por aqui recomenda
              </span>
            )}
          </div>
        </div>
      </div>
      <span className="whitespace-nowrap text-sm font-medium text-primary">
        Ver no Google
      </span>
    </a>
  );
}
