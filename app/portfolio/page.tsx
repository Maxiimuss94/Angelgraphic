import PortfolioShowcase from "@/components/PortfolioShowcase";
import Footer from "@/components/Footer";

export const revalidate = 60;

export const metadata = {
  title: "Portfolio | ANGEL GRAPHIC",
  description: "Sélection des meilleurs travaux — Angel Graphic.",
};

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-foreground">
      <main className="flex-1">
        <PortfolioShowcase />
      </main>
      <Footer />
    </div>
  );
}
