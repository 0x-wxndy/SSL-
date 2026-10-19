import { Suspense } from "react";
import { cookies } from "next/headers";
import AdminShell from "@/components/layout/AdminShell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";
import { withParentAccess } from "@/lib/parent-access";

function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-2">
      <p className="text-sm text-ink-muted">Chargement du back-office…</p>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = parseSession(cookies().get(SESSION_COOKIE)?.value);
  const user = session ? withParentAccess(session) : null;

  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminShell initialUser={user}>{children}</AdminShell>
    </Suspense>
  );
}
