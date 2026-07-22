export interface Depoimento {
  quote: string;
  author: string;
  context: string;
}

export const depoimentosIntro = {
  eyebrow: "Histórias de quem viveu",
  title: "O que muda quando a gente cuida por dentro",
  lead: "Relatos de pessoas que decidiram dar o primeiro passo.",
};

export const depoimentos: Depoimento[] = [
  {
    quote:
      "Eu convivia com uma ansiedade que parecia fazer parte de mim. Pela primeira vez em anos, consigo respirar sem aquele aperto constante no peito.",
    author: "M.",
    context: "Ansiedade · atendimento online",
  },
  {
    quote:
      "Chegei sem acreditar muito. Saí entendendo coisas sobre mim que eu carregava há uma vida inteira. Foi delicado e profundo ao mesmo tempo.",
    author: "R.",
    context: "Autoestima · presencial em Joinville",
  },
  {
    quote:
      "Um medo antigo me impedia de tantas coisas. Hoje ele não manda mais na minha vida. Sou grata por ter encontrado um espaço tão seguro.",
    author: "A.",
    context: "Medos e bloqueios · online",
  },
  {
    quote:
      "O acolhimento da Juliane faz toda a diferença. Nunca me senti julgada. Me senti, enfim, ouvida de verdade.",
    author: "C.",
    context: "Estresse e burnout · online",
  },
];
