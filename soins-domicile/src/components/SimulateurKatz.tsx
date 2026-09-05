"use client";

import { useState } from "react";
import Link from "next/link";
import { Bouton, Encadre } from "./ui";

/**
 * BF-19 — simulateur d'échelle de Katz.
 * L'échelle officielle cote six critères de 1 (autonome) à 4 (totalement dépendant).
 * Le résultat affiché ici est INDICATIF : l'évaluation officielle est réalisée
 * par un infirmier au domicile du patient. L'avertissement est obligatoire (CDC §7.2).
 */

type Critere = {
  cle: string;
  question: string;
  options: { cotation: 1 | 2 | 3 | 4; libelle: string; detail: string }[];
};

const criteres: Critere[] = [
  {
    cle: "laver",
    question: "Votre proche peut-il se laver seul ?",
    options: [
      { cotation: 1, libelle: "Sans aide", detail: "Se lave entièrement seul" },
      { cotation: 2, libelle: "Aide partielle", detail: "A besoin d'aide au-dessus ou en dessous de la ceinture" },
      { cotation: 3, libelle: "Aide d'une personne", detail: "A besoin d'aide au-dessus et en dessous de la ceinture" },
      { cotation: 4, libelle: "Dépendance totale", detail: "Doit être entièrement lavé par un tiers" },
    ],
  },
  {
    cle: "habiller",
    question: "Votre proche peut-il s'habiller seul ?",
    options: [
      { cotation: 1, libelle: "Sans aide", detail: "S'habille et se déshabille seul" },
      { cotation: 2, libelle: "Aide partielle", detail: "Aide pour le haut ou le bas du corps" },
      { cotation: 3, libelle: "Aide d'une personne", detail: "Aide pour le haut et le bas du corps" },
      { cotation: 4, libelle: "Dépendance totale", detail: "Doit être entièrement habillé" },
    ],
  },
  {
    cle: "deplacer",
    question: "Votre proche peut-il se déplacer seul ?",
    options: [
      { cotation: 1, libelle: "Sans aide", detail: "Se déplace sans aide ni appareil" },
      { cotation: 2, libelle: "Aide technique", detail: "Utilise une canne ou un déambulateur" },
      { cotation: 3, libelle: "Aide d'une personne", detail: "A besoin de l'aide d'un tiers pour se déplacer" },
      { cotation: 4, libelle: "Alité ou en chaise", detail: "Ne se déplace plus seul" },
    ],
  },
  {
    cle: "toilettes",
    question: "Votre proche peut-il aller aux toilettes seul ?",
    options: [
      { cotation: 1, libelle: "Sans aide", detail: "Y va et s'installe seul" },
      { cotation: 2, libelle: "Aide technique", detail: "Utilise un appui ou une barre" },
      { cotation: 3, libelle: "Aide d'une personne", detail: "A besoin d'aide pour s'y rendre ou s'installer" },
      { cotation: 4, libelle: "Dépendance totale", detail: "Ne peut pas s'y rendre" },
    ],
  },
  {
    cle: "continence",
    question: "Votre proche est-il continent ?",
    options: [
      { cotation: 1, libelle: "Continent", detail: "Aucun accident" },
      { cotation: 2, libelle: "Accidents occasionnels", detail: "Incontinence rare" },
      { cotation: 3, libelle: "Incontinence urinaire", detail: "Protections nécessaires" },
      { cotation: 4, libelle: "Incontinence complète", detail: "Urinaire et fécale" },
    ],
  },
  {
    cle: "manger",
    question: "Votre proche peut-il manger seul ?",
    options: [
      { cotation: 1, libelle: "Sans aide", detail: "Mange seul" },
      { cotation: 2, libelle: "Aide pour couper", detail: "A besoin d'aide pour préparer l'assiette" },
      { cotation: 3, libelle: "Aide partielle", detail: "A besoin d'aide pendant le repas" },
      { cotation: 4, libelle: "Doit être nourri", detail: "Dépendance totale ou sonde" },
    ],
  },
];

type Reponses = Record<string, 1 | 2 | 3 | 4>;

function estimerForfait(r: Reponses) {
  const dep = (cle: string) => (r[cle] ?? 1) >= 3;
  const total = criteres.reduce((s, c) => s + (r[c.cle] ?? 1), 0);

  if (dep("laver") && dep("habiller") && dep("deplacer") && dep("toilettes")) {
    if ((r.deplacer ?? 1) === 4 && (r.toilettes ?? 1) === 4) {
      return {
        forfait: "C",
        resume: "Dépendance lourde",
        detail:
          "Un forfait C correspond à une prise en charge intensive, avec plusieurs passages infirmiers par jour.",
      };
    }
    return {
      forfait: "B",
      resume: "Dépendance importante",
      detail:
        "Un forfait B permet en général jusqu'à deux passages infirmiers par jour, pris en charge par l'INAMI.",
    };
  }
  if (dep("laver") && dep("habiller")) {
    return {
      forfait: "A",
      resume: "Dépendance modérée",
      detail:
        "Un forfait A couvre l'aide quotidienne à la toilette et à l'habillage, sur prescription médicale.",
    };
  }
  return {
    forfait: "Hors forfait",
    resume: `Score total : ${total} sur 24`,
    detail:
      "Les critères de forfait ne semblent pas réunis, mais des soins infirmiers ponctuels restent possibles et remboursés : pansements, injections, prises de sang.",
  };
}

