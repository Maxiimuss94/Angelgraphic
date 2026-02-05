import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "angelgraphic094@gmail.com";

/**
 * Route API contact. Envoie les messages vers angelgraphic094@gmail.com via Resend.
 * Requiert RESEND_API_KEY dans .env.local (et dans les variables d'environnement Vercel).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, prenom, email, telephone, objet, message } = body as {
      nom?: string;
      prenom?: string;
      email?: string;
      telephone?: string;
      objet?: string;
      message?: string;
    };

    if (!nom || !prenom || !email || !telephone || !objet || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL ?? CONTACT_EMAIL;

    if (!resendApiKey) {
      console.error("[Contact] RESEND_API_KEY manquante. Ajoutez-la dans .env.local et sur Vercel.");
      return NextResponse.json(
        { error: "Service d'envoi non configuré. Veuillez réessayer plus tard." },
        { status: 503 }
      );
    }

    const client = new Resend(resendApiKey);
    const labels: Record<string, string> = {
      devis: "Demande de devis",
      info: "Demande d'information",
      collab: "Collaboration",
      autre: "Autre",
    };

    const { error } = await client.emails.send({
      from: "Contact Angel Graphic <onboarding@resend.dev>",
      to: recipient,
      reply_to: email,
      subject: `${labels[objet] ?? objet} — ${nom} ${prenom}`,
      html: `
        <p><strong>Nom :</strong> ${nom} ${prenom}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Objet :</strong> ${labels[objet] ?? objet}</p>
        <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ddd;" />
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap;">${String(message).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      `,
    });

    if (error) {
      console.error("[Contact] Resend:", error);
      return NextResponse.json(
        { error: "L'envoi a échoué. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[Contact]", e);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi." },
      { status: 500 }
    );
  }
}
