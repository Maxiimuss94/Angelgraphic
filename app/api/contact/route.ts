import { NextResponse } from "next/server";

/**
 * Route API contact. Simulation d'envoi.
 * Pour un envoi réel : intégrer Resend, Nodemailer ou Formspree (voir README).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, prenom, objet, message } = body as {
      nom?: string;
      prenom?: string;
      objet?: string;
      message?: string;
    };

    if (!nom || !prenom || !objet || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    // Envoi réel : intégrer Resend, Nodemailer ou Formspree (voir README).
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi." },
      { status: 500 }
    );
  }
}
