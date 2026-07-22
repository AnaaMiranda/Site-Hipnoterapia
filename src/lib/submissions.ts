import type { IntakeData, ContatoData } from "./formSchema";

/**
 * Destino dos formulários: planilha do Google via Apps Script Web App,
 * definido em `NEXT_PUBLIC_SHEETS_URL`.
 */
const SHEETS_URL = process.env.NEXT_PUBLIC_SHEETS_URL;

type Params = Record<string, string>;

async function postToSheet(params: Params): Promise<void> {
  if (!SHEETS_URL) {
    await new Promise((r) => setTimeout(r, 600));
    return;
  }

  // `no-cors`: a resposta é opaca, mas o POST é entregue e a linha é gravada.
  await fetch(SHEETS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(params),
  });
}

/* Primeiro contato (curto) — home */
export async function sendContato(data: ContatoData): Promise<void> {
  await postToSheet({
    tipo: "Primeiro contato",
    nome: data.nome,
    telefone: data.telefone,
    email: data.email?.trim() || "—",
    o_que_traz: data.oQueTraz,
    atendimento: data.atendimento === "online" ? "Online" : "Presencial",
    enviado_em: new Date().toLocaleString("pt-BR"),
  });
}

/* Anamnese completa — página /anamnese, após o agendamento */
function buildAnamnese(data: IntakeData, intensidades: string): Params {
  const simNao = (v: string) => (v === "sim" ? "Sim" : "Não");
  return {
    tipo: "Anamnese",
    nome: data.nome,
    idade: String(data.idade),
    cidade: data.cidade,
    telefone: data.telefone,
    email: data.email,
    atendimento: data.atendimento === "online" ? "Online" : "Presencial",
    dificuldades: data.dificuldades
      .map((d) =>
        d === "Outro" && data.outroSintoma ? `Outro (${data.outroSintoma})` : d,
      )
      .join(", "),
    intensidade: intensidades || "—",
    tempo_sintomas: data.tempoSintomas,
    detalhes: data.detalhes?.trim() || "—",
    diagnostico:
      data.temDiagnostico === "sim" ? `Sim — ${data.qualDiagnostico}` : "Não",
    medicamentos:
      data.usaMedicamentos === "sim" ? `Sim — ${data.quaisMedicamentos}` : "Não",
    ja_fez_terapia: simNao(data.jaFezTerapia),
    ja_fez_hipnoterapia: simNao(data.jaFezHipnoterapia),
    objetivo: data.objetivo,
    enviado_em: new Date().toLocaleString("pt-BR"),
  };
}

export async function sendAnamnese(
  data: IntakeData,
  intensidades: string,
): Promise<void> {
  await postToSheet(buildAnamnese(data, intensidades));
}
