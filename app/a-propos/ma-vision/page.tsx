import MaVision from "@/components/MaVision";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ma Vision | À propos | ANGEL GRAPHIC",
  description:
    "Angel Graphic — identités visuelles fortes et solutions visuelles sur mesure.",
};

export default function MaVisionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-blanc text-foreground">
      <main className="flex-1">
        <MaVision />
      </main>
      <Footer />
    </div>
  );
}
