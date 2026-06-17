import { Suspense } from "react";
import AdminShell from "@/components/layout/AdminShell";
import AdminDashboard from "@/components/admin/AdminDashboard";

function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-2">
      <p className="text-sm text-ink-muted">Chargement du back-office…</p>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
