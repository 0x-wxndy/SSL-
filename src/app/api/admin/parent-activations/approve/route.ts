import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { canAccessAdmin, parseSession, SESSION_COOKIE } from "@/lib/auth";
import { canPerformAction } from "@/lib/admin-rbac";
import { setDossierStatus } from "@/lib/school-dossiers";

export async function POST(request: Request) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  if (!canPerformAction(session, "school", "validate")) {
    return NextResponse.json({ error: "Validation non autorisée" }, { status: 403 });
  }

  const body = (await request.json()) as { dossierId?: string };
  const dossierId = body.dossierId?.trim();
  if (!dossierId) {
    return NextResponse.json({ error: "Dossier requis" }, { status: 400 });
  }

  const approved = setDossierStatus(dossierId, "validated");
  if (!approved) {
    return NextResponse.json({ error: "Dossier introuvable" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, dossier: approved });
}
