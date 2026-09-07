import type { Metadata } from "next";
import { Encadre, Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Traitement des données personnelles et des données de santé collectées via le formulaire de demande de prise en charge.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
};

/**
 * ATTENTION — texte de travail. Il doit être relu et complété par le client
 * ou son conseil juridique avant mise en ligne (CDC §9.2).
 */
export default function PageConfidentialite() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Confidentialité", url: "/confidentialite" },
        ]}
      />
      <Section>
        <div className="mesure">
          <h1 className="font-display text-[32px]">Politique de confidentialité</h1>
          <p className="mt-4 text-[15px] text-encre-3">Version 1.0 — à dater lors de la mise en ligne</p>

          <div className="mt-8">
            <Encadre titre="Vos données de santé" ton="alerte">
              Le formulaire de demande recueille des informations sur l&apos;état de santé
              d&apos;une personne. Ce sont des données sensibles au sens de l&apos;article 9 du
              RGPD : elles bénéficient d&apos;une protection renforcée et ne sont traitées
              qu&apos;avec votre accord explicite.
            </Encadre>
          </div>

          <h2 className="mt-10 font-display text-[22px]">Responsable du traitement</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            {site.nom}, {site.adresse.rue}, {site.adresse.codePostal} {site.adresse.ville} — BCE{" "}
            {site.legal.bce}. Contact : {site.email}.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Données collectées</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-[16px] text-encre-2">
            <li>Identité et coordonnées : nom, téléphone, adresse email facultative</li>
            <li>Commune ou code postal</li>
            <li>
              Informations relatives à la situation de soins : type de situation, fréquence
              souhaitée, délai, précisions libres
            </li>
          </ul>

          <h2 className="mt-10 font-display text-[22px]">Finalité et base légale</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Ces informations servent uniquement à vous recontacter et à organiser une éventuelle
            prise en charge. Le traitement repose sur votre consentement explicite, recueilli au
            moment de l&apos;envoi du formulaire. Vous pouvez le retirer à tout moment.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Durée de conservation</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Les demandes sans suite sont supprimées automatiquement au terme de six mois. En cas de
            prise en charge effective, la conservation suit les règles applicables au dossier
            infirmier.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Hébergement et sécurité</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Les données sont hébergées dans l&apos;Union européenne, chiffrées en transit et au
            repos, et ne font l&apos;objet d&apos;aucun transfert vers un pays tiers. Chaque
            consultation d&apos;une demande est journalisée.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Mesure d&apos;audience</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Nous utilisons un outil de mesure d&apos;audience sans cookie ni identifiant
            individuel. Aucune donnée n&apos;est transmise à une régie publicitaire.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Vos droits</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
            limitation et d&apos;opposition. Écrivez à {site.email}. Vous pouvez également
            introduire une réclamation auprès de l&apos;Autorité de protection des données (APD),
            rue de la Presse 35, 1000 Bruxelles (compétence nationale).
          </p>
        </div>
      </Section>
    </>
  );
}
