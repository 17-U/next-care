import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";

/**
 * Vignette de service : photo ronde, nom centré, courte description centrée.
 * Aucune bordure, aucun fond de carte — reprend fidèlement la présentation
 * du brouillon de référence du client (photos circulaires, texte sobre).
 */
export function CarteService({ service, priorite = false }: { service: Service; priorite?: boolean }) {
  return (
    <Link href={`/services/${service.slug}`} className="group flex flex-col items-center text-center">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-brume">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          priority={priorite}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          quality={90}
        />
      </div>
      <h3 className="mt-5 font-display text-[19px] leading-snug">{service.nom}</h3>
      <p className="mt-2 max-w-[240px] text-[14.5px] text-encre-2">{service.resume}</p>
      <span className="mt-3 text-[14px] font-semibold text-vert opacity-0 transition-opacity group-hover:opacity-100">
        Voir le détail →
      </span>
    </Link>
  );
}
