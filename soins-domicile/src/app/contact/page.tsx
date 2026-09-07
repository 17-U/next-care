import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { FormulaireDemande } from "@/components/FormulaireDemande";
import { site } from "@/data/site";
import { communes } from "@/data/communes";

export const metadata: Metadata = {
  title: "Demander une prise en charge",
  description: `Décrivez la situation en une minute. Nous vous rappelons sous ${site.delaiRappel}. Conventionnés INAMI, tiers payant, 7 jours sur 7.`,
  alternates: { canonical: "/contact" },
};

export default function PageContact() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Demander une prise en charge", url: "/contact" },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-[760px]">
          <h1 className="font-display text-[32px] md:text-[38px]">
            Décrivez la situation en une minute
          </h1>
          <p className="mt-4 text-[17px] text-encre-2">
            Nous vous rappelons sous {site.delaiRappel}. Trois étapes, aucune donnée transmise
            avant votre validation.
          </p>
          <div className="mt-10">
            <FormulaireDemande />
          </div>
        </div>
      </Section>

      {/* Coordonnées et carte — même bloc que la référence du client */}
      <Section fond="brume">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-vert">
            Nos coordonnées
          </p>
          <h2 className="mt-3 font-display text-[26px] tracking-[0.02em]">Contact</h2>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-vert" aria-hidden="true" />

          <p className="mt-8 text-[16px] leading-relaxed text-encre-2">
            {site.adresse.ville}, Belgique
            <br />
            <a href={`tel:${site.telephone}`} className="hover:text-vert hover:underline">
              {site.telephoneAffiche}
            </a>
            {" — "}
            {site.nom}
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-vert hover:underline">
              {site.email}
            </a>
            <br />
            {site.horaires}
          </p>

          <p className="mx-auto mt-6 max-w-[520px] text-[15px] text-encre-3">
            Nos infirmières se déplacent dans la ville de {site.adresse.ville} et ses environs
            ({communes.map((c) => c.nom).join(", ")}).
          </p>
        </div>

        <div className="mt-12 aspect-[16/7] w-full overflow-hidden rounded-[6px]">
          <iframe
            title={`Carte — zone d'intervention à ${site.adresse.ville}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}, Belgique`,
            )}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </>
  );
}
