"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HISTORY = `Je suis Angel Graphic, et ma relation avec l'art n'a jamais été un simple passe-temps. C'est une passion profonde, presque instinctive, qui m'accompagne depuis toujours. En 2014, je fais mes premiers pas dans le graphic design. À l'époque, ce n'était pas encore une carrière, mais une curiosité brûlante : comprendre les formes, les couleurs, les émotions qu'un visuel peut transmettre sans dire un mot. Chaque création était une expérimentation, chaque projet une nouvelle façon de raconter une histoire.`;

const QUOTES = [
  "Comprendre les formes, les couleurs, les émotions qu'un visuel peut transmettre sans dire un mot.",
  "Chaque création était une expérimentation, chaque projet une nouvelle façon de raconter une histoire.",
];

export default function MonHistoire() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40]);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-gold-light/30 bg-blanc">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-32">
        {/* Asymmetric layout */}
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left column - title + first block */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-4xl font-light text-noir sm:text-5xl md:text-6xl">
              Mon Histoire
            </h2>
            <p className="mt-10 text-lg leading-relaxed text-noir/70 md:text-xl">
              Je suis Angel Graphic, et ma relation avec l&apos;art n&apos;a jamais été un simple
              passe-temps. C&apos;est une passion profonde, presque instinctive, qui m&apos;accompagne
              depuis toujours.
            </p>
          </motion.div>

          {/* Right column - first quote (large format) */}
          <motion.div
            style={{ y }}
            className="lg:col-span-7 lg:pl-8"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="border-l-4 border-bordeaux pl-8">
              <p className="font-serif text-2xl font-light italic text-noir/90 md:text-3xl lg:text-4xl">
                &ldquo;{QUOTES[0]}&rdquo;
              </p>
              <cite className="mt-4 block text-sm not-italic text-noir/50">— 2014</cite>
            </blockquote>
          </motion.div>

          {/* Full width - rest of text */}
          <motion.div
            className="lg:col-span-8 lg:col-start-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed text-noir/70 md:text-xl">
              En 2014, je fais mes premiers pas dans le graphic design. À l&apos;époque, ce
              n&apos;était pas encore une carrière, mais une curiosité brûlante. Chaque création
              était une expérimentation, chaque projet une nouvelle façon de raconter une histoire.
            </p>
          </motion.div>

          {/* Second quote - full width, centered */}
          <motion.div
            style={{ y }}
            className="lg:col-span-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <blockquote className="max-w-3xl border-l-4 border-gold pl-8">
              <p className="font-serif text-2xl font-light italic text-noir/90 md:text-4xl lg:text-5xl">
                &ldquo;{QUOTES[1]}&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
