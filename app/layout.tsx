import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANGEL GRAPHIC | Design graphique & identité visuelle",
  description:
    "La simplicité au service du sens. Freelance en conception graphique et digitale — identités visuelles, branding, design print & digital. Plus de 5 ans d'expérience.",
  openGraph: {
    title: "ANGEL GRAPHIC | Design graphique & identité visuelle",
    description:
      "La simplicité au service du sens. Création d'identités visuelles fortes et solutions visuelles sur mesure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
