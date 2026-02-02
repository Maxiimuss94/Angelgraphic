import HeroCarousel from "@/components/HeroCarousel";
import Link from "next/link";

export const metadata = {
  title: "ANGEL GRAPHIC | Design graphique & identité visuelle",
  description:
    "La simplicité au service du sens. Freelance en conception graphique et digitale — identités visuelles, branding, design print & digital. Plus de 5 ans d'expérience.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-blanc text-foreground">
      <main>
        <HeroCarousel />
        <section
          id="hero-content"
          className="border-t border-gold-light/30 bg-blanc px-4 py-20 sm:px-6 md:py-28"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-noir/70 md:text-xl">
              Plus de 5 ans d&apos;expérience en conception graphique et digitale.
              <br className="hidden sm:inline" /> Écoute et accompagnement sur mesure.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/portfolio"
                className="rounded-lg bg-noir px-6 py-3 text-sm font-medium text-white transition hover:bg-noir/90"
              >
                Voir le portfolio
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-gold/60 bg-transparent px-6 py-3 text-sm font-medium text-noir transition hover:bg-gold/10"
              >
                Me contacter
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
