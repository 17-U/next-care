/**
 * Photographies du site — fichiers locaux dans public/images/.
 *
 * Centralisé ici pour ne changer qu'un seul fichier si une photo doit être
 * remplacée : modifier le chemin ci-dessous suffit, aucun autre fichier du
 * projet n'a besoin d'être touché.
 *
 * Pour remplacer une photo : déposer le nouveau fichier dans public/images/
 * et mettre à jour le chemin correspondant ci-dessous.
 */

export const images = {
  heroAccueil: "/images/hero-accueil.webp",
  soinsPalliatifs: "/images/soins-palliatifs.webp",
  toiletteHygiene: "/images/toilette-hygiene.webp",
  pansementsPlaies: "/images/pansements-plaies.webp",
  injectionsPerfusions: "/images/injections-perfusions.webp",
  prisesDeSang: "/images/prises-de-sang.webp",
  maladiesChroniques: "/images/maladies-chroniques.webp",
  soinsPediatriques: "/images/soins-pediatriques.webp",
  revalidation: "/images/revalidation.webp",
} as const;
