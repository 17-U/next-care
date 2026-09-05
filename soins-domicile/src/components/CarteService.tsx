import Image from "next/image";
import Link from "next/link";
import { PastilleService } from "./ui";
import type { Service } from "@/data/services";

/** Carte service : photo, pastille ronde en débord, titre et résumé. */
export function CarteService({ service, priorite = false }: { service: Service; priorite?: boolean }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[6px] border border-bordure bg-white">
      <div className="relative aspect-[16/10]">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          priority={priorite}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <PastilleService icone={service.icone} className="absolute bottom-0 left-6 translate-y-1/2" />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-12">
        <h3 className="font-display text-[23px] leading-snug">{service.nom}</h3>
        <p className="mt-3 flex-1 text-[16px] text-encre-2">{service.resume}</p>
        <Link
          href={`/services/${service.slug}`}
          className="mt-5 inline-block font-semibold text-vert underline decoration-2 underline-offset-4"
        >
          Voir le détail de ce service
        </Link>
      </div>
    </article>
  );
}
