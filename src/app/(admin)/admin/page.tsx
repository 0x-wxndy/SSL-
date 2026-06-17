import { Suspense } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="text-sm text-ink-muted">Chargement…</p>}>
      <AdminDashboard />
    </Suspense>
  );
}
