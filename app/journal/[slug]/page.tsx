import { notFound } from "next/navigation";
import { fetchPostBySlug, fetchPosts } from "@/lib/sanity";
import JournalArticle from "@/components/JournalArticle";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: "Article | ANGEL GRAPHIC" };
  return {
    title: `${post.title} | Journal | ANGEL GRAPHIC`,
    description: post.excerpt,
  };
}

export default async function JournalSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-blanc text-foreground">
      <main className="flex-1">
        <JournalArticle post={post} />
      </main>
      <Footer />
    </div>
  );
}
