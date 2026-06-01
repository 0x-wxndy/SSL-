"use client";

import { ParentPageHeader } from "@/components/parent/ParentPageHeader";
import { children } from "@/lib/parent-data";
import { useParentSession } from "@/hooks/useParentSession";

export default function ParentBadgePage() {
  const { user } = useParentSession();

  return (
    <div>
      <ParentPageHeader
        user={user}
        title="Badge ID & carte d'adhésion"
        subtitle="Identification à l'entrée du site et badgeuse de présence"
      />

      <p className="text-sm text-muted mb-6 leading-relaxed">
        Chaque enfant reçoit une carte d&apos;adhésion avec un identifiant unique. Le badge est activé
        à l&apos;arrivée et désactivé au départ.
      </p>

      <div className="space-y-5">
        {children.map((child) => (
          <article key={child.badgeId} className="border-2 border-brand bg-white overflow-hidden">
            <div className="px-5 py-3 bg-brand text-white flex justify-between items-center">
              <span className="font-display font-bold">SSL+++</span>
              <span className="text-xs text-white/70">Carte d&apos;adhésion</span>
            </div>
            <div className="p-5 flex flex-col sm:flex-row gap-5 sm:items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl bg-brand-light text-brand flex-shrink-0">
                {child.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-ink text-lg">{child.name}</h2>
                <p className="text-sm text-muted">{child.age} ans · {child.level}</p>
                <p className="font-mono text-sm mt-3 px-3 py-2 bg-surface-2 border border-line inline-block">
                  {child.badgeId}
                </p>
              </div>
              <div className="sm:text-right border-t sm:border-t-0 border-line pt-4 sm:pt-0">
                <span className={`inline-block text-xs font-bold px-3 py-1 ${
                  child.present ? "bg-green-100 text-green-800" : "bg-surface-2 text-muted"
                }`}>
                  {child.present ? "● Badge actif" : "○ Inactif aujourd'hui"}
                </span>
                {child.present && child.arrival && (
                  <p className="text-xs text-muted mt-2">Entrée enregistrée : {child.arrival}</p>
                )}
                <p className="text-xs text-muted mt-1">Dossier {child.id}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
