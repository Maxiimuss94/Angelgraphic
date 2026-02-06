"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PORTFOLIO_PAGE_IMAGES } from "@/lib/portfolio";

type PortfolioItem = {
  id: string;
  index: number;
  image: string;
  title: string;
  aspect: "tall" | "square" | "wide";
};

const ASPECTS: PortfolioItem["aspect"][] = ["tall", "square", "wide", "tall", "square"];

function getItems(): PortfolioItem[] {
  return PORTFOLIO_PAGE_IMAGES.map((src, i) => {
    const name = src.split("/").pop() ?? "";
    const base = name.replace(/\.[^.]+$/, "");
    return {
      id: `portfolio-${i}`,
      index: i,
      image: src,
      title: base,
      aspect: ASPECTS[i % ASPECTS.length],
    };
  });
}

const STAGGER = 0.04;

function PortfolioCard({
  item,
  index,
  onSelect,
}: {
  item: PortfolioItem;
  index: number;
  onSelect: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
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
      className={`group relative w-full overflow-hidden rounded-sm focus:outline-none focus:ring-1 focus:ring-gold focus:ring-offset-2 focus:ring-offset-[#050505] ${aspectClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * STAGGER,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0">
        {!loaded && (
          <div className="absolute inset-0 rounded-sm bg-white/5 animate-pulse" aria-hidden />
        )}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="rounded-sm object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-sm bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="rounded-full border border-gold/60 bg-black/40 px-5 py-2 font-serif text-sm font-light tracking-wide text-gold">
          Voir
        </span>
      </div>
    </motion.button>
  );
}

function ModalDetail({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[currentIndex];
  if (!item) return null;

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex bg-[#050505]"
      role="dialog"
      aria-modal="true"
      aria-label="Détail du projet"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-sm text-white/70 transition hover:bg-white/10 hover:text-gold"
        aria-label="Fermer"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="flex flex-1 flex-col md:flex-row">
        <div className="relative flex flex-1 items-center justify-center p-4 md:p-8">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full min-h-[50vh] w-full"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </motion.div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 p-4 md:flex-col md:justify-center md:border-t-0 md:border-l md:px-6">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="flex h-12 w-12 items-center justify-center rounded-sm text-white/70 transition hover:bg-white/10 hover:text-gold disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <p className="font-serif text-sm font-light text-gold">
            {currentIndex + 1} / {items.length}
          </p>
          <button
            type="button"
            onClick={onNext}
            disabled={currentIndex === items.length - 1}
            className="flex h-12 w-12 items-center justify-center rounded-sm text-white/70 transition hover:bg-white/10 hover:text-gold disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CustomCursor({ visible, x, y }: { visible: boolean; x: number; y: number }) {
  if (!visible) return null;
  return (
    <div
      className="pointer-events-none fixed z-[200] hidden md:block"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span className="rounded-full border border-gold/70 bg-black/60 px-4 py-2 font-serif text-xs font-light tracking-widest text-gold backdrop-blur-sm">
        Voir
      </span>
    </div>
  );
}

export default function PortfolioShowcase() {
  const items = useMemo(() => getItems(), []);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ visible: false, x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursor({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setCursor((c) => ({ ...c, visible: false }));
  };

  const openModal = (index: number) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);
  const goPrev = () => setModalIndex((i) => (i === null ? null : i > 0 ? i - 1 : i));
  const goNext = () =>
    setModalIndex((i) => (i === null ? null : i < items.length - 1 ? i + 1 : i));

  return (
    <div className="min-h-screen bg-[#050505]">
      <section id="portfolio" className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 md:mb-16"
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

          <div
            className="portfolio-gallery grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            onMouseMove={(e) => setCursor({ visible: true, x: e.clientX, y: e.clientY })}
            onMouseLeave={() => setCursor((c) => ({ ...c, visible: false }))}
          >
            {items.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                onSelect={() => openModal(index)}
              />
            ))}
          </div>

          <CustomCursor visible={cursor.visible} x={cursor.x} y={cursor.y} />

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

      <AnimatePresence>
        {modalIndex !== null && (
          <ModalDetail
            items={items}
            currentIndex={modalIndex}
            onClose={closeModal}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
