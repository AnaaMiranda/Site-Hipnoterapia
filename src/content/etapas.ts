/** Etapas do processo — seção "Como funciona". */

export interface Etapa {
  icon: string;
  step: string;
  title: string;
  text: string;
}

export const etapasIntro = {
  eyebrow: "O caminho",
  title: "Como funciona, do primeiro contato ao acompanhamento",
  lead: "Um processo claro e sem surpresas. Você sempre sabe onde está e para onde vamos.",
};

export const etapas: Etapa[] = [
  {
    icon: "MessageCircle",
    step: "01",
    title: "Primeiro contato",
    text: "Você envia uma mensagem ou preenche o formulário. Sem compromisso, apenas para nos conhecermos e entender o que te trouxe até aqui.",
  },
  {
    icon: "ClipboardList",
    step: "02",
    title: "Avaliação",
    text: "Uma conversa cuidadosa sobre a sua história, o seu momento e os seus objetivos. A partir dela, desenhamos juntos um caminho possível.",
  },
  {
    icon: "Sparkles",
    step: "03",
    title: "Sessão",
    text: "O trabalho terapêutico em si: um estado de calma e foco no qual acessamos e ressignificamos, com segurança, o que sustenta o sofrimento.",
  },
  {
    icon: "Sprout",
    step: "04",
    title: "Acompanhamento",
    text: "Entre as sessões e ao longo do processo, você não fica sozinho. Ajustamos o percurso conforme a sua evolução.",
  },
];
