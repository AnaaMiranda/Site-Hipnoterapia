import { site } from "@/lib/site";
import { faq } from "@/content/faq";

/**
 * Dados estruturados (Schema.org / JSON-LD) para rich results:
 * Person, ProfessionalService (LocalBusiness), WebSite e FAQPage.
 */
export function JsonLd() {
  const graph = [
    {
      "@type": "Person",
      "@id": `${site.url}/#juliane`,
      name: site.name,
      alternateName: site.shortName,
      jobTitle: "Hipnoterapeuta",
      description: site.description,
      image: `${site.url}/images/og.jpg`,
      url: site.url,
      knowsAbout: [
        "Hipnoterapia",
        "Hipnoterapia sistêmica",
        "Terapia sistêmica",
        "Hipnose clínica",
        "Ansiedade",
        "Programação Neurolinguística",
        "Constelação Familiar",
      ],
      sameAs: [site.contact.instagram, site.contact.linkedin],
      hasCredential: site.credentials.map((c) => c.label),
    },
    {
      "@type": ["ProfessionalService", "HealthAndBeautyBusiness"],
      "@id": `${site.url}/#servico`,
      name: `${site.name} — Hipnoterapia`,
      description: site.description,
      url: site.url,
      image: `${site.url}/images/og.jpg`,
      telephone: `+${site.contact.whatsappNumber}`,
      priceRange: "$$",
      ...(site.reviews.rating
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: site.reviews.rating,
              reviewCount: site.reviews.count,
              bestRating: 5,
              worstRating: 1,
            },
          }
        : {}),
      areaServed: [
        { "@type": "Country", name: "Brasil" },
        { "@type": "City", name: "Joinville" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressRegion: site.location.state,
        addressCountry: "BR",
      },
      provider: { "@id": `${site.url}/#juliane` },
      availableService: {
        "@type": "Service",
        serviceType: "Hipnoterapia",
        availableChannel: [
          { "@type": "ServiceChannel", name: "Online" },
          { "@type": "ServiceChannel", name: "Presencial — Joinville/SC" },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#site`,
      url: site.url,
      name: site.name,
      inLanguage: "pt-BR",
      publisher: { "@id": `${site.url}/#juliane` },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
