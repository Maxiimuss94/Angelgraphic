"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 md:min-h-[95vh]"
    >
      <div className="mx-auto max-w-4xl">
        <motion.h1
          className="font-serif text-5xl font-light tracking-tight text-noir sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE.name.split(" ").map((word, i) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
              {i < SITE.name.split(" ").length - 1 && "\u00A0"}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="mt-6 font-serif text-2xl font-light italic text-gold sm:text-3xl md:mt-8 md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {SITE.slogan}
        </motion.p>
        <motion.p
          className="mt-8 max-w-2xl text-base leading-relaxed text-noir/60 sm:text-lg md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Plus de 5 ans d&apos;expérience en conception graphique et digitale.
          <br className="hidden sm:inline" /> Écoute et accompagnement sur mesure.
        </motion.p>
      </div>
    </section>
  );
}
