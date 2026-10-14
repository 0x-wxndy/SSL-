import BasicSignupForm, { inputCls } from "@/components/auth/BasicSignupForm";

export default function UtilisateurSignupPage() {
  return (
    <BasicSignupForm
      title="Compte utilisateur"
      subtitle="Demande de prestation d'aide sociale."
      successTitle="Compte utilisateur créé (démo)"
      successMessage="Connectez-vous avec le compte démo utilisateur pour suivre votre demande d'aide sociale."
      loginHref="/connexion?role=user"
      loginPortalLabel="utilisateur"
      extraFields={
        <>
          <div>
            <label className="text-xs font-semibold text-ink-muted">Wilaya</label>
            <input required placeholder="Ex. Alger, Oran…" className={`${inputCls} mt-1`} />
          </div>
          <p className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-xs text-ink-muted">
            Ce compte sert à demander une prestation d&apos;aide sociale.
          </p>
        </>
      }
    />
  );
}
