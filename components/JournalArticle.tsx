"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PostForArticle } from "@/lib/sanity";
import { ArrowLeft } from "lucide-react";

type Props = { post: PostForArticle };

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default function JournalArticle({ post }: Props) {
  return (
    <article className="border-t border-gold-light/30 bg-blanc px-4 py-20 sm:px-6 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm font-medium text-noir/70 transition hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au journal
        </Link>

        <motion.header
          className="mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <time
              dateTime={post.date}
              className="text-xs font-medium uppercase tracking-wider text-gold"
            >
              {formatDate(post.date)}
            </time>
            <span className="text-xs text-noir/50">•</span>
            <span className="text-xs font-medium text-noir/60">{post.category}</span>
          </div>
          <h1 className="font-serif text-4xl font-light text-noir sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
        </motion.header>

        {post.coverImage && (
          <motion.div
            className="relative my-12 h-96 w-full overflow-hidden rounded-2xl bg-noir/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </motion.div>
        )}

        <motion.div
          className="prose prose-lg max-w-none space-y-6 leading-relaxed text-noir/80 prose-headings:font-serif prose-headings:text-noir prose-p:text-noir/80 prose-strong:text-noir prose-em:text-noir/70 prose-blockquote:border-l-gold prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-noir/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <PortableText value={post.content} />
        </motion.div>
      </div>
    </article>
  );
}
