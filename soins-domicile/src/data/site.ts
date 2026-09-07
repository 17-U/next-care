/** Paramètres du cabinet — point unique de vérité, remplacé par le CMS le moment venu. */
export const site = {
  nom: "NestCare",
  baseline: "Soins infirmiers à domicile",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nestcare.be",
  telephone: process.env.NEXT_PUBLIC_PHONE ?? "0495490310",
  telephoneAffiche: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "0495 49 03 10",
  email: "contact@nestcare.be",
  adresse: {
    rue: "Rue de Bois d'Haine 5",
    codePostal: "7170",
    ville: "Manage",
    region: "Hainaut",
    pays: "BE",
  },
  /** Mentions légales obligatoires — CDC §9.1 */
  legal: {
    formeJuridique: "SRL",
    bce: "0804.683.393",
    inami: "4-XXXXX-XX-XXX",
    assuranceRc: "Assureur à compléter — police n° XXXXXX",
    tva: "Prestations exonérées de TVA (art. 44 CTVA)",
  },
  horaires: "Lundi à dimanche, de 7h00 à 20h30",
  delaiRappel: "2 heures ouvrées",
  /** Manage, Hainaut */
  geo: { latitude: 50.5006, longitude: 4.2213 },
} as const;

/**
 * Navigation principale — quatre entrées, comme la référence du client.
 * Zones desservies, Tarifs, Échelle de Katz, Blog et Promo restent de vraies
 * pages, reliées depuis le pied de page et le maillage interne : elles
 * gardent leur valeur SEO sans alourdir la barre du haut.
 */
export type LienNav = {
  libelle: string;
  href: string;
  sousMenu?: { libelle: string; href: string }[];
};

export const navigation: LienNav[] = [
  { libelle: "Accueil", href: "/" },
  {
    libelle: "Nos Services",
    href: "/services",
    sousMenu: [
      { libelle: "Soins palliatifs", href: "/services/soins-palliatifs" },
      { libelle: "Aide à la toilette", href: "/services/aide-toilette-hygiene" },
      { libelle: "Plaie et pansement", href: "/services/pansements-plaies" },
      { libelle: "Injections & vaccination", href: "/services/injections-perfusions" },
      { libelle: "Prise de sang", href: "/services/prises-de-sang-soins-techniques" },
      { libelle: "Soins diabétiques", href: "/services/diabete-maladies-chroniques" },
      { libelle: "Tous nos services", href: "/services" },
    ],
  },
  { libelle: "À propos", href: "/a-propos" },
  { libelle: "Contact", href: "/contact" },
];
