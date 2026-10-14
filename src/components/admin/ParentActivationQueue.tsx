"use client";

import { useCallback, useEffect, useState } from "react";
import { DOSSIER_STATUS_LABELS, type DossierStatus } from "@/lib/admin-school-data";

type PendingLink = {
  dossierId: string;
  email: string;
  childName: string;
  age: string;
  pack: string;
  status: DossierStatus;
  submittedAt: string;
};

type Props = {
  canValidate: boolean;
  /** Notifie le parent (module Scolarité) qu'un dossier a changé de statut */
  onApproved?: () => void;
  /** Incrémenté par le parent pour forcer un rechargement */
  refreshKey?: number;
};

export default function ParentActivationQueue({ canValidate, onApproved, refreshKey }: Props) {
  const [items, setItems] = useState<PendingLink[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch("/api/admin/parent-activations")
      .then((r) => (r.ok ? r.json() : { activations: [] }))
      .then((data) => setItems(data.activations ?? []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  async function approve(dossierId: string) {
    const res = await fetch("/api/admin/parent-activations/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dossierId }),
    });
    if (res.ok) {
      load();
      onApproved?.();
    }
  }

  if (loading) return null;
  if (items.length === 0) return null;

  return (
    <div className="card mb-6 overflow-hidden">
      <div className="border-b border-line bg-surface-green px-4 py-3">
        <h3 className="text-sm font-bold text-ink">Accès espace parent — en attente</h3>
        <p className="text-xs text-ink-muted">
          Dossiers rattachés à un compte plateforme, pas encore validés. La validation ouvre
          immédiatement l&apos;espace parent sur ce compte.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-xs">
          <thead>
            <tr className="border-b border-line">
              <th className="px-4 py-2 text-left font-bold text-ink-subtle">Compte lié</th>
              <th className="px-4 py-2 text-left font-bold text-ink-subtle">Enfant</th>
              <th className="px-4 py-2 text-left font-bold text-ink-subtle">Formule</th>
              <th className="px-4 py-2 text-left font-bold text-ink-subtle">Statut</th>
              <th className="px-4 py-2 text-left font-bold text-ink-subtle">Soumis le</th>
              {canValidate && (
                <th className="px-4 py-2 text-left font-bold text-ink-subtle">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.dossierId} className="border-b border-line/60 last:border-b-0">
                <td className="px-4 py-3 font-mono text-ink-muted">{a.email}</td>
                <td className="px-4 py-3 font-semibold text-ink">
                  {a.childName}{" "}
                  {a.age && <span className="font-normal text-ink-muted">({a.age})</span>}
                </td>
                <td className="px-4 py-3 text-ink-muted">{a.pack}</td>
                <td className="px-4 py-3 text-ink-muted">{DOSSIER_STATUS_LABELS[a.status]}</td>
                <td className="px-4 py-3 text-ink-muted">{a.submittedAt}</td>
                {canValidate && (
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => approve(a.dossierId)}
                      className="text-xs font-semibold text-brand-forest hover:underline"
                    >
                      Valider l&apos;accès parent
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
