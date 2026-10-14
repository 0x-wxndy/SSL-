import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { canAccessParent, parseSession, SESSION_COOKIE } from "@/lib/auth";
import { withParentAccess } from "@/lib/parent-access";
import { parentChildrenForAccount } from "@/lib/school-dossiers";

export async function GET() {
  const raw = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!raw) {
    return NextResponse.json({ error: "Session requise" }, { status: 401 });
  }

  // Le cookie peut être antérieur à la validation du dossier par un admin
  const session = withParentAccess(raw);
  if (!canAccessParent(session)) {
    return NextResponse.json({ error: "Espace parent non actif" }, { status: 403 });
  }

  return NextResponse.json({ children: parentChildrenForAccount(session.email) });
}
