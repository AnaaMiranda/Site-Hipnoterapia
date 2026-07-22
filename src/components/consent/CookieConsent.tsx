"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@/components/analytics/Analytics";

const STORAGE_KEY = "consentimento-analytics";
type Consent = "granted" | "denied" | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Consent) ?? null;
    setConsent(stored);
    setReady(true);
  }, []);

  function decide(value: "granted" | "denied") {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  const showBanner = ready && consent === null;
  const hasIds =
    !!process.env.NEXT_PUBLIC_GA_ID || !!process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      {consent === "granted" && hasIds && <Analytics />}

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-live="polite"
            aria-label="Aviso de privacidade"
            className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-5 shadow-lift sm:inset-x-auto sm:left-5 sm:right-auto sm:bottom-5"
          >
            <p className="text-sm leading-relaxed text-ink-muted">
              Usamos cookies apenas para entender como o site é utilizado e
              melhorar sua experiência. Você decide.{" "}
              <Link
                href="/politica-de-privacidade"
                className="font-medium text-primary underline underline-offset-2"
              >
                Saiba mais
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                onClick={() => decide("granted")}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-ink transition-colors hover:bg-primary-hover"
              >
                Aceitar
              </button>
              <button
                onClick={() => decide("denied")}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                Somente essenciais
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
