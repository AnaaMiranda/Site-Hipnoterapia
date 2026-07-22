"use client";

import { useState } from "react";
import { MapPin, Play } from "lucide-react";

/**
 * Mapa com carregamento sob demanda (click-to-load): o iframe do Google
 * só é inserido após ação do usuário — melhor privacidade (LGPD) e
 * performance (não bloqueia o carregamento inicial).
 */
export function MapEmbed({ query = "Joinville, SC" }: { query?: string }) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=12&output=embed`;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-surface-2">
      {loaded ? (
        <iframe
          title={`Mapa — ${query}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group flex h-full w-full flex-col items-center justify-center gap-3 text-ink-muted transition-colors hover:text-ink"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/12 text-primary transition-transform duration-300 group-hover:scale-110">
            <MapPin className="h-6 w-6" />
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <Play className="h-3.5 w-3.5" /> Carregar mapa de {query}
          </span>
          <span className="text-xs text-ink-soft">
            O mapa é carregado do Google apenas ao clicar.
          </span>
        </button>
      )}
    </div>
  );
}
