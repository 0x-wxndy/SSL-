"use client";

import Link from "next/link";

const signupOptions = [
  {
    href: "/inscription/parent",
    title: "Parent",
    description:
      "Inscrire un enfant à l'accompagnement scolaire SSL+++. Dossier complet en plusieurs étapes.",
    badge: "Accompagnement scolaire",
    icon: "👨‍👩‍👧",
  },
  {
    href: "/inscription/prestataire",
    title: "Prestataire de service",
    description:
      "Proposer vos services d'aide sociale sur la marketplace : garde, ménage, seniors, soutien scolaire…",
    badge: "Marketplace",
    icon: "🤝",
  },
  {
    href: "/inscription/utilisateur",
    title: "Chercheur de service",
    description:
      "Créer un compte pour parcourir les annonces, contacter des prestataires et suivre vos demandes.",
    badge: "Utilisateur",
    icon: "🔍",
  },
];

export default function SignupChooser() {
  return (
    <div className="site-wrap py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <p className="section-label">Inscription</p>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Créer un compte</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Choisissez le type de compte adapté à votre situation. Chaque profil ouvre un parcours
          d&apos;inscription dédié sur la plateforme SSL+++.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {signupOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="group flex h-full flex-col rounded-xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-forest/30 hover:shadow-hover"
            >
              <span className="text-3xl" aria-hidden>
                {option.icon}
              </span>
              <span className="badge badge-info mt-4 w-fit">{option.badge}</span>
              <h2 className="mt-3 font-display text-lg font-bold text-ink group-hover:text-brand-forest">
                {option.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {option.description}
              </p>
              <span className="mt-4 text-sm font-semibold text-brand-forest group-hover:underline">
                Continuer →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-muted">
          Déjà inscrit ?{" "}
          <Link href="/connexion" className="font-semibold text-brand-forest hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
