"use client";

import { useState } from "react";
import { ParentPageHeader } from "@/components/parent/ParentPageHeader";
import { children, days, planning, type Child } from "@/lib/parent-data";
import { useParentSession } from "@/hooks/useParentSession";

export default function ParentPlanningPage() {
  const { user } = useParentSession();
  const [activeChild, setActiveChild] = useState<Child>(children[0]);

  return (
    <div>
      <ParentPageHeader
        user={user}
        title="Planning hebdomadaire"
        subtitle="Créneaux selon la formule souscrite — pas de sieste sur site"
      />

      <div className="flex flex-wrap gap-2 mb-5">
        {children.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveChild(c)}
            className={`text-xs font-semibold px-4 py-2 border transition-colors ${
              activeChild.id === c.id
                ? "bg-brand text-white border-brand"
                : "bg-white text-muted border-line hover:border-brand"
            }`}
          >
            {c.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="bg-white border border-line p-4 mb-4">
        <p className="text-sm font-semibold text-ink">{activeChild.name}</p>
        <p className="text-xs text-muted mt-0.5">{activeChild.package}</p>
        <p className="text-xs text-accent font-medium mt-2">Semaine du 26 au 30 mai</p>
      </div>

      <div className="bg-white border border-line overflow-x-auto">
        <div
          className="grid text-white text-xs font-bold min-w-[480px]"
          style={{ gridTemplateColumns: "56px repeat(5, 1fr)", backgroundColor: "var(--brand)" }}
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
                    className={`text-xs font-semibold p-2 h-full leading-tight whitespace-pre-line border-l-2 ${
                      row.type === "brand"
                        ? "border-brand bg-brand-light text-brand"
                        : "border-accent bg-accent-light text-amber-900"
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
