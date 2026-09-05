import { site } from "@/data/site";
import { communes } from "@/data/communes";
import type { QuestionReponse } from "@/data/faq";

/** Données structurées — CDC §8.3. Validées par l'outil de résultats enrichis Google. */

export function schemaOrganisation() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${site.url}/#organisation`,
    name: site.nom,
    description: `${site.baseline} à Bruxelles et en périphérie est, 7 jours sur 7.`,
    url: site.url,
    telephone: site.telephoneAffiche,
    email: site.email,
    medicalSpecialty: "Nursing",
    priceRange: "Tarifs INAMI conventionnés",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.adresse.rue,
      postalCode: site.adresse.codePostal,
      addressLocality: site.adresse.ville,
      addressRegion: site.adresse.region,
      addressCountry: site.adresse.pays,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: communes.map((c) => ({
      "@type": "City",
      name: c.nom,
      postalCode: c.codePostal,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "07:00",
      closes: "21:00",
    },
  };
}

export function schemaService(nom: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: nom,
    description,
    url,
    serviceType: "Soins infirmiers à domicile",
    provider: { "@id": `${site.url}/#organisation` },
    areaServed: communes.map((c) => ({ "@type": "City", name: c.nom })),
  };
}

export function schemaFaq(elements: QuestionReponse[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: elements.map((qr) => ({
      "@type": "Question",
      name: qr.question,
      acceptedAnswer: { "@type": "Answer", text: qr.reponse },
    })),
  };
}

export function schemaFilAriane(elements: { nom: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.nom,
      item: `${site.url}${e.url}`,
    })),
  };
}

export function JsonLd({ donnees }: { donnees: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
    />
  );
}
