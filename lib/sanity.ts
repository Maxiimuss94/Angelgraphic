import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (_client) return _client;
  const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "").trim();
  const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production").trim();
  if (!projectId) return null;
  _client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  });
  return _client;
}

/** Génère une URL d'image Sanity (redimensionnement, format, hotspot). */
export function urlFor(source: { _type: string; asset?: { _ref: string }; hotspot?: unknown }) {
  const c = getClient();
  if (!c) throw new Error("Sanity client non configuré");
  return imageUrlBuilder(c).image(source);
}

/** Tous les projets, triés par date de réalisation (plus récent en premier). */
export const PROJECTS_GROQ = `*[_type == "project"] | order(realizedAt desc) {
  _id,
  title,
  category,
  mainImage,
  realizedAt,
  description,
  featured
}`;

/** Projets à la une (Portfolio). */
export const FEATURED_PROJECTS_GROQ = `*[_type == "project" && featured == true] | order(realizedAt desc) {
  _id,
  title,
  category,
  mainImage,
  realizedAt,
  description,
  featured
}`;

export type SanityProject = {
  _id: string;
  title: string;
  category: string;
  mainImage: { _type: string; asset?: { _ref: string }; hotspot?: unknown };
  realizedAt?: string | null;
  description?: string | null;
  featured?: boolean;
};

/** Projet normalisé pour la grille / lightbox (image = URL). */
export type ProjectForGrid = {
  id: string;
  title: string;
  category: string;
  image: string;
  imageLightbox: string;
  description: string;
  featured?: boolean;
};

const SIZE_THUMB = 600;
const SIZE_LIGHTBOX = 960;

function toProjectForGrid(p: SanityProject): ProjectForGrid | null {
  try {
    if (!p?.mainImage) return null;
    const img = urlFor(p.mainImage);
    const imageUrl = img.width(SIZE_THUMB).height(SIZE_THUMB).url();
    const imageLightboxUrl = img.width(SIZE_LIGHTBOX).height(SIZE_LIGHTBOX).url();
    return {
      id: p._id,
      title: p.title ?? "",
      category: p.category ?? "Art",
      image: imageUrl,
      imageLightbox: imageLightboxUrl,
      description: p.description ?? "",
      featured: p.featured,
    };
  } catch {
    return null;
  }
}

export async function fetchProjects(): Promise<ProjectForGrid[]> {
  try {
    const c = getClient();
    if (!c) return [];
    const raw = await c.fetch<SanityProject[]>(PROJECTS_GROQ);
    const list = Array.isArray(raw) ? raw : [];
    return list.map(toProjectForGrid).filter((x): x is ProjectForGrid => x != null);
  } catch {
    return [];
  }
}

export async function fetchFeaturedProjects(): Promise<ProjectForGrid[]> {
  try {
    const c = getClient();
    if (!c) return [];
    const raw = await c.fetch<SanityProject[]>(FEATURED_PROJECTS_GROQ);
    const list = Array.isArray(raw) ? raw : [];
    return list.map(toProjectForGrid).filter((x): x is ProjectForGrid => x != null);
  } catch {
    return [];
  }
}

/** Tous les articles du Journal, triés par date (plus récent en premier). */
export const POSTS_GROQ = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  coverImage,
  excerpt,
  publishedAt,
  category
}`;

/** Article par slug. */
export const POST_BY_SLUG_GROQ = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  coverImage,
  excerpt,
  publishedAt,
  category,
  content
}`;

export type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: { _type: string; asset?: { _ref: string }; hotspot?: unknown };
  excerpt: string;
  publishedAt: string;
  category: string;
  content?: unknown[];
};

export type PostForList = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: string;
};

export type PostForArticle = PostForList & {
  content: unknown[];
};

function toPostForList(p: SanityPost): PostForList | null {
  try {
    if (!p?.coverImage) return null;
    const img = urlFor(p.coverImage);
    const coverUrl = img.width(800).height(600).url();
    return {
      id: p._id,
      slug: p.slug?.current ?? "",
      title: p.title ?? "",
      excerpt: p.excerpt ?? "",
      date: p.publishedAt ?? "",
      category: p.category ?? "Design",
      coverImage: coverUrl,
    };
  } catch {
    return null;
  }
}

export async function fetchPosts(): Promise<PostForList[]> {
  try {
    const c = getClient();
    if (!c) return [];
    const raw = await c.fetch<SanityPost[]>(POSTS_GROQ);
    const list = Array.isArray(raw) ? raw : [];
    return list.map(toPostForList).filter((x): x is PostForList => x != null);
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<PostForArticle | null> {
  try {
    const c = getClient();
    if (!c) return null;
    const raw = await c.fetch<SanityPost>(POST_BY_SLUG_GROQ, { slug });
    if (!raw) return null;
    const base = toPostForList(raw);
    if (!base) return null;
    return {
      ...base,
      content: raw.content ?? [],
    };
  } catch {
    return null;
  }
}
