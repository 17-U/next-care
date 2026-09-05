export type Service = {
  slug: string;
  nom: string;
  nomCourt: string;
  /** Photographie de la fiche service, dans public/images/ */
  image: string;
  alt: string;
  /** Pastille ronde posée sur la photo — voir Icone dans components/ui.tsx */
  icone: "coeur" | "goutte" | "pouls" | "pansement" | "seringue" | "sang";
  resume: string;
  intro: string;
  actes: string[];
  priseEnCharge: string;
  urgence?: string;
  faq: { question: string; reponse: string }[];
};

/** Six services au lancement — CDC §2.3. Ajouter un service = ajouter un objet ici. */
export const services: Service[] = [
  {
    slug: "soins-palliatifs",
    icone: "coeur",
    image: "/images/soins-palliatifs.webp",
    alt: "Une infirmière tient la main d'un patient âgé assis dans son salon",
    nom: "Soins palliatifs à domicile",
    nomCourt: "Soins palliatifs",
    resume:
      "Accompagner la fin de vie chez soi, dans le respect du confort du patient et avec un soutien réel pour les proches.",
    intro:
      "Rester chez soi jusqu'au bout demande une organisation que peu de familles peuvent porter seules. Nous intervenons plusieurs fois par jour si nécessaire, en lien direct avec le médecin traitant et l'équipe de soutien palliatif.",
    actes: [
      "Gestion de la douleur et adaptation des traitements antalgiques",
      "Soins de confort : hygiène, prévention des escarres, soins de bouche",
      "Surveillance et entretien des pompes à morphine et des voies veineuses",
      "Coordination avec le médecin traitant et l'équipe de soutien palliatif",
      "Écoute et soutien des proches aidants, préparation du matériel",
      "Passages adaptables jusqu'à plusieurs fois par jour, charbon comprise",
    ],
    priseEnCharge:
      "Le forfait palliatif INAMI couvre les soins infirmiers à domicile des patients en phase palliative reconnue. Une déclaration du médecin traitant est nécessaire. Nous sommes conventionnés : la part INAMI est facturée directement à votre mutualité.",
    urgence: "Première visite organisée dans les 24 heures, week-end compris.",
    faq: [
      {
        question: "Peut-on cumuler le forfait palliatif et l'aide familiale ?",
        reponse:
          "Oui. Le forfait palliatif couvre les soins infirmiers ; l'aide familiale relève d'un autre service et se cumule sans difficulté. Nous vous aidons à contacter le service compétent de votre commune.",
      },
      {
        question: "Intervenez-vous la charbon ?",
        reponse:
          "Pour les situations palliatives, oui. L'organisation des passages de charbon est définie lors de la visite d'évaluation, selon l'état du patient et la présence des proches.",
      },
      {
        question: "Qui fournit le matériel médical ?",
        reponse:
          "Le lit médicalisé, le matelas anti-escarres et la pompe sont généralement loués via votre mutualité ou un bandagiste. Nous vous indiquons les démarches lors de la première visite.",
      },
    ],
  },
  {
    slug: "aide-toilette-hygiene",
    icone: "goutte",
    image: "/images/toilette-hygiene.webp",
    alt: "Une infirmière accompagne une patiente âgée installée dans son fauteuil",
    nom: "Aide à la toilette & hygiène",
    nomCourt: "Aide à la toilette",
    resume:
      "Toilette quotidienne, habillage et prévention des escarres pour les personnes en perte d'autonomie.",
    intro:
      "La toilette d'une personne dépendante est un acte infirmier à part entière : elle permet de surveiller l'état de la peau, de repérer une escarre naissante et de maintenir la mobilité. Jusqu'à sept passages par semaine.",
    actes: [
      "Toilette complète ou partielle au lit, au lavabo ou à la douche",
      "Habillage et déshabillage, mise des bas de contention",
      "Prévention des escarres : changements de position, surveillance des points d'appui",
      "Transferts lit-fauteuil en sécurité",
      "Soins d'ongles, de bouche et de cheveux",
      "Surveillance générale et signalement au médecin traitant",
    ],
    priseEnCharge:
      "Selon le degré de dépendance mesuré par l'échelle de Katz, la prise en charge se fait sous forme de forfait journalier (A, B ou C). L'évaluation est réalisée par l'infirmier lors de la première visite.",
    faq: [
      {
        question: "Faut-il une prescription médicale ?",
        reponse:
          "Oui, une prescription du médecin traitant est nécessaire. Nous pouvons la solliciter avec vous si la situation est urgente.",
      },
      {
        question: "Combien de passages par semaine sont possibles ?",
        reponse:
          "Jusqu'à sept par semaine, et plusieurs par jour selon le forfait attribué. Le simulateur d'échelle de Katz vous donne une première estimation.",
      },
    ],
  },
  {
    slug: "pansements-plaies",
    icone: "pansement",
    image: "/images/pansements-plaies.webp",
    alt: "Une soignante sert un repas équilibré à une patiente à son domicile",
    nom: "Pansements à domicile",
    nomCourt: "Pansements à domicile",
    resume:
      "Pansements simples et complexes, plaies post-opératoires, escarres et ulcères veineux.",
    intro:
      "Une plaie chronique mal suivie se referme mal et se surinfecte. Nos infirmiers assurent un protocole régulier, avec photographie de suivi si vous le souhaitez et transmission au médecin.",
    actes: [
      "Pansements simples et complexes",
      "Plaies post-opératoires, ablation de fils et d'agrafes",
      "Escarres, ulcères veineux et plaies du pied diabétique",
      "Pose de bas et de bandes de contention",
      "Surveillance de l'évolution et transmission au médecin traitant",
    ],
    priseEnCharge:
      "Les pansements sont remboursés selon la nomenclature INAMI, sur prescription médicale. Nous appliquons le tiers payant : vous ne réglez que le ticket modérateur.",
    faq: [
      {
        question: "Fournissez-vous le matériel de pansement ?",
        reponse:
          "Le matériel est prescrit par le médecin et délivré en pharmacie. Nous vous indiquons précisément ce qu'il faut acheter avant le premier passage.",
      },
    ],
  },
  {
    slug: "injections-perfusions",
    icone: "seringue",
    image: "/images/injections-perfusions.webp",
    alt: "Une infirmière pose une perfusion au bras d'un patient dans son salon",
    nom: "Injections & perfusions",
    nomCourt: "Injections & perfusions",
    resume:
      "Injections intramusculaires, sous-cutanées et intraveineuses, perfusions et accompagnement de chimiothérapie orale.",
    intro:
      "Les injections régulières — anticoagulants, insuline, traitements de fond — n'obligent pas à se déplacer. Nous passons à heure fixe, tous les jours si nécessaire.",
    actes: [
      "Injections intramusculaires, sous-cutanées et intraveineuses",
      "Anticoagulants et traitements au long cours",
      "Perfusions et débranchement de chimiothérapie",
      "Vaccination sur prescription",
      "Surveillance des effets et transmission au médecin",
    ],
    priseEnCharge:
      "Acte remboursé selon la nomenclature INAMI sur prescription médicale, avec application du tiers payant.",
    faq: [
      {
        question: "Passez-vous à heure fixe ?",
        reponse:
          "Nous convenons d'un créneau lors de la première visite et nous nous y tenons, à une trentaine de minutes près selon la tournée.",
      },
    ],
  },
  {
    slug: "prises-de-sang-soins-techniques",
    icone: "sang",
    image: "/images/prises-de-sang.webp",
    alt: "Une infirmière relève les paramètres vitaux d'une patiente et les note sur sa tablette",
    nom: "Prise de sang à domicile",
    nomCourt: "Prise de sang à domicile",
    resume:
      "Prélèvements à domicile, PICC line, stomie, sondage urinaire et surveillance de drains.",
    intro:
      "Les soins techniques demandent une pratique régulière. Nos infirmiers référents interviennent sur les dispositifs qui exigent une formation spécifique, en lien avec le service hospitalier qui les a posés.",
    actes: [
      "Prises de sang à domicile, résultats transmis au médecin prescripteur",
      "Entretien de PICC line et de cathéters centraux",
      "Soins et appareillage de stomie",
      "Sondage urinaire et soins de sonde",
      "Surveillance et réfection de drains",
    ],
    priseEnCharge:
      "Prestations remboursées selon la nomenclature INAMI sur prescription. Les prélèvements sont acheminés vers le laboratoire de votre choix.",
    faq: [
      {
        question: "À quelle heure passez-vous pour une prise de sang à jeun ?",
        reponse:
          "Tôt le matin, généralement entre 7h et 8h30, afin que le prélèvement parte au laboratoire dans la matinée.",
      },
    ],
  },
  {
    slug: "diabete-maladies-chroniques",
    icone: "pouls",
    image: "/images/maladies-chroniques.webp",
    alt: "Une infirmière mesure la tension artérielle d'une patiente âgée à domicile",
    nom: "Soins diabétiques & maladies chroniques",
    nomCourt: "Soins diabétiques",
    resume:
      "Suivi du diabète, de la maladie de Parkinson, de la BPCO et de l'insuffisance cardiaque.",
    intro:
      "Une maladie chronique se gère dans la durée. Le rôle de l'infirmier à domicile est autant technique qu'éducatif : comprendre son traitement réduit les hospitalisations.",
    actes: [
      "Contrôle de la glycémie et administration de l'insuline",
      "Préparation et contrôle du pilulier",
      "Éducation du patient et de la famille au traitement",
      "Surveillance des paramètres : tension, poids, saturation",
      "Coordination avec le médecin traitant et le spécialiste",
    ],
    priseEnCharge:
      "Selon la prestation, la prise en charge relève de la nomenclature INAMI ou d'un trajet de soins pour le diabète. Nous vérifions vos droits avec vous.",
    faq: [
      {
        question: "Qu'est-ce qu'un trajet de soins diabète ?",
        reponse:
          "C'est un contrat entre le patient, le médecin généraliste et le spécialiste, qui ouvre des remboursements spécifiques. Nous vous orientons vers votre médecin pour le mettre en place.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
