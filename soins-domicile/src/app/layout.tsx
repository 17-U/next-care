import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BarreAppel } from "@/components/BarreAppel";
import { JsonLd, schemaOrganisation } from "@/lib/schema";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nom} — infirmier à domicile à Manage, 7j/7`,
    template: `%s | ${site.nom}`,
  },
  description:
    "Soins infirmiers à domicile à Manage, Seneffe, Morlanwelz et La Louvière : soins palliatifs, aide à la toilette, pansements, suivi du diabète. Conventionnés INAMI, 7 jours sur 7.",
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: site.nom,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-BE">
      <body className="pb-[76px] lg:pb-0">
        <a href="#contenu" className="lien-evitement">
          Aller au contenu principal
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <BarreAppel />
        <JsonLd donnees={schemaOrganisation()} />
      </body>
    </html>
  );
}
