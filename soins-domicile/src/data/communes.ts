export type Commune = {
  slug: string;
  nom: string;
  codePostal: string;
  intro: string;
  quartiers: string[];
  reperes: string[];
  soinsFrequents: string[];
  delai: string;
  voisines: string[];
};

/**
 * Zone réelle d'intervention du cabinet, en Hainaut : Manage et les communes
 * limitrophes. CDC annexe B — impératif : 400 mots réellement uniques par
 * commune en version finale. Les textes ci-dessous sont des amorces de
 * rédaction, à enrichir avant mise en ligne.
 */
export const communes: Commune[] = [
  {
    slug: "infirmier-domicile-manage",
    nom: "Manage",
    codePostal: "7170",
    intro:
      "Manage est notre commune d'implantation. Nous y intervenons quotidiennement, du centre jusqu'aux villages qui la composent, avec une attention particulière portée aux personnes âgées vivant seules et aux sorties d'hospitalisation depuis les cliniques de la région.",
    quartiers: ["Manage-centre", "Fayt-lez-Manage", "Bois d'Haine", "La Hestre"],
    reperes: [
      "Gare de Manage, sur la ligne Bruxelles-Charleroi",
      "Maisons de repos et résidences-services locales",
      "Zoning et centre administratif communal",
    ],
    soinsFrequents: [
      "Aide à la toilette et habillage",
      "Plaies et pansements",
      "Prise de sang à domicile",
      "Injections et suivi du diabète",
    ],
    delai: "24 heures en moyenne",
    voisines: ["infirmier-domicile-seneffe", "infirmier-domicile-la-louviere", "infirmier-domicile-morlanwelz"],
  },
  {
    slug: "infirmier-domicile-la-louviere",
    nom: "La Louvière",
    codePostal: "7100",
    intro:
      "La Louvière est la grande ville voisine, avec un hôpital de référence pour la région. Nous y assurons régulièrement la reprise des soins dès la sortie d'hospitalisation, en coordination avec le service social et le médecin traitant.",
    quartiers: ["Centre", "Houdeng-Aimeries", "Houdeng-Goegnies", "Saint-Vaast", "Trivières"],
    reperes: [
      "CHU Tivoli",
      "Gare de La Louvière-Sud",
      "Maisons de repos du centre-ville",
    ],
    soinsFrequents: [
      "Sortie d'hôpital et soins post-opératoires",
      "Soins palliatifs à domicile",
      "Pansements de plaies chroniques",
      "Injections et suivi de traitement",
    ],
    delai: "24 à 48 heures",
    voisines: ["infirmier-domicile-manage", "infirmier-domicile-morlanwelz"],
  },
  {
    slug: "infirmier-domicile-seneffe",
    nom: "Seneffe",
    codePostal: "7180",
    intro:
      "Seneffe combine un centre villageois et une zone d'activité économique importante. Nos interventions y concernent principalement le maintien à domicile de personnes âgées et le suivi de maladies chroniques comme le diabète.",
    quartiers: ["Seneffe-centre", "Feluy", "Arquennes", "Petit-Roeulx-lez-Nivelles"],
    reperes: [
      "Zoning industriel de Feluy-Seneffe",
      "Château de Seneffe",
      "Axe de la chaussée de Nivelles",
    ],
    soinsFrequents: [
      "Suivi du diabète et injections d'insuline",
      "Aide à la toilette",
      "Prise de sang à domicile",
      "Pansements",
    ],
    delai: "24 à 48 heures",
    voisines: ["infirmier-domicile-manage"],
  },
  {
    slug: "infirmier-domicile-morlanwelz",
    nom: "Morlanwelz",
    codePostal: "7140",
    intro:
      "Morlanwelz s'étend sur plusieurs villages, où le maintien à domicile permet à de nombreux aînés de rester dans leur environnement familier. Nous y organisons des tournées régulières pour garantir des passages à heure fixe.",
    quartiers: ["Morlanwelz-centre", "Mont-Sainte-Aldegonde", "Carnières"],
    reperes: [
      "Domaine de Mariemont",
      "Maisons de repos communales",
      "Axe vers La Louvière et Manage",
    ],
    soinsFrequents: [
      "Aide à la toilette et prévention des escarres",
      "Soins de plaies chroniques",
      "Suivi de l'insuffisance cardiaque",
      "Injections d'anticoagulants",
    ],
    delai: "24 à 48 heures",
    voisines: ["infirmier-domicile-manage", "infirmier-domicile-la-louviere"],
  },
];

export const getCommune = (slug: string) => communes.find((c) => c.slug === slug);
export const getCommuneParCodePostal = (cp: string) =>
  communes.find((c) => c.codePostal === cp.trim());
