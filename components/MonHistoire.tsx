"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HISTORY = `Je suis Angel Graphic, et ma relation avec l'art n'a jamais été un simple passe-temps. C'est une passion profonde, presque instinctive, qui m'accompagne depuis toujours. En 2014, je fais mes premiers pas dans le graphic design. À l'époque, ce n'était pas encore une carrière, mais une curiosité brûlante : comprendre les formes, les couleurs, les émotions qu'un visuel peut transmettre sans dire un mot. Chaque création était une expérimentation, chaque projet une nouvelle façon de raconter une histoire.`;

const QUOTE = "Comprendre les formes, les couleurs, les émotions qu'un visuel peut transmettre sans dire un mot.";

export default function MonHistoire() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="relative border-t border-gold-light/30 bg-blanc px-4 py-20 sm:px-6 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="font-serif text-4xl font-light text-noir sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Mon Histoire
        </motion.h2>

        <motion.div
          className="mt-16 space-y-12 md:mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="text-lg leading-relaxed text-noir/70 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {HISTORY}
          </motion.p>

          <motion.div
            style={{ y }}
            className="relative my-16 border-l-4 border-gold pl-8 md:my-24"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-serif text-2xl font-light italic text-noir/90 md:text-3xl lg:text-4xl">
              &ldquo;{QUOTE}&rdquo;
            </p>
            <p className="mt-4 text-sm text-noir/50 md:text-base">— 2014</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
