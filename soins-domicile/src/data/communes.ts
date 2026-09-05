export type Commune = {
  slug: string;          // segment d'URL complet : /infirmier-domicile-schaerbeek
  nom: string;
  codePostal: string;
  intro: string;         // contenu UNIQUE — CDC annexe B, 400 mots minimum en production
  quartiers: string[];
  reperes: string[];     // hôpitaux, maisons de repos, axes
  soinsFrequents: string[];
  delai: string;
  voisines: string[];    // slugs
};

/**
 * CDC annexe B — impératif : 400 mots réellement uniques par commune.
 * Les textes ci-dessous sont des amorces de rédaction, pas du contenu final.
 * Une page dupliquée d'une commune à l'autre sera ignorée ou pénalisée par Google
 * et fera échouer le critère de recette correspondant.
 */
export const communes: Commune[] = [
  {
    slug: "infirmier-domicile-schaerbeek",
    nom: "Schaerbeek",
    codePostal: "1030",
    intro:
      "Schaerbeek compte une population âgée importante, particulièrement autour de Helmet et de Terdelt, dans des immeubles anciens souvent dépourvus d'ascenseur. Nos infirmiers y assurent quotidiennement des toilettes, des pansements de plaies chroniques et le suivi de patients diabétiques.",
    quartiers: ["Josaphat", "Helmet", "Dailly", "Terdelt", "Colignon", "Chazal", "Cage aux Ours"],
    reperes: [
      "CHU Brugmann et Hôpital Universitaire des Enfants Reine Fabiola",
      "Maisons de repos du quartier Josaphat",
      "Axe chaussée de Haecht et avenue Rogier",
    ],
    soinsFrequents: [
      "Aide à la toilette, jusqu'à 7 passages par semaine",
      "Pansements de plaies chroniques : escarres et ulcères veineux",
      "Suivi du diabète : glycémie et insuline",
      "Reprise des soins après une sortie d'hôpital",
    ],
    delai: "24 heures en moyenne",
    voisines: ["infirmier-domicile-evere", "infirmier-domicile-etterbeek", "infirmier-domicile-woluwe-saint-lambert"],
  },
  {
    slug: "infirmier-domicile-etterbeek",
    nom: "Etterbeek",
    codePostal: "1040",
    intro:
      "Etterbeek mêle une population âgée installée de longue date et de nombreux résidents du quartier européen. Nous y intervenons aussi bien pour des suivis de longue durée que pour des soins ponctuels après une opération, en français, en néerlandais et en anglais.",
    quartiers: ["Jourdan", "Chasse", "Cinquantenaire", "Saint-Michel", "Maelbeek"],
    reperes: [
      "Clinique Sainte-Élisabeth à proximité immédiate",
      "Institutions européennes et quartier Schuman",
      "Casernes d'Ixelles et campus universitaires",
    ],
    soinsFrequents: [
      "Soins post-opératoires et ablation de fils",
      "Injections d'anticoagulants après chirurgie",
      "Aide à la toilette pour personnes âgées isolées",
      "Prises de sang à domicile",
    ],
    delai: "24 heures en moyenne",
    voisines: ["infirmier-domicile-schaerbeek", "infirmier-domicile-auderghem", "infirmier-domicile-woluwe-saint-lambert"],
  },
  {
    slug: "infirmier-domicile-evere",
    nom: "Evere",
    codePostal: "1140",
    intro:
      "Evere est une commune résidentielle où beaucoup de personnes âgées vivent seules en appartement. Les demandes qui nous parviennent concernent surtout le maintien à domicile de longue durée et la préparation du pilulier.",
    quartiers: ["Conscience", "Paduwa", "Germinal", "Picardie"],
    reperes: [
      "Hôpital militaire Reine Astrid",
      "Maisons de repos du centre communal",
      "Axe chaussée de Louvain",
    ],
    soinsFrequents: [
      "Préparation et contrôle du pilulier",
      "Toilette quotidienne",
      "Surveillance de la tension et du poids",
      "Injections d'insuline",
    ],
    delai: "24 heures en moyenne",
    voisines: ["infirmier-domicile-schaerbeek", "infirmier-domicile-woluwe-saint-lambert"],
  },
  {
    slug: "infirmier-domicile-woluwe-saint-lambert",
    nom: "Woluwe-Saint-Lambert",
    codePostal: "1200",
    intro:
      "La proximité des Cliniques universitaires Saint-Luc fait de Woluwe-Saint-Lambert une commune où les sorties d'hospitalisation sont fréquentes. Nous travaillons régulièrement avec les services sociaux hospitaliers pour organiser le retour à domicile dans les 24 heures.",
    quartiers: ["Tomberg", "Roodebeek", "Georges Henri", "Kapelleveld", "Woluwe-Shopping"],
    reperes: [
      "Cliniques universitaires Saint-Luc",
      "Clinique Sainte-Élisabeth",
      "Résidences-services du quartier Kapelleveld",
    ],
    soinsFrequents: [
      "Reprise des soins dès la sortie d'hôpital",
      "Pansements post-opératoires",
      "Entretien de PICC line et de cathéters",
      "Soins de stomie",
    ],
    delai: "24 heures, le jour même sur appel du service social",
    voisines: ["infirmier-domicile-evere", "infirmier-domicile-etterbeek", "infirmier-domicile-kraainem"],
  },
  {
    slug: "infirmier-domicile-auderghem",
    nom: "Auderghem",
    codePostal: "1160",
    intro:
      "Auderghem est une commune verte et pavillonnaire où le maintien à domicile est souvent le souhait explicite des familles. Les trajets y sont plus longs : nous organisons les tournées par quartier pour tenir les horaires convenus.",
    quartiers: ["Val Duchesse", "Transvaal", "Pinoy", "Chant d'Oiseau"],
    reperes: [
      "Chirec Delta à proximité",
      "Forêt de Soignes et quartiers résidentiels",
      "Axe boulevard du Souverain",
    ],
    soinsFrequents: [
      "Accompagnement palliatif à domicile",
      "Aide à la toilette pour personnes dépendantes",
      "Suivi de l'insuffisance cardiaque",
      "Pansements de plaies chroniques",
    ],
    delai: "24 à 48 heures",
    voisines: ["infirmier-domicile-etterbeek", "infirmier-domicile-woluwe-saint-lambert"],
  },
  {
    slug: "infirmier-domicile-kraainem",
    nom: "Kraainem",
    codePostal: "1950",
    intro:
      "Kraainem se trouve en périphérie flamande : les échanges avec les patients et les médecins s'y font en néerlandais comme en français. Nous y assurons principalement des suivis de longue durée pour des personnes âgées vivant en maison individuelle.",
    quartiers: ["Centre", "Sint-Pancratius", "Wezembeek-frontière"],
    reperes: [
      "Cliniques universitaires Saint-Luc, à quelques minutes",
      "Maisons de repos de la périphérie est",
      "Axe avenue de Wezembeek",
    ],
    soinsFrequents: [
      "Toilette et habillage",
      "Injections d'anticoagulants",
      "Surveillance des paramètres vitaux",
      "Soins de plaies",
    ],
    delai: "24 à 48 heures",
    voisines: ["infirmier-domicile-woluwe-saint-lambert", "infirmier-domicile-evere"],
  },
  {
    slug: "infirmier-domicile-watermael-boitsfort",
    nom: "Watermael-Boitsfort",
    codePostal: "1170",
    intro:
      "Watermael-Boitsfort est une commune verte et peu dense, où beaucoup de personnes âgées vivent en maison individuelle avec un étage. Les demandes portent souvent sur l'aide à la toilette et la prévention des chutes, avec des tournées organisées par quartier pour tenir les horaires convenus.",
    quartiers: ["Cité-Jardin Le Logis", "Floréal", "Trois Tilleuls", "Boitsfort-centre"],
    reperes: [
      "Forêt de Soignes et quartiers résidentiels",
      "Chirec Delta à quelques minutes",
      "Maisons de repos du plateau",
    ],
    soinsFrequents: [
      "Aide à la toilette et habillage",
      "Prévention des escarres chez les personnes alitées",
      "Suivi de l'insuffisance cardiaque",
      "Injections d'anticoagulants",
    ],
    delai: "24 à 48 heures",
    voisines: ["infirmier-domicile-auderghem", "infirmier-domicile-etterbeek"],
  },
  {
    slug: "infirmier-domicile-stockel",
    nom: "Stockel",
    codePostal: "1150",
    intro:
      "Stockel, à Woluwe-Saint-Pierre, accueille une population âgée aisée et une communauté internationale importante. Nous y intervenons en français, en néerlandais et en anglais, principalement pour des suivis de longue durée et des retours d'hospitalisation depuis Saint-Luc.",
    quartiers: ["Stockel-centre", "Chant d'Oiseau", "Sainte-Alix", "Joli-Bois"],
    reperes: [
      "Cliniques universitaires Saint-Luc",
      "Résidences-services du quartier Sainte-Alix",
      "Axe avenue Orban et place Dumon",
    ],
    soinsFrequents: [
      "Reprise des soins après hospitalisation",
      "Pansements post-opératoires",
      "Prises de sang à domicile",
      "Préparation du pilulier",
    ],
    delai: "24 heures en moyenne",
    voisines: ["infirmier-domicile-woluwe-saint-lambert", "infirmier-domicile-kraainem"],
  },
  {
    slug: "infirmier-domicile-kortenberg",
    nom: "Kortenberg",
    codePostal: "3070",
    intro:
      "Kortenberg se situe en périphérie flamande, entre Bruxelles et Louvain. Les échanges avec les patients, les médecins et les mutualités s'y font en néerlandais. Les distances entre domiciles y sont plus grandes : les tournées sont regroupées géographiquement pour garantir des passages à heure fixe.",
    quartiers: ["Centre", "Erps-Kwerps", "Everberg", "Meerbeek"],
    reperes: [
      "UZ Leuven à une quinzaine de minutes",
      "Maisons de repos communales",
      "Axe Leuvensesteenweg",
    ],
    soinsFrequents: [
      "Toilette et habillage",
      "Suivi du diabète et injections d'insuline",
      "Soins de plaies chroniques",
      "Surveillance des paramètres vitaux",
    ],
    delai: "24 à 48 heures",
    voisines: ["infirmier-domicile-kraainem", "infirmier-domicile-woluwe-saint-lambert"],
  },
];

export const getCommune = (slug: string) => communes.find((c) => c.slug === slug);
export const getCommuneParCodePostal = (cp: string) =>
  communes.find((c) => c.codePostal === cp.trim());