import type { Metadata } from "next";
import Image from "next/image";
import { Carte, ListeCochee, Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { communes } from "@/data/communes";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos de notre équipe",
  description:
    "Une équipe d'infirmiers diplômés et conventionnés INAMI, spécialisée dans les soins lourds et récurrents à domicile à Bruxelles.",
  alternates: { canonical: "/a-propos" },
};

export default function PageAPropos() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "À propos", url: "/a-propos" },
        ]}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="font-display text-[34px] md:text-[42px]">
              Une équipe, un territoire, une continuité de soins
            </h1>
            <p className="mesure mt-5 text-[18px] text-encre-2">
              {site.nom} réunit des infirmiers diplômés et conventionnés INAMI. Nous avons choisi de
              nous concentrer sur les soins lourds et récurrents, ceux qui exigent une vraie
              continuité : dépendance, fin de vie, retour d&apos;hospitalisation.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["7j/7", "jours fériés compris"],
                ["24 h", "délai moyen de prise en charge"],
                [`${communes.length}`, "communes couvertes"],
                ["1", "infirmier référent par patient"],
              ].map(([valeur, libelle]) => (
                <div key={libelle}>
                  <dt className="sr-only">{libelle}</dt>
                  <dd>
                    <span className="block font-display text-[30px] font-bold text-charbon">
                      {valeur}
                    </span>
                    <span className="text-[14px] text-encre-2">{libelle}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
            <Image
              src="/images/revalidation.webp"
              alt="Une soignante accompagne une patiente âgée lors d'exercices de mobilité"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section fond="brume">
        <h2 className="font-display text-[28px]">Nos engagements</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <ListeCochee
            elements={[
              "Secret professionnel et respect du domicile",
              "Tarifs INAMI sans supplément d'honoraires",
              "Un interlocuteur unique pour la famille",
            ]}
          />
          <ListeCochee
            elements={[
              "Coordination systématique avec le médecin traitant",
              "Plan de soins écrit, révisé à chaque évolution",
              "Transmission entre infirmiers à chaque passage",
            ]}
          />
        </div>
        <div className="mt-10 max-w-[760px]">
          <Carte>
            <h2 className="font-display text-[20px]">Pourquoi nous ne publions pas de témoignages</h2>
            <p className="mt-3 text-[16px] text-encre-2">
              Un témoignage nominatif décrivant l&apos;état de santé d&apos;un patient soulève des
              questions déontologiques et relève du traitement de données de santé. Nous préférons
              nous en tenir aux faits vérifiables : conventionnement, délais, compétences réelles.
            </p>
          </Carte>
        </div>
      </Section>
    </>
  );
}
