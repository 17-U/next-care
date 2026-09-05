/** Paramètres du cabinet — point unique de vérité, remplacé par le CMS le moment venu. */
export const site = {
  nom: "NestCare",
  baseline: "Soins infirmiers à domicile",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nestcare.be",
  telephone: process.env.NEXT_PUBLIC_PHONE ?? "0470810649",
  telephoneAffiche: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "0470 81 06 49",
  email: "info@nestcare.be",
  adresse: {
    rue: "Boulevard Bischoffsheim 39/4",
    codePostal: "1000",
    ville: "Bruxelles",
    region: "Région de Bruxelles-Capitale",
    pays: "BE",
  },
  /** Mentions légales obligatoires — CDC §9.1 */
  legal: {
    formeJuridique: "SRL",
    bce: "0XXX.XXX.XXX",
    inami: "4-XXXXX-XX-XXX",
    assuranceRc: "Assureur à compléter — police n° XXXXXX",
    tva: "Prestations exonérées de TVA (art. 44 CTVA)",
  },
  horaires: "7j/7",
  delaiRappel: "2 heures ouvrées",
  geo: { latitude: 50.8503, longitude: 4.3667 },
} as const;

/**
 * Navigation principale. « Services » ouvre un sous-menu listant les six
 * prestations ; les pages Zones desservies et Tarifs restent accessibles
 * depuis le pied de page et le maillage interne, comme en production.
 */
export type LienNav = {
  libelle: string;
  href: string;
  sousMenu?: { libelle: string; href: string }[];
};

export const navigation: LienNav[] = [
  { libelle: "Accueil", href: "/" },
  { libelle: "A propos", href: "/a-propos" },
  {
    libelle: "Services",
    href: "/services",
    sousMenu: [
      { libelle: "Pansements à domicile", href: "/services/pansements-plaies" },
      { libelle: "Injections & perfusions", href: "/services/injections-perfusions" },
      { libelle: "Prise de sang à domicile", href: "/services/prises-de-sang-soins-techniques" },
      { libelle: "Aide à la toilette", href: "/services/aide-toilette-hygiene" },
      { libelle: "Soins palliatifs", href: "/services/soins-palliatifs" },
      { libelle: "Soins diabétiques", href: "/services/diabete-maladies-chroniques" },
      { libelle: "Tous nos services", href: "/services" },
    ],
  },
  { libelle: "Blog", href: "/blog" },
  { libelle: "Contact", href: "/contact" },
];
