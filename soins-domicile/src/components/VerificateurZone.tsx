"use client";

import Link from "next/link";
import { useState } from "react";
import { communes } from "@/data/communes";
import { Bouton } from "./ui";

type Resultat =
  | { etat: "vide" }
  | { etat: "couverte"; nom: string; slug: string; delai: string }
  | { etat: "inconnue" }
  | { etat: "invalide" };

/** BF-18 — évite les appels hors zone et les déplacements inutiles. */
export function VerificateurZone() {
  const [saisie, setSaisie] = useState("");
  const [resultat, setResultat] = useState<Resultat>({ etat: "vide" });

  function verifier() {
    const cp = saisie.trim();
    if (!/^\d{4}$/.test(cp)) {
      setResultat({ etat: "invalide" });
      return;
    }
    const commune = communes.find((c) => c.codePostal === cp);
    setResultat(
      commune
        ? { etat: "couverte", nom: commune.nom, slug: commune.slug, delai: commune.delai }
        : { etat: "inconnue" },
    );
  }

  return (
    <div className="rounded-[16px] bg-charbon p-6 text-white">
      <label htmlFor="code-postal" className="block font-semibold">
        Votre code postal
      </label>
      <div className="mt-3 flex flex-wrap gap-3">
        <input
          id="code-postal"
          name="codePostal"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={4}
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && verifier()}
          placeholder="1030"
          className="min-h-[48px] w-32 rounded-[10px] border-2 border-transparent bg-white px-4 text-[17px] text-encre"
        />
        <Bouton onClick={verifier}>Vérifier</Bouton>
      </div>

      <div aria-live="polite" className="mt-4 min-h-[3rem] text-[16px]">
        {resultat.etat === "invalide" && (
          <p className="text-[#ffd9cf]">
            Entrez un code postal belge à quatre chiffres, par exemple 1030.
          </p>
        )}
        {resultat.etat === "couverte" && (
          <p className="text-[#D7DADC]">
            <span className="font-semibold text-white">{resultat.nom} — zone couverte.</span>{" "}
            Délai d&apos;intervention : {resultat.delai}.{" "}
            <Link href={`/${resultat.slug}`} className="underline">
              Voir les soins proposés dans la commune
            </Link>
          </p>
        )}
        {resultat.etat === "inconnue" && (
          <p className="text-[#D7DADC]">
            Cette commune ne figure pas dans notre zone habituelle. Appelez-nous : nous vous
            orientons vers un confrère conventionné proche de chez vous.
          </p>
        )}
      </div>
    </div>
  );
}
