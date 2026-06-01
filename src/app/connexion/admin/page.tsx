import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Chargement...</div>}>
      <LoginForm
        portal="admin"
        title="Connexion — Back-office"
        subtitle="Accès réservé à la direction, administration et personnel"
        demoAccounts={[
          { label: "Admin Principal", email: "admin@ssl.dz", password: "admin123" },
          { label: "Admin Secondaire", email: "admin2@ssl.dz", password: "admin2123" },
          { label: "Staff", email: "staff@ssl.dz", password: "staff123" },
        ]}
      />
    </Suspense>
  );
}
