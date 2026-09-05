import type { Metadata } from "next";
import Link from "next/link";
import { BoutonAppel, Carte, Encadre, Etiquette, Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Tarifs et convention INAMI",
  description:
    "Comprendre le conventionnement INAMI, le tiers payant et le ticket modérateur pour des soins infirmiers à domicile en Belgique.",
  alternates: { canonical: "/tarifs" },
};

/** BF-20 — montants éditables. En production, ces valeurs viennent du back-office. */
const prestations = [
  ["Toilette d'un patient dépendant", "Forfait journalier INAMI (A, B ou C)", "Selon forfait", "0,00 €"],
  ["Pansement simple", "Nomenclature INAMI", "Environ 1 à 2 €", "0,00 €"],
  ["Injection intramusculaire ou sous-cutanée", "Nomenclature INAMI", "Environ 1 à 2 €", "0,00 €"],
  ["Prise de sang à domicile", "Sur prescription", "Environ 1 à 2 €", "0,00 €"],
  ["Forfait palliatif", "Forfait spécifique INAMI", "0,00 €", "0,00 €"],
  ["Déplacement (patient dépendant)", "Inclus dans le forfait", "0,00 €", "0,00 €"],
];

export default function PageTarifs() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Tarifs", url: "/tarifs" },
        ]}
      />
      <Section>
        <h1 className="font-display text-[34px] md:text-[40px]">Tarifs et convention INAMI</h1>
        <p className="mesure mt-4 text-[18px] text-encre-2">
          Les tarifs des soins infirmiers ne sont pas fixés par le prestataire. Ils découlent de la
          nomenclature INAMI et sont identiques chez tout infirmier conventionné de Belgique.
        </p>
        <div className="mt-5">
          <Etiquette ton="neutre">Montants mis à jour en janvier 2026</Etiquette>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            [
              "Nous sommes conventionnés",
              "Nous appliquons les tarifs officiels INAMI, sans supplément d'honoraires.",
            ],
            [
              "Le tiers payant est appliqué",
              "La part INAMI est facturée directement à votre mutualité. Vous n'avancez rien.",
            ],
            [
              "Vous ne payez que le ticket modérateur",
              "Son montant dépend de la prestation prescrite et de votre statut, BIM ou non.",
            ],
          ].map(([titre, detail]) => (
            <Carte key={titre}>
              <h2 className="font-display text-[19px]">{titre}</h2>
              <p className="mt-3 text-[16px] text-encre-2">{detail}</p>
            </Carte>
          ))}
        </div>

        <h2 className="mt-14 font-display text-[26px]">Exemples de prestations</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">
              Exemples de prestations, prise en charge et ticket modérateur
            </caption>
            <thead>
              <tr className="bg-charbon text-white">
                <th scope="col" className="p-4 font-semibold">Prestation</th>
                <th scope="col" className="p-4 font-semibold">Prise en charge</th>
                <th scope="col" className="p-4 font-semibold">Ticket modérateur</th>
                <th scope="col" className="p-4 font-semibold">Statut BIM</th>
              </tr>
            </thead>
            <tbody>
              {prestations.map((ligne, i) => (
                <tr key={ligne[0]} className={i % 2 ? "bg-fond" : "bg-white"}>
                  <td className="border-b border-bordure p-4">{ligne[0]}</td>
                  <td className="border-b border-bordure p-4 text-encre-2">{ligne[1]}</td>
                  <td className="border-b border-bordure p-4 text-encre-2">{ligne[2]}</td>
                  <td className="border-b border-bordure p-4 font-semibold text-succes">{ligne[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 max-w-[760px]">
          <Encadre titre="Montants indicatifs" ton="alerte">
            Les montants exacts dépendent de la prescription et de votre mutualité. Ils sont mis à
            jour à chaque révision de la nomenclature INAMI.
          </Encadre>
        </div>

        <div className="mt-12 rounded-[16px] bg-charbon p-8 text-white md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="font-display text-[24px] text-white">
              Un doute sur ce que vous allez payer ?
            </h2>
            <p className="mt-3 text-[17px] text-[#BFC3C6]">
              Appelez-nous : nous vérifions votre couverture avec vous, gratuitement. Vous pouvez
              aussi{" "}
              <Link href="/simulateur-katz" className="text-white underline">
                estimer le forfait applicable
              </Link>{" "}
              en deux minutes.
            </p>
          </div>
          <div className="mt-6 shrink-0 md:mt-0">
            <BoutonAppel telephone={site.telephone} affichage={site.telephoneAffiche} variante="principal" />
          </div>
        </div>
      </Section>
    </>
  );
}
