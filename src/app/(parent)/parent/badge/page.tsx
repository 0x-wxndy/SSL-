"use client";

import Image from "next/image";
import { ParentPageHeader } from "@/components/parent/ParentPageHeader";
import { useParentSession } from "@/hooks/useParentSession";
import { useParentChildren } from "@/hooks/useParentChildren";
import { INITIAL_BADGE_ACCESS, BADGE_HOLDER_LABELS } from "@/lib/badge-access-data";

export default function ParentBadgePage() {
  const { user } = useParentSession();
  const { children, loading } = useParentChildren();
  const parentBadge = INITIAL_BADGE_ACCESS.find((b) => b.holderType === "parent");

  return (
    <div>
      <ParentPageHeader
        user={user}
        title="Badge ID & contrôle d'accès"
        subtitle="Authentification aux entrées — enfants et parents"
      />

      <p className="mb-6 text-sm leading-relaxed text-ink-muted">
        Chaque enfant et chaque parent / tuteur dispose d&apos;un badge pour s&apos;authentifier aux
        portails du site (entrée principale, entrée parents). Le personnel et les partenaires
        scolaires utilisent leurs propres badges aux entrées dédiées.
      </p>

      {parentBadge && (
        <div className="mb-8">
          <h2 className="mb-3 font-display text-lg font-semibold text-ink">Votre badge parent</h2>
          <article className="relative aspect-[1.6/1] w-full max-w-[280px] overflow-hidden rounded-xl bg-gradient-to-br from-amber to-yellow-deep p-5 text-white shadow-card">
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="rounded bg-white/95 px-1.5 py-0.5">
                  <Image
                    src="/assets/ssl-logo.png"
                    alt="SSL+++"
                    width={64}
                    height={32}
                    className="h-5 w-auto"
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/80">
                  {BADGE_HOLDER_LABELS.parent}
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold">{parentBadge.holderName}</h3>
                <p className="font-mono text-xs text-white/70">{parentBadge.badgeId}</p>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/80">{parentBadge.gate}</span>
                <span className="rounded bg-white/20 px-2 py-0.5 font-semibold">
                  {parentBadge.active ? "Actif" : "Inactif"}
                </span>
              </div>
            </div>
          </article>
        </div>
      )}

      <h2 className="mb-3 font-display text-lg font-semibold text-ink">Badges enfants</h2>
      {loading && <p className="text-sm text-ink-muted">Chargement des badges…</p>}
      {!loading && children.length === 0 && (
        <p className="text-sm text-ink-muted">
          Aucun badge enfant — aucun dossier validé n&apos;est rattaché à ce compte.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        {children.map((child, index) => {
          const gradient =
            index % 2 === 0
              ? "bg-gradient-to-br from-brand-forest to-brand-deep"
              : "bg-gradient-to-br from-teal to-brand-deep";

          return (
            <article
              key={child.badgeId}
              className={`relative aspect-[1.6/1] w-full max-w-[280px] overflow-hidden rounded-xl ${gradient} p-5 text-white shadow-card`}
            >
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="rounded bg-white/95 px-1.5 py-0.5">
                    <Image
                      src="/assets/ssl-logo.png"
                      alt="SSL+++"
                      width={64}
                      height={32}
                      className="h-5 w-auto"
                    />
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-[10px]">
                    QR
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 bg-white/20 text-lg font-bold">
                    {child.initials}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">{child.name}</h2>
                    <p className="font-mono text-xs text-white/60">{child.badgeId}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">{child.level}</span>
                  <span
                    className={
                      child.present
                        ? "badge bg-brand-mint text-brand-deep"
                        : "badge bg-amber-200 text-amber-900"
                    }
                  >
                    {child.present ? "Actif" : "Inactif"}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
