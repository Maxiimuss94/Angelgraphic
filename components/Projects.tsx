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
      className="scroll-mt-20 border-t border-gold-light/50 bg-[#f5f3ef] px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="font-serif text-3xl font-semibold text-bordeaux sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          Projets
        </motion.h2>

        <motion.div
          className="mt-10 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
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
