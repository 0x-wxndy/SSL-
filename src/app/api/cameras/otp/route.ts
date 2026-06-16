import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CAMERA_DEMO_OTP,
  CAMERA_OTP_COOKIE,
  SESSION_COOKIE,
  canAccessParent,
  parseSession,
} from "@/lib/auth";

function unauthorized() {
  return NextResponse.json({ error: "Accès non autorisé" }, { status: 401 });
}

export async function GET() {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!canAccessParent(session)) return unauthorized();

  const verified = cookies().get(CAMERA_OTP_COOKIE)?.value === "verified";
  return NextResponse.json({ verified });
}

export async function POST(request: Request) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!canAccessParent(session)) return unauthorized();

  const body = (await request.json()) as { otp?: string };
  const otp = body.otp?.trim();

  if (!otp || otp.length !== 6) {
    return NextResponse.json({ error: "Saisissez le code à 6 chiffres" }, { status: 400 });
  }

  if (otp !== CAMERA_DEMO_OTP) {
    return NextResponse.json({ error: "Code incorrect — vérifiez et réessayez" }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true, verified: true });
  response.cookies.set(CAMERA_OTP_COOKIE, "verified", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30,
  });
  return response;
}

export async function DELETE() {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!canAccessParent(session)) return unauthorized();

  const response = NextResponse.json({ ok: true });
  response.cookies.set(CAMERA_OTP_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
