import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { canAccessAdmin, parseSession, SESSION_COOKIE } from "@/lib/auth";
import {
  getPersonnelBadgeProfile,
  updatePersonnelBadgeProfile,
} from "@/lib/personnel-badge";

export async function GET() {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  const profile = getPersonnelBadgeProfile(session.email);
  return NextResponse.json({ profile });
}

export async function PATCH(request: Request) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const body = (await request.json()) as {
    phone?: string;
    holderName?: string;
    gate?: string;
    active?: boolean;
  };

  const profile = updatePersonnelBadgeProfile(session.email, {
    phone: typeof body.phone === "string" ? body.phone.trim() : undefined,
    holderName: typeof body.holderName === "string" ? body.holderName.trim() : undefined,
    gate: typeof body.gate === "string" ? body.gate.trim() : undefined,
    active: typeof body.active === "boolean" ? body.active : undefined,
  });

  if (!profile) {
    return NextResponse.json({ error: "Aucun badge personnel lié à ce compte" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, profile });
}
