"use client";

import { motion } from "framer-motion";

const HISTORY = `Je suis Angel Graphic, et ma relation avec l'art n'a jamais été un simple passe-temps. C'est une passion profonde, presque instinctive, qui m'accompagne depuis toujours. En 2014, je fais mes premiers pas dans le graphic design. À l'époque, ce n'était pas encore une carrière, mais une curiosité brûlante : comprendre les formes, les couleurs, les émotions qu'un visuel peut transmettre sans dire un mot. Chaque création était une expérimentation, chaque projet une nouvelle façon de raconter une histoire.`;

export default function MonHistoire() {
  return (
    <section className="relative border-t border-gold-light/50 bg-blanc px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="font-serif text-3xl font-semibold text-bordeaux sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mon Histoire
        </motion.h2>
        <motion.p
          className="mt-12 leading-relaxed text-noir/80 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {HISTORY}
        </motion.p>
      </div>
    </section>
  );
}
