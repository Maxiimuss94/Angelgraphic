"use client";

import { motion } from "framer-motion";

const INTRO = `Angel Graphic vous accompagne dans la création et le développement de votre image à travers une gamme complète de services :`;

const SERVICES = [
  {
    title: "Identité visuelle & branding",
    desc: "Création de logos, chartes graphiques et univers visuels.",
  },
  {
    title: "Design graphique",
    desc: "Supports print et digitaux (affiches, flyers, cartes de visite, brochures).",
  },
  {
    title: "Design digital & réseaux sociaux",
    desc: "Création de contenus adaptés pour renforcer votre présence en ligne.",
  },
  {
    title: "Accompagnement & conseil visuel",
    desc: "Analyse d'image et conseils stratégiques.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-t border-gold-light/50 bg-[#f5f3ef] px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="font-serif text-3xl font-semibold text-bordeaux sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          Services
        </motion.h2>
        <motion.p
          className="mt-6 leading-relaxed text-noir/80"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {INTRO}
        </motion.p>

        <ul className="mt-12 space-y-8 md:mt-16">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.title}
              className="rounded-xl border border-gold-light/60 bg-blanc/80 p-6 shadow-sm transition hover:border-gold/40 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h3 className="font-serif text-lg font-semibold text-bordeaux">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-noir/70">
                {s.desc}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
