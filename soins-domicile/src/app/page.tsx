import Image from "next/image";
import Link from "next/link";
import { Bouton, BoutonAppel, Carte, Encadre, Etiquette, IconeCoche, Section } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { CarteService } from "@/components/CarteService";
import { EnteteSection } from "@/components/EnteteSection";
import { faqGenerale } from "@/data/faq";
import { services } from "@/data/services";
import { communes } from "@/data/communes";
import { site } from "@/data/site";
import { JsonLd, schemaFaq } from "@/lib/schema";

export default function Accueil() {
  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      {/* Photographie en fond plein cadre, voile sombre pour garantir le contraste
          du texte (AA) quelle que soit la zone de l'image. */}
      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden md:min-h-[640px]">
        <Image
          src="/images/hero-accueil.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[70%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-charbon/92 via-charbon/75 to-charbon/25"
        />

        <div className="mx-auto w-full max-w-[1280px] px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-[640px]">
            <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-[#9FD8C1]">
              Soins infirmiers à domicile
            </p>
            <h1 className="mt-4 font-display text-[38px] leading-[1.15] tracking-[0.02em] text-white md:text-[54px]">
              Des soins infirmiers professionnels, chez vous, 7j/7
            </h1>
            <p className="mt-6 text-[18px] leading-relaxed text-[#D7DADC]">
              Soins palliatifs, aide à la toilette, pansements et suivi des maladies chroniques à
              Bruxelles et en périphérie. Conventionnés INAMI : le tiers payant est appliqué, vous
              ne réglez que le ticket modérateur.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Bouton href="/contact">Prendre RDV</Bouton>
              <BoutonAppel
                telephone={site.telephone}
                affichage={site.telephoneAffiche}
                variante="contour"
              />
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
              {[
                `Rappel sous ${site.delaiRappel}`,
                "Sans engagement",
                "Évaluation à domicile gratuite",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-[15px] text-[#D7DADC]">
                  <IconeCoche className="h-5 w-5 text-[#9FD8C1]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- RÉASSURANCE */}
      <div className="border-y border-bordure bg-brume">
        <div className="mx-auto grid w-full max-w-[1136px] gap-6 px-5 py-8 md:grid-cols-4 md:px-8">
          {[
            ["Infirmiers diplômés", "et conventionnés INAMI"],
            ["7j/7, week-ends", "et jours fériés inclus"],
            ["Plan de soins", "établi avec votre médecin"],
            ["Bruxelles", "et périphérie est"],
          ].map(([titre, detail]) => (
            <div key={titre} className="flex gap-3">
              <IconeCoche className="mt-1 h-5 w-5 shrink-0 text-vert" />
              <p className="text-[15px]">
                <span className="block font-semibold text-charbon">{titre}</span>
                <span className="text-encre-2">{detail}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------- SERVICES */}
      <Section id="services">
        <EnteteSection
          surTitre="Nos services"
          titre="Des soins infirmiers à domicile adaptés à vos besoins"
        >
          Nous intervenons pour les soins complexes et récurrents : soins palliatifs, hygiène et
          aide à la toilette, patients dépendants sous échelle de Katz, maladies chroniques.
          Conventionnés INAMI, nos infirmiers assurent la continuité des soins à domicile 7j/7.
        </EnteteSection>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <CarteService key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {/* --------------------------------------- SOINS AU-DELÀ DE L'INFIRMIER */}
      <Section fond="blanc">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-[30px] md:text-[34px]">
              Des soins qui vont au-delà des actes infirmiers
            </h2>
            <div className="mt-8 space-y-7">
              {[
                [
                  "Hospitalisation à domicile",
                  "Des soins de niveau hospitalier chez vous : perfusions, antibiothérapie, surveillance rapprochée.",
                ],
                [
                  "Soins pédiatriques",
                  "Aérosols, pansements et soins techniques pour les enfants, dans leur chambre plutôt qu'en salle d'attente.",
                ],
                [
                  "Soutien aux proches aidants",
                  "Écoute, explications et repères pratiques pour les familles qui accompagnent au quotidien.",
                ],
              ].map(([titre, detail]) => (
                <div key={titre} className="flex gap-4">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vert-pale text-vert">
                    <IconeCoche className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-[20px]">{titre}</h3>
                    <p className="mt-1 text-[16px] text-encre-2">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
              <Image
                src="/images/toilette-hygiene.webp"
                alt="Une infirmière échange avec une patiente âgée assise dans son fauteuil"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative -mt-16 ml-auto hidden aspect-[4/3] w-1/2 overflow-hidden rounded-[16px] border-4 border-white sm:block">
              <Image
                src="/images/soins-pediatriques.webp"
                alt="Une infirmière aide un jeune enfant à prendre son aérosol dans sa chambre"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- KATZ */}
      <Section fond="brume">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-[28px] md:text-[32px]">
              Votre proche perd son autonomie ?
            </h2>
            <p className="mesure mt-3 text-[17px] text-encre-2">
              L&apos;échelle de Katz détermine le forfait INAMI dont dépend la prise en charge des
              soins. Six critères, cotés de 1 à 4. Notre simulateur vous donne une première
              estimation en deux minutes.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Bouton href="/simulateur-katz" variante="vert">
              Tester l&apos;éligibilité au forfait
            </Bouton>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- PROCESSUS */}
      <Section fond="charbon">
        <h2 className="font-display text-[30px] text-white md:text-[34px]">
          Comment se passe une prise en charge
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {[
            ["Vous nous appelez", "Nous évaluons la situation par téléphone, sans engagement."],
            [
              "Visite d'évaluation",
              "Une infirmière se déplace gratuitement et établit le plan de soins avec votre médecin.",
            ],
            [
              "Attribution d'un référent",
              "Un infirmier vous est attribué selon le type de soins nécessaires.",
            ],
            [
              "Suivi continu",
              "Passages réguliers, coordination médicale et soutien à la famille.",
            ],
          ].map(([titre, detail], i) => (
            <li key={titre}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 font-display text-[18px] font-bold text-[#9FD8C1]">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-[19px] text-white">{titre}</h3>
              <p className="mt-2 text-[15px] text-[#BFC3C6]">{detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ------------------------------------------------------------ ZONES */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="font-display text-[30px] md:text-[34px]">Où nous intervenons</h2>
            <p className="mesure mt-3 text-[17px] text-encre-2">
              Bruxelles et périphérie est. Chaque commune a sa page : quartiers couverts, délai
              d&apos;intervention et soins les plus demandés sur place.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {communes.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="flex min-h-[56px] items-center justify-between gap-3 rounded-[12px] border border-bordure bg-white px-5 hover:border-vert"
                  >
                    <span className="font-semibold text-charbon">{c.nom}</span>
                    <span className="text-[15px] text-encre-2">{c.codePostal}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="self-start">
            <Encadre titre="Votre commune n'est pas dans la liste ?">
              Appelez-nous : nous vous orientons vers un confrère conventionné proche de chez vous,
              ou vérifions si votre adresse entre dans une tournée existante.
            </Encadre>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------------- FAQ */}
      <Section fond="brume">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-[30px] md:text-[34px]">Questions fréquentes</h2>
            <div className="mt-8">
              <Faq elements={faqGenerale} />
            </div>
          </div>
          <Carte className="self-start">
            <Etiquette>Réponse {site.horaires}</Etiquette>
            <h3 className="mt-4 font-display text-[22px]">Une question sur votre situation ?</h3>
            <p className="mt-3 text-[16px] text-encre-2">
              Le plus simple reste de nous appeler. Nous vérifions vos droits et le délai possible
              en quelques minutes.
            </p>
            <div className="mt-6 space-y-3">
              <BoutonAppel telephone={site.telephone} affichage={site.telephoneAffiche} />
              <Bouton href="/contact" variante="contour" pleineLargeur>
                Demander un rappel
              </Bouton>
            </div>
          </Carte>
        </div>
      </Section>

      <JsonLd donnees={schemaFaq(faqGenerale)} />
    </>
  );
}
