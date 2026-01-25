"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/journal";
import type { JournalPost } from "@/lib/journal";
import { ArrowRight } from "lucide-react";

type Props = {
  post: JournalPost;
  index: number;
};

export default function JournalCard({ post, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/journal/${post.slug}`}
        className="group block rounded-xl border border-gold-light/50 bg-blanc p-6 transition hover:border-bordeaux/30 hover:shadow-md sm:p-8"
      >
        <time
          dateTime={post.date}
          className="text-xs font-medium uppercase tracking-wider text-bordeaux"
        >
          {formatDate(post.date)}
        </time>
        <h2 className="mt-3 font-serif text-xl font-semibold text-noir transition group-hover:text-bordeaux sm:text-2xl">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-noir/70">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-bordeaux transition group-hover:gap-3">
          Lire l&apos;article
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </motion.article>
  );
}
