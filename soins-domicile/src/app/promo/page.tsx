import type { Metadata } from "next";
import { Bouton, BoutonAppel, Carte, Etiquette, Section } from "@/components/ui";
import { EnteteSection } from "@/components/EnteteSection";
import { FilAriane } from "@/components/FilAriane";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Offre découverte — première évaluation gratuite",
  description:
    "Une infirmière évalue gratuitement la situation à domicile et établit le plan de soins avec vous, sans engagement.",
  alternates: { canonical: "/promo" },
};

/**
 * Page « Promo », sur le modèle de /zones-desservies et /tarifs :
 * accessible par lien direct et depuis le pied de page, sans alourdir
 * la barre de navigation principale.
 */
export default function PagePromo() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Offre découverte", url: "/promo" },
        ]}
      />

      <section className="bg-vert-pale">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-16 md:px-8 md:py-20">
          <Etiquette>Offre découverte</Etiquette>
          <h1 className="mt-5 font-display text-[34px] leading-[1.15] tracking-[0.02em] md:text-[46px]">
            Une première visite d&apos;évaluation, gratuite et sans engagement
          </h1>
          <p className="mesure mt-5 text-[18px] text-encre-2">
            Une infirmière se déplace à votre domicile, évalue la situation avec vous et établit
            un plan de soins en lien avec votre médecin traitant. Vous décidez ensuite, librement,
            si vous souhaitez démarrer les soins.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Bouton href="/contact">Demander ma visite gratuite</Bouton>
            <BoutonAppel
              telephone={site.telephone}
              affichage={site.telephoneAffiche}
              variante="contour"
            />
          </div>
        </div>
      </section>

      <Section>
        <EnteteSection surTitre="Comment ça marche" titre="Trois étapes, sans engagement">
          Cette offre s&apos;adresse à toute personne qui se demande si un accompagnement à
          domicile est possible pour elle ou pour un proche.
        </EnteteSection>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {[
            [
              "1. Vous nous contactez",
              "Par téléphone ou via le formulaire. Nous prenons quelques minutes pour comprendre la situation.",
            ],
            [
              "2. Visite gratuite à domicile",
              "Une infirmière évalue les besoins réels et vérifie vos droits au remboursement INAMI.",
            ],
            [
              "3. Vous décidez",
              "Aucun engagement n'est demandé lors de cette visite. Le plan de soins n'est activé qu'avec votre accord.",
            ],
          ].map(([titre, detail]) => (
            <Carte key={titre}>
              <h3 className="font-display text-[21px]">{titre}</h3>
              <p className="mt-3 text-[16px] text-encre-2">{detail}</p>
            </Carte>
          ))}
        </div>
      </Section>
    </>
  );
}
