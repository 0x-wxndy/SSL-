"use client";

import Link from "next/link";
import { ParentPageHeader, Row } from "@/components/parent/ParentPageHeader";
import { useParentSession } from "@/hooks/useParentSession";
import { useParentChildren } from "@/hooks/useParentChildren";
import { ESTABLISHMENT } from "@/lib/constants";

export default function ParentDossierPage() {
  const { user } = useParentSession();
  const { children, loading } = useParentChildren();

  const allValidated = children.length > 0;

  return (
    <div>
      <ParentPageHeader user={user} subtitle="Dossiers de vos enfants inscrits" />

      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { num: loading ? "…" : String(children.length), label: "Enfants inscrits" },
          { num: allValidated ? "Validé" : "—", label: "Statut dossier" },
          { num: ESTABLISHMENT.validationDelay, label: "Délai traitement" },
        ].map((k) => (
          <div key={k.label} className="card p-3 text-center">
            <div className="font-display text-lg font-bold text-brand-forest sm:text-xl">
              {k.num}
            </div>
            <div className="mt-1 text-[11px] text-ink-muted">{k.label}</div>
          </div>
        ))}
      </div>

      {loading && <p className="text-sm text-ink-muted">Chargement des dossiers…</p>}

      {!loading && children.length === 0 && (
        <div className="card p-5 text-center">
          <p className="text-sm font-semibold text-ink">Aucun enfant rattaché à ce compte</p>
          <p className="mx-auto mt-1 max-w-md text-xs text-ink-muted">
            Un dossier doit être validé par l&apos;équipe {ESTABLISHMENT.abbr} pour apparaître ici.
            Vous pouvez déclarer un enfant depuis votre compte.
          </p>
          <Link
            href="/inscription/parent"
            className="btn-primary btn-sm mt-4 inline-flex"
          >
            Déclarer un enfant
          </Link>
        </div>
      )}

      {children.map((child, index) => (
        <article key={child.id} className="card mb-4 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-line bg-surface-green px-4 py-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                index % 2 === 0 ? "bg-brand-light text-brand-forest" : "bg-amber-light text-amber"
              }`}
            >
              {child.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-ink">{child.name}</div>
              <div className="mt-0.5 truncate text-xs text-ink-muted">
                {[child.age, child.level, child.package].filter(Boolean).join(" · ")}
              </div>
            </div>
            <span className={child.present ? "badge badge-valid" : "badge badge-error"}>
              {child.present ? "Présent" : "Absence"}
            </span>
          </div>
          <div className="divide-y divide-line/80 px-4">
            <Row k="Tutrice / tuteur légal" v={child.tutor || "—"} />
            <Row k="Téléphone" v={child.phone || "—"} />
            <Row k="École" v={child.school || "—"} />
            <Row k="Carnet vaccinal" v={child.vaccin} />
            {child.allergy && (
              <Row k="Allergies" v={<span className="badge badge-wait">{child.allergy}</span>} />
            )}
            {child.present ? (
              <>
                {child.arrival && <Row k="Arrivée" v={child.arrival} />}
                {child.meal && <Row k="Repas" v={child.meal} />}
                {child.session && <Row k="Créneaux" v={child.session} />}
              </>
            ) : (
              <Row k="Statut" v="Absent(e) aujourd'hui" />
            )}
            <Row k="Réf. dossier" v={<span className="font-mono text-[11px]">{child.id}</span>} />
          </div>
          <div className="flex items-center justify-between border-t border-line bg-surface-base px-4 py-2 text-[11px]">
            <span className="text-ink-muted">
              {child.present && child.arrival ? `Arrivée ${child.arrival}` : "Non présent"}
            </span>
            <span className="font-mono text-brand-forest">{child.badgeId}</span>
          </div>
        </article>
      ))}

      {!loading && children.length > 0 && (
        <Link
          href="/inscription/parent"
          className="btn-secondary btn-sm inline-flex"
        >
          Ajouter un enfant
        </Link>
      )}
    </div>
  );
}
