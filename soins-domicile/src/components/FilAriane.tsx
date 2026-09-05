import Link from "next/link";

export function FilAriane({ elements }: { elements: { nom: string; url: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="border-b border-bordure bg-brume">
      <ol className="mx-auto flex w-full max-w-[1136px] flex-wrap items-center gap-2 px-5 py-3 text-[14px] text-encre-2 md:px-8">
        {elements.map((e, i) => (
          <li key={e.url} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === elements.length - 1 ? (
              <span aria-current="page" className="font-semibold text-charbon">
                {e.nom}
              </span>
            ) : (
              <Link href={e.url} className="hover:underline">
                {e.nom}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
