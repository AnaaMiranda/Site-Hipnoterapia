/**
 * Parte do SEO, footer, contato, JSON-LD.
 */

const rawWhatsApp = "5543996349503"; // DDI 55 + DDD 43 + número
const whatsAppMessage =
  "Olá, Juliane! Vim pelo site e gostaria de saber mais sobre a hipnoterapia.";

export const site = {
  name: "Juliane Machado",
  shortName: "Ju Machado",
  role: "Hipnoterapeuta",
  tagline: "Hipnoterapia sistêmica com base científica, escuta e acolhimento",
  description:
    "Hipnoterapia sistêmica para ansiedade, estresse, autoestima, medos, traumas e bloqueios emocionais. Atendimento online para todo o Brasil e presencial em Joinville (SC), com Juliane Machado.",

  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.julianemachado.com.br",

  locale: "pt-BR",

  contact: {
    whatsappNumber: rawWhatsApp,
    whatsappDisplay: "(43) 99634-9503",
    whatsappUrl: `https://wa.me/${rawWhatsApp}?text=${encodeURIComponent(
      whatsAppMessage,
    )}`,
    instagram: "https://www.instagram.com/jumachadoterapeuta/",
    instagramHandle: "@jumachadoterapeuta",
    linkedin: "https://www.linkedin.com/in/juliane-machado",
    google: "https://share.google/SLqVr2I83rHAVgtkf",
  },

  // Crédito de criação do site.
  credit: {
    name: "Ana Carolina Miranda",
    linkedin: "https://www.linkedin.com/in/anac-miranda",
  },

  // Avaliações do Google (números reais do perfil).
  reviews: {
    url: "https://share.google/SLqVr2I83rHAVgtkf",
    rating: 5 as number | null,
    count: 34 as number | null,
  },

  location: {
    city: "Joinville",
    state: "SC",
    stateLong: "Santa Catarina",
    country: "BR",
    // Endereço presencial 
    online: "Atendimento online para todo o Brasil",
    presential: "Atendimento presencial em Joinville — Santa Catarina",
  },

  credentials: [
    { label: "Bacharel em Direito", short: "Direito" },
    { label: "Programação Neurolinguística (PNL)", short: "PNL" },
    { label: "Especialização em Constelação Familiar", short: "Constelação Familiar" },
    { label: "Especialização em Hipnoterapia", short: "Hipnoterapia" },
  ],

  nav: [
    { label: "Sobre", href: "#sobre" },
    { label: "Hipnoterapia", href: "#hipnoterapia" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Perguntas", href: "#faq" },
  ],
} as const;

export type Site = typeof site;
