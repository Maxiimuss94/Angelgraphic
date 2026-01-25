"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/journal";
import type { JournalPost } from "@/lib/journal";
import { ArrowLeft } from "lucide-react";

type Props = { post: JournalPost };

export default function JournalArticle({ post }: Props) {
  return (
    <article className="border-t border-gold-light/50 bg-blanc px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm font-medium text-noir/70 transition hover:text-bordeaux"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au journal
        </Link>

        <motion.header
          className="mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <time
            dateTime={post.date}
            className="text-xs font-medium uppercase tracking-wider text-bordeaux"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-noir sm:text-4xl">
            {post.title}
          </h1>
        </motion.header>

        <motion.div
          className="mt-10 space-y-6 leading-relaxed text-noir/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </motion.div>
      </div>
    </article>
  );
}
