import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";
import { withParentAccess } from "@/lib/parent-access";

const SESSION_MAX_AGE = 60 * 60 * 8;

export async function GET() {
  const raw = cookies().get(SESSION_COOKIE)?.value;
  const session = parseSession(raw);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const enriched = withParentAccess(session);
  if (JSON.stringify(enriched) !== JSON.stringify(session)) {
    const response = NextResponse.json({ user: enriched });
    response.cookies.set(SESSION_COOKIE, JSON.stringify(enriched), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return response;
  }

  return NextResponse.json({ user: enriched });
}
