"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import {
  contatoSchema,
  contatoDefaults,
  type ContatoData,
} from "@/lib/formSchema";
import { atendimentoOptions, contatoSuccess, consentText } from "@/content/form";
import { site } from "@/lib/site";
import { sendContato } from "@/lib/submissions";
import { Field, OptionCard, inputClass } from "./fields";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContatoForm() {
  const reduce = useReducedMotion();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContatoData>({
    resolver: zodResolver(contatoSchema),
    defaultValues: contatoDefaults as ContatoData,
    mode: "onTouched",
  });

  const atendimento = watch("atendimento");

  async function onSubmit(data: ContatoData) {
    setSubmitting(true);
    setSendError(null);
    try {
      await sendContato(data);
      setDone(true);
    } catch {
      setSendError(
        "Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="rounded-[1.75rem] border border-line bg-surface p-10 text-center shadow-soft"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/12 text-primary">
          <Check className="h-8 w-8" />
        </span>
        <h3 className="mt-6 font-serif text-[length:var(--text-h3)] text-ink">
          {contatoSuccess.title}
        </h3>
        <p className="prose-measure mx-auto mt-3 text-ink-muted">
          {contatoSuccess.text}
        </p>
        <div className="mt-8">
          <Button href={site.contact.whatsappUrl} size="lg">
            {contatoSuccess.cta}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-line bg-surface p-6 shadow-soft sm:p-9">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
        <Field label="Nome" htmlFor="c-nome" required error={errors.nome?.message}>
          <input
            id="c-nome"
            className={inputClass}
            placeholder="Como podemos te chamar"
            {...register("nome")}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="WhatsApp"
            htmlFor="c-tel"
            required
            error={errors.telefone?.message}
          >
            <input
              id="c-tel"
              type="tel"
              inputMode="tel"
              className={inputClass}
              placeholder="(43) 99999-9999"
              {...register("telefone")}
            />
          </Field>
          <Field
            label="E-mail"
            htmlFor="c-email"
            hint="Opcional"
            error={errors.email?.message as string | undefined}
          >
            <input
              id="c-email"
              type="email"
              inputMode="email"
              className={inputClass}
              placeholder="seu@email.com"
              {...register("email")}
            />
          </Field>
        </div>

        <Field
          label="O que te traz até aqui?"
          htmlFor="c-oque"
          hint="Uma ou duas linhas já bastam."
          required
          error={errors.oQueTraz?.message}
        >
          <textarea
            id="c-oque"
            rows={3}
            className={inputClass}
            placeholder="Ex.: tenho vivido com muita ansiedade e queria entender como a hipnoterapia pode ajudar."
            {...register("oQueTraz")}
          />
        </Field>

        <Field
          label="Como prefere ser atendida(o)?"
          required
          error={errors.atendimento?.message}
        >
          <div className="grid grid-cols-2 gap-3">
            {atendimentoOptions.map((opt) => (
              <OptionCard as="label" key={opt.value} active={atendimento === opt.value}>
                <input
                  type="radio"
                  value={opt.value}
                  className="sr-only"
                  {...register("atendimento")}
                />
                <span className="block font-medium text-ink">{opt.label}</span>
                <span className="block text-xs text-ink-soft">{opt.hint}</span>
              </OptionCard>
            ))}
          </div>
        </Field>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-bg p-4">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[var(--primary)]"
            {...register("lgpd")}
          />
          <span className="text-sm text-ink-muted">{consentText}</span>
        </label>
        {errors.lgpd && (
          <p role="alert" className="-mt-3 text-sm text-accent">
            {errors.lgpd.message as string}
          </p>
        )}

        {sendError && (
          <p role="alert" className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent">
            {sendError}
          </p>
        )}

        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
            </>
          ) : (
            <>
              Enviar <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
