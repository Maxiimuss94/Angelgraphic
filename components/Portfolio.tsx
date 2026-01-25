"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProjectsGrid from "./ProjectsGrid";
import type { LightboxProject } from "./Lightbox";

type Props = { projects: LightboxProject[] };

export default function Portfolio({ projects }: Props) {
  return (
    <section
      id="portfolio"
      className="scroll-mt-20 border-t border-gold-light/30 bg-blanc px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="font-serif text-4xl font-light text-noir sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Portfolio
        </motion.h2>
        <motion.p
          className="mt-6 text-lg text-noir/70 md:mt-8 md:text-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Sélection des meilleurs travaux.
        </motion.p>

        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <ProjectsGrid
            projects={projects}
            showFilter={false}
            featuredOnly
          />
        </motion.div>

        <motion.div
          className="mt-12 text-center md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/projets"
            className="inline-flex items-center rounded-lg bg-noir px-6 py-3 text-sm font-medium text-white transition hover:bg-noir/90"
          >
            Voir tous les projets
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
