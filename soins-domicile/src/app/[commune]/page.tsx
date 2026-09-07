import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bouton, BoutonAppel, Carte, Encadre, Etiquette, ListeCochee, Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { communes, getCommune } from "@/data/communes";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { images } from "@/data/images";
import { JsonLd, schemaFilAriane, schemaService } from "@/lib/schema";

/**
 * Page commune — BF-03, cœur du référencement local (CDC annexe B).
 * L'URL complète sert de segment : /infirmier-domicile-schaerbeek
 * Les routes statiques (/services, /tarifs…) restent prioritaires sur ce segment dynamique.
 *
 * RAPPEL DE RECETTE : 400 mots réellement uniques par commune. Une page dupliquée
 * en changeant le seul nom de la commune sera ignorée ou pénalisée par Google.
 */

export function generateStaticParams() {
  return communes.map((c) => ({ commune: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ commune: string }>;
}): Promise<Metadata> {
  const { commune } = await params;
  const c = getCommune(commune);
  if (!c) return {};
  return {
    title: `Infirmier à domicile à ${c.nom} (${c.codePostal})`,
    description: `Soins infirmiers à domicile à ${c.nom} 7j/7 : toilette, pansements, soins palliatifs, suivi du diabète. Conventionnés INAMI, intervention en ${c.delai}.`,
    alternates: { canonical: `/${c.slug}` },
  };
}

export default async function PageCommune({
  params,
}: {
  params: Promise<{ commune: string }>;
}) {
  const { commune } = await params;
  const c = getCommune(commune);
  if (!c) notFound();

  const voisines = c.voisines
    .map((slug) => communes.find((x) => x.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const ariane = [
    { nom: "Accueil", url: "/" },
    { nom: "Zones desservies", url: "/zones-desservies" },
    { nom: c.nom, url: `/${c.slug}` },
  ];

  return (
    <>
      <FilAriane elements={ariane} />

      <section className="relative isolate overflow-hidden bg-charbon text-white">
        <Image
          src={images.prisesDeSang}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-20"
          quality={90}
        />
        <div className="mx-auto w-full max-w-[1136px] px-5 py-14 md:px-8 md:py-16">
          <p className="inline-block rounded-full bg-white/10 px-4 py-2 text-[14px]">
            {c.codePostal} {c.nom}
          </p>
          <h1 className="mt-6 font-display text-[34px] leading-[1.1] md:text-[44px]">
            <span className="text-white">Infirmier à domicile</span>
            <br />
            <span className="text-[#9FD8C1]">
              à {c.nom} ({c.codePostal})
            </span>
          </h1>
          <p className="mesure mt-5 text-[18px] text-[#D7DADC]">
            Notre équipe intervient dans tout {c.nom}, sept jours sur sept :{" "}
            {c.quartiers.slice(0, 4).join(", ")} et les quartiers alentour.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Bouton href="/contact">Demander une visite</Bouton>
            <BoutonAppel
              telephone={site.telephone}
              affichage={site.telephoneAffiche}
              variante="contour"
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="font-display text-[28px]">
              Des soins infirmiers de proximité à {c.nom}
            </h2>
            <p className="mesure mt-4 text-[17px] text-encre-2">{c.intro}</p>

            <h3 className="mt-10 font-display text-[21px]">Quartiers couverts</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.quartiers.map((q) => (
                <li
                  key={q}
                  className="rounded-full border border-bordure bg-white px-4 py-2 text-[15px]"
                >
                  {q}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-[21px]">Repères locaux</h3>
            <div className="mt-4">
              <ListeCochee elements={c.reperes} />
            </div>

            <h3 className="mt-10 font-display text-[21px]">
              Soins les plus demandés à {c.nom}
            </h3>
            <div className="mt-4">
              <ListeCochee elements={c.soinsFrequents} />
            </div>

            <h3 className="mt-10 font-display text-[21px]">Remboursement</h3>
            <p className="mesure mt-4 text-[17px] text-encre-2">
              Nous sommes conventionnés INAMI : les tarifs sont ceux de la nomenclature, identiques
              chez tout infirmier conventionné de {c.nom}. Le tiers payant est appliqué, vous ne
              réglez que le ticket modérateur.{" "}
              <Link href="/tarifs" className="font-semibold text-vert underline underline-offset-4">
                Voir le détail des tarifs
              </Link>
            </p>
          </div>

          <aside className="space-y-8">
            <div className="rounded-[16px] border border-vert-bord bg-vert-pale p-6">
              <p className="font-display text-[20px] text-charbon">Délai d&apos;intervention</p>
              <p className="mt-3 font-display text-[32px] font-bold text-vert">{c.delai}</p>
              <p className="mt-3 text-[15px] text-encre-2">
                Sortie d&apos;hôpital : prise en charge le jour même sur appel du service social.
              </p>
            </div>

            <Carte>
              <h2 className="font-display text-[20px]">Nos services à {c.nom}</h2>
              <ul className="mt-4 space-y-2">
                {services.slice(0, 4).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="block py-2 text-[16px] text-charbon hover:underline"
                    >
                      {s.nomCourt}
                    </Link>
                  </li>
                ))}
              </ul>
            </Carte>

            {voisines.length > 0 && (
              <Carte>
                <h2 className="font-display text-[20px]">Communes voisines</h2>
                <ul className="mt-4 space-y-2">
                  {voisines.map((v) => (
                    <li key={v.slug}>
                      <Link href={`/${v.slug}`} className="block py-2 text-[16px] text-charbon hover:underline">
                        {v.nom} ({v.codePostal})
                      </Link>
                    </li>
                  ))}
                </ul>
              </Carte>
            )}

            <Encadre titre={`Besoin d'un avis rapide à ${c.nom} ?`}>
              Appelez-nous, {site.horaires}. Nous vérifions la disponibilité d&apos;un infirmier sur
              votre quartier immédiatement.
            </Encadre>
          </aside>
        </div>
      </Section>

      <JsonLd
        donnees={schemaService(
          `Soins infirmiers à domicile à ${c.nom}`,
          `Soins infirmiers à domicile à ${c.nom} (${c.codePostal}), 7j/7, conventionnés INAMI.`,
          `${site.url}/${c.slug}`,
        )}
      />
      <JsonLd donnees={schemaFilAriane(ariane)} />
    </>
  );
}
