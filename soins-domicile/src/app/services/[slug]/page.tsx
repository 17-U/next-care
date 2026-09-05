import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bouton, BoutonAppel, Carte, Encadre, Etiquette, ListeCochee, Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { Faq } from "@/components/Faq";
import { getService, services } from "@/data/services";
import { site } from "@/data/site";
import { JsonLd, schemaFaq, schemaFilAriane, schemaService } from "@/lib/schema";

/** Gabarit unique réutilisé par les six services — BF-02. */

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.nom,
    description: service.resume,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function PageService({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const associes = services.filter((s) => s.slug !== service.slug).slice(0, 4);
  const ariane = [
    { nom: "Accueil", url: "/" },
    { nom: "Services", url: "/services" },
    { nom: service.nomCourt, url: `/services/${service.slug}` },
  ];

  return (
    <>
      <FilAriane elements={ariane} />

      <Section fond="blanc">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Etiquette>Conventionné INAMI</Etiquette>
            <h1 className="mt-5 font-display text-[34px] md:text-[42px]">{service.nom}</h1>
            <p className="mesure mt-4 text-[18px] text-encre-2">{service.resume}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Bouton href="/contact">Demander une prise en charge</Bouton>
              <BoutonAppel
                telephone={site.telephone}
                affichage={site.telephoneAffiche}
                variante="contour"
              />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
            <Image
              src={service.image}
              alt={service.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="mesure text-[18px]">{service.intro}</p>

            <h2 className="mt-10 font-display text-[26px]">Ce que comprend la prise en charge</h2>
            <div className="mt-6">
              <ListeCochee elements={service.actes} />
            </div>

            <h2 className="mt-12 font-display text-[26px]">Prise en charge financière</h2>
            <p className="mesure mt-4 text-[17px] text-encre-2">{service.priseEnCharge}</p>
            <p className="mt-4">
              <Link href="/tarifs" className="font-semibold text-vert underline underline-offset-4">
                Comprendre le tiers payant et le ticket modérateur
              </Link>
            </p>

            {service.urgence && (
              <div className="mt-8">
                <Encadre titre="Situation urgente" ton="alerte">
                  {service.urgence}
                </Encadre>
              </div>
            )}

            {service.faq.length > 0 && (
              <>
                <h2 className="mt-12 font-display text-[26px]">
                  Questions fréquentes sur ce service
                </h2>
                <div className="mt-6">
                  <Faq elements={service.faq} />
                </div>
              </>
            )}
          </div>

          <aside className="space-y-8">
            <div className="rounded-[16px] bg-charbon p-6 text-white">
              <h2 className="font-display text-[22px] text-white">Demander ce soin</h2>
              <p className="mt-3 text-[16px] text-[#BFC3C6]">
                Rappel sous {site.delaiRappel}. Évaluation à domicile gratuite et sans engagement.
              </p>
              <div className="mt-6 space-y-3">
                <Bouton href="/contact" pleineLargeur>
                  Être rappelé
                </Bouton>
                <BoutonAppel
                  telephone={site.telephone}
                  affichage={site.telephoneAffiche}
                  variante="contour"
                />
              </div>
            </div>

            <Carte>
              <h2 className="font-display text-[20px]">Services associés</h2>
              <ul className="mt-4 space-y-2">
                {associes.map((s) => (
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
          </aside>
        </div>
      </Section>

      <JsonLd
        donnees={schemaService(service.nom, service.resume, `${site.url}/services/${service.slug}`)}
      />
      <JsonLd donnees={schemaFilAriane(ariane)} />
      {service.faq.length > 0 && <JsonLd donnees={schemaFaq(service.faq)} />}
    </>
  );
}
