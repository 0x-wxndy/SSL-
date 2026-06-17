import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSession, SESSION_COOKIE, type Session } from "@/lib/auth";

const SESSION_MAX_AGE = 60 * 60 * 8;

function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export async function GET() {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  return NextResponse.json({ user: session });
}

export async function PATCH(request: Request) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<
    Pick<Session, "name" | "phone" | "bio" | "avatarUrl">
  >;

  const name = typeof body.name === "string" ? body.name.trim() : session.name;
  if (!name) {
    return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
  }

  const phone =
    body.phone === undefined
      ? session.phone
      : typeof body.phone === "string"
        ? body.phone.trim()
        : undefined;

  const bio =
    body.bio === undefined
      ? session.bio
      : typeof body.bio === "string"
        ? body.bio.trim()
        : undefined;

  let avatarUrl = session.avatarUrl;
  if (body.avatarUrl !== undefined) {
    if (body.avatarUrl === "" || body.avatarUrl === null) {
      avatarUrl = undefined;
    } else if (typeof body.avatarUrl === "string") {
      if (body.avatarUrl.startsWith("data:") && body.avatarUrl.length > 280_000) {
        return NextResponse.json(
          { error: "Image trop volumineuse (max ~200 Ko en démo)" },
          { status: 400 }
        );
      }
      avatarUrl = body.avatarUrl.trim() || undefined;
    }
  }

  const updated: Session = {
    ...session,
    name,
    phone: phone || undefined,
    bio: bio || undefined,
    avatarUrl,
  };

  const response = NextResponse.json({ ok: true, user: updated });
  response.cookies.set(SESSION_COOKIE, JSON.stringify(updated), sessionCookieOptions());
  return response;
}
