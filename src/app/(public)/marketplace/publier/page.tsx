"use client";

import Link from "next/link";
import { useState } from "react";
import { MARKETPLACE_CATEGORIES } from "@/lib/marketplace-data";

export default function PublishListingPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="site-wrap max-w-lg py-12">
        <div className="card p-8 text-center">
          <span className="text-4xl">📋</span>
          <h1 className="mt-4 font-display text-xl font-bold text-ink">Annonce soumise</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Votre annonce sera visible après modération (démo : instantané en production). Retrouvez
            vos annonces dans votre espace prestataire.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/marketplace/compte" className="btn-primary">
              Mon espace
            </Link>
            <Link href="/marketplace" className="btn-secondary">
              Voir le marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="site-wrap max-w-2xl py-10 sm:py-12">
      <Link href="/marketplace/compte" className="mb-4 inline-block text-sm text-ink-muted hover:text-brand-forest">
        ← Mon espace prestataire
      </Link>
      <p className="section-label">Nouvelle annonce</p>
      <h1 className="font-display text-2xl font-bold text-ink">Publier un service</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Décrivez votre prestation d&apos;aide sociale. Les familles pourront vous contacter via la
        plateforme.
      </p>

      <form onSubmit={handleSubmit} className="card mt-8 space-y-4 p-6">
        <div>
          <label className="text-xs font-semibold text-ink-muted">Titre de l&apos;annonce</label>
          <input
            required
            placeholder="Ex. Femme de ménage — Hydra"
            className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink-muted">Catégorie</label>
          <select required className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none">
            <option value="">Choisir…</option>
            {MARKETPLACE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-ink-muted">Description</label>
          <textarea
            required
            rows={5}
            placeholder="Décrivez votre service, expérience, disponibilités…"
            className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-ink-muted">Prix</label>
            <input required placeholder="2500" className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-muted">Unité</label>
            <input required placeholder="DA / séance" className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-ink-muted">Commune / quartier</label>
            <input required placeholder="Hydra, Alger" className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-muted">Wilaya</label>
            <input required placeholder="Alger" className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-ink-muted">URL photo (optionnel)</label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Publier l&apos;annonce
        </button>
      </form>
    </div>
  );
}