export function SimulateurKatz() {
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<Reponses>({});
  const termine = etape >= criteres.length;
  const critere = criteres[Math.min(etape, criteres.length - 1)];
  const resultat = estimerForfait(reponses);

  function repondre(cotation: 1 | 2 | 3 | 4) {
    setReponses((r) => ({ ...r, [critere.cle]: cotation }));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div>
        {!termine ? (
          <>
            <p className="text-[15px] font-semibold text-vert">
              Question {etape + 1} sur {criteres.length}
            </p>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-bordure"
              role="progressbar"
              aria-valuenow={etape + 1}
              aria-valuemin={1}
              aria-valuemax={criteres.length}
              aria-label="Progression du questionnaire"
            >
              <div
                className="h-full bg-vert transition-[width]"
                style={{ width: `${((etape + 1) / criteres.length) * 100}%` }}
              />
            </div>

            <fieldset className="mt-8">
              <legend className="font-display text-[26px] font-bold text-charbon">
                {critere.question}
              </legend>
              <div className="mt-5 space-y-3">
                {critere.options.map((o) => {
                  const choisi = reponses[critere.cle] === o.cotation;
                  return (
                    <label
                      key={o.cotation}
                      className={`flex cursor-pointer items-start gap-4 rounded-[12px] border-2 p-4 ${
                        choisi ? "border-vert bg-vert-pale" : "border-bordure bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name={critere.cle}
                        checked={choisi}
                        onChange={() => repondre(o.cotation)}
                        className="mt-1 h-5 w-5 accent-[#388A6C]"
                      />
                      <span>
                        <span className="block font-semibold text-charbon">
                          Cotation {o.cotation} — {o.libelle}
                        </span>
                        <span className="block text-[15px] text-encre-2">{o.detail}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6 flex flex-wrap gap-3">
              {etape > 0 && (
                <Bouton variante="contour" onClick={() => setEtape((e) => e - 1)}>
                  Question précédente
                </Bouton>
              )}
              <Bouton
                variante="vert"
                disabled={!reponses[critere.cle]}
                onClick={() => setEtape((e) => e + 1)}
              >
                {etape === criteres.length - 1 ? "Voir l'estimation" : "Question suivante"}
              </Bouton>
            </div>
          </>
        ) : (
          <div>
            <h2 className="font-display text-[30px] font-bold text-charbon">Votre estimation</h2>
            <p className="mesure mt-3 text-[17px] text-encre-2">
              {resultat.detail} Pour confirmer ces droits, une infirmière réalise une évaluation
              gratuite au domicile, sans engagement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Bouton href="/contact">Demander une évaluation</Bouton>
              <Bouton
                variante="contour"
                onClick={() => {
                  setReponses({});
                  setEtape(0);
                }}
              >
                Recommencer
              </Bouton>
            </div>
          </div>
        )}
      </div>

      <aside className="space-y-6">
        <div className="rounded-[16px] bg-charbon p-6 text-white">
          <p className="text-[14px] font-semibold text-[#9FD8C1]">
            {termine ? "Estimation" : "Estimation en cours"}
          </p>
          <p className="mt-3 font-display text-[38px] font-bold leading-none">
            {resultat.forfait === "Hors forfait" ? "Soins ponctuels" : `Forfait ${resultat.forfait}`}
          </p>
          <p className="mt-2 text-[16px] text-[#BFC3C6]">{resultat.resume}</p>
        </div>

        <Encadre titre="Résultat indicatif" ton="alerte">
          Ce simulateur ne remplace pas l&apos;évaluation officielle réalisée par un infirmier au
          domicile du patient, seule valable auprès de l&apos;INAMI et de votre mutualité.
        </Encadre>

        <div>
          <p className="font-display text-[19px] font-bold text-charbon">Les six critères</p>
          <ol className="mt-3 space-y-2">
            {criteres.map((c, i) => (
              <li
                key={c.cle}
                className={`text-[15px] ${
                  reponses[c.cle] ? "font-semibold text-charbon" : "text-encre-3"
                }`}
              >
                {c.question.replace("Votre proche ", "").replace(" ?", "")}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[15px] text-encre-2">
            <Link href="/tarifs" className="underline">
              Comprendre ce que couvre chaque forfait
            </Link>
          </p>
        </div>
      </aside>
    </div>
  );
}
