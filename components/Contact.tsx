"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { Instagram, Send } from "lucide-react";

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  pinterest: PinterestIcon,
  tiktok: TikTokIcon,
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    objet: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ nom: "", prenom: "", objet: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-gold-light/50 bg-blanc px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="font-serif text-3xl font-semibold text-bordeaux sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.h2>
        <motion.p
          className="mt-4 text-noir/80"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Formulaire à destination de{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-bordeaux underline hover:no-underline"
          >
            {SITE.email}
          </a>
          . Ou suivez-moi sur les réseaux.
        </motion.p>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-noir/80">
                  Nom
                </span>
                <input
                  type="text"
                  required
                  value={form.nom}
                  onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                  className="w-full rounded-lg border border-gold-light/60 bg-blanc px-4 py-3 text-noir placeholder-noir/40 focus:border-bordeaux focus:outline-none focus:ring-1 focus:ring-bordeaux"
                  placeholder="Votre nom"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-noir/80">
                  Prénom
                </span>
                <input
                  type="text"
                  required
                  value={form.prenom}
                  onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))}
                  className="w-full rounded-lg border border-gold-light/60 bg-blanc px-4 py-3 text-noir placeholder-noir/40 focus:border-bordeaux focus:outline-none focus:ring-1 focus:ring-bordeaux"
                  placeholder="Votre prénom"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-noir/80">
                Objet
              </span>
              <input
                type="text"
                required
                value={form.objet}
                onChange={(e) => setForm((f) => ({ ...f, objet: e.target.value }))}
                className="w-full rounded-lg border border-gold-light/60 bg-blanc px-4 py-3 text-noir placeholder-noir/40 focus:border-bordeaux focus:outline-none focus:ring-1 focus:ring-bordeaux"
                placeholder="Objet du message"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-noir/80">
                Message
              </span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full resize-none rounded-lg border border-gold-light/60 bg-blanc px-4 py-3 text-noir placeholder-noir/40 focus:border-bordeaux focus:outline-none focus:ring-1 focus:ring-bordeaux"
                placeholder="Votre message..."
              />
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-bordeaux px-6 py-3 font-medium text-white transition hover:bg-bordeaux-dark disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? (
                "Envoi..."
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer
                </>
              )}
            </button>
            {(status === "success" || status === "error") && (
              <p
                role="status"
                aria-live="polite"
                className={`text-sm font-medium ${status === "success" ? "text-green-700" : "text-red-700"}`}
              >
                {status === "success"
                  ? "Message envoyé. Merci, je vous recontacte rapidement."
                  : (
                    <>
                      Erreur d&apos;envoi. Réessayez ou contactez-moi à{" "}
                      <a href={`mailto:${SITE.email}`} className="underline">
                        {SITE.email}
                      </a>
                      .
                    </>
                  )}
              </p>
            )}
          </motion.form>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h3 className="font-serif text-lg font-semibold text-noir">
                Réseaux sociaux
              </h3>
              <ul className="mt-4 flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = SOCIAL_ICONS[link.icon] ?? Instagram;
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-gold-light/60 bg-blanc px-4 py-2 text-noir/80 transition hover:border-bordeaux hover:text-bordeaux"
                        aria-label={link.name}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{link.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <p className="text-sm text-noir/70">
              Instagram :{" "}
              <a
                href={SOCIAL_LINKS[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bordeaux hover:underline"
              >
                @angelgraphic.official
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
