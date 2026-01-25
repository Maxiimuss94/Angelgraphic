"use client";

import { useState, useEffect } from "react";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

function StudioSetupMessage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-serif text-xl font-semibold text-noir">
        Sanity Studio — configuration requise
      </h1>
      <div className="max-w-lg space-y-4 text-left text-sm text-noir/70">
        <p>
          1. Fichier <code className="rounded bg-gold-light/40 px-1.5 py-0.5">.env.local</code> à la
          racine : <code className="rounded bg-gold-light/40 px-1.5 py-0.5">NEXT_PUBLIC_SANITY_PROJECT_ID</code> et{" "}
          <code className="rounded bg-gold-light/40 px-1.5 py-0.5">NEXT_PUBLIC_SANITY_DATASET</code>.
        </p>
        <p>
          2. <strong>CORS</strong> : dans{" "}
          <a
            href="https://sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bordeaux underline hover:no-underline"
          >
            sanity.io/manage
          </a>
          , projet → <strong>API</strong> → <strong>CORS origins</strong> → ajoutez{" "}
          <code className="rounded bg-gold-light/40 px-1.5 py-0.5">http://localhost:3000</code> avec
          &quot;Allow credentials&quot;.
        </p>
        <p>
          3. Redémarrez <code className="rounded bg-gold-light/30 px-1">npm run dev</code> (et
          supprimez le dossier <code className="rounded bg-gold-light/30 px-1">.next</code> si besoin).
        </p>
      </div>
    </div>
  );
}

export default function StudioPage() {
  const [Studio, setStudio] = useState<React.ComponentType<{ config: unknown }> | null>(null);
  const [config, setConfig] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId || projectId === "votre_project_id") {
      return;
    }
    let cancelled = false;
    Promise.all([
      import("../../../sanity.config"),
      import("next-sanity/studio").then((m) => m.NextStudio),
    ])
      .then(([configMod, NextStudio]) => {
        if (cancelled) return;
        setConfig(configMod.default);
        setStudio(() => NextStudio as React.ComponentType<{ config: unknown }>);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message ?? "Erreur au chargement du Studio.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!projectId || projectId === "votre_project_id") {
    return <StudioSetupMessage />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-serif text-xl font-semibold text-noir">
          Erreur Sanity Studio
        </h1>
        <p className="max-w-md text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!Studio || !config) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-noir/60">Chargement du Studio…</p>
      </div>
    );
  }

  return <Studio config={config} />;
}
