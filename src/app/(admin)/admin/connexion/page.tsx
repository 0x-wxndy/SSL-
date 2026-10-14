import { Suspense } from "react";
import LoginHub from "@/components/auth/LoginHub";

export default function AdminConnexionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-ink-muted">
          Chargement...
        </div>
      }
    >
      <LoginHub portals={["admin"]} />
    </Suspense>
  );
}
