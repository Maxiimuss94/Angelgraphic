import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import { fetchFeaturedProjects } from "@/lib/sanity";

export const revalidate = 60;

export const metadata = {
  title: "Portfolio | ANGEL GRAPHIC",
  description: "Sélection des meilleurs travaux — Angel Graphic.",
};

export default async function PortfolioPage() {
  const projects = await fetchFeaturedProjects();
  return (
    <div className="flex min-h-screen flex-col bg-blanc text-foreground">
      <main className="flex-1">
        <Portfolio projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
