/**
 * Photographies du site — hébergées sur le CDN d'Unsplash (images.unsplash.com),
 * sous licence Unsplash : usage commercial libre, sans attribution obligatoire.
 * https://unsplash.com/license
 *
 * Centralisé ici pour pouvoir remplacer une photo sans chercher dans tout le
 * code — changer une URL ci-dessous suffit.
 *
 * Qualité : résolution 2400 px (2000 px pour les vignettes), compression 85,
 * recadrage centré sur les visages quand la photo est un portrait. C'est le
 * maximum que le format JPEG progressif d'Unsplash permet sans surcharger le
 * temps de chargement — next/image régénère ensuite les tailles nécessaires
 * à l'affichage (WebP/AVIF) automatiquement.
 *
 * LIMITE À CONNAÎTRE : ces URLs ont été choisies à partir des légendes et
 * mots-clés fournis par Unsplash, pas d'une vérification visuelle pixel par
 * pixel de ma part — je n'ai pas la capacité de "regarder" une image que je
 * n'ai pas reçue directement dans la conversation. Vérifiez chaque photo à
 * l'écran ; indiquez-moi laquelle remplacer si elle ne convient pas, je peux
 * en chercher une autre immédiatement.
 */

const QUALITE_HERO = "auto=format&fit=crop&crop=faces&w=2400&q=85";
const QUALITE_STANDARD = "auto=format&fit=crop&crop=faces&w=2000&q=85";

export const images = {
  /**
   * Bandeau d'accueil — infirmière souriante avec une patiente âgée, en
   * intérieur (Age Cymru, association galloise spécialisée dans les
   * personnes âgées, photographie à vérifier à l'écran).
   */
  heroAccueil: `https://images.unsplash.com/photo-1765896387387-0538bc9f997e?${QUALITE_HERO}`,
  soinsPalliatifs: `https://images.unsplash.com/photo-1765896387398-1e1ae8d2eb85?${QUALITE_STANDARD}`,
  toiletteHygiene: `https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?${QUALITE_STANDARD}`,
  pansementsPlaies: `https://images.unsplash.com/photo-1631815590058-860e4f83c1e8?${QUALITE_STANDARD}`,
  injectionsPerfusions: `https://images.unsplash.com/photo-1576765608866-5b51046452be?${QUALITE_STANDARD}`,
  prisesDeSang: `https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?${QUALITE_STANDARD}`,
  maladiesChroniques: `https://images.unsplash.com/photo-1666887360726-f55472d96c34?${QUALITE_STANDARD}`,
  soinsPediatriques: `https://images.unsplash.com/photo-1587557983735-f05198060b52?${QUALITE_STANDARD}`,
  revalidation: `https://images.unsplash.com/photo-1676281050264-178eff38874a?${QUALITE_STANDARD}`,
} as const;
