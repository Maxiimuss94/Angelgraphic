import journalData from "@/data/journal.json";

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string[];
};

const posts = journalData as JournalPost[];

/** Tous les articles, du plus récent au plus ancien. */
export function getAllPosts(): JournalPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Un article par slug, ou null. */
export function getPostBySlug(slug: string): JournalPost | null {
  return posts.find((p) => p.slug === slug) ?? null;
}

/** Formater une date ISO pour l'affichage (ex. "20 janvier 2025"). */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
