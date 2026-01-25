import Services from "@/components/Services";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Services | ANGEL GRAPHIC",
  description:
    "Identité visuelle, design graphique, digital et accompagnement — Angel Graphic.",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-blanc text-foreground">
      <main className="flex-1">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
