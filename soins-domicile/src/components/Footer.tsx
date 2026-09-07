import Link from "next/link";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { communes } from "@/data/communes";

/* Le pied de page porte l'essentiel du maillage interne — CDC §4.2 */
export function Footer() {
  return (
    <footer className="bg-charbon text-white">
      <div className="mx-auto grid w-full max-w-[1136px] gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="flex items-center gap-3">
            <LogoPied />
            <span className="font-display text-[24px] font-bold">{site.nom}</span>
          </p>
          <p className="mt-5 text-[15px] text-[#BFC3C6]">
            Soins infirmiers professionnels à domicile pour personnes âgées, handicapées et en
            post-hospitalisation. Disponible 7j/7.
          </p>
          <p className="mt-5 inline-block rounded-full bg-white/10 px-4 py-2 text-[13px]">
            Conventionné INAMI · Tiers payant
          </p>
        </div>

        <ColonneLiens
          titre="Nos services"
          liens={services.map((s) => ({ href: `/services/${s.slug}`, libelle: s.nomCourt }))}
        />

        <div>
          <p className="font-semibold">Contact</p>
          <ul className="mt-4 space-y-3 text-[15px] text-[#A6ABAF]">
            <li>
              {site.adresse.rue}
              <br />
              {site.adresse.codePostal} {site.adresse.ville}
            </li>
            <li>
              <a href={`tel:${site.telephone}`} className="hover:text-white hover:underline">
                {site.telephoneAffiche}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white hover:underline">
                {site.email}
              </a>
            </li>
            <li>{site.horaires}</li>
          </ul>
          <p className="mt-4 text-[13.5px] text-[#8B9096]">
            Nos infirmières se déplacent à {communes[0]?.nom} et dans les communes voisines.
          </p>
        </div>

        <ColonneLiens
          titre="Ressources"
          liens={[
            { href: "/zones-desservies", libelle: "Zones desservies" },
            { href: "/tarifs", libelle: "Tarifs et INAMI" },
            { href: "/simulateur-katz", libelle: "Échelle de Katz" },
            { href: "/blog", libelle: "Blog" },
            { href: "/promo", libelle: "Offre découverte" },
            { href: "/mentions-legales", libelle: "Mentions légales" },
            { href: "/conditions-generales", libelle: "Conditions générales" },
            { href: "/confidentialite", libelle: "Confidentialité" },
          ]}
        />
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-[1136px] flex-col gap-2 px-5 py-6 text-[13px] text-[#8B9096] md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {site.nom} — BCE {site.legal.bce} — INAMI {site.legal.inami}
          </p>
          <p>{site.legal.tva}</p>
        </div>
      </div>
    </footer>
  );
}

/** Même icône que l'en-tête (maison + croix de soin), en blanc pour le fond charbon. */
function LogoPied() {
  return (
    <svg viewBox="0 0 40 40" className="h-11 w-11" aria-hidden="true" fill="none">
      <path
        d="M6 18.5 20 7l14 11.5V32a2.5 2.5 0 0 1-2.5 2.5h-23A2.5 2.5 0 0 1 6 32V18.5Z"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M20 17.5v9M15.5 22h9" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function ColonneLiens({
  titre,
  liens,
}: {
  titre: string;
  liens: { href: string; libelle: string }[];
}) {
  return (
    <div>
      <p className="font-semibold">{titre}</p>
      <ul className="mt-4 space-y-2.5">
        {liens.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] text-[#A6ABAF] hover:text-white hover:underline">
              {l.libelle}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
