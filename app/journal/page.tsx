import JournalList from "@/components/JournalList";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Journal | ANGEL GRAPHIC",
  description:
    "Vision du design, conseils et réflexions — Angel Graphic partage son regard sur la création visuelle.",
};

export default function JournalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-blanc text-foreground">
      <main className="flex-1">
        <JournalList />
      </main>
      <Footer />
    </div>
  );
}
