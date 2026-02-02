"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/constants";
import { CAROUSEL_IMAGES } from "@/lib/carousel";
import { ChevronDown } from "lucide-react";

const AUTOPLAY_MS = 5000;
const KEN_BURNS_DURATION = AUTOPLAY_MS / 1000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, []);

  const scrollToContent = () => {
    document.getElementById("hero-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* Carousel images with Ken Burns */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-[-8%]"
              initial={{ scale: 1, x: 0, y: 0 }}
              animate={{ scale: 1.06, x: "2%", y: "1%" }}
              transition={{ duration: KEN_BURNS_DURATION, ease: "linear" }}
            >
              <Image
                src={CAROUSEL_IMAGES[index]}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-noir/50 via-noir/30 to-noir/70"
          aria-hidden
        />
      </div>

      {/* Glassmorphism overlay with title & slogan */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 text-center">
        <motion.div
          className="rounded-2xl border border-white/20 bg-white/10 px-8 py-10 backdrop-blur-md md:px-14 md:py-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="font-serif text-4xl font-light tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {SITE.name.split(" ").map((word, i) => (
              <motion.span
                key={word}
                className="inline-block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
                {i < SITE.name.split(" ").length - 1 && "\u00A0"}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="mt-4 font-serif text-lg font-light italic text-gold-light sm:text-xl md:mt-6 md:text-2xl lg:text-3xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {SITE.slogan}
          </motion.p>
        </motion.div>

        {/* Scroll Down button */}
        <motion.button
          type="button"
          onClick={scrollToContent}
          className="mt-16 flex flex-col items-center gap-2 text-white/90 transition hover:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          aria-label="Défiler vers le bas"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em]">Découvrir</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.span>
        </motion.button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="h-1.5 w-1.5 rounded-full transition-colors"
            style={{
              backgroundColor: i === index ? "rgba(197, 160, 89, 1)" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Voir slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
