"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/data/site";
import { Bouton, IconeTelephone } from "./ui";

export function Header() {
  const [menuMobile, setMenuMobile] = useState(false);
  const [sousMenuOuvert, setSousMenuOuvert] = useState<string | null>(null);
  const chemin = usePathname();
  const zoneNav = useRef<HTMLDivElement>(null);

  // Ferme le sous-menu au clic extérieur et à la touche Échap
  useEffect(() => {
    function clicExterieur(e: MouseEvent) {
      if (zoneNav.current && !zoneNav.current.contains(e.target as Node)) {
        setSousMenuOuvert(null);
      }
    }
    function echap(e: KeyboardEvent) {
      if (e.key === "Escape") setSousMenuOuvert(null);
    }
    document.addEventListener("mousedown", clicExterieur);
    document.addEventListener("keydown", echap);
    return () => {
      document.removeEventListener("mousedown", clicExterieur);
      document.removeEventListener("keydown", echap);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-bordure bg-white">
      <div className="mx-auto flex w-full max-w-[1280px] items-center gap-6 px-5 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.nom}, accueil`}>
          <Logo />
          <span className="font-display text-[24px] font-bold tracking-[0.01em] text-charbon">
            {site.nom}
          </span>
        </Link>

        {/* ------------------------------------------------ menu desktop */}
        <div ref={zoneNav} className="mx-auto hidden lg:block">
          <nav aria-label="Navigation principale">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => {
                const actif =
                  item.href === "/" ? chemin === "/" : chemin.startsWith(item.href);

                if (!item.sousMenu) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={actif ? "page" : undefined}
                        className={`inline-block py-2 text-[16px] ${
                          actif ? "font-semibold text-charbon" : "text-encre hover:text-vert"
                        }`}
                      >
                        {item.libelle}
                      </Link>
                    </li>
                  );
                }

                const ouvert = sousMenuOuvert === item.libelle;
                const sous = item.sousMenu;
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setSousMenuOuvert(item.libelle)}
                    onMouseLeave={() => setSousMenuOuvert(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={ouvert}
                      aria-haspopup="true"
                      onClick={() => setSousMenuOuvert(ouvert ? null : item.libelle)}
                      className={`inline-flex items-center gap-1.5 py-2 text-[16px] ${
                        actif ? "font-semibold text-charbon" : "text-encre hover:text-vert"
                      }`}
                    >
                      {item.libelle}
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 transition-transform ${ouvert ? "rotate-180" : ""}`}
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="m6 9 6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <ul
                      className={`absolute left-1/2 top-full w-[280px] -translate-x-1/2 border border-bordure bg-white py-2 shadow-[0_12px_28px_rgba(35,38,41,0.12)] ${
                        ouvert ? "" : "hidden"
                      }`}
                    >
                        {sous.map((lien, i) => {
                          const dernier = i === sous.length - 1;
                          return (
                            <li
                              key={lien.href}
                              className={dernier ? "mt-2 border-t border-bordure pt-2" : ""}
                            >
                              <Link
                                href={lien.href}
                                onClick={() => setSousMenuOuvert(null)}
                                className={`block px-6 py-3 text-[15px] hover:bg-fond ${
                                  dernier ? "font-semibold text-vert" : "text-encre"
                                }`}
                              >
                                {lien.libelle}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="ml-auto hidden lg:ml-0 lg:block">
          <Bouton href="/contact">Prendre RDV</Bouton>
        </div>

        {/* ---------------------------------------- bouton menu mobile */}
        <button
          type="button"
          onClick={() => setMenuMobile((v) => !v)}
          aria-expanded={menuMobile}
          aria-controls="menu-mobile"
          className="ml-auto flex h-12 w-12 items-center justify-center rounded-[10px] border border-bordure lg:hidden"
        >
          <span className="sr-only">{menuMobile ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            {menuMobile ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="#232629" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="#232629" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* --------------------------------------------------- menu mobile */}
      {menuMobile && (
        <nav
          id="menu-mobile"
          aria-label="Navigation principale"
          className="border-t border-bordure bg-white lg:hidden"
        >
          <ul className="mx-auto max-w-[1280px] px-5 py-2">
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-bordure last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setMenuMobile(false)}
                  className="block py-4 text-[17px] font-semibold text-charbon"
                >
                  {item.libelle}
                </Link>
                {item.sousMenu && (
                  <ul className="pb-3 pl-4">
                    {item.sousMenu.slice(0, -1).map((lien) => (
                      <li key={lien.href}>
                        <Link
                          href={lien.href}
                          onClick={() => setMenuMobile(false)}
                          className="block py-2.5 text-[16px] text-encre-2"
                        >
                          {lien.libelle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="space-y-3 px-5 pb-5">
            <a
              href={`tel:${site.telephone}`}
              data-conversion="clic-telephone"
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-charbon px-6 font-semibold text-charbon"
            >
              <IconeTelephone />
              {site.telephoneAffiche}
            </a>
            <Bouton href="/contact" pleineLargeur>
              Prendre RDV
            </Bouton>
          </div>
        </nav>
      )}
    </header>
  );
}

/** Maison stylisée portant une croix de soin. */
function Logo() {
  return (
    <svg viewBox="0 0 40 40" className="h-11 w-11" aria-hidden="true" fill="none">
      <path
        d="M6 18.5 20 7l14 11.5V32a2.5 2.5 0 0 1-2.5 2.5h-23A2.5 2.5 0 0 1 6 32V18.5Z"
        stroke="#388A6C"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M20 17.5v9M15.5 22h9" stroke="#388A6C" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
