"use client";

import { ParentPageHeader, Row } from "@/components/parent/ParentPageHeader";
import { children } from "@/lib/parent-data";
import { useParentSession } from "@/hooks/useParentSession";

export default function ParentDossierPage() {
  const { user } = useParentSession();

  return (
    <div>
      <ParentPageHeader user={user} subtitle="Dossiers de vos enfants inscrits" />

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { num: "2", label: "Enfants inscrits" },
          { num: "Validé", label: "Statut dossier" },
          { num: "3 j", label: "Délai traitement" },
        ].map((k) => (
          <div key={k.label} className="bg-white border border-line p-3 text-center">
            <div className="font-display text-lg sm:text-xl font-bold text-brand">{k.num}</div>
            <div className="text-[11px] text-muted mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      {children.map((child) => (
        <article key={child.id} className="bg-white border border-line mb-4">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-line bg-surface-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-brand-light text-brand">
              {child.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-ink">{child.name}</div>
              <div className="text-xs text-muted mt-0.5 truncate">
                {child.age} ans · {child.level} · {child.package}
              </div>
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 flex-shrink-0 ${
              child.present ? "bg-green-100 text-green-800" : "bg-red-50 text-red-700"
            }`}>
              {child.present ? "Présent" : "Absence"}
            </span>
          </div>
          <div className="px-4 divide-y divide-line/80">
            <Row k="Tutrice / tuteur légal" v={child.tutor} />
            <Row k="Téléphone" v={child.phone} />
            <Row k="Carnet vaccinal" v={child.vaccin} />
            {child.allergy && (
              <Row k="Allergies" v={
                <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-2 py-0.5">{child.allergy}</span>
              } />
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
            <Row k="Réf. dossier" v={child.id} />
          </div>
        </article>
      ))}
    </div>
  );
}
