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
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-vert font-display text-[20px] font-bold text-white">
              N
            </span>
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
        <ColonneLiens
          titre="Zones desservies"
          liens={communes.map((c) => ({ href: `/${c.slug}`, libelle: c.nom }))}
        />
        <ColonneLiens
          titre="Guides & ressources"
          liens={[
            { href: "/tarifs", libelle: "Tarifs et INAMI" },
            { href: "/simulateur-katz", libelle: "Échelle de Katz" },
            { href: "/a-propos", libelle: "À propos" },
            { href: "/contact", libelle: "Demander une visite" },
            { href: "/mentions-legales", libelle: "Mentions légales" },
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
