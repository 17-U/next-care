"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { communes } from "@/data/communes";
import { site } from "@/data/site";
import {
  DELAIS,
  FREQUENCES,
  POUR_QUI,
  SITUATIONS,
  estUrgente,
  validerDemande,
  type Demande,
} from "@/lib/demande";
import { Bouton, Encadre, IconeCoche, IconeTelephone } from "./ui";

/**
 * BF-10 — formulaire en trois étapes.
 * Aucune donnée n'est transmise avant la validation finale (§7.2 du CDC).
 * Onze champs au total : chaque champ supplémentaire fait chuter le taux de complétion
 * et contrevient au principe de minimisation du RGPD.
 */

const ETAPES = ["Situation", "Fréquence et lieu", "Vos coordonnées"] as const;

export function FormulaireDemande() {
  const [etape, setEtape] = useState(0);
  const [donnees, setDonnees] = useState<Partial<Demande>>({});
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const [envoi, setEnvoi] = useState(false);
  const [confirme, setConfirme] = useState<{ message: string } | null>(null);
  const [erreurServeur, setErreurServeur] = useState<string | null>(null);
  const ouvertureRef = useRef(Date.now());

  const urgente = useMemo(() => estUrgente(donnees), [donnees]);

  function maj<K extends keyof Demande>(cle: K, valeur: Demande[K]) {
    setDonnees((d) => ({ ...d, [cle]: valeur }));
    setErreurs((e) => {
      const suite = { ...e };
      delete suite[cle as string];
      return suite;
    });
  }

  function champsDeLEtape(n: number): (keyof Demande)[] {
    if (n === 0) return ["pourQui", "situation"];
    if (n === 1) return ["frequence", "commune", "codePostal", "delai"];
    return ["nom", "telephone", "email", "consentement"];
  }

  function suivant() {
    const toutes = validerDemande(donnees);
    const aVerifier = champsDeLEtape(etape);
    const locales = Object.fromEntries(
      Object.entries(toutes).filter(([cle]) => aVerifier.includes(cle as keyof Demande)),
    );
    if (Object.keys(locales).length > 0) {
      setErreurs(locales);
      return;
    }
    setErreurs({});
    setEtape((e) => e + 1);
  }

  async function envoyer() {
    const toutes = validerDemande(donnees);
    if (Object.keys(toutes).length > 0) {
      setErreurs(toutes);
      return;
    }
    setEnvoi(true);
    setErreurServeur(null);
    try {
      const reponse = await fetch("/api/demande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...donnees, horodatage: ouvertureRef.current }),
      });
      const resultat = await reponse.json();
      if (!reponse.ok) {
        if (resultat.erreurs) {
          setErreurs(resultat.erreurs);
          setEtape(0);
        } else {
          setErreurServeur(resultat.erreur ?? "L'envoi a échoué.");
        }
        return;
      }
      setConfirme({ message: resultat.message });
    } catch {
      setErreurServeur(
        `L'envoi a échoué. Vous pouvez nous appeler directement au ${site.telephoneAffiche}.`,
      );
    } finally {
      setEnvoi(false);
    }
  }

  if (confirme) {
    return (
      <div className="rounded-[16px] border border-bordure bg-white p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-vert-pale text-vert">
          <IconeCoche className="h-8 w-8" />
        </span>
        <h2 className="mt-5 font-display text-[28px] font-bold text-charbon">Demande envoyée</h2>
        <p className="mesure mx-auto mt-3 text-[17px] text-encre-2">{confirme.message}</p>

        <dl className="mesure mx-auto mt-7 space-y-2 rounded-[12px] bg-fond p-5 text-left text-[15px]">
          {[
            ["Situation", donnees.situation],
            ["Fréquence", donnees.frequence],
            ["Commune", donnees.commune],
            ["Début souhaité", donnees.delai],
          ].map(([cle, valeur]) => (
            <div key={cle} className="flex justify-between gap-4">
              <dt className="text-encre-3">{cle}</dt>
              <dd className="text-right font-semibold text-charbon">{valeur}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7">
          <Encadre titre="En attendant notre appel">
            Préparez l&apos;ordonnance du médecin traitant et la vignette de mutualité : cela nous
            permettra de vérifier vos droits dès le premier échange.
          </Encadre>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ol className="mb-8 flex flex-wrap gap-x-8 gap-y-2">
        {ETAPES.map((nom, i) => (
          <li key={nom} className="flex items-center gap-2">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold ${
                i < etape
                  ? "bg-vert text-white"
                  : i === etape
                    ? "bg-vert text-white"
                    : "border border-bordure bg-white text-encre-3"
              }`}
              aria-hidden="true"
            >
              {i < etape ? <IconeCoche className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={`text-[15px] ${
                i === etape ? "font-semibold text-charbon" : "text-encre-2"
              }`}
            >
              {nom}
            </span>
          </li>
        ))}
      </ol>

      <div className="rounded-[16px] border border-bordure bg-white p-6 md:p-8">
        {/* ------------------------------------------------------- étape 1 */}
        {etape === 0 && (
          <>
            <GroupeRadio
              legende="La demande concerne"
              nom="pourQui"
              options={POUR_QUI}
              valeur={donnees.pourQui}
              erreur={erreurs.pourQui}
              onChange={(v) => maj("pourQui", v)}
            />
            <div className="mt-8">
              <GroupeRadio
                legende="Quelle est la situation ?"
                nom="situation"
                options={SITUATIONS}
                valeur={donnees.situation}
                erreur={erreurs.situation}
                onChange={(v) => maj("situation", v)}
              />
            </div>
          </>
        )}

        {/* ------------------------------------------------------- étape 2 */}
        {etape === 1 && (
          <>
            <GroupeRadio
              legende="À quelle fréquence les soins sont-ils nécessaires ?"
              nom="frequence"
              options={FREQUENCES}
              valeur={donnees.frequence}
              erreur={erreurs.frequence}
              onChange={(v) => maj("frequence", v)}
            />

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Champ label="Commune" obligatoire erreur={erreurs.commune}>
                <select
                  id="commune"
                  value={donnees.commune ?? ""}
                  onChange={(e) => maj("commune", e.target.value)}
                  className="min-h-[52px] w-full rounded-[10px] border-2 border-bordure bg-white px-4 text-[17px]"
                >
                  <option value="">Sélectionnez…</option>
                  {communes.map((c) => (
                    <option key={c.slug} value={c.nom}>
                      {c.nom} ({c.codePostal})
                    </option>
                  ))}
                  <option value="Autre">Autre commune</option>
                </select>
              </Champ>

              {/* BF-11 : champ conditionnel */}
              {donnees.commune === "Autre" && (
                <Champ label="Code postal" obligatoire erreur={erreurs.codePostal}>
                  <input
                    id="codePostal"
                    inputMode="numeric"
                    maxLength={4}
                    autoComplete="postal-code"
                    value={donnees.codePostal ?? ""}
                    onChange={(e) => maj("codePostal", e.target.value)}
                    className="min-h-[52px] w-full rounded-[10px] border-2 border-bordure bg-white px-4 text-[17px]"
                  />
                </Champ>
              )}

              <Champ label="Quand les soins doivent-ils commencer ?" obligatoire erreur={erreurs.delai}>
                <select
                  id="delai"
                  value={donnees.delai ?? ""}
                  onChange={(e) => maj("delai", e.target.value)}
                  className="min-h-[52px] w-full rounded-[10px] border-2 border-bordure bg-white px-4 text-[17px]"
                >
                  <option value="">Sélectionnez…</option>
                  {DELAIS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Champ>
            </div>

            {/* BF-11 : encart conditionnel d'urgence */}
            {urgente && (
              <div className="mt-6">
                <Encadre titre="Situation prioritaire" ton="alerte">
                  Nous traitons cette demande en priorité. Pour une prise en charge immédiate, vous
                  pouvez aussi nous appeler au{" "}
                  <a href={`tel:${site.telephone}`} className="font-semibold text-vert underline">
                    {site.telephoneAffiche}
                  </a>
                  .
                </Encadre>
              </div>
            )}
          </>
        )}

        {/* ------------------------------------------------------- étape 3 */}
        {etape === 2 && (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <Champ label="Votre nom" obligatoire erreur={erreurs.nom}>
                <input
                  id="nom"
                  autoComplete="name"
                  value={donnees.nom ?? ""}
                  onChange={(e) => maj("nom", e.target.value)}
                  className="min-h-[52px] w-full rounded-[10px] border-2 border-bordure bg-white px-4 text-[17px]"
                />
              </Champ>
              <Champ label="Téléphone" obligatoire erreur={erreurs.telephone}>
                <input
                  id="telephone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="0470 00 00 00"
                  value={donnees.telephone ?? ""}
                  onChange={(e) => maj("telephone", e.target.value)}
                  className="min-h-[52px] w-full rounded-[10px] border-2 border-bordure bg-white px-4 text-[17px]"
                />
              </Champ>
              <Champ
                label="Email"
                erreur={erreurs.email}
                aide="Facultatif — sert uniquement à vous envoyer un accusé de réception."
              >
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={donnees.email ?? ""}
                  onChange={(e) => maj("email", e.target.value)}
                  className="min-h-[52px] w-full rounded-[10px] border-2 border-bordure bg-white px-4 text-[17px]"
                />
              </Champ>
            </div>

            <div className="mt-5">
              <Champ
                label="Précisions"
                aide="Facultatif. Merci de ne pas détailler ici d'informations médicales sensibles : nous en parlerons par téléphone."
              >
                <textarea
                  id="precisions"
                  rows={4}
                  value={donnees.precisions ?? ""}
                  onChange={(e) => maj("precisions", e.target.value)}
                  className="w-full rounded-[10px] border-2 border-bordure bg-white px-4 py-3 text-[17px]"
                />
              </Champ>
            </div>

            {/* Champ piège : invisible pour l'humain, rempli par les robots (BF-14) */}
            <div aria-hidden="true" className="absolute left-[-9999px]">
              <label htmlFor="siteWeb">Ne pas remplir</label>
              <input
                id="siteWeb"
                tabIndex={-1}
                autoComplete="off"
                value={donnees.siteWeb ?? ""}
                onChange={(e) => maj("siteWeb", e.target.value)}
              />
            </div>

            {/* CDC §9.2 : consentement explicite au traitement de données de santé */}
            <div
              className={`mt-6 rounded-[12px] border-2 p-5 ${
                erreurs.consentement ? "border-urgence bg-white" : "border-vert bg-white"
              }`}
            >
              <label className="flex gap-4">
                <input
                  type="checkbox"
                  checked={donnees.consentement ?? false}
                  onChange={(e) => maj("consentement", e.target.checked)}
                  className="mt-1 h-6 w-6 shrink-0 accent-[#388A6C]"
                />
                <span className="text-[15px] text-encre-2">
                  J&apos;accepte que {site.nom} traite les informations de ce formulaire,{" "}
                  <strong className="text-charbon">y compris celles relatives à la santé</strong>, dans
                  le seul but de me recontacter et d&apos;organiser la prise en charge. Je peux
                  retirer cet accord à tout moment.{" "}
                  <Link href="/confidentialite" className="underline">
                    Politique de confidentialité
                  </Link>
                  .
                </span>
              </label>
              {erreurs.consentement && (
                <p className="mt-3 text-[15px] font-semibold text-urgence">{erreurs.consentement}</p>
              )}
            </div>
          </>
        )}

        {erreurServeur && (
          <p role="alert" className="mt-6 rounded-[12px] bg-alerte-pale p-4 text-[16px] text-urgence">
            {erreurServeur}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {etape > 0 && (
            <Bouton variante="contour" onClick={() => setEtape((e) => e - 1)}>
              Étape précédente
            </Bouton>
          )}
          {etape < 2 ? (
            <Bouton onClick={suivant}>Continuer</Bouton>
          ) : (
            <Bouton onClick={envoyer} disabled={envoi}>
              {envoi ? "Envoi en cours…" : "Envoyer ma demande"}
            </Bouton>
          )}
          <p className="text-[14px] text-encre-3">
            Étape {etape + 1} sur 3 — rien n&apos;est envoyé avant validation.
          </p>
        </div>
      </div>

      <p className="mt-6 flex items-center gap-2 text-[16px] text-encre-2">
        <IconeTelephone className="h-5 w-5 text-charbon" />
        Situation urgente ? Appelez le{" "}
        <a href={`tel:${site.telephone}`} className="font-semibold text-charbon underline">
          {site.telephoneAffiche}
        </a>
        , {site.horaires}.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------- primitives */

function Champ({
  label,
  children,
  obligatoire,
  erreur,
  aide,
}: {
  label: string;
  children: React.ReactNode;
  obligatoire?: boolean;
  erreur?: string;
  aide?: string;
}) {
  return (
    <div>
      <label className="block text-[15px] font-semibold text-charbon">
        {label}
        {obligatoire && <span className="text-vert"> *</span>}
      </label>
      {aide && <p className="mb-2 mt-1 text-[14px] text-encre-2">{aide}</p>}
      <div className="mt-2">{children}</div>
      {erreur && (
        <p role="alert" className="mt-2 text-[15px] font-semibold text-urgence">
          {erreur}
        </p>
      )}
    </div>
  );
}

function GroupeRadio({
  legende,
  nom,
  options,
  valeur,
  erreur,
  onChange,
}: {
  legende: string;
  nom: string;
  options: readonly string[];
  valeur?: string;
  erreur?: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[19px] font-semibold text-charbon">{legende}</legend>
      <div className="mt-4 space-y-3">
        {options.map((o) => {
          const choisi = valeur === o;
          return (
            <label
              key={o}
              className={`flex min-h-[56px] cursor-pointer items-center gap-4 rounded-[12px] border-2 px-4 ${
                choisi ? "border-vert bg-vert-pale" : "border-bordure bg-white"
              }`}
            >
              <input
                type="radio"
                name={nom}
                checked={choisi}
                onChange={() => onChange(o)}
                className="h-5 w-5 accent-[#388A6C]"
              />
              <span className={`text-[17px] ${choisi ? "font-semibold text-charbon" : ""}`}>{o}</span>
            </label>
          );
        })}
      </div>
      {erreur && (
        <p role="alert" className="mt-3 text-[15px] font-semibold text-urgence">
          {erreur}
        </p>
      )}
    </fieldset>
  );
}
