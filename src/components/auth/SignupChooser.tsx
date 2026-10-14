"use client";

import Link from "next/link";
import clsx from "clsx";
import { FEATURES } from "@/lib/constants";

const signupOptions = [
  {
    href: "/inscription/parent",
    title: "Parent",
    description:
      "Inscrire un enfant à l'accompagnement scolaire SSL+++. Dossier complet en plusieurs étapes.",
    badge: "Accompagnement scolaire",
    accent: "bg-brand-light text-brand-forest",
  },
  {
    href: "/inscription/utilisateur",
    title: "Utilisateur",
    description: FEATURES.marketplace
      ? "Un seul compte pour parcourir la marketplace, contacter des prestataires et publier vos propres annonces."
      : "Demande de prestation d'aide sociale.",
    badge: FEATURES.marketplace ? "Marketplace" : "Aide sociale",
    accent: FEATURES.marketplace ? "bg-plum-light text-plum" : "bg-teal/10 text-teal",
  },
];

export default function SignupChooser() {
  return (
    <div className="site-wrap py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <p className="section-label">Inscription</p>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Créer un compte</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          {FEATURES.marketplace
            ? "Choisissez le parcours adapté à votre situation. Le compte utilisateur couvre à la fois la recherche et la publication de services sur la marketplace."
            : "Choisissez le parcours adapté à votre situation. Le compte utilisateur sert à demander une prestation d'aide sociale."}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {signupOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="group flex h-full flex-col rounded-xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-forest/30 hover:shadow-hover"
            >
              <span className={clsx("inline-flex w-fit rounded-lg px-2.5 py-1 text-xs font-bold", option.accent)}>
                {option.badge}
              </span>
              <h2 className="mt-3 font-display text-lg font-bold text-ink group-hover:text-brand-forest">
                {option.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {option.description}
              </p>
              <span className="mt-4 text-sm font-semibold text-brand-forest group-hover:underline">
                Continuer
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
