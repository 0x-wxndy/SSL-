"use client";

import { useState } from "react";
import Link from "next/link";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm transition-colors focus:border-brand-forest focus:outline-none";

type BasicSignupProps = {
  title: string;
  subtitle: string;
  successTitle: string;
  successMessage: string;
  loginHref: string;
  loginPortalLabel: string;
  extraFields?: React.ReactNode;
};

export default function BasicSignupForm({
  title,
  subtitle,
  successTitle,
  successMessage,
  loginHref,
  loginPortalLabel,
  extraFields,
}: BasicSignupProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="site-wrap flex min-h-[70vh] max-w-lg flex-col justify-center py-12">
        <div className="card p-8 text-center">
          <span className="text-4xl">✓</span>
          <h1 className="mt-4 font-display text-xl font-bold text-ink">{successTitle}</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{successMessage}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={loginHref} className="btn-primary">
              Se connecter
            </Link>
            <Link href="/" className="btn-secondary">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="site-wrap max-w-lg py-10 sm:py-14">
      <Link href="/inscription" className="mb-4 inline-block text-sm text-ink-muted hover:text-brand-forest">
        ← Choisir un autre type de compte
      </Link>
      <p className="section-label">Créer un compte</p>
      <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
      <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>

      <form onSubmit={handleSubmit} className="card mt-8 space-y-4 p-6">
        <div>
          <label className="text-xs font-semibold text-ink-muted">Nom complet</label>
          <input required className={`${inputCls} mt-1`} placeholder="Nom et prénom" />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink-muted">Email</label>
          <input type="email" required className={`${inputCls} mt-1`} placeholder="email@exemple.dz" />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink-muted">Téléphone</label>
          <input type="tel" required placeholder="+213 5XX XX XX XX" className={`${inputCls} mt-1`} />
        </div>
        {extraFields}
        <div>
          <label className="text-xs font-semibold text-ink-muted">Mot de passe</label>
          <input type="password" required minLength={6} className={`${inputCls} mt-1`} />
        </div>
        <button type="submit" className="btn-primary w-full">
          Créer mon compte
        </button>
        <p className="text-center text-xs text-ink-muted">
          Déjà inscrit ?{" "}
          <Link href={loginHref} className="font-semibold text-brand-forest hover:underline">
            Connexion {loginPortalLabel}
          </Link>
        </p>
        <p className="text-center text-[11px] text-ink-subtle">Démonstration — aucune base de données réelle.</p>
      </form>
    </div>
  );
}

export { inputCls };
