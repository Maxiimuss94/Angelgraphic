"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type LightboxProject = {
  id: string;
  title: string;
  category: string;
  image: string;
  imageLightbox?: string;
  description: string;
  featured?: boolean;
};

type Props = {
  project: LightboxProject | null;
  onClose: () => void;
};

export default function Lightbox({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noir/90 p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Voir le projet en grand"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-noir shadow-lg transition hover:bg-gold/20 hover:text-gold"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-lg bg-blanc shadow-2xl">
              <div className="mx-auto aspect-square w-full max-w-2xl bg-gold-light/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageLightbox ?? project.image}
                  alt={project.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="border-t border-gold-light/30 px-6 py-4">
                <p className="text-xs font-medium uppercase tracking-wider text-gold">
                  {project.category}
                </p>
                <h3 className="font-serif text-xl font-light text-noir">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="mt-2 text-sm text-noir/70">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
