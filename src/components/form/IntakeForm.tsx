"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, Loader2, Send, Sparkles } from "lucide-react";
import {
  intakeSchema,
  stepFields,
  defaultValues,
  type IntakeData,
} from "@/lib/formSchema";
import {
  steps,
  dificuldadesOptions,
  tempoOptions,
  atendimentoOptions,
  anamneseSuccess,
  apoioQuestion,
  consentText,
} from "@/content/form";
import { site } from "@/lib/site";
import { sendAnamnese } from "@/lib/submissions";
import { Field, OptionCard, inputClass } from "./fields";
import { Button } from "@/components/ui/Button";

const DRAFT_KEY = "intake-draft";
const INTENS_KEY = "intake-intensidades";
const ease = [0.22, 1, 0.36, 1] as const;

export function IntakeForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  // Intensidade por sintoma (0–10), fora do RHF para lidar com campos dinâmicos.
  const [intensidades, setIntensidades] = useState<Record<string, number>>({});

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<IntakeData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: defaultValues as IntakeData,
    mode: "onTouched",
  });

  // Restaura rascunho salvo
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) reset({ ...(defaultValues as IntakeData), ...JSON.parse(raw) });
      const rawInt = localStorage.getItem(INTENS_KEY);
      if (rawInt) setIntensidades(JSON.parse(rawInt));
    } catch {}
  }, [reset]);

  // Autosave (RHF)
  useEffect(() => {
    const sub = watch((values) => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      } catch {}
    });
    return () => sub.unsubscribe();
  }, [watch]);

  // Autosave (intensidades por sintoma)
  useEffect(() => {
    try {
      localStorage.setItem(INTENS_KEY, JSON.stringify(intensidades));
    } catch {}
  }, [intensidades]);

  const values = watch();

  async function next() {
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(data: IntakeData) {
    setSubmitting(true);
    setSendError(null);
    // Ex.: "Ansiedade: 8/10, Medos e fobias: 6/10"
    const intensText = (data.dificuldades ?? [])
      .map((d) => `${d}: ${intensidades[d] ?? 5}/10`)
      .join(", ");
    try {
      await sendAnamnese(data, intensText);
      localStorage.removeItem(DRAFT_KEY);
      localStorage.removeItem(INTENS_KEY);
      setDone(true);
    } catch {
      setSendError(
        "Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const progress = ((step + 1) / steps.length) * 100;

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
          {anamneseSuccess.title}
        </h3>
        <p className="prose-measure mx-auto mt-3 text-ink-muted">
          {anamneseSuccess.text}
        </p>
        <div className="mt-8">
          <Button href={site.contact.whatsappUrl} size="lg">
            {anamneseSuccess.cta}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-line bg-surface p-6 shadow-soft sm:p-9">
      {/* Progresso */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-ink">
            {steps[step].title}
            <span className="ml-2 font-normal text-ink-soft">
              · {steps[step].subtitle}
            </span>
          </span>
          <span className="text-ink-soft" aria-hidden>
            {step + 1}/{steps.length}
          </span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label="Progresso do formulário"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--highlight)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -24 }}
            transition={{ duration: 0.35, ease }}
          >
            {/* ETAPA 1 — DADOS */}
            {step === 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nome" htmlFor="nome" required error={errors.nome?.message}>
                  <input id="nome" className={inputClass} placeholder="Como podemos te chamar" {...register("nome")} />
                </Field>
                <Field label="Idade" htmlFor="idade" required error={errors.idade?.message}>
                  <input id="idade" type="number" inputMode="numeric" className={inputClass} placeholder="Ex.: 34" {...register("idade")} />
                </Field>
                <Field label="Cidade" htmlFor="cidade" required error={errors.cidade?.message}>
                  <input id="cidade" className={inputClass} placeholder="Onde você mora" {...register("cidade")} />
                </Field>
                <Field label="Telefone / WhatsApp" htmlFor="telefone" required error={errors.telefone?.message}>
                  <input id="telefone" type="tel" inputMode="tel" className={inputClass} placeholder="(43) 99999-9999" {...register("telefone")} />
                </Field>
                <Field label="E-mail" htmlFor="email" required error={errors.email?.message} className="sm:col-span-2">
                  <input id="email" type="email" inputMode="email" className={inputClass} placeholder="seu@email.com" {...register("email")} />
                </Field>
                <Field label="Como prefere ser atendida(o)?" required error={errors.atendimento?.message} className="sm:col-span-2">
                  <div className="grid grid-cols-2 gap-3">
                    {atendimentoOptions.map((opt) => (
                      <OptionCard as="label" key={opt.value} active={values.atendimento === opt.value}>
                        <input type="radio" value={opt.value} className="sr-only" {...register("atendimento")} />
                        <span className="block font-medium text-ink">{opt.label}</span>
                        <span className="block text-xs text-ink-soft">{opt.hint}</span>
                      </OptionCard>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {/* ETAPA 2 — MOTIVO */}
            {step === 1 && (
              <div className="grid gap-6">
                <Field label={apoioQuestion.label} hint={apoioQuestion.hint} required error={errors.dificuldades?.message as string | undefined}>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {dificuldadesOptions.map((opt) => (
                      <OptionCard as="label" key={opt} active={(values.dificuldades ?? []).includes(opt)}>
                        <input type="checkbox" value={opt} className="sr-only" {...register("dificuldades")} />
                        {opt}
                      </OptionCard>
                    ))}
                  </div>
                </Field>

                {(values.dificuldades ?? []).includes("Outro") && (
                  <Field label="Qual outro sintoma?" htmlFor="outroSintoma" required error={errors.outroSintoma?.message}>
                    <input id="outroSintoma" className={inputClass} placeholder="Descreva em poucas palavras" {...register("outroSintoma")} />
                  </Field>
                )}

                {(values.dificuldades ?? []).length > 0 && (
                  <Field
                    label="O quanto cada um tem pesado?"
                    hint="Ajuste de 0 (quase não afeta) a 10 (muito intenso) para cada item."
                  >
                    <div className="space-y-4">
                      {(values.dificuldades ?? []).map((d) => {
                        const v = intensidades[d] ?? 5;
                        return (
                          <div key={d}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span className="text-ink">{d}</span>
                              <span className="font-medium text-primary">{v}/10</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={10}
                              step={1}
                              value={v}
                              onChange={(e) =>
                                setIntensidades((prev) => ({
                                  ...prev,
                                  [d]: Number(e.target.value),
                                }))
                              }
                              className="w-full accent-[var(--primary)]"
                              aria-label={`Intensidade de ${d}, de 0 a 10`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Field>
                )}

                <Field label="Há quanto tempo você sente isso?" htmlFor="tempo" required error={errors.tempoSintomas?.message}>
                  <select id="tempo" className={inputClass} {...register("tempoSintomas")} defaultValue="">
                    <option value="" disabled>Selecione…</option>
                    {tempoOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
                  </select>
                </Field>

                <Field label="Tem algum detalhe que gostaria de compartilhar?" htmlFor="detalhes" hint="Opcional — escreva à vontade, no seu tempo." error={errors.detalhes?.message}>
                  <textarea id="detalhes" rows={3} className={inputClass} placeholder="Algo que ajude a Juliane a te entender melhor…" {...register("detalhes")} />
                </Field>
              </div>
            )}

            {/* ETAPA 3 — HISTÓRICO */}
            {step === 2 && (
              <div className="grid gap-6">
                <YesNo label="Possui algum diagnóstico médico?" name="temDiagnostico" values={values} register={register} error={errors.temDiagnostico?.message} />
                {values.temDiagnostico === "sim" && (
                  <Field label="Qual diagnóstico?" htmlFor="qualDiagnostico" error={errors.qualDiagnostico?.message}>
                    <input id="qualDiagnostico" className={inputClass} {...register("qualDiagnostico")} />
                  </Field>
                )}
                <YesNo label="Faz uso de medicamentos?" name="usaMedicamentos" values={values} register={register} error={errors.usaMedicamentos?.message} />
                {values.usaMedicamentos === "sim" && (
                  <Field label="Quais medicamentos?" htmlFor="quaisMedicamentos" error={errors.quaisMedicamentos?.message}>
                    <input id="quaisMedicamentos" className={inputClass} {...register("quaisMedicamentos")} />
                  </Field>
                )}
                <YesNo label="Já fez terapia?" name="jaFezTerapia" values={values} register={register} error={errors.jaFezTerapia?.message} />
                <YesNo label="Já fez hipnoterapia?" name="jaFezHipnoterapia" values={values} register={register} error={errors.jaFezHipnoterapia?.message} />
              </div>
            )}

            {/* ETAPA 4 — OBJETIVO + LGPD */}
            {step === 3 && (
              <div className="grid gap-6">
                <Field label="O que você gostaria de transformar?" htmlFor="objetivo" hint="Escreva com suas palavras — não existe resposta certa." required error={errors.objetivo?.message}>
                  <textarea id="objetivo" rows={5} className={inputClass} placeholder="Ex.: gostaria de viver com menos ansiedade e voltar a dormir bem…" {...register("objetivo")} />
                </Field>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-bg p-4">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--primary)]" {...register("lgpd")} />
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
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navegação */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={back} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </button>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-ink-soft">
              <Sparkles className="h-3.5 w-3.5" /> Sigiloso e sem compromisso
            </span>
          )}

          {step < steps.length - 1 ? (
            <Button type="button" onClick={next} size="lg">
              Continuar
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  Enviar com cuidado <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

/* Toggle Sim/Não reutilizável */
function YesNo({
  label,
  name,
  values,
  register,
  error,
}: {
  label: string;
  name: "temDiagnostico" | "usaMedicamentos" | "jaFezTerapia" | "jaFezHipnoterapia";
  values: Partial<IntakeData>;
  register: ReturnType<typeof useForm<IntakeData>>["register"];
  error?: string;
}) {
  return (
    <Field label={label} required error={error}>
      <div className="grid max-w-xs grid-cols-2 gap-3">
        {(["sim", "nao"] as const).map((v) => (
          <OptionCard as="label" key={v} active={values[name] === v}>
            <input type="radio" value={v} className="sr-only" {...register(name)} />
            <span className="font-medium capitalize text-ink">
              {v === "sim" ? "Sim" : "Não"}
            </span>
          </OptionCard>
        ))}
      </div>
    </Field>
  );
}
