import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, portal } = body as {
    email?: string;
    password?: string;
    portal?: "parent" | "admin";
  };

  if (!email || !password || (portal !== "parent" && portal !== "admin")) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const session = verifyCredentials(email, password, portal);
  if (!session) {
    return NextResponse.json({ error: "Identifiants incorrects pour cet espace" }, { status: 401 });
  }

  const redirect = portal === "parent" ? "/parent" : "/admin";
  const response = NextResponse.json({ ok: true, redirect, user: session });
  response.cookies.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
