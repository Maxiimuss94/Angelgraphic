"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostForList } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";

type Props = {
  post: PostForList;
  index: number;
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default function JournalCard({ post, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/journal/${post.slug}`}
        className="group block overflow-hidden rounded-2xl border border-gold-light/30 bg-white transition hover:border-gold/50 hover:shadow-xl"
      >
        {post.coverImage && (
          <div className="relative h-64 w-full overflow-hidden bg-noir/5">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-3">
            <time
              dateTime={post.date}
              className="text-xs font-medium uppercase tracking-wider text-gold"
            >
              {formatDate(post.date)}
            </time>
            <span className="text-xs text-noir/50">•</span>
            <span className="text-xs font-medium text-noir/60">{post.category}</span>
          </div>
          <h2 className="font-serif text-2xl font-light text-noir transition group-hover:text-gold sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-2 text-base leading-relaxed text-noir/70">
            {post.excerpt}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition group-hover:gap-3">
            Lire l&apos;article
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
