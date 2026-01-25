"use client";

import { motion } from "framer-motion";
import { getAllPosts } from "@/lib/journal";
import JournalCard from "./JournalCard";

export default function JournalList() {
  const posts = getAllPosts();

  return (
    <section className="border-t border-gold-light/50 bg-[#f5f3ef] px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="font-serif text-3xl font-semibold text-bordeaux sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Journal
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-noir/80"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Vision du design, conseils et réflexions — pour mieux créer ensemble.
        </motion.p>

        <ul className="mt-12 space-y-6 sm:mt-16">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <JournalCard post={post} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
