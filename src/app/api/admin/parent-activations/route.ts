import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { canAccessAdmin, parseSession, SESSION_COOKIE } from "@/lib/auth";
import { listPendingAccountLinks } from "@/lib/school-dossiers";

export async function GET() {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session || !canAccessAdmin(session)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  return NextResponse.json({
    activations: listPendingAccountLinks().map((d) => ({
      dossierId: d.id,
      email: d.linkedAccountEmail,
      childName: d.name,
      age: d.age,
      pack: d.pack,
      status: d.status,
      submittedAt: d.submittedAt,
    })),
  });
}
