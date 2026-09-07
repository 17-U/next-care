import { images } from "./images";

export type Article = {
  slug: string;
  titre: string;
  categorie: string;
  chapo: string;
  date: string;          // ISO
  minutes: number;
  image: string;
  alt: string;
  relecture: string;
  sections: { titre: string; paragraphes: string[]; liste?: string[] }[];
};

/** Le blog est le principal levier de croissance du référencement après le lancement. */
export const articles: Article[] = [
  {
    slug: "echelle-de-katz-comprendre-le-forfait",
    titre: "Échelle de Katz : comment sont évalués les droits de votre proche",
    categorie: "Remboursements",
    chapo:
      "Six critères déterminent le forfait INAMI dont dépend la prise en charge des soins à domicile. Voici comment ils sont cotés et ce que cela change concrètement pour votre famille.",
    date: "2026-01-14",
    minutes: 8,
    image: images.maladiesChroniques,
    alt: "Une infirmière relève les paramètres vitaux d'une patiente âgée à domicile",
    relecture: "Relu par une infirmière en chef",
    sections: [
      {
        titre: "Ce que mesure l'échelle",
        paragraphes: [
          "L'échelle de Katz est l'outil officiel de mesure de la dépendance en Belgique. Elle ne juge pas l'état de santé global : elle évalue uniquement ce qu'une personne peut encore faire seule au quotidien.",
          "Chaque critère est coté de 1, autonome, à 4, totalement dépendant. C'est la combinaison de ces cotations, et non leur simple somme, qui détermine le forfait applicable.",
        ],
        liste: [
          "Se laver",
          "S'habiller",
          "Se déplacer",
          "Aller aux toilettes",
          "La continence",
          "Manger",
        ],
      },
      {
        titre: "Qui réalise l'évaluation",
        paragraphes: [
          "L'évaluation est faite par l'infirmier au domicile du patient, lors de la première visite. Elle est transmise à la mutualité, qui valide le forfait.",
          "Un simulateur en ligne, y compris le nôtre, ne donne qu'une estimation. Il sert à savoir s'il vaut la peine d'entamer la démarche, pas à ouvrir un droit.",
        ],
      },
      {
        titre: "Ce que change le forfait",
        paragraphes: [
          "Le forfait détermine le nombre de passages pris en charge par jour. Un forfait A couvre l'aide quotidienne à la toilette et à l'habillage ; un forfait B permet en général jusqu'à deux passages par jour ; un forfait C correspond à une prise en charge intensive.",
          "La réévaluation est possible à tout moment si l'état de la personne se dégrade. C'est un point que les familles ignorent souvent.",
        ],
      },
    ],
  },
  {
    slug: "sortie-hopital-organiser-le-retour",
    titre: "Sortie d'hôpital : les cinq démarches à faire avant le retour à la maison",
    categorie: "Maintien à domicile",
    chapo:
      "Un retour mal préparé se termine souvent par une réhospitalisation. Voici ce qu'il faut avoir réglé avant que l'ambulance ne dépose votre proche devant chez lui.",
    date: "2026-02-03",
    minutes: 6,
    image: images.prisesDeSang,
    alt: "Une infirmière note les observations de sa patiente sur sa tablette",
    relecture: "Relu par une infirmière en chef",
    sections: [
      {
        titre: "Parler au service social avant la sortie",
        paragraphes: [
          "Chaque hôpital dispose d'un service social qui organise les sorties. C'est lui qui peut contacter un service de soins à domicile, commander le matériel et enclencher les démarches auprès de la mutualité.",
          "Demandez à le rencontrer dès que la date de sortie est évoquée, pas la veille.",
        ],
      },
      {
        titre: "Les cinq points à régler",
        paragraphes: [
          "Une sortie qui se passe bien repose sur des éléments très concrets, à vérifier un par un.",
        ],
        liste: [
          "L'ordonnance de sortie, avec les soins infirmiers prescrits et leur fréquence",
          "Le matériel : lit médicalisé, matelas anti-escarres, chaise percée, à commander à l'avance",
          "Les médicaments : première délivrance en pharmacie avant l'arrivée à domicile",
          "Le premier passage infirmier, planifié le jour même du retour",
          "L'accès au logement : clés, code, présence d'un proche à l'arrivée",
        ],
      },
      {
        titre: "Prévenir le médecin traitant",
        paragraphes: [
          "Le médecin généraliste doit être informé de la sortie et recevoir le rapport hospitalier. C'est lui qui prendra le relais des prescriptions.",
        ],
      },
    ],
  },
  {
    slug: "tiers-payant-ce-que-vous-payez",
    titre: "Tiers payant : ce que vous payez vraiment chez un infirmier à domicile",
    categorie: "Remboursements",
    chapo:
      "La question du coût est le premier frein au maintien à domicile. Elle repose pourtant sur un mécanisme simple, que peu de familles connaissent.",
    date: "2026-03-11",
    minutes: 5,
    image: images.injectionsPerfusions,
    alt: "Une infirmière pose une perfusion au bras d'un patient dans son salon",
    relecture: "Relu par une infirmière en chef",
    sections: [
      {
        titre: "Les tarifs ne sont pas fixés par l'infirmier",
        paragraphes: [
          "Les montants découlent de la nomenclature INAMI. Ils sont identiques chez tout infirmier conventionné de Belgique. Un prestataire conventionné qui vous annonce un tarif plus intéressant qu'un autre vous annonce donc quelque chose d'inexact.",
        ],
      },
      {
        titre: "Ce que le tiers payant change",
        paragraphes: [
          "Avec le tiers payant, la part prise en charge par l'INAMI est facturée directement à votre mutualité. Vous n'avancez pas cet argent et vous ne réclamez aucun remboursement.",
          "Reste à votre charge le ticket modérateur, de l'ordre de un à deux euros par prestation courante, et nul pour les bénéficiaires de l'intervention majorée.",
        ],
      },
      {
        titre: "Les forfaits de dépendance",
        paragraphes: [
          "Pour les patients dépendants, la facturation ne se fait pas à l'acte mais au forfait journalier, selon l'échelle de Katz. C'est plus avantageux dès que les passages deviennent quotidiens.",
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
