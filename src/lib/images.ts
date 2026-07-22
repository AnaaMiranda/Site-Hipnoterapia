import manifest from "./images.generated.json";

export type ImageKey = keyof typeof manifest;

export interface SiteImage {
  src: string;
  fallback: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
}

/** Texto alternativo descritivo (acessibilidade + SEO) por imagem. */
const ALT: Record<ImageKey, string> = {
  hero: "Juliane Machado, hipnoterapeuta, sentada e sorrindo de forma acolhedora",
  sobre:
    "Juliane Machado sentada, com blazer verde e um sorriso acolhedor, transmitindo confiança",
  "ciencia-livro":
    "Juliane Machado lendo o livro O Corpo Guarda as Marcas, referência sobre trauma",
  og: "Juliane Machado, hipnoterapeuta em Joinville e online",
};

type Manifest = Record<ImageKey, Omit<SiteImage, "alt">>;

const typed = manifest as Manifest;

export function img(key: ImageKey): SiteImage {
  return { ...typed[key], alt: ALT[key] };
}

export const images = Object.fromEntries(
  (Object.keys(typed) as ImageKey[]).map((k) => [k, img(k)]),
) as Record<ImageKey, SiteImage>;
