"use client";

import { motion } from "framer-motion";
import { fetchPosts, type PostForList } from "@/lib/sanity";
import JournalCard from "./JournalCard";
import { useEffect, useState } from "react";

export default function JournalList() {
  const [posts, setPosts] = useState<PostForList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="border-t border-gold-light/30 bg-blanc-casse px-4 py-20 sm:px-6 md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-noir/60">Chargement...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-gold-light/30 bg-blanc-casse px-4 py-20 sm:px-6 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="font-serif text-4xl font-light text-noir sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Journal
        </motion.h2>
        <motion.p
          className="mt-6 text-lg text-noir/70 md:mt-8 md:text-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Vision du design, conseils et réflexions — pour mieux créer ensemble.
        </motion.p>

        {posts.length === 0 ? (
          <motion.p
            className="mt-12 text-center text-noir/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Aucun article pour le moment.
          </motion.p>
        ) : (
          <ul className="mt-16 space-y-12 md:mt-20">
            {posts.map((post, i) => (
              <li key={post.id}>
                <JournalCard post={post} index={i} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
