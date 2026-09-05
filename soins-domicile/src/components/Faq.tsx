import type { QuestionReponse } from "@/data/faq";

/** Accordéon natif : accessible au clavier sans JavaScript. */
export function Faq({ elements }: { elements: QuestionReponse[] }) {
  return (
    <div className="space-y-3">
      {elements.map((qr) => (
        <details
          key={qr.question}
          className="group rounded-[12px] border border-bordure bg-white open:border-vert"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-charbon marker:hidden">
            {qr.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-[22px] leading-none text-vert group-open:hidden"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="hidden shrink-0 text-[22px] leading-none text-vert group-open:inline"
            >
              −
            </span>
          </summary>
          <p className="mesure px-5 pb-5 text-[16px] text-encre-2">{qr.reponse}</p>
        </details>
      ))}
    </div>
  );
}
