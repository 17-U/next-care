import type { ReactNode } from "react";

/**
 * En-tête de section : sur-titre vert, grand titre serif, chapô.
 * Reprend la hiérarchie visuelle du site en production.
 */
export function EnteteSection({
  surTitre,
  titre,
  children,
  centre = false,
  clair = false,
}: {
  surTitre?: string;
  titre: string;
  children?: ReactNode;
  centre?: boolean;
  clair?: boolean;
}) {
  return (
    <div className={centre ? "mx-auto max-w-[820px] text-center" : ""}>
      {surTitre && (
        <p
          className={`text-[14px] font-semibold uppercase tracking-[0.12em] ${
            clair ? "text-[#9FD8C1]" : "text-vert"
          }`}
        >
          {surTitre}
        </p>
      )}
      <h2
        className={`mt-3 font-display text-[32px] leading-[1.2] tracking-[0.02em] md:text-[40px] ${
          clair ? "text-white" : ""
        }`}
      >
        {titre}
      </h2>
      {children && (
        <div
          className={`mt-5 text-[17px] ${centre ? "" : "mesure"} ${
            clair ? "text-[#D7DADC]" : "text-encre-2"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
