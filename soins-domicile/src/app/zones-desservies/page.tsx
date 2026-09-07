import type { Metadata } from "next";
import Link from "next/link";
import { Carte, Encadre, Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { VerificateurZone } from "@/components/VerificateurZone";
import { communes } from "@/data/communes";

export const metadata: Metadata = {
  title: "Zones desservies à Manage et dans le Hainaut",
  description:
    "Vérifiez si votre commune est couverte : Manage, Seneffe, Morlanwelz, La Louvière. Intervention sous 24 heures.",
  alternates: { canonical: "/zones-desservies" },
};

export default function PageZones() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Zones desservies", url: "/zones-desservies" },
        ]}
      />
      <Section>
        <h1 className="font-display text-[34px] md:text-[40px]">Où nous intervenons</h1>
        <p className="mesure mt-4 text-[17px] text-encre-2">
          Manage et les communes voisines. Entrez votre code postal : vous saurez immédiatement si votre
          adresse entre dans nos tournées et sous quel délai.
        </p>

        <div className="mt-8 max-w-[560px]">
          <VerificateurZone />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="font-display text-[24px]">Communes couvertes</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {communes.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="flex min-h-[64px] items-center justify-between gap-3 rounded-[12px] border border-bordure bg-white px-5 hover:border-vert"
                  >
                    <span>
                      <span className="block font-semibold text-charbon">{c.nom}</span>
                      <span className="text-[14px] text-encre-2">{c.delai}</span>
                    </span>
                    <span className="text-[15px] text-encre-2">{c.codePostal}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <Encadre titre="Hors zone ?">
              Appelez-nous. Nous vous orientons vers un confrère conventionné proche de chez vous
              plutôt que de vous laisser sans solution.
            </Encadre>
            <Carte>
              <h2 className="font-display text-[19px]">Sorties d&apos;hospitalisation</h2>
              <p className="mt-3 text-[16px] text-encre-2">
                Les services sociaux hospitaliers peuvent nous joindre directement pour organiser un
                retour à domicile dans la journée.
              </p>
            </Carte>
          </aside>
        </div>
      </Section>
    </>
  );
}
