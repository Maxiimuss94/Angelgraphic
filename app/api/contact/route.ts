import { NextResponse } from "next/server";

/**
 * Route API contact. Accepte nom, prenom, email, telephone, objet (devis|info|collab|autre), message.
 * Pour envoi réel : RESEND_API_KEY + CONTACT_EMAIL dans .env.local.
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

    const contactEmail = process.env.CONTACT_EMAIL || "angelgraphic094@gmail.com";
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = (await import("resend")).Resend;
        const client = new resend(resendApiKey);
        const labels: Record<string, string> = {
          devis: "Demande de devis",
          info: "Demande d'information",
          collab: "Collaboration",
          autre: "Autre",
        };
        await client.emails.send({
          from: "Contact <onboarding@resend.dev>",
          to: contactEmail,
          subject: `${labels[objet] ?? objet} — ${nom} ${prenom}`,
          html: `Nom : ${nom} ${prenom}<br>Email : ${email}<br>Téléphone : ${telephone}<br>Objet : ${labels[objet] ?? objet}<br><br>Message :<br>${String(message).replace(/\n/g, "<br>")}`,
        });
      } catch (e) {
        console.error("[Contact] Resend:", e);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi." },
      { status: 500 }
    );
  }
}
