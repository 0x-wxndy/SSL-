import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CAMERA_DEMO_OTP, SESSION_COOKIE, canAccessParent, parseSession } from "@/lib/auth";

export async function POST() {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!canAccessParent(session)) {
    return NextResponse.json({ error: "Accès non autorisé" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    message: "Code envoyé par SMS au numéro enregistré (+213 55 XX XX XX).",
    demoHint: `MVP — code de démonstration : ${CAMERA_DEMO_OTP}`,
    expiresInMinutes: 5,
  });
}
