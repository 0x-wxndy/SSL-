import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { canAccessAdmin, parseSession, SESSION_COOKIE } from "@/lib/auth";
import { canPerformAction } from "@/lib/admin-rbac";
import { createPresence, listPresences } from "@/lib/school-dossiers";
import type { PresenceRecord } from "@/lib/admin-school-data";

export async function POST(request: Request) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  if (!canPerformAction(session, "school", "create")) {
    return NextResponse.json({ error: "Création non autorisée" }, { status: 403 });
  }

  const body = (await request.json()) as Partial<PresenceRecord>;
  if (!body.dossierId && !body.name?.trim()) {
    return NextResponse.json({ error: "Enfant requis" }, { status: 400 });
  }

  createPresence({
    dossierId: body.dossierId ?? "",
    name: body.name?.trim() ?? "",
    arrival: body.arrival ?? "—",
    departure: body.departure ?? "—",
    status: body.status ?? "Absent",
  });
  return NextResponse.json({ presences: listPresences() });
}
