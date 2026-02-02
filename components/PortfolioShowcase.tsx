"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { X } from "lucide-react";
import { PORTFOLIO_IMAGES_ORDERED } from "@/lib/carousel";

type PortfolioItem = {
  id: string;
  title: string;
  image: string;
  aspect: "tall" | "square" | "wide";
};

const ASPECTS: PortfolioItem["aspect"][] = ["tall", "square", "wide", "tall", "square"];

function toItems(): PortfolioItem[] {
  return PORTFOLIO_IMAGES_ORDERED.map((src, i) => {
    const name = src.split("/").pop() ?? "";
    const base = name.replace(/\.[^.]+$/, "").replace(/^Artboard\s+/, "");
    return {
      id: `portfolio-${i}`,
      title: base,
      image: src,
      aspect: ASPECTS[i % ASPECTS.length],
    };
  });
}

function distributeMasonry<T>(items: T[], cols: number): T[][] {
  const colsData: T[][] = Array.from({ length: cols }, () => []);
  const colHeights = [0, 0, 0];
  items.forEach((item) => {
    const col = colHeights[0] <= colHeights[1] && colHeights[0] <= colHeights[2]
      ? 0
      : colHeights[1] <= colHeights[2]
        ? 1
        : 2;
    colsData[col].push(item);
    colHeights[col] += 1;
  });
  return colsData;
}

function MasonryColumn({
  items,
  y,
  onSelect,
}: {
  items: PortfolioItem[];
  y: MotionValue<number>;
  onSelect: (item: PortfolioItem) => void;
}) {
  return (
    <motion.div
      className="flex flex-col gap-6"
      style={{ y }}
    >
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} onSelect={() => onSelect(item)} />
      ))}
    </motion.div>
  );
}

function PortfolioCard({ item, onSelect }: { item: PortfolioItem; onSelect: () => void }) {
  const aspectClass =
    item.aspect === "tall"
      ? "aspect-[4/5]"
      : item.aspect === "square"
        ? "aspect-square"
        : "aspect-[5/4]";
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={`group relative w-full overflow-hidden focus:outline-none focus:ring-[0.5px] focus:ring-gold focus:ring-offset-0 focus:ring-offset-[#0a0a0a] hover:shadow-[inset_0_0_0_0.5px_rgb(197_160_89/0.6)] ${aspectClass}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(197,160,89,0.15)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="font-serif text-base font-light tracking-wide text-gold md:text-lg">
          {item.title}
        </p>
      </div>
    </motion.button>
  );
}

function LightboxFullscreen({
  item,
  onClose,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] p-4 md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Galerie plein écran"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white/70 transition hover:text-gold"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full min-h-[60vh] w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <p className="mt-4 text-center font-serif text-sm font-light text-gold md:text-base">
              {item.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PortfolioShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const yMid = useTransform(scrollYProgress, [0, 0.5, 1], [-40, 0, 40]);
  const yRight = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -120]);

  const columns = useMemo(() => distributeMasonry(toItems(), 3), []);

  return (
    <div ref={ref} className="min-h-screen bg-[#0a0a0a]">
      <section id="portfolio" className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-4xl font-light text-white sm:text-5xl md:text-6xl">
              Portfolio
            </h2>
            <p className="mt-4 text-lg text-white/60 md:text-xl">
              Sélection des meilleurs travaux.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MasonryColumn items={columns[0]} y={yLeft} onSelect={setLightbox} />
            <MasonryColumn items={columns[1]} y={yMid} onSelect={setLightbox} />
            <MasonryColumn items={columns[2]} y={yRight} onSelect={setLightbox} />
          </motion.div>

          <Link
            href="/projets"
            className="mt-16 block text-center text-sm font-medium text-white/60 transition hover:text-gold md:mt-20"
          >
            Voir tous les projets
          </Link>
        </div>
      </section>

      <section className="border-t border-white/5 px-4 py-20 md:px-8 md:py-28">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif text-2xl font-light text-white md:text-3xl lg:text-4xl">
            Votre projet mérite une identité unique.
          </p>
          <p className="mt-2 font-serif text-2xl font-light text-gold md:text-3xl lg:text-4xl">
            Discutons-en.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center rounded-sm border border-gold/50 bg-transparent px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10 hover:border-gold"
          >
            Me contacter
          </Link>
        </motion.div>
      </section>

      <LightboxFullscreen item={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
