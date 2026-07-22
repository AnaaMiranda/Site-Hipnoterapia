import { z } from "zod";

const simNao = z.enum(["sim", "nao"], {
  required_error: "Selecione uma opção",
});

export const intakeSchema = z
  .object({
    // Etapa 1 — dados
    nome: z.string().trim().min(2, "Informe seu nome"),
    idade: z.preprocess(
      (v) => (v === "" || v === null || v === undefined ? undefined : v),
      z.coerce
        .number({
          required_error: "Informe sua idade",
          invalid_type_error: "Informe sua idade",
        })
        .int("Informe uma idade válida")
        .min(16, "Atendimento a partir de 16 anos")
        .max(110, "Informe uma idade válida"),
    ),
    cidade: z.string().trim().min(2, "Informe sua cidade"),
    telefone: z
      .string()
      .trim()
      .regex(
        /^\(?\d{2}\)?[\s.-]?9?\d{4}[\s.-]?\d{4}$/,
        "Informe um telefone válido com DDD",
      ),
    email: z.string().trim().email("Informe um e-mail válido"),
    atendimento: z.enum(["online", "presencial"], {
      errorMap: () => ({ message: "Escolha o formato de atendimento" }),
    }),

    // Etapa 2 — motivo
    dificuldades: z
      .array(z.string())
      .min(1, "Selecione ao menos uma opção"),
    outroSintoma: z.string().trim().optional(),
    tempoSintomas: z.string().min(1, "Selecione uma opção"),
    detalhes: z.string().trim().max(1000).optional(),

    // Etapa 3 — histórico
    temDiagnostico: simNao,
    qualDiagnostico: z.string().trim().optional(),
    usaMedicamentos: simNao,
    quaisMedicamentos: z.string().trim().optional(),
    jaFezTerapia: simNao,
    jaFezHipnoterapia: simNao,

    // Etapa 4 — objetivo + consentimento
    objetivo: z
      .string()
      .trim()
      .min(5, "Conte um pouco sobre o que você busca"),
    lgpd: z.literal(true, {
      errorMap: () => ({ message: "É necessário aceitar para enviar" }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.temDiagnostico === "sim" && !data.qualDiagnostico) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["qualDiagnostico"],
        message: "Descreva qual diagnóstico",
      });
    }
    if (data.usaMedicamentos === "sim" && !data.quaisMedicamentos) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["quaisMedicamentos"],
        message: "Descreva quais medicamentos",
      });
    }
    if (data.dificuldades.includes("Outro") && !data.outroSintoma) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["outroSintoma"],
        message: "Conte, em poucas palavras, do que se trata",
      });
    }
  });

export type IntakeData = z.infer<typeof intakeSchema>;

/* ─────────────────────────────────────────────
   Primeiro contato (curto) — usado na home.
   Baixo atrito: só o essencial para a Juliane retornar.
   ───────────────────────────────────────────── */
export const contatoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome"),
  telefone: z
    .string()
    .trim()
    .regex(
      /^\(?\d{2}\)?[\s.-]?9?\d{4}[\s.-]?\d{4}$/,
      "Informe um WhatsApp válido com DDD",
    ),
  email: z
    .union([z.string().trim().email("E-mail inválido"), z.literal("")])
    .optional(),
  oQueTraz: z
    .string()
    .trim()
    .min(3, "Conte em poucas palavras o que te traz")
    .max(300, "Tente resumir um pouco mais"),
  atendimento: z.enum(["online", "presencial"], {
    errorMap: () => ({ message: "Escolha o formato" }),
  }),
  lgpd: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar para enviar" }),
  }),
});

export type ContatoData = z.infer<typeof contatoSchema>;

export const contatoDefaults: Partial<ContatoData> = {
  nome: "",
  telefone: "",
  email: "",
  oQueTraz: "",
};

/** Campos validados por etapa (para o avanço passo a passo). */
export const stepFields: (keyof IntakeData)[][] = [
  ["nome", "idade", "cidade", "telefone", "email", "atendimento"],
  ["dificuldades", "outroSintoma", "tempoSintomas", "detalhes"],
  [
    "temDiagnostico",
    "qualDiagnostico",
    "usaMedicamentos",
    "quaisMedicamentos",
    "jaFezTerapia",
    "jaFezHipnoterapia",
  ],
  ["objetivo", "lgpd"],
];

export const defaultValues: Partial<IntakeData> = {
  nome: "",
  cidade: "",
  telefone: "",
  email: "",
  dificuldades: [],
  outroSintoma: "",
  tempoSintomas: "",
  detalhes: "",
  qualDiagnostico: "",
  quaisMedicamentos: "",
  objetivo: "",
};
