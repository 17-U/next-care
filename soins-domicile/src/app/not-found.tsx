import { Bouton, Section } from "@/components/ui";

export default function NonTrouvee() {
  return (
    <Section>
      <div className="mesure py-10">
        <h1 className="font-display text-[32px]">Cette page n&apos;existe pas</h1>
        <p className="mt-4 text-[17px] text-encre-2">
          Le lien est peut-être ancien ou mal recopié. Vous trouverez l&apos;essentiel depuis
          l&apos;accueil, ou en nous appelant directement.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Bouton href="/">Retour à l&apos;accueil</Bouton>
          <Bouton href="/contact" variante="contour">
            Demander une prise en charge
          </Bouton>
        </div>
      </div>
    </Section>
  );
}
