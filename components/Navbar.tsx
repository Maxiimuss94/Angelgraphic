"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Menu, X, ChevronDown } from "lucide-react";

/** Logo ANGEL GRAPHIC — public/Angel Graphic New Logo Design 3 PNG.png */
const LOGO_PATH = "/Angel%20Graphic%20New%20Logo%20Design%203%20PNG.png";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenus = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-blanc/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenus}
          className="relative flex items-center gap-2"
          aria-label={`${SITE.name} - Accueil`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_PATH}
              alt=""
              className="h-full w-full object-contain"
              width={40}
              height={40}
            />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-noir sm:text-xl">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => {
            if ("children" in item) {
              const isOpen = openDropdown === item.label;
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-0.5 rounded px-3 py-2 text-sm font-medium text-noir/80 transition hover:text-bordeaux"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full min-w-[180px] rounded-lg border border-gold-light/50 bg-blanc py-2 shadow-lg"
                      >
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={closeMenus}
                              className="block px-4 py-2 text-sm text-noir/80 transition hover:bg-gold-light/30 hover:text-bordeaux"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            }
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenus}
                  className="rounded px-3 py-2 text-sm font-medium text-noir/80 transition hover:text-bordeaux"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-noir md:hidden"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gold-light/40 bg-blanc md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((item) => {
                if ("children" in item) {
                  return (
                    <li key={item.label}>
                      <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-bordeaux">
                        {item.label}
                      </span>
                      <ul className="ml-2 flex flex-col">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={closeMenus}
                              className="block rounded px-3 py-2 text-sm text-noir/80 hover:bg-gold-light/30"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenus}
                      className="block rounded px-3 py-2 text-sm font-medium text-noir"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
