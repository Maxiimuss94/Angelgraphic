"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VISION = `Angel Graphic est un freelance spécialisé en conception graphique et digitale, dédié à la création d'identités visuelles fortes et de solutions visuelles sur mesure. Mon approche repose sur l'écoute, la créativité et la précision. Je transforme vos idées en visuels modernes et efficaces, conçus pour attirer, engager et valoriser votre image sur le digital.`;

const QUOTE = "L'écoute, la créativité et la précision au service de votre image.";

export default function MaVision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [30, 0, 0, -30]);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-gold-light/30 bg-blanc-casse">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Large quote first - asymmetric */}
          <motion.div
            style={{ y }}
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="border-l-4 border-gold pl-8">
              <p className="font-serif text-2xl font-light italic text-noir/90 md:text-4xl lg:text-5xl">
                &ldquo;{QUOTE}&rdquo;
              </p>
            </blockquote>
          </motion.div>

          {/* Title + intro - right column */}
          <motion.div
            className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-4xl font-light text-noir sm:text-5xl md:text-6xl">
              Ma Vision
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-noir/70 md:text-xl">
              Angel Graphic est un freelance spécialisé en conception graphique et digitale, dédié à
              la création d&apos;identités visuelles fortes.
            </p>
          </motion.div>

          {/* Full width - rest of content */}
          <motion.div
            className="lg:col-span-10 lg:col-start-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg leading-relaxed text-noir/70 md:text-xl">
              Mon approche repose sur l&apos;écoute, la créativité et la précision. Je transforme vos
              idées en visuels modernes et efficaces, conçus pour attirer, engager et valoriser votre
              image sur le digital.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
