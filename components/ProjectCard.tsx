"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LightboxProject } from "./Lightbox";

type Props = {
  project: LightboxProject;
  index: number;
  onClick: () => void;
};

export default function ProjectCard({ project, index, onClick }: Props) {
  const isSanity = project.image.startsWith("https://cdn.sanity.io");

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative aspect-square w-full overflow-hidden rounded-xl bg-gold-light/20 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isSanity ? (
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={600}
          className="h-full w-full object-cover transition group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 transition group-hover:opacity-100">
        <p className="text-xs font-medium uppercase tracking-wider text-gold-light">
          {project.category}
        </p>
        <p className="font-serif text-base font-light text-white">
          {project.title}
        </p>
      </div>
    </motion.button>
  );
}
