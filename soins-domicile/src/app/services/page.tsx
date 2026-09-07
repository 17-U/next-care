import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { FilAriane } from "@/components/FilAriane";
import { CarteService } from "@/components/CarteService";
import { EnteteSection } from "@/components/EnteteSection";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Nos services de soins infirmiers à domicile",
  description:
    "Soins palliatifs, aide à la toilette, pansements, injections, prises de sang, suivi du diabète. Six services conventionnés INAMI à Manage et dans les communes voisines.",
  alternates: { canonical: "/services" },
};

export default function PageServices() {
  return (
    <>
      <FilAriane
        elements={[
          { nom: "Accueil", url: "/" },
          { nom: "Services", url: "/services" },
        ]}
      />
      <Section>
        <h1 className="sr-only">Nos services de soins infirmiers à domicile</h1>
        <EnteteSection
          surTitre="Nos services"
          titre="Des soins infirmiers à domicile adaptés à vos besoins"
        >
          Tous nos actes sont réalisés par des infirmiers diplômés et conventionnés. La plupart
          nécessitent une prescription du médecin traitant : appelez-nous si vous n&apos;en avez pas
          encore, nous vous indiquons la démarche.
        </EnteteSection>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <CarteService key={service.slug} service={service} priorite={i < 3} />
          ))}
        </div>
      </Section>
    </>
  );
}
