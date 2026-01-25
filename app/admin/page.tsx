import Link from "next/link";

export const metadata = {
  title: "Admin | ANGEL GRAPHIC",
  description: "Accès au Sanity Studio pour gérer les projets.",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-blanc px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-2xl font-semibold text-bordeaux sm:text-3xl">
          Administration
        </h1>
        <p className="mt-4 text-noir/80">
          Accédez au Sanity Studio pour gérer les projets affichés sur le site
          (grille Projets, Portfolio).
        </p>

        <div className="mt-10 rounded-xl border border-gold-light/50 bg-[#f5f3ef] p-6">
          <h2 className="font-serif text-lg font-semibold text-noir">
            Sanity Studio
          </h2>
          <p className="mt-2 text-sm text-noir/70">
            Le Studio permet d&apos;ajouter, modifier ou supprimer des projets :
            titre, catégorie, image principale (avec hotspot), date de
            réalisation, description. Vous pouvez aussi marquer des projets
            &quot;À la une&quot; pour qu&apos;ils apparaissent dans la section
            Portfolio.
          </p>
          <Link
            href="/studio"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-bordeaux px-6 py-3 text-sm font-medium text-white transition hover:bg-bordeaux-dark"
          >
            Ouvrir le Studio →
          </Link>
        </div>

        <div className="mt-8 text-sm text-noir/60">
          <p>
            <strong>URL directe :</strong>{" "}
            <code className="rounded bg-gold-light/30 px-1.5 py-0.5">
              /studio
            </code>
          </p>
          <p className="mt-2">
            Cette page n&apos;est pas indexée par les moteurs de recherche. Vous
            pouvez la garder confidentielle ou la partager avec les personnes
            autorisées à gérer le contenu.
          </p>
        </div>
      </div>
    </div>
  );
}
