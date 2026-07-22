import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { finalCta } from "@/content/home";

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="cta-titulo">
      {/* Fundo pinho com textura suave */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--pinho)]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(60rem_40rem_at_80%_-10%,color-mix(in_srgb,var(--highlight)_28%,transparent),transparent),radial-gradient(50rem_40rem_at_-10%_120%,color-mix(in_srgb,var(--terracota)_40%,transparent),transparent)]"
      />

      <div className="container-p text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--areia)_75%,transparent)]">
            <span className="h-px w-6 bg-[var(--highlight)]" />
            {finalCta.eyebrow}
          </p>
          <h2
            id="cta-titulo"
            className="mx-auto mt-5 max-w-3xl text-[length:var(--text-h1)] text-[var(--areia)]"
          >
            {finalCta.title}
          </h2>
          <p className="prose-measure mx-auto mt-6 text-lg text-[color-mix(in_srgb,var(--areia)_82%,transparent)]">
            {finalCta.text}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href="#agendar"
              size="lg"
              className="bg-[var(--areia)] text-[var(--pinho)] hover:bg-white"
            >
              {finalCta.primary}
            </Button>
            <Button
              href={site.contact.whatsappUrl}
              size="lg"
              variant="ghost"
              className="text-[var(--areia)] hover:bg-white/10"
            >
              {finalCta.secondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
