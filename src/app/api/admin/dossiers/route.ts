import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { canAccessAdmin, listLinkableAccounts, parseSession, SESSION_COOKIE } from "@/lib/auth";
import { canPerformAction } from "@/lib/admin-rbac";
import {
  createDossier,
  listDossiers,
  listPresences,
  type DossierInput,
} from "@/lib/school-dossiers";

export async function GET() {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  return NextResponse.json({
    dossiers: listDossiers(),
    presences: listPresences(),
    accounts: listLinkableAccounts(),
  });
}

export async function POST(request: Request) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  if (!canPerformAction(session, "school", "create")) {
    return NextResponse.json({ error: "Création non autorisée" }, { status: 403 });
  }

  const body = (await request.json()) as DossierInput;
  if (!body?.name?.trim()) {
    return NextResponse.json({ error: "Nom de l'enfant requis" }, { status: 400 });
  }

  const dossier = createDossier({
    ...body,
    name: body.name.trim(),
    physicalValidatedBy: body.physicalValidated ? session.name : "",
  });
  return NextResponse.json({ dossier, dossiers: listDossiers(), presences: listPresences() });
}
