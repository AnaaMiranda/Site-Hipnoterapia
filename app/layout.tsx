import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { JsonLd } from "@/components/seo/JsonLd";
import "@/styles/globals.css";

// Fontes auto-hospedadas (sem requisição ao Google: LGPD + performance)
// Display: Newsreader (serif editorial, elegante e legível).
const display = localFont({
  src: "../public/fonts/newsreader.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "200 800",
  preload: true,
});

const manrope = localFont({
  src: "../public/fonts/manrope.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Hipnoterapia Sistêmica em Joinville e Online`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "hipnoterapia",
    "hipnoterapia sistêmica",
    "terapia sistêmica",
    "hipnoterapeuta",
    "hipnose clínica",
    "ansiedade",
    "estresse",
    "autoestima",
    "traumas",
    "medos",
    "fobias",
    "Joinville",
    "terapia online",
    "Juliane Machado",
    "Ju Machado",
    "Constelação Familiar",
    "PNL",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Hipnoterapia Sistêmica em Joinville e Online`,
    description: site.description,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name}, ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/images/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: "health",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#12201d" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <JsonLd />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-ink"
        >
          Pular para o conteúdo
        </a>
        <Nav />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CookieConsent />
      </body>
    </html>
  );
}
