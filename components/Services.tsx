"use client";

import { motion } from "framer-motion";
import { Palette, FileText, Smartphone, Lightbulb } from "lucide-react";

const INTRO = `Angel Graphic vous accompagne dans la création et le développement de votre image à travers une gamme complète de services :`;

const SERVICES = [
  {
    icon: Palette,
    title: "Identité visuelle & branding",
    desc: "Création de logos, chartes graphiques et univers visuels.",
    details: "Développement d'une identité visuelle cohérente qui reflète votre essence et renforce votre positionnement.",
  },
  {
    icon: FileText,
    title: "Design graphique",
    desc: "Supports print et digitaux (affiches, flyers, cartes de visite, brochures).",
    details: "Conception de supports visuels percutants pour tous vos besoins de communication imprimée et digitale.",
  },
  {
    icon: Smartphone,
    title: "Design digital & réseaux sociaux",
    desc: "Création de contenus adaptés pour renforcer votre présence en ligne.",
    details: "Stratégie de contenu visuel optimisée pour vos réseaux sociaux et plateformes digitales.",
  },
  {
    icon: Lightbulb,
    title: "Accompagnement & conseil visuel",
    desc: "Analyse d'image et conseils stratégiques.",
    details: "Audit de votre image de marque et recommandations personnalisées pour optimiser votre communication visuelle.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-t border-gold-light/30 bg-blanc-casse px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="font-serif text-4xl font-light text-noir sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Services
        </motion.h2>
        <motion.p
          className="mt-6 text-lg leading-relaxed text-noir/70 md:mt-8 md:text-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {INTRO}
        </motion.p>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 lg:grid-cols-2">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-gold-light/30 bg-white/60 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold/50 hover:bg-white/80 hover:shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-noir md:text-2xl">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-noir/70 md:text-base">
          {service.desc}
        </p>
        <motion.p
          className="mt-4 text-sm leading-relaxed text-noir/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          {service.details}
        </motion.p>
      </div>
    </motion.div>
  );
}
