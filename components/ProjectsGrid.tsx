"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import ProjectCard from "./ProjectCard";
import Lightbox, { type LightboxProject } from "./Lightbox";

function getCatFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/[?&]cat=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

type Props = {
  projects: LightboxProject[];
  initialCategory?: string;
  showFilter?: boolean;
  featuredOnly?: boolean;
};

export default function ProjectsGrid({
  projects,
  initialCategory,
  showFilter = true,
  featuredOnly = false,
}: Props) {
  const [category, setCategory] = useState(initialCategory ?? "Tous");
  const [lightbox, setLightbox] = useState<LightboxProject | null>(null);

  useEffect(() => {
    const sync = () => {
      const cat = getCatFromHash();
      if (cat && PROJECT_CATEGORIES.includes(cat as (typeof PROJECT_CATEGORIES)[number])) {
        setCategory(cat);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (initialCategory && PROJECT_CATEGORIES.includes(initialCategory as (typeof PROJECT_CATEGORIES)[number])) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const filtered = useMemo(() => {
    let list = featuredOnly
      ? projects.filter((p) => p.featured)
      : [...projects];
    if (category !== "Tous") {
      list = list.filter((p) => p.category === category);
    }
    return list;
  }, [projects, category, featuredOnly]);

  return (
    <>
      {showFilter && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === cat
                  ? "bg-noir text-white"
                  : "border border-gold-light/60 bg-white/80 text-noir/80 hover:border-gold hover:bg-gold/5 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.length ? (
            filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                onClick={() => setLightbox(p)}
              />
            ))
          ) : (
            <motion.p
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-16 text-center text-lg text-noir/60"
            >
              Aucun projet dans cette catégorie pour le moment.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <Lightbox project={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
