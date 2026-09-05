import Link from "next/link";
import { site } from "@/data/site";
import { IconeTelephone } from "./ui";

/**
 * Barre d'action fixe en bas d'écran, mobile uniquement.
 * CDC §3.2 : le numéro doit être atteignable en un seul geste depuis n'importe quelle page.
 */
export function BarreAppel() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bordure bg-white p-3 lg:hidden">
      <div className="flex gap-3">
        <a
          href={`tel:${site.telephone}`}
          data-conversion="clic-telephone"
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-charbon font-semibold text-white"
        >
          <IconeTelephone />
          Appeler
        </a>
        <Link
          href="/contact"
          className="flex min-h-[52px] flex-1 items-center justify-center rounded-full bg-vert font-semibold text-white"
        >
          Être rappelé
        </Link>
      </div>
    </div>
  );
}
