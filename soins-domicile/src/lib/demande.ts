/** Schéma partagé entre le formulaire et l'API — BF-10, annexe A du CDC. */

export const POUR_QUI = ["Moi-même", "Un proche"] as const;

export const SITUATIONS = [
  "Accompagnement palliatif",
  "Perte d'autonomie",
  "Sortie d'hospitalisation",
  "Maladie chronique",
  "Soin ponctuel",
] as const;

export const FREQUENCES = [
  "Plusieurs fois par jour",
  "Tous les jours",
  "Quelques fois par semaine",
  "Une seule fois",
] as const;

export const DELAIS = [
  "Aujourd'hui ou demain",
  "Cette semaine",
  "Dans les prochaines semaines",
  "Je me renseigne",
] as const;

export type Demande = {
  pourQui: string;
  situation: string;
  frequence: string;
  commune: string;
  codePostal?: string;
  delai: string;
  nom: string;
  telephone: string;
  email?: string;
  precisions?: string;
  consentement: boolean;
  /** Case distincte « J'ai lu et j'accepte les conditions générales d'utilisation » */
  conditionsGenerales: boolean;
  /** Jeton renvoyé par reCAPTCHA — vérifié côté serveur */
  recaptchaToken?: string;
  /** Anti-spam complémentaire, sans CAPTCHA — BF-14 */
  siteWeb?: string;
  horodatage?: number;
};

/** Numéros belges : 0X XXX XX XX, 04XX XX XX XX, ou format international +32. */
export function telephoneValide(valeur: string) {
  const nettoye = valeur.replace(/[\s.\-/()]/g, "");
  return /^(\+32|0032|0)[1-9]\d{7,8}$/.test(nettoye);
}

export function validerDemande(d: Partial<Demande>) {
  const erreurs: Record<string, string> = {};

  if (!d.pourQui) erreurs.pourQui = "Indiquez qui est concerné.";
  if (!d.situation) erreurs.situation = "Sélectionnez la situation.";
  if (!d.frequence) erreurs.frequence = "Sélectionnez une fréquence.";
  if (!d.commune) erreurs.commune = "Sélectionnez une commune.";
  if (d.commune === "Autre" && !/^\d{4}$/.test(d.codePostal ?? ""))
    erreurs.codePostal = "Entrez un code postal belge à quatre chiffres.";
  if (!d.delai) erreurs.delai = "Indiquez quand les soins doivent commencer.";
  if (!d.nom || d.nom.trim().length < 2) erreurs.nom = "Entrez votre nom.";
  if (!d.telephone || !telephoneValide(d.telephone))
    erreurs.telephone = "Entrez un numéro de téléphone belge valide.";
  if (d.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email))
    erreurs.email = "Cette adresse email n'est pas valide.";
  if (!d.consentement)
    erreurs.consentement = "Votre accord est nécessaire pour que nous puissions vous rappeler.";
  if (!d.conditionsGenerales)
    erreurs.conditionsGenerales = "Merci d'accepter les conditions générales d'utilisation.";
  if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !d.recaptchaToken)
    erreurs.recaptcha = "Merci de valider le reCAPTCHA avant d'envoyer.";

  return erreurs;
}

/** Une demande est prioritaire si elle est immédiate ou palliative — BF-11. */
export function estUrgente(d: Partial<Demande>) {
  return (
    d.delai === "Aujourd'hui ou demain" ||
    d.situation === "Accompagnement palliatif" ||
    d.frequence === "Plusieurs fois par jour"
  );
}
