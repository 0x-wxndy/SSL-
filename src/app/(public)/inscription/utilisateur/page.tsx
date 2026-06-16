import BasicSignupForm, { inputCls } from "@/components/auth/BasicSignupForm";

export default function UtilisateurSignupPage() {
  return (
    <BasicSignupForm
      title="Compte utilisateur"
      subtitle="Pour les personnes à la recherche d'un service d'aide sociale : parcourir la marketplace et contacter des prestataires."
      successTitle="Compte utilisateur créé (démo)"
      successMessage="Connectez-vous avec le compte démo utilisateur pour parcourir la marketplace et tester le parcours."
      loginHref="/connexion?role=user"
      loginPortalLabel="utilisateur"
      extraFields={
        <div>
          <label className="text-xs font-semibold text-ink-muted">Wilaya</label>
          <input required placeholder="Ex. Alger, Oran…" className={`${inputCls} mt-1`} />
        </div>
      }
    />
  );
}
