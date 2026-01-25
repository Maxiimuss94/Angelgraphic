/**
 * Constantes et configuration du site ANGEL GRAPHIC.
 * Modifier ici : email de contact, liens réseaux, navigation.
 */

export const SITE = {
  name: "ANGEL GRAPHIC",
  slogan: "La simplicité au service du sens",
  email: "angelgraphic094@gmail.com",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  {
    label: "À propos",
    children: [
      { href: "/a-propos/mon-histoire", label: "Mon Histoire" },
      { href: "/a-propos/ma-vision", label: "Ma Vision" },
    ],
  },
  { href: "/portfolio", label: "Portfolio" },
  {
    label: "Projets",
    children: [
      { href: "/projets?cat=Art", label: "Art" },
      { href: "/projets?cat=Flyers", label: "Flyers" },
      { href: "/projets?cat=Carrousels", label: "Carrousels" },
      { href: "/projets?cat=Social%20media", label: "Social media" },
      { href: "/projets?cat=Logo", label: "Logo" },
      { href: "/projets?cat=Cartes", label: "Cartes" },
      { href: "/projets?cat=Challenge", label: "Challenge" },
    ],
  },
  { href: "/services", label: "Services" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/angelgraphic.official",
    icon: "instagram",
  },
  {
    name: "Pinterest",
    href: "https://pin.it/LM1G1kbMg",
    icon: "pinterest",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@angelgraphic.official",
    icon: "tiktok",
  },
] as const;

export const PROJECT_CATEGORIES = [
  "Tous",
  "Art",
  "Flyers",
  "Carrousels",
  "Social media",
  "Logo",
  "Cartes",
  "Challenge",
] as const;
