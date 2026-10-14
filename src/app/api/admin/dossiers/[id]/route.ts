import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { canAccessAdmin, parseSession, SESSION_COOKIE } from "@/lib/auth";
import { canPerformAction } from "@/lib/admin-rbac";
import {
  deleteDossier,
  listDossiers,
  listPresences,
  updateDossier,
} from "@/lib/school-dossiers";
import type { ChildDossier } from "@/lib/admin-school-data";

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const patch = (await request.json()) as Partial<ChildDossier>;

  // Passer un dossier à « validé » ouvre l'espace parent : réservé aux validateurs
  const isValidation = patch.status === "validated" || patch.physicalValidated !== undefined;
  const allowed = isValidation
    ? canPerformAction(session, "school", "validate") ||
      canPerformAction(session, "school", "edit")
    : canPerformAction(session, "school", "edit");
  if (!allowed) {
    return NextResponse.json({ error: "Modification non autorisée" }, { status: 403 });
  }

  const updated = updateDossier(params.id, {
    ...patch,
    ...(patch.physicalValidated ? { physicalValidatedBy: session.name } : {}),
  });
  if (!updated) {
    return NextResponse.json({ error: "Dossier introuvable" }, { status: 404 });
  }
  return NextResponse.json({ dossier: updated, dossiers: listDossiers(), presences: listPresences() });
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  if (!canPerformAction(session, "school", "create")) {
    return NextResponse.json({ error: "Suppression non autorisée" }, { status: 403 });
  }
  if (!deleteDossier(params.id)) {
    return NextResponse.json({ error: "Dossier introuvable" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, dossiers: listDossiers(), presences: listPresences() });
}
