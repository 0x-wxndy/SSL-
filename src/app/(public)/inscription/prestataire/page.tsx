import BasicSignupForm, { inputCls } from "@/components/auth/BasicSignupForm";
import { MARKETPLACE_CATEGORIES } from "@/lib/marketplace-data";

export default function PrestataireSignupPage() {
  return (
    <BasicSignupForm
      title="Compte prestataire"
      subtitle="Inscription simplifiée pour publier vos services d'aide sociale sur la marketplace SSL+++."
      successTitle="Compte prestataire créé (démo)"
      successMessage="Connectez-vous avec le compte démo prestataire pour accéder à votre espace et publier une annonce."
      loginHref="/connexion?role=provider"
      loginPortalLabel="prestataire"
      extraFields={
        <div>
          <label className="text-xs font-semibold text-ink-muted">Catégorie principale</label>
          <select required className={`${inputCls} mt-1`}>
            <option value="">Choisir…</option>
            {MARKETPLACE_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      }
    />
  );
}
