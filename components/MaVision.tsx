"use client";

import { motion } from "framer-motion";

const VISION = `Angel Graphic est un freelance spécialisé en conception graphique et digitale, dédié à la création d'identités visuelles fortes et de solutions visuelles sur mesure. Mon approche repose sur l'écoute, la créativité et la précision. Je transforme vos idées en visuels modernes et efficaces, conçus pour attirer, engager et valoriser votre image sur le digital.`;

export default function MaVision() {
  return (
    <section className="relative border-t border-gold-light/50 bg-blanc px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="font-serif text-3xl font-semibold text-bordeaux sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ma Vision
        </motion.h2>
        <motion.p
          className="mt-12 leading-relaxed text-noir/80 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {VISION}
        </motion.p>
      </div>
    </section>
  );
}
