# Site de soins infirmiers à domicile — code source

Implémentation Next.js du cahier des charges v1.0 et de la charte graphique associée.
Les références entre parenthèses (BF-xx, §x.x) renvoient au cahier des charges.

---

## Démarrer

```bash
npm install
cp .env.example .env.local     # renseigner l'URL, le téléphone, le SMTP
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
```

Node 20 ou plus. Aucune base de données n'est nécessaire pour lancer le site :
les demandes sont validées et journalisées, le branchement base + email est
signalé par un bloc de commentaires dans `src/app/api/demande/route.ts`.

---

## Ce qui est implémenté

| Réf | Fonction | Où |
|---|---|---|
| BF-01 | Page d'accueil modulaire | `src/app/page.tsx` |
| BF-02 | Gabarit de fiche service | `src/app/services/[slug]/page.tsx` |
| BF-03 | Gabarit de page commune (SEO local) | `src/app/[commune]/page.tsx` |
| BF-04 | Navigation desktop + menu mobile | `src/components/Header.tsx` |
| BF-06 | FAQ accordéon accessible | `src/components/Faq.tsx` |
| BF-10 | Formulaire en 3 étapes | `src/components/FormulaireDemande.tsx` |
| BF-11 | Logique conditionnelle (code postal, encart d'urgence) | idem |
| BF-14 | Anti-spam sans CAPTCHA | `src/app/api/demande/route.ts` |
| BF-16 | Appel en un geste + barre fixe mobile | `src/components/BarreAppel.tsx` |
| BF-18 | Vérificateur de code postal | `src/components/VerificateurZone.tsx` |
| BF-19 | Simulateur d'échelle de Katz | `src/components/SimulateurKatz.tsx` |
| BF-20 | Page tarifs pédagogique | `src/app/tarifs/page.tsx` |
| §8.3 | Données structurées, sitemap, robots | `src/lib/schema.tsx`, `src/app/sitemap.ts` |
| §9 | Mentions légales, confidentialité | `src/app/mentions-legales`, `src/app/confidentialite` |

| BF-05 | Blog et articles | `src/app/blog/`, `src/data/articles.ts` |

**Non implémenté (lot ultérieur) :** CMS, page recrutement (BF-07),
multilingue FR/NL (BF-40), back-office (BF-30 à BF-36).

### Navigation

Le menu reprend celui du site en production : Accueil, A propos, Services (avec
sous-menu déroulant des six prestations et un lien « Tous nos services »), Blog,
Contact, plus le bouton « Prendre RDV ». Zones desservies et Tarifs restent
atteignables depuis le pied de page et le maillage interne — ils portent le
référencement local sans encombrer la barre de navigation.

Le sous-menu reste présent dans le HTML même fermé : il est ainsi exploré par les
moteurs et annoncé par les lecteurs d'écran. Il s'ouvre au survol comme au clic,
se referme avec la touche Échap.

---

## Photographies

Neuf photographies sont intégrées dans `public/images/`. Chacune porte un texte
alternatif descriptif, obligatoire pour l'accessibilité :

| Fichier | Emplacement |
|---|---|
| `hero-accueil.webp` | Bandeau de la page d'accueil |
| `soins-palliatifs.webp` | Fiche service et carte d'accueil |
| `toilette-hygiene.webp` | Fiche service, section « au-delà des actes » |
| `pansements-plaies.webp` | Fiche service |
| `injections-perfusions.webp` | Fiche service |
| `prises-de-sang.webp` | Fiche service, fond des pages communes |
| `maladies-chroniques.webp` | Fiche service |
| `soins-pediatriques.webp` | Section « au-delà des actes » |
| `revalidation.webp` | Page à propos |

Elles sont servies via `next/image` : formats et tailles adaptés automatiquement,
chargement différé hors du premier écran, dimensions réservées pour éviter tout
décalage de mise en page.

---

## Photographies

Neuf photographies sont intégrées dans `public/images/`, chacune avec un texte
alternatif descriptif :

| Fichier | Emplacement |
|---|---|
| `hero-accueil.webp` | Bandeau de la page d'accueil |
| `soins-palliatifs.webp` | Fiche service et carte d'accueil |
| `toilette-hygiene.webp` | Fiche service, section « au-delà des actes » |
| `pansements-plaies.webp` | Fiche service |
| `injections-perfusions.webp` | Fiche service |
| `prises-de-sang.webp` | Fiche service, fond des pages communes |
| `maladies-chroniques.webp` | Fiche service |
| `soins-pediatriques.webp` | Section « au-delà des actes » |
| `revalidation.webp` | Page à propos |

Servies via `next/image` : formats et tailles adaptés automatiquement, chargement
différé hors du premier écran, dimensions réservées pour éviter tout décalage de
mise en page.

---

## Architecture du contenu

Tout le contenu éditable vit dans `src/data/` :

- `site.ts` — nom, téléphone, adresse, mentions légales. **Point unique de vérité.**
- `services.ts` — un objet par service. En ajouter un crée automatiquement sa page,
  son maillage interne et sa ligne de sitemap.
- `communes.ts` — un objet par commune, même principe.
- `faq.ts` — FAQ générale de l'accueil.

C'est la couche que remplacera le CMS le moment venu : la forme des objets définit
déjà le schéma des collections à créer.

### Ajouter une commune

```ts
{
  slug: "infirmier-domicile-ixelles",   // segment d'URL complet
  nom: "Ixelles",
  codePostal: "1050",
  intro: "…",                            // 400 mots UNIQUES minimum
  quartiers: [...], reperes: [...], soinsFrequents: [...],
  delai: "24 heures en moyenne",
  voisines: ["infirmier-domicile-etterbeek"],
}
```

> **Critère de recette bloquant.** Les textes livrés dans `communes.ts` sont des
> amorces de rédaction, pas du contenu final. Dupliquer une page en changeant le seul
> nom de la commune la fera ignorer ou pénaliser par Google — et toute la stratégie
> d'acquisition repose sur ces pages.

---

## Charte graphique

Les jetons sont déclarés une seule fois, dans le bloc `@theme` de
`src/app/globals.css`. Aucune couleur ne doit être écrite en dur dans un composant.

| Jeton | Valeur | Usage |
|---|---|---|
| `charbon` | `#232629` | Titres, en-tête, pied de page |
| `euca` | `#2E8B72` | Soin, validation, icônes |
| `terra` | `#C2410C` | **Action uniquement** — un seul bouton par écran |
| `ivoire` | `#FAF7F2` | Fond de page |
| `sable` | `#F1EAE0` | Sections alternées |
| `encre` | `#1F2937` | Texte courant |

Classes correspondantes : `bg-nuit`, `text-euca`, `border-bordure`, etc.

### Polices

Auto-hébergées, aucun appel à un CDN tiers (§10.1 — un appel à Google Fonts
transmet l'adresse IP du visiteur à un tiers). Déposer dans `public/fonts/` :

```
playfair-600.woff2  playfair-700.woff2
poppins-400.woff2   poppins-500.woff2   poppins-600.woff2
```

Titres en **Playfair Display**, corps en **Poppins**, comme sur le site en production.
Sources : fonts.google.com/specimen/Playfair+Display et fonts.google.com/specimen/Poppins. Sans ces fichiers, le
site s'affiche avec les polices système de repli — dégradation propre, mais à
corriger avant la mise en ligne.

---

## Accessibilité (§8.2)

Le public est âgé et souvent malvoyant. Ces contraintes ne sont pas cosmétiques :

- base à **17 px** (`html { font-size: 17px }`), aucun texte sous 14 px ;
- cibles tactiles de 48 px minimum, 52 px sur mobile ;
- focus visible sur tout élément interactif ;
- étiquettes de formulaire permanentes, jamais de simple `placeholder` ;
- erreurs textuelles à proximité du champ, annoncées via `role="alert"` ;
- accordéon FAQ en `<details>` natif : fonctionne sans JavaScript ;
- lien d'évitement en premier élément tabulable ;
- `prefers-reduced-motion` respecté ;
- **aucun CAPTCHA** — le public cible y échoue.

---

## Données de santé (§9.2)

Le formulaire collecte des données de catégorie particulière (art. 9 RGPD).

Déjà en place :

- case de consentement distincte, non pré-cochée, mentionnant explicitement la santé ;
- mention invitant à ne pas détailler d'informations médicales dans le champ libre ;
- journal applicatif dépourvu de toute donnée personnelle ;
- limitation de débit sur l'API.

À brancher avant toute mise en production :

1. stockage chiffré dans l'UE, avec traçabilité du consentement (date, heure, version) ;
2. purge automatique à six mois (BF-33) ;
3. notification SMS de garde **sans donnée de santé** — commune et urgence seulement ;
4. contrats de sous-traitance signés avec l'hébergeur et le service d'emailing ;
5. relecture juridique de `/confidentialite`, dont le texte livré est un texte de travail.

---

## Avant la mise en ligne

- [ ] Renseigner BCE, INAMI et assurance RC dans `src/data/site.ts` (seuls champs encore en XXX)
- [ ] Déposer les fichiers de polices
- [ ] Rédiger 400 mots uniques par commune
- [ ] Faire relire les textes médicaux par une infirmière
- [ ] Brancher base de données, email et SMS
- [ ] Faire relire la politique de confidentialité
- [ ] Vérifier la grille d'accessibilité (annexe C du cahier des charges)
- [ ] Créer et optimiser la fiche Google Business Profile
