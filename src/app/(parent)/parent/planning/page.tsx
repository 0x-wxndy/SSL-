"use client";

import { useEffect, useState } from "react";
import { ParentPageHeader } from "@/components/parent/ParentPageHeader";
import { days, planning } from "@/lib/parent-data";
import { useParentSession } from "@/hooks/useParentSession";
import { useParentChildren } from "@/hooks/useParentChildren";

export default function ParentPlanningPage() {
  const { user } = useParentSession();
  const { children, loading } = useParentChildren();
  const [activeChildId, setActiveChildId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeChildId && children.length > 0) setActiveChildId(children[0].id);
  }, [activeChildId, children]);

  const activeChild = children.find((c) => c.id === activeChildId) ?? children[0];

  return (
    <div>
      <ParentPageHeader
        user={user}
        title="Planning hebdomadaire"
        subtitle="Créneaux selon la formule mensuelle souscrite"
      />

      {loading && <p className="text-sm text-ink-muted">Chargement du planning…</p>}
      {!loading && children.length === 0 && (
        <p className="text-sm text-ink-muted">
          Aucun enfant rattaché à ce compte — le planning s&apos;affichera dès la validation
          d&apos;un dossier.
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-5">
        {children.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveChildId(c.id)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              activeChild?.id === c.id
                ? "border-brand-forest bg-brand-forest text-white"
                : "border-line bg-white text-ink-muted hover:border-brand-forest"
            }`}
          >
            {c.name.split(" ").slice(-1)[0]}
          </button>
        ))}
      </div>

      {activeChild && (
        <div className="card mb-4 p-4">
          <p className="text-sm font-semibold text-ink">{activeChild.name}</p>
          <p className="mt-0.5 text-xs text-ink-muted">{activeChild.package}</p>
          <p className="mt-2 text-xs font-medium text-brand-forest">Semaine du 26 au 30 mai</p>
        </div>
      )}

      <div className="card overflow-x-auto">
        <div
          className="grid min-w-[480px] grid-cols-[56px_repeat(5,1fr)] bg-brand-forest text-xs font-bold text-white"
        >
          <div className="py-2.5" />
          {days.map((d) => (
            <div key={d} className="py-2.5 text-center">{d}</div>
          ))}
        </div>
        {planning.map((row) => (
          <div
            key={row.time}
            className="grid border-t border-line min-w-[480px]"
            style={{ gridTemplateColumns: "56px repeat(5, 1fr)" }}
          >
            <div className="p-2 text-center text-xs text-muted font-semibold bg-surface-2 border-r border-line flex items-center justify-center">
              {row.time}
            </div>
            {row.slots.map((slot, i) => (
              <div key={i} className="p-1.5 border-r border-line last:border-r-0 min-h-[52px]">
                {slot !== "—" ? (
                  <div
                    className={`h-full border-s-2 p-2 text-xs font-semibold leading-tight whitespace-pre-line ${
                      row.type === "brand"
                        ? "border-brand-forest bg-brand-light text-brand-deep"
                        : "border-green-forest bg-green-light text-green-deep"
                    }`}
                  >
                    {slot}
                  </div>
                ) : (
                  <div className="text-xs text-muted/40 p-2 h-full flex items-center justify-center">—</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
