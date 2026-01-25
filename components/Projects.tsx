"use client";

import { motion } from "framer-motion";
import ProjectsGrid from "./ProjectsGrid";
import type { LightboxProject } from "./Lightbox";

type Props = {
  projects: LightboxProject[];
  initialCategory?: string;
};

export default function Projects({ projects, initialCategory }: Props) {
  return (
    <section
      id="projets"
      className="scroll-mt-20 border-t border-gold-light/30 bg-blanc-casse px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="font-serif text-4xl font-light text-noir sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Projets
        </motion.h2>

        <motion.div
          className="mt-10 space-y-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ProjectsGrid
            projects={projects}
            showFilter
            initialCategory={initialCategory}
          />
        </motion.div>
      </div>
    </section>
  );
}
