/**
 * Photographies du site — hébergées sur le CDN d'Unsplash (images.unsplash.com),
 * sous licence Unsplash : usage commercial libre, sans attribution obligatoire.
 * https://unsplash.com/license
 *
 * Centralisé ici pour pouvoir remplacer une photo sans chercher dans tout le
 * code. Chaque URL pointe vers un cliché distinct — pas de répétition.
 */

const PARAMS = "auto=format&fit=crop&w=1600&q=80";

export const images = {
  heroAccueil: `https://images.unsplash.com/photo-1765896387387-0538bc9f997e?${PARAMS}`,
  soinsPalliatifs: `https://images.unsplash.com/photo-1765896387398-1e1ae8d2eb85?${PARAMS}`,
  toiletteHygiene: `https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?${PARAMS}`,
  pansementsPlaies: `https://images.unsplash.com/photo-1631815590058-860e4f83c1e8?${PARAMS}`,
  injectionsPerfusions: `https://images.unsplash.com/photo-1576765608866-5b51046452be?${PARAMS}`,
  prisesDeSang: `https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?${PARAMS}`,
  maladiesChroniques: `https://images.unsplash.com/photo-1666887360726-f55472d96c34?${PARAMS}`,
  soinsPediatriques: `https://images.unsplash.com/photo-1587557983735-f05198060b52?${PARAMS}`,
  revalidation: `https://images.unsplash.com/photo-1676281050264-178eff38874a?${PARAMS}`,
} as const;
