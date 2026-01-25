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
      className="scroll-mt-20 border-t border-gold-light/50 bg-blanc px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="font-serif text-3xl font-semibold text-bordeaux sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-noir/80"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Sélection des meilleurs travaux.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <ProjectsGrid
            projects={projects}
            showFilter={false}
            featuredOnly
          />
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/projets"
            className="inline-flex items-center rounded-full bg-bordeaux px-6 py-3 text-sm font-medium text-white transition hover:bg-bordeaux-dark"
          >
            Voir tous les projets
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
