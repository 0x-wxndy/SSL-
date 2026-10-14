import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { canAccessAdmin, parseSession, SESSION_COOKIE } from "@/lib/auth";
import { canPerformAction } from "@/lib/admin-rbac";
import { deletePresence, listPresences, updatePresence } from "@/lib/school-dossiers";
import type { PresenceRecord } from "@/lib/admin-school-data";

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  if (!canPerformAction(session, "school", "edit")) {
    return NextResponse.json({ error: "Modification non autorisée" }, { status: 403 });
  }

  const patch = (await request.json()) as Partial<PresenceRecord>;
  if (!updatePresence(params.id, patch)) {
    return NextResponse.json({ error: "Ligne introuvable" }, { status: 404 });
  }
  return NextResponse.json({ presences: listPresences() });
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  if (!canPerformAction(session, "school", "create")) {
    return NextResponse.json({ error: "Suppression non autorisée" }, { status: 403 });
  }
  if (!deletePresence(params.id)) {
    return NextResponse.json({ error: "Ligne introuvable" }, { status: 404 });
  }
  return NextResponse.json({ presences: listPresences() });
}
