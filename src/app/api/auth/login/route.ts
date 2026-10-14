import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyCredentials, type AuthPortal } from "@/lib/auth";
import { withParentAccess } from "@/lib/parent-access";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, portal } = body as {
    email?: string;
    password?: string;
    portal?: AuthPortal;
  };

  if (
    !email ||
    !password ||
    (portal !== "parent" && portal !== "admin" && portal !== "user" && portal !== "alzheimer")
  ) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const session = verifyCredentials(email, password, portal);
  if (!session) {
    return NextResponse.json({ error: "Identifiants incorrects pour cet espace" }, { status: 401 });
  }

  const enriched = withParentAccess(session);

  const redirect =
    portal === "parent"
      ? "/parent"
      : portal === "user"
        ? "/marketplace/compte"
        : portal === "alzheimer"
          ? "/alzheimer"
          : "/admin";
  const response = NextResponse.json({ ok: true, redirect, user: enriched });
  response.cookies.set(SESSION_COOKIE, JSON.stringify(enriched), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
