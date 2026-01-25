"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 md:min-h-[90vh]"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h1
          className="font-serif text-4xl font-semibold tracking-tight text-noir sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE.name}
        </motion.h1>
        <motion.p
          className="mt-4 font-serif text-xl text-bordeaux sm:text-2xl md:mt-6 md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE.slogan}
        </motion.p>
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-noir/70 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          Plus de 5 ans d&apos;expérience en conception graphique et digitale.
          <br className="hidden sm:inline" /> Écoute et accompagnement sur mesure.
        </motion.p>
      </div>
    </section>
  );
}
