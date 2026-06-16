"use client";

import { ParentPageHeader, Row } from "@/components/parent/ParentPageHeader";
import { children } from "@/lib/parent-data";
import { useParentSession } from "@/hooks/useParentSession";

export default function ParentDossierPage() {
  const { user } = useParentSession();

  return (
    <div>
      <ParentPageHeader user={user} subtitle="Dossiers de vos enfants inscrits" />

      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { num: "2", label: "Enfants inscrits" },
          { num: "Validé", label: "Statut dossier" },
          { num: "3 j", label: "Délai traitement" },
        ].map((k) => (
          <div key={k.label} className="card p-3 text-center">
            <div className="font-display text-lg font-bold text-brand-forest sm:text-xl">{k.num}</div>
            <div className="mt-1 text-[11px] text-ink-muted">{k.label}</div>
          </div>
        ))}
      </div>

      {children.map((child, index) => (
        <article key={child.id} className="card mb-4 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-line bg-surface-green px-4 py-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                index === 0 ? "bg-brand-light text-brand-forest" : "bg-amber-light text-amber"
              }`}
            >
              {child.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-ink">{child.name}</div>
              <div className="mt-0.5 truncate text-xs text-ink-muted">
                {child.age} ans · {child.level} · {child.package}
              </div>
            </div>
            <span className={child.present ? "badge badge-valid" : "badge badge-error"}>
              {child.present ? "Présent" : "Absence"}
            </span>
          </div>
          <div className="divide-y divide-line/80 px-4">
            <Row k="Tutrice / tuteur légal" v={child.tutor} />
            <Row k="Téléphone" v={child.phone} />
            <Row k="Carnet vaccinal" v={child.vaccin} />
            {child.allergy && (
              <Row
                k="Allergies"
                v={
                  <span className="badge badge-wait">{child.allergy}</span>
                }
              />
            )}
            {child.present ? (
              <>
                <Row k="Arrivée" v={child.arrival!} />
                <Row k="Repas" v={child.meal!} />
                <Row k="Révision 15h–17h" v={child.session!} />
              </>
            ) : (
              <Row k="Statut" v="Absente — préavis reçu" />
            )}
            <Row k="Réf. dossier" v={<span className="font-mono text-[11px]">{child.id}</span>} />
          </div>
          <div className="flex items-center justify-between border-t border-line bg-surface-base px-4 py-2 text-[11px]">
            <span className="text-ink-muted">{child.present ? `Arrivée ${child.arrival}` : "Absente"}</span>
            <span className="font-mono text-brand-forest">{child.badgeId}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
