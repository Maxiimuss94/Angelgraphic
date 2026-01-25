import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact | ANGEL GRAPHIC",
  description: "Contactez Angel Graphic pour vos projets de design graphique.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-blanc text-foreground">
      <main className="flex-1">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
