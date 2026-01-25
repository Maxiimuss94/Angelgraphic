import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { fetchProjects } from "@/lib/sanity";

export const revalidate = 60;

export const metadata = {
  title: "Projets | ANGEL GRAPHIC",
  description:
    "Grille de projets par catégorie — Art, Logo, Social media, Flyers et plus.",
};

type SearchParams = Promise<{ cat?: string }>;

export default async function ProjetsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { cat } = await searchParams;
  const projects = await fetchProjects();
  return (
    <div className="flex min-h-screen flex-col bg-blanc text-foreground">
      <main className="flex-1">
        <Projects projects={projects} initialCategory={cat} />
      </main>
      <Footer />
    </div>
  );
}
