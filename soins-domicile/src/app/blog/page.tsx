import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Etiquette, Section } from "@/components/ui";
import { EnteteSection } from "@/components/EnteteSection";
import { FilAriane } from "@/components/FilAriane";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Guides et conseils sur les soins à domicile",
  description:
    "Comprendre l'échelle de Katz, le tiers payant et l'organisation d'un retour d'hospitalisation. Des repères pratiques pour les aidants proches.",
  alternates: { canonical: "/blog" },
};

const dateFr = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });

export default function PageBlog() {
  const [une, ...suite] = articles;

  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Blog", url: "/blog" },
        ]}
      />
      <Section>
        <h1 className="sr-only">Guides et conseils sur les soins infirmiers à domicile</h1>
        <EnteteSection surTitre="Guides & ressources" titre="Comprendre les soins à domicile">
          Le maintien à domicile repose autant sur des démarches administratives que sur des soins.
          Ces guides expliquent les unes comme les autres, sans jargon.
        </EnteteSection>

        {/* Article à la une */}
        <Link
          href={`/blog/${une.slug}`}
          className="mt-12 grid overflow-hidden rounded-[6px] border border-bordure bg-white lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px]">
            <Image
              src={une.image}
              alt={une.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              quality={90}
            />
          </div>
          <div className="p-7 md:p-10">
            <Etiquette>{une.categorie}</Etiquette>
            <h2 className="mt-4 font-display text-[27px] leading-snug md:text-[31px]">
              {une.titre}
            </h2>
            <p className="mt-4 text-[16px] text-encre-2">{une.chapo}</p>
            <p className="mt-6 text-[15px] text-encre-3">
              {dateFr(une.date)} · {une.minutes} min de lecture
            </p>
          </div>
        </Link>

        <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {suite.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="flex flex-col overflow-hidden rounded-[6px] border border-bordure bg-white"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={a.image}
                  alt={a.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
              quality={90}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Etiquette>{a.categorie}</Etiquette>
                <h2 className="mt-4 font-display text-[21px] leading-snug">{a.titre}</h2>
                <p className="mt-3 flex-1 text-[15px] text-encre-2">{a.chapo}</p>
                <p className="mt-5 text-[14px] text-encre-3">
                  {dateFr(a.date)} · {a.minutes} min
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
