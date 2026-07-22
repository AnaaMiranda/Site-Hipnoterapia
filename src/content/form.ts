/** Conteúdo dos formulários: primeiro contato (curto) e anamnese (completa). */

/* ── Primeiro contato (curto) — home ── */
export const contatoIntro = {
  eyebrow: "O primeiro passo",
  title: "Comece com uma conversa, sem compromisso.",
  lead: "Poucos campos — só o suficiente para a Juliane entender o seu momento e te dar um retorno com cuidado. Se fizer sentido seguir, a conversa mais detalhada acontece depois, no seu tempo.",
};

export const contatoSuccess = {
  title: "Recebido com carinho.",
  text: "Sua mensagem chegou até a Juliane. Em breve você recebe um retorno pelo contato informado. Se preferir agilizar, é só chamar no WhatsApp.",
  cta: "Falar no WhatsApp agora",
};

/* ── Anamnese completa — página /anamnese, após o agendamento ── */
export const anamneseIntro = {
  eyebrow: "Antes da sua sessão",
  title: "Ficha de acolhimento",
  lead: "Se você já conversou com a Juliane e agendou o seu horário, este é o espaço para contar a sua história com calma. Cada resposta ajuda a preparar um atendimento mais cuidadoso. É totalmente sigiloso e você responde no seu tempo.",
};

export const anamneseSuccess = {
  title: "Recebido com carinho.",
  text: "Suas respostas chegaram até a Juliane e vão ajudar a preparar a sua sessão. Se surgir qualquer dúvida até lá, é só chamar no WhatsApp.",
  cta: "Falar no WhatsApp",
};

export const steps = [
  { id: "dados", title: "Sobre você", subtitle: "Para nos conhecermos" },
  { id: "motivo", title: "O que te traz", subtitle: "Sem pressa, no seu tempo" },
  { id: "historico", title: "Seu histórico", subtitle: "Para cuidar com segurança" },
  { id: "objetivo", title: "Seu objetivo", subtitle: "Onde você quer chegar" },
] as const;

/**
 * Enquadramento cuidadoso: a hipnoterapia é APOIO, não tratamento de
 * transtornos. Por isso "Depressão" (diagnóstico) foi substituída por
 * "Tristeza ou desânimo" (experiência), e o título fala em "apoio".
 */
export const apoioQuestion = {
  label: "Em quais pontos você gostaria de apoio?",
  hint: "Pode marcar mais de uma opção. A hipnoterapia é um apoio complementar — não substitui acompanhamento médico ou psicológico.",
};

export const dificuldadesOptions = [
  "Ansiedade",
  "Tristeza ou desânimo",
  "Medos e fobias",
  "Insônia",
  "Autoestima",
  "Traumas",
  "Compulsões",
  "Estresse",
  "Outro",
];

export const tempoOptions = [
  "Menos de 1 mês",
  "De 1 a 6 meses",
  "De 6 meses a 1 ano",
  "Mais de 1 ano",
  "Não sei dizer",
];

export const atendimentoOptions = [
  { value: "online", label: "Online", hint: "De onde você estiver" },
  { value: "presencial", label: "Presencial", hint: "Em Joinville — SC" },
] as const;

export const consentText =
  "Autorizo o contato e o tratamento dos meus dados exclusivamente para fins de agendamento e atendimento, conforme a Política de Privacidade e a LGPD.";
