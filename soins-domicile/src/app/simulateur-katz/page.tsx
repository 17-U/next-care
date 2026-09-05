import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { SimulateurKatz } from "@/components/SimulateurKatz";

export const metadata: Metadata = {
  title: "Échelle de Katz : estimer les droits au forfait INAMI",
  description:
    "Six critères cotés de 1 à 4 déterminent le forfait de soins infirmiers à domicile. Estimez en deux minutes le degré de dépendance de votre proche.",
  alternates: { canonical: "/simulateur-katz" },
};

export default function PageKatz() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Échelle de Katz", url: "/simulateur-katz" },
        ]}
      />
      <div className="border-b border-vert-bord bg-vert-pale">
        <div className="mx-auto w-full max-w-[1136px] px-5 py-12 md:px-8">
          <h1 className="font-display text-[32px] md:text-[38px]">
            Estimer les droits au forfait INAMI
          </h1>
          <p className="mesure mt-4 text-[17px] text-encre-2">
            L&apos;échelle de Katz est l&apos;outil officiel de mesure de la dépendance en Belgique.
            Six critères y sont cotés de 1, autonome, à 4, totalement dépendant. Le total détermine
            le forfait applicable et donc le nombre de passages infirmiers pris en charge.
          </p>
        </div>
      </div>
      <Section>
        <SimulateurKatz />
      </Section>
    </>
  );
}
