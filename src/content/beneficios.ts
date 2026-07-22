/** Cards de benefícios. `icon` referencia um ícone lucide-react (ver Beneficios.tsx). */

export interface Beneficio {
  icon: string;
  title: string;
  text: string;
}

export const beneficiosIntro = {
  eyebrow: "Como pode te ajudar",
  title: "Para o que a hipnoterapia pode abrir caminho",
  lead: "Cada pessoa chega com uma história diferente. Estes são alguns dos temas que costumam ser trabalhados — sempre de forma individual e no seu tempo.",
};

export const beneficios: Beneficio[] = [
  {
    icon: "Wind",
    title: "Ansiedade e crises",
    text: "Reduzir a intensidade da ansiedade e recuperar a sensação de chão sob os pés.",
  },
  {
    icon: "Sparkles",
    title: "Autoestima",
    text: "Suavizar a autocrítica e reconstruir uma relação mais gentil consigo mesmo.",
  },
  {
    icon: "ShieldCheck",
    title: "Medos e fobias",
    text: "Enfraquecer reações automáticas de medo que limitam escolhas e liberdade.",
  },
  {
    icon: "Moon",
    title: "Sono",
    text: "Aquietar a mente à noite e resgatar um descanso que realmente restaura.",
  },
  {
    icon: "HeartPulse",
    title: "Traumas",
    text: "Ressignificar, com segurança e cuidado, experiências que ainda pesam.",
  },
  {
    icon: "RefreshCw",
    title: "Compulsões",
    text: "Compreender o que sustenta padrões repetitivos e abrir espaço para o novo.",
  },
  {
    icon: "Apple",
    title: "Emagrecimento emocional",
    text: "Trabalhar a relação emocional com a comida, para além da força de vontade.",
  },
  {
    icon: "Users",
    title: "Relacionamentos",
    text: "Enxergar padrões que se repetem nos vínculos e criar formas mais saudáveis de se relacionar.",
  },
  {
    icon: "Anchor",
    title: "Confiança e segurança",
    text: "Fortalecer a confiança para decidir, se posicionar e ocupar o seu espaço.",
  },
  {
    icon: "Waves",
    title: "Controle emocional",
    text: "Responder às situações a partir da calma, e não do impulso ou do medo.",
  },
  {
    icon: "Flame",
    title: "Estresse e burnout",
    text: "Aliviar o esgotamento e reencontrar energia, limites e sentido no dia a dia.",
  },
  {
    icon: "Footprints",
    title: "Procrastinação e bloqueios",
    text: "Destravar aquilo que adia a sua vida e recuperar a sensação de movimento.",
  },
];
