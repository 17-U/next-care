import Link from "next/link";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------- Boutons */
/* Hauteur 48 px minimum, rayon plein — charte §5.4.
   Le vert NestCare porte toutes les actions. */

type Variante = "principal" | "sombre" | "vert" | "contour";

const variantes: Record<Variante, string> = {
  principal: "bg-vert text-white hover:bg-[#2C6F56]",
  sombre: "bg-charbon text-white hover:bg-charbon-fonce",
  vert: "bg-vert text-white hover:bg-[#2C6F56]",
  contour: "bg-white text-charbon border-2 border-charbon hover:bg-brume",
};

export function Bouton({
  href,
  children,
  variante = "principal",
  pleineLargeur = false,
  type = "button",
  ...rest
}: {
  href?: string;
  children: ReactNode;
  variante?: Variante;
  pleineLargeur?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full px-7 font-semibold",
    "min-h-[48px] text-[16px] transition-colors",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    variantes[variante],
    pleineLargeur ? "w-full" : "",
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------ Appel direct */
export function BoutonAppel({
  telephone,
  affichage,
  variante = "sombre",
}: {
  telephone: string;
  affichage: string;
  variante?: Variante;
}) {
  return (
    <a
      href={`tel:${telephone}`}
      data-conversion="clic-telephone"
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full px-7 font-semibold",
        "min-h-[48px] text-[16px] transition-colors",
        variantes[variante],
      ].join(" ")}
    >
      <IconeTelephone />
      {affichage}
    </a>
  );
}

/* ----------------------------------------------------------------- Blocs */
export function Section({
  children,
  fond = "fond",
  id,
}: {
  children: ReactNode;
  fond?: "fond" | "brume" | "charbon" | "blanc";
  id?: string;
}) {
  const fonds = {
    fond: "bg-fond",
    brume: "bg-brume",
    charbon: "bg-charbon text-white",
    blanc: "bg-white",
  };
  return (
    <section id={id} className={`${fonds[fond]} py-14 md:py-20`}>
      <div className="mx-auto w-full max-w-[1136px] px-5 md:px-8">{children}</div>
    </section>
  );
}

export function Carte({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[16px] border border-bordure bg-white p-6 shadow-[0_2px_8px_rgba(18,58,92,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Etiquette({
  children,
  ton = "vert",
}: {
  children: ReactNode;
  ton?: "vert" | "alerte" | "neutre";
}) {
  const tons = {
    vert: "bg-vert-pale text-vert",
    alerte: "bg-alerte-pale text-alerte",
    neutre: "bg-brume text-encre-2",
  };
  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-[14px] font-semibold ${tons[ton]}`}
    >
      {children}
    </span>
  );
}

export function Encadre({
  titre,
  children,
  ton = "vert",
}: {
  titre: string;
  children: ReactNode;
  ton?: "vert" | "alerte";
}) {
  const tons = {
    vert: "bg-vert-pale border-vert-bord",
    alerte: "bg-alerte-pale border-alerte-bord",
  };
  return (
    <div className={`rounded-[16px] border p-6 ${tons[ton]}`}>
      <p className="font-semibold text-charbon">{titre}</p>
      <div className="mt-2 text-[15px] text-encre-2">{children}</div>
    </div>
  );
}

/* ----------------------------------------------------------------- Icônes */
export function IconeTelephone({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.2 1l-2.3 2.2Z" />
    </svg>
  );
}

export function IconeCoche({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ListeCochee({ elements }: { elements: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {elements.map((e) => (
        <li key={e} className="flex gap-3">
          <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-vert-pale text-vert">
            <IconeCoche className="h-4 w-4" />
          </span>
          <span className="text-[16px]">{e}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------- Pastilles de service */
/** Pastille ronde verte posée sur la photo d'une carte service. */
export function PastilleService({
  icone,
  className = "",
}: {
  icone: "coeur" | "goutte" | "pouls" | "pansement" | "seringue" | "sang";
  className?: string;
}) {
  const traces: Record<typeof icone, React.ReactNode> = {
    coeur: (
      <path
        d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z"
        fill="currentColor"
      />
    ),
    goutte: (
      <path
        d="M12 3s6 6.4 6 10.2A6 6 0 0 1 6 13.2C6 9.4 12 3 12 3Z"
        fill="currentColor"
      />
    ),
    pouls: (
      <path
        d="M3 12h4l2.5-6 4 12L16 12h5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    pansement: (
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
        <rect x="3.2" y="8.2" width="17.6" height="7.6" rx="3.8" transform="rotate(-45 12 12)" />
        <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
      </g>
    ),
    seringue: (
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="m14 4 6 6M18.5 5.5 20 4M11.5 6.5 17.5 12.5M4 20l3.5-3.5" />
        <path d="M9 9 15 15 9.5 20.5 3.5 14.5 9 9Z" strokeLinejoin="round" />
      </g>
    ),
    sang: (
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M12 3.5s5 5.4 5 8.7a5 5 0 0 1-10 0C7 8.9 12 3.5 12 3.5Z" fill="currentColor" stroke="none" />
        <path d="M4 20h16" />
      </g>
    ),
  };

  return (
    <span
      className={`flex h-14 w-14 items-center justify-center rounded-full bg-vert text-white shadow-[0_2px_10px_rgba(35,38,41,0.18)] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        {traces[icone]}
      </svg>
    </span>
  );
}
