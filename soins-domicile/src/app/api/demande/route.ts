import { NextResponse } from "next/server";
import { estUrgente, validerDemande, type Demande } from "@/lib/demande";

/**
 * Réception d'une demande de prise en charge.
 *
 * CDC §9.2 — les informations reçues ici contiennent des données de santé
 * (catégorie particulière, art. 9 RGPD) :
 *   - aucune donnée personnelle n'est écrite dans les journaux applicatifs ;
 *   - le stockage doit être chiffré, dans l'Union européenne ;
 *   - la notification SMS ne doit contenir ni situation médicale ni précisions ;
 *   - la purge automatique après 6 mois est à programmer côté base (BF-33).
 */

/** Limitation de débit en mémoire. En production, utiliser Redis ou Valkey. */
const requetes = new Map<string, number[]>();
const FENETRE_MS = 60 * 60 * 1000;
const MAX_PAR_HEURE = 5;

function limiteAtteinte(ip: string) {
  const maintenant = Date.now();
  const recentes = (requetes.get(ip) ?? []).filter((t) => maintenant - t < FENETRE_MS);
  recentes.push(maintenant);
  requetes.set(ip, recentes);
  return recentes.length > MAX_PAR_HEURE;
}

export async function POST(requete: Request) {
  const ip = requete.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";

  if (limiteAtteinte(ip)) {
    return NextResponse.json(
      { erreur: "Trop de demandes envoyées depuis cette connexion. Appelez-nous directement." },
      { status: 429 },
    );
  }

  let corps: Partial<Demande>;
  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json({ erreur: "Requête illisible." }, { status: 400 });
  }

  // BF-14 : anti-spam sans CAPTCHA. Champ piège + délai minimal de remplissage.
  if (corps.siteWeb) return NextResponse.json({ ok: true });
  if (corps.horodatage && Date.now() - corps.horodatage < 3000) {
    return NextResponse.json({ ok: true });
  }

  const erreurs = validerDemande(corps);
  if (Object.keys(erreurs).length > 0) {
    return NextResponse.json({ erreurs }, { status: 422 });
  }

  const urgente = estUrgente(corps);

  // ---------------------------------------------------------------------
  // À BRANCHER EN PRODUCTION
  //
  // 1. Enregistrement chiffré (BF-15) :
  //      await db.demandes.create({ ...corps, recueLe: new Date(),
  //        consentementVersion: "1.0", source: requete.headers.get("referer") })
  //
  // 2. Notification email au cabinet (BF-12), objet contenant commune + urgence.
  //
  // 3. Notification SMS au numéro de garde — SANS donnée de santé :
  //      "Nouvelle demande urgente — Schaerbeek — rappeler le 04XX XX XX XX"
  //
  // 4. Accusé de réception au demandeur si un email a été fourni (BF-13).
  // ---------------------------------------------------------------------

  // Journal technique volontairement dépourvu de données personnelles.
  console.info(
    `[demande] recue urgence=${urgente} commune=${corps.commune} le=${new Date().toISOString()}`,
  );

  return NextResponse.json({
    ok: true,
    urgente,
    message: urgente
      ? "Demande enregistrée. Nous vous rappelons en priorité."
      : "Demande enregistrée. Nous vous rappelons sous 2 heures ouvrées.",
  });
}
