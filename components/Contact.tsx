"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Instagram, Send, Mail } from "lucide-react";

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

const OBJET_OPTIONS = [
  { value: "devis", label: "Demande de devis" },
  { value: "info", label: "Demande d'information" },
  { value: "collab", label: "Collaboration" },
  { value: "autre", label: "Autre" },
];

/** Libellé du lien email (n'affiche pas l'adresse pour éviter que les visiteurs ne copient la mauvaise). */
const CONTACT_EMAIL_LABEL = "✉️ Envoyer un email";
const CONTACT_EMAIL_SEND = "angelgraphic094@gmail.com";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    objet: "",
    message: "",
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!form.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!form.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!form.telephone.trim()) {
      newErrors.telephone = "Le numéro de téléphone est requis";
    } else if (!validatePhone(form.telephone)) {
      newErrors.telephone = "Au moins 10 chiffres requis";
    }
    if (!form.objet) newErrors.objet = "Veuillez sélectionner un objet";
    if (!form.message.trim()) newErrors.message = "Le message est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    try {
      setErrorMessage("");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ nom: "", prenom: "", email: "", telephone: "", objet: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
        setErrorMessage(typeof data?.error === "string" ? data.error : "");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Erreur de connexion. Réessayez.");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-gold-light/30 bg-blanc px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="font-serif text-4xl font-light text-noir sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Contact
        </motion.h2>
        <motion.p
          className="mt-6 text-lg text-noir/70 md:mt-8 md:text-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Une question, un projet ? Écrivez-moi via le formulaire ou{" "}
          <a
            href={`mailto:${CONTACT_EMAIL_SEND}`}
            className="inline-flex items-center gap-1.5 font-medium text-gold underline decoration-gold/50 hover:decoration-gold"
          >
            <Mail className="h-4 w-4" />
            {CONTACT_EMAIL_LABEL}
          </a>
        </motion.p>

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-noir/80">
                  Nom <span className="text-gold">*</span>
                </span>
                <input
                  type="text"
                  required
                  value={form.nom}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, nom: e.target.value }));
                    if (errors.nom) setErrors((e) => ({ ...e, nom: "" }));
                  }}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-noir placeholder-noir/40 transition focus:outline-none focus:ring-2 ${
                    errors.nom
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gold-light/60 focus:border-gold focus:ring-gold/20"
                  }`}
                  placeholder="Votre nom"
                />
                {errors.nom && <p className="mt-1 text-xs text-red-600">{errors.nom}</p>}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-noir/80">
                  Prénom <span className="text-gold">*</span>
                </span>
                <input
                  type="text"
                  required
                  value={form.prenom}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, prenom: e.target.value }));
                    if (errors.prenom) setErrors((e) => ({ ...e, prenom: "" }));
                  }}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-noir placeholder-noir/40 transition focus:outline-none focus:ring-2 ${
                    errors.prenom
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gold-light/60 focus:border-gold focus:ring-gold/20"
                  }`}
                  placeholder="Votre prénom"
                />
                {errors.prenom && <p className="mt-1 text-xs text-red-600">{errors.prenom}</p>}
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-noir/80">
                Email <span className="text-gold">*</span>
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => {
                  setForm((f) => ({ ...f, email: e.target.value }));
                  if (errors.email) setErrors((e) => ({ ...e, email: "" }));
                }}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-noir placeholder-noir/40 transition focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gold-light/60 focus:border-gold focus:ring-gold/20"
                }`}
                placeholder="votre@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-noir/80">
                Téléphone <span className="text-gold">*</span>
              </span>
              <input
                type="tel"
                required
                value={form.telephone}
                onChange={(e) => {
                  setForm((f) => ({ ...f, telephone: e.target.value }));
                  if (errors.telephone) setErrors((e) => ({ ...e, telephone: "" }));
                }}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-noir placeholder-noir/40 transition focus:outline-none focus:ring-2 ${
                  errors.telephone
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gold-light/60 focus:border-gold focus:ring-gold/20"
                }`}
                placeholder="+33 6 12 34 56 78"
              />
              {errors.telephone && <p className="mt-1 text-xs text-red-600">{errors.telephone}</p>}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-noir/80">
                Objet <span className="text-gold">*</span>
              </span>
              <select
                required
                value={form.objet}
                onChange={(e) => {
                  setForm((f) => ({ ...f, objet: e.target.value }));
                  if (errors.objet) setErrors((e) => ({ ...e, objet: "" }));
                }}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-noir transition focus:outline-none focus:ring-2 ${
                  errors.objet
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gold-light/60 focus:border-gold focus:ring-gold/20"
                }`}
              >
                <option value="">Sélectionnez un objet</option>
                {OBJET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.objet && <p className="mt-1 text-xs text-red-600">{errors.objet}</p>}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-noir/80">
                Message <span className="text-gold">*</span>
              </span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => {
                  setForm((f) => ({ ...f, message: e.target.value }));
                  if (errors.message) setErrors((e) => ({ ...e, message: "" }));
                }}
                className={`w-full resize-none rounded-lg border bg-white px-4 py-3 text-noir placeholder-noir/40 transition focus:outline-none focus:ring-2 ${
                  errors.message
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gold-light/60 focus:border-gold focus:ring-gold/20"
                }`}
                placeholder="Votre message..."
              />
              {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-noir px-6 py-3 font-medium text-white transition hover:bg-noir/90 disabled:opacity-60 sm:w-auto"
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
                  : errorMessage || "Erreur d'envoi. Réessayez ou contactez-moi par email."}
              </p>
            )}
          </motion.form>

          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="font-serif text-xl font-light text-noir">Réseaux sociaux</h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = SOCIAL_ICONS[link.icon] ?? Instagram;
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-gold-light/60 bg-white px-4 py-2 text-noir/80 transition hover:border-gold hover:bg-gold/5 hover:text-gold"
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
            <p className="text-sm text-noir/60">
              Instagram :{" "}
              <a
                href={SOCIAL_LINKS[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold hover:underline"
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
