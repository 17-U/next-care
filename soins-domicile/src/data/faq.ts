export type QuestionReponse = { question: string; reponse: string };

/** FAQ générale affichée sur la page d'accueil et balisée en FAQPage. */
export const faqGenerale: QuestionReponse[] = [
  {
    question: "Les soins infirmiers à domicile sont-ils remboursés ?",
    reponse:
      "Oui. Les tarifs sont fixés par la nomenclature INAMI et sont identiques chez tout infirmier conventionné. Nous appliquons le tiers payant : la part INAMI est facturée directement à votre mutualité et vous ne réglez que le ticket modérateur.",
  },
  {
    question: "Intervenez-vous le week-end et les jours fériés ?",
    reponse:
      "Oui, sept jours sur sept, jours fériés compris. Les soins qui exigent une continuité ne s'arrêtent pas le samedi.",
  },
  {
    question: "Faut-il une prescription médicale ?",
    reponse:
      "Pour la plupart des actes, oui. Si vous n'en avez pas encore, appelez-nous : nous vous indiquons la démarche et pouvons contacter le médecin traitant avec vous.",
  },
  {
    question: "Dans quel délai pouvez-vous commencer ?",
    reponse:
      "En général sous 24 heures, et le jour même pour une sortie d'hospitalisation signalée par le service social.",
  },
  {
    question: "Qu'est-ce que l'échelle de Katz ?",
    reponse:
      "C'est l'outil officiel de mesure de la dépendance en Belgique. Six critères y sont cotés de 1 à 4 : se laver, s'habiller, se déplacer, aller aux toilettes, la continence et manger. Le total détermine le forfait INAMI applicable.",
  },
  {
    question: "Comment se passe la première visite ?",
    reponse:
      "Une infirmière se déplace gratuitement, évalue la situation, établit le plan de soins avec le médecin traitant et vous explique ce qui sera pris en charge. Aucun engagement n'est demandé.",
  },
];
