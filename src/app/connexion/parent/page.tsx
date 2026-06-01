import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function ParentLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Chargement...</div>}>
      <LoginForm
        portal="parent"
        title="Connexion — Espace Parent"
        subtitle="Accès réservé aux parents et tuteurs légaux"
        demoAccounts={[
          { label: "Parent — Famille Benali", email: "parent@ssl.dz", password: "parent123" },
        ]}
      />
    </Suspense>
  );
}
