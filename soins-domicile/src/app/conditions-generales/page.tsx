import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions d'utilisation du site et du formulaire de demande de prise en charge.",
  alternates: { canonical: "/conditions-generales" },
  robots: { index: false, follow: true },
};

/**
 * ATTENTION — texte de travail, à faire relire par un conseil juridique
 * avant mise en ligne, au même titre que /confidentialite (CDC §9.2).
 */
export default function PageConditionsGenerales() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Conditions générales", url: "/conditions-generales" },
        ]}
      />
      <Section>
        <div className="mesure">
          <h1 className="font-display text-[32px]">Conditions générales d&apos;utilisation</h1>
          <p className="mt-4 text-[15px] text-encre-3">Version 1.0 — à dater lors de la mise en ligne</p>

          <h2 className="mt-10 font-display text-[22px]">Objet</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Les présentes conditions régissent l&apos;utilisation du site {site.nom} et de son
            formulaire de demande de prise en charge. En cochant la case correspondante avant
            l&apos;envoi du formulaire, vous déclarez les avoir lues et acceptées.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Nature du site</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Ce site présente les services de soins infirmiers à domicile proposés par {site.nom}
            et permet de solliciter un rappel. Il ne constitue ni un diagnostic, ni une
            téléconsultation, ni une prescription médicale.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Formulaire de demande</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Les informations transmises via le formulaire, y compris celles relatives à la santé,
            sont traitées conformément à notre{" "}
            <a href="/confidentialite" className="underline">
              politique de confidentialité
            </a>
            . L&apos;envoi du formulaire ne constitue pas un engagement contractuel : la prise en
            charge n&apos;est confirmée qu&apos;après contact téléphonique et, le cas échéant,
            visite d&apos;évaluation à domicile.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Protection contre les robots</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Le formulaire est protégé par reCAPTCHA, un service fourni par Google, afin de limiter
            les envois automatisés. L&apos;utilisation de ce service est soumise à la{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              politique de confidentialité
            </a>{" "}
            et aux{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              conditions d&apos;utilisation
            </a>{" "}
            de Google.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Propriété intellectuelle</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Les textes, photographies et éléments graphiques de ce site sont protégés. Toute
            reproduction sans autorisation est interdite.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Contact</h2>
          <p className="mt-3 text-[16px] text-encre-2">
            Pour toute question relative aux présentes conditions : {site.email}.
          </p>
        </div>
      </Section>
    </>
  );
}
