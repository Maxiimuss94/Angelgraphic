import MonHistoire from "@/components/MonHistoire";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mon Histoire | À propos | ANGEL GRAPHIC",
  description:
    "Le parcours d'Angel Graphic — une passion pour le design graphique depuis 2014.",
};

export default function MonHistoirePage() {
  return (
    <div className="flex min-h-screen flex-col bg-blanc text-foreground">
      <main className="flex-1">
        <MonHistoire />
      </main>
      <Footer />
    </div>
  );
}
