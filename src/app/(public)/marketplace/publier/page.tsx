"use client";

import Link from "next/link";
import { ImageIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { MARKETPLACE_CATEGORIES } from "@/lib/marketplace-data";

export default function PublishListingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhotoFile(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Choisissez une image (JPG, PNG, WebP…)");
      return;
    }
    if (file.size > 2_000_000) {
      setPhotoError("Image max 2 Mo");
      return;
    }
    setPhotoError("");
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  }

  function clearPhoto() {
    setPhotoPreview(null);
    setPhotoError("");
    if (fileRef.current) fileRef.current.value = "";
  }

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
            vos annonces dans votre espace marketplace.
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
        ← Mon espace marketplace
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
          <label className="text-xs font-semibold text-ink-muted">Photo (optionnel)</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => handlePhotoFile(e.target.files?.[0] ?? null)}
          />
          {photoPreview ? (
            <div className="relative mt-2 overflow-hidden rounded-xl border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoPreview} alt="Aperçu" className="max-h-48 w-full object-cover" />
              <button
                type="button"
                onClick={clearPhoto}
                className="absolute end-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/60 text-white transition-colors hover:bg-ink/80"
                aria-label="Supprimer la photo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-surface-base px-4 py-8 text-sm text-ink-muted transition-colors hover:border-brand-forest/40 hover:bg-brand-light/30"
            >
              <ImageIcon className="h-8 w-8 text-brand-forest/70" aria-hidden />
              <span className="font-semibold text-ink">Choisir une photo</span>
              <span className="text-xs">JPG, PNG ou WebP · max 2 Mo</span>
            </button>
          )}
          {photoError && <p className="mt-1.5 text-xs text-status-error">{photoError}</p>}
        </div>        <button type="submit" className="btn-primary w-full">
          Publier l&apos;annonce
        </button>
      </form>
    </div>
  );
}
