import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { FormulaireDemande } from "@/components/FormulaireDemande";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Demander une prise en charge",
  description: `Décrivez la situation en une minute. Nous vous rappelons sous ${site.delaiRappel}. Conventionnés INAMI, tiers payant, 7 jours sur 7.`,
  alternates: { canonical: "/contact" },
};

export default function PageContact() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Demander une prise en charge", url: "/contact" },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-[760px]">
          <h1 className="font-display text-[32px] md:text-[38px]">
            Décrivez la situation en une minute
          </h1>
          <p className="mt-4 text-[17px] text-encre-2">
            Nous vous rappelons sous {site.delaiRappel}. Trois étapes, onze champs, aucune donnée
            transmise avant votre validation.
          </p>
          <div className="mt-10">
            <FormulaireDemande />
          </div>
        </div>
      </Section>
    </>
  );
}
