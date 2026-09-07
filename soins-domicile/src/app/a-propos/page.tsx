import type { Metadata } from "next";
import Image from "next/image";
import { Carte, ListeCochee, Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { communes } from "@/data/communes";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos de notre équipe",
  description:
    "Une équipe d'infirmiers diplômés et conventionnés INAMI, spécialisée dans les soins lourds et récurrents à domicile à Manage et dans les communes voisines.",
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
        {/* Photo pleine largeur avec bandeau de texte en incrustation —
            même principe structurel que la référence du client. */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-[6px] md:aspect-[21/9]">
          <Image
            src="/images/soins-palliatifs.webp"
            alt="Une infirmière échange avec un patient âgé, assis dans son salon"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charbon/55 via-charbon/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-center">
            <div className="max-w-[420px] bg-white/92 p-7 md:ml-10 md:p-9">
              <h2 className="font-display text-[26px] leading-[1.2] tracking-[0.02em] md:text-[32px]">
                Pourquoi Nous Choisir
              </h2>
              <div className="mt-3 h-[3px] w-14 bg-vert" aria-hidden="true" />
              <p className="mt-4 text-[16px] text-encre-2">
                L&apos;attention dont vous avez besoin, à domicile.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-vert">
            Pourquoi nous choisir
          </p>
          <h2 className="mt-3 font-display text-[28px] leading-[1.2] tracking-[0.02em] md:text-[34px]">
            L&apos;attention dont vous avez besoin, à domicile
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-vert" aria-hidden="true" />
          <p className="mt-6 text-[17px] text-encre-2">
            Nous sommes dédiés à offrir des services de soins à domicile de qualité,
            garantissant le bien-être et la tranquillité d&apos;esprit de nos patients et de
            leurs familles. Avec une équipe professionnelle et attentionnée, nous fournissons
            des solutions adaptées à des besoins spécifiques, de manière respectueuse et
            chaleureuse.
          </p>
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
