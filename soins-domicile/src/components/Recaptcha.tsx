"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void },
      ) => number;
    };
    onRecaptchaLoaded?: () => void;
  }
}

/**
 * Widget « Je ne suis pas un robot » (reCAPTCHA v2, case à cocher),
 * demandé explicitement par le client sur le formulaire de contact.
 *
 * Nécessite une clé de site : NEXT_PUBLIC_RECAPTCHA_SITE_KEY dans .env.local,
 * obtenue sur https://www.google.com/recaptcha/admin (type « Case à cocher »,
 * domaine du site en production).
 */
export function Recaptcha({ onChange }: { onChange: (token: string | null) => void }) {
  const conteneur = useRef<HTMLDivElement>(null);
  const [pret, setPret] = useState(false);
  const cle = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!pret || !cle || !conteneur.current || !window.grecaptcha) return;
    window.grecaptcha.render(conteneur.current, {
      sitekey: cle,
      callback: (token) => onChange(token),
      "expired-callback": () => onChange(null),
    });
    // Rendu une seule fois par montage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pret]);

  if (!cle) {
    // Environnement de développement sans clé configurée : on ne bloque pas
    // le travail sur le reste du formulaire, mais on ne masque pas l'oubli.
    return (
      <p className="rounded-[10px] border border-dashed border-bordure bg-fond p-4 text-[14px] text-encre-3">
        reCAPTCHA non configuré — ajouter <code>NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code> dans
        <code>.env.local</code> avant la mise en production.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit"
        strategy="afterInteractive"
        onLoad={() => {
          window.onRecaptchaLoaded = () => setPret(true);
          if (window.grecaptcha) setPret(true);
        }}
      />
      <div ref={conteneur} />
    </>
  );
}
