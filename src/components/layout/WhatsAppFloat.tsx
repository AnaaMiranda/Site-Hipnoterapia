"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/** Ícone oficial do WhatsApp. */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.38L1.05 31.3l6.124-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.31 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.702-1.948-7.73-6.726-7.966-7.036-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.424 1.636-3.904.386-.394.98-.574 1.55-.574.184 0 .35.01.5.018.44.018.66.044.95.74.386.87 1.264 3.166 1.37 3.388.108.222.216.522.066.832-.14.32-.264.454-.484.708-.22.254-.43.45-.65.722-.2.24-.428.498-.174.938.254.43 1.13 1.862 2.424 3.016 1.67 1.488 3.058 1.95 3.552 2.156.368.152.806.116 1.076-.174.342-.37.764-.984 1.194-1.59.304-.432.688-.486 1.09-.334.41.144 2.594 1.224 3.04 1.446.446.222.742.328.85.512.106.186.106 1.062-.28 2.152z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 450);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        "group fixed bottom-5 right-5 z-40 transition-all duration-500 " +
        (show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0")
      }
    >
      {/* Tooltip à esquerda (mantém o botão sempre circular) */}
      <span className="pointer-events-none absolute right-[4.25rem] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-3.5 py-2 text-sm font-medium text-bg opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 sm:block">
        Fale comigo no WhatsApp
      </span>

      <a
        href={site.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="whatsapp-float"
        aria-label="Conversar no WhatsApp com Juliane Machado"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <WhatsAppGlyph className="h-7 w-7" />
      </a>
    </div>
  );
}
