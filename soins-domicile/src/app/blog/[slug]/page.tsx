import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bouton, BoutonAppel, Etiquette, ListeCochee, Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { articles, getArticle } from "@/data/articles";
import { site } from "@/data/site";
import { JsonLd, schemaFilAriane } from "@/lib/schema";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.titre,
    description: a.chapo,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { type: "article", publishedTime: a.date, images: [a.image] },
  };
}

export default async function PageArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const autres = articles.filter((x) => x.slug !== a.slug);
  const ariane = [
    { nom: "Accueil", url: "/" },
    { nom: "Blog", url: "/blog" },
    { nom: a.titre, url: `/blog/${a.slug}` },
  ];

  return (
    <>
      <FilAriane elements={ariane} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <article>
            <Etiquette>{a.categorie}</Etiquette>
            <h1 className="mt-5 font-display text-[32px] leading-[1.2] md:text-[40px]">{a.titre}</h1>
            <p className="mt-4 text-[15px] text-encre-3">
              {new Date(a.date).toLocaleDateString("fr-BE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              · {a.minutes} min de lecture · {a.relecture}
            </p>

            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[6px]">
              <Image
                src={a.image}
                alt={a.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              quality={90}
              />
            </div>

            <p className="mesure mt-9 text-[19px] leading-relaxed">{a.chapo}</p>

            {a.sections.map((sec) => (
              <section key={sec.titre} className="mt-11">
                <h2 className="font-display text-[26px]">{sec.titre}</h2>
                {sec.paragraphes.map((par) => (
                  <p key={par.slice(0, 40)} className="mesure mt-4 text-[17px] text-encre-2">
                    {par}
                  </p>
                ))}
                {sec.liste && (
                  <div className="mt-6">
                    <ListeCochee elements={sec.liste} />
                  </div>
                )}
              </section>
            ))}
          </article>

          <aside className="space-y-8">
            <div className="rounded-[6px] bg-charbon p-6 text-white">
              <h2 className="font-display text-[21px] text-white">Besoin d&apos;un avis ?</h2>
              <p className="mt-3 text-[16px] text-[#BFC3C6]">
                Une infirmière évalue la situation à domicile, gratuitement et sans engagement.
              </p>
              <div className="mt-6 space-y-3">
                <Bouton href="/contact" pleineLargeur>
                  Prendre RDV
                </Bouton>
                <BoutonAppel
                  telephone={site.telephone}
                  affichage={site.telephoneAffiche}
                  variante="contour"
                />
              </div>
            </div>

            <div>
              <h2 className="font-display text-[20px]">À lire aussi</h2>
              <ul className="mt-4 space-y-3">
                {autres.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/blog/${x.slug}`} className="text-[16px] text-encre hover:text-vert">
                      {x.titre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd
        donnees={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.titre,
          description: a.chapo,
          datePublished: a.date,
          image: `${site.url}${a.image}`,
          author: { "@type": "Organization", name: site.nom },
          publisher: { "@id": `${site.url}/#organisation` },
          mainEntityOfPage: `${site.url}/blog/${a.slug}`,
        }}
      />
      <JsonLd donnees={schemaFilAriane(ariane)} />
    </>
  );
}
