import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  canAccessParent,
  canAccessUser,
  parseSession,
  SESSION_COOKIE,
  type Session,
} from "@/lib/auth";
import { withParentAccess } from "@/lib/parent-access";
import { createDossier, listDossiersForAccount } from "@/lib/school-dossiers";
import { PACK_FORMULAS, type PackFormula } from "@/lib/admin-school-data";

const SESSION_MAX_AGE = 60 * 60 * 8;

function updateSessionCookie(session: Session) {
  const enriched = withParentAccess(session);
  const response = NextResponse.json({ ok: true, user: enriched });
  response.cookies.set(SESSION_COOKIE, JSON.stringify(enriched), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}

function resolvePack(pack: string): PackFormula {
  const direct = PACK_FORMULAS.find((p) => p === pack);
  if (direct) return direct;
  // Les formules publiques sont libellées différemment du back-office
  if (/après-midi/i.test(pack)) return "Pack 2";
  if (/soutien/i.test(pack)) return "Pack 3";
  if (/complète|full/i.test(pack)) return "Pack 4";
  return "Pack 1";
}

export async function POST(request: Request) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || (!canAccessUser(session) && !canAccessParent(session))) {
    return NextResponse.json({ error: "Compte utilisateur requis" }, { status: 401 });
  }

  const body = (await request.json()) as {
    childName?: string;
    age?: string;
    pack?: string;
  };

  const childName = body.childName?.trim();
  const age = body.age?.trim();
  const pack = body.pack?.trim();

  if (!childName || !age || !pack) {
    return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
  }

  const alreadyDeclared = listDossiersForAccount(session.email).some(
    (d) => d.name.toLowerCase() === childName.toLowerCase()
  );
  if (alreadyDeclared) {
    return NextResponse.json(
      { error: "Un dossier existe déjà pour cet enfant sur ce compte" },
      { status: 400 }
    );
  }

  createDossier({
    name: childName,
    age,
    pack: resolvePack(pack),
    status: "pending_admin2",
    linkedAccountEmail: session.email,
    parentName: session.name,
    parentEmail: session.email,
    notes: `Dossier soumis en ligne depuis le compte ${session.email}`,
  });

  return updateSessionCookie(session);
}
