import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales obligatoires : identité, numéro d'entreprise, numéro INAMI, assurance professionnelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function PageMentions() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Mentions légales", url: "/mentions-legales" },
        ]}
      />
      <Section>
        <div className="mesure">
          <h1 className="font-display text-[32px]">Mentions légales</h1>

          <h2 className="mt-10 font-display text-[22px]">Éditeur du site</h2>
          <dl className="mt-4 space-y-2 text-[16px]">
            {[
              ["Dénomination", `${site.nom} ${site.legal.formeJuridique}`],
              ["Siège d'exploitation", `${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}`],
              ["Numéro d'entreprise (BCE)", site.legal.bce],
              ["Numéro INAMI", site.legal.inami],
              ["Régime TVA", site.legal.tva],
              ["Assurance RC professionnelle", site.legal.assuranceRc],
              ["Téléphone", site.telephoneAffiche],
              ["Email", site.email],
            ].map(([cle, valeur]) => (
              <div key={cle} className="flex flex-wrap gap-2">
                <dt className="font-semibold text-charbon">{cle} :</dt>
                <dd className="text-encre-2">{valeur}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 font-display text-[22px]">Profession réglementée</h2>
          <p className="mt-4 text-[16px] text-encre-2">
            L&apos;activité d&apos;art infirmier est réglementée en Belgique. Nos praticiens sont
            titulaires du diplôme requis et d&apos;un visa INAMI, et exercent dans le respect des
            règles déontologiques applicables à la profession.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Propriété intellectuelle</h2>
          <p className="mt-4 text-[16px] text-encre-2">
            L&apos;ensemble des textes, photographies et éléments graphiques de ce site est original
            et protégé. Toute reproduction sans autorisation est interdite.
          </p>

          <h2 className="mt-10 font-display text-[22px]">Hébergement</h2>
          <p className="mt-4 text-[16px] text-encre-2">
            Le site est hébergé sur des serveurs situés dans l&apos;Union européenne. Coordonnées de
            l&apos;hébergeur à compléter.
          </p>
        </div>
      </Section>
    </>
  );
}
