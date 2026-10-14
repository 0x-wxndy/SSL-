"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import type { Session } from "@/lib/auth";
import { canPerformAction } from "@/lib/admin-rbac";
import {
  INITIAL_PARTNERS,
  PARTNER_CATEGORIES,
  PARTNER_STATUS_COLORS,
  PARTNER_STATUS_LABELS,
  partnerCategoryLabel,
  type Partner,
  type PartnerCategoryId,
  type PartnerContractStatus,
} from "@/lib/admin-partners-data";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-xs focus:border-brand-forest focus:outline-none";

const emptyForm = {
  name: "",
  category: "enseignants" as PartnerCategoryId,
  specialty: "",
  planning: "",
  status: "pending" as PartnerContractStatus,
  credentials: "",
  phone: "",
};

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
  };
  return (
    <span className={clsx("rounded-full px-2 py-0.5 text-xs font-semibold", map[color] ?? "")}>
      {children}
    </span>
  );
}

export default function PartnersManagement({ user }: { user: Session }) {
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [activeCategory, setActiveCategory] = useState<PartnerCategoryId | "all">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  const canCreate = canPerformAction(user, "partners", "create");
  const canEdit = canPerformAction(user, "partners", "edit");
  const canValidate = canPerformAction(user, "partners", "validate");
  const canExport = canPerformAction(user, "partners", "export");

  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: partners.length };
    for (const p of partners) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
    return counts;
  }, [partners]);

  const visible = useMemo(
    () => (activeCategory === "all" ? partners : partners.filter((p) => p.category === activeCategory)),
    [partners, activeCategory]
  );

  function openAdd() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      category: activeCategory === "all" ? "enseignants" : activeCategory,
    });
    setFormOpen(true);
    setSaved(false);
  }

  function openEdit(partner: Partner) {
    setEditingId(partner.id);
    setForm({
      name: partner.name,
      category: partner.category,
      specialty: partner.specialty,
      planning: partner.planning,
      status: partner.status,
      credentials: partner.credentials,
      phone: partner.phone,
    });
    setFormOpen(true);
    setSaved(false);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      setPartners((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...form } : p)));
    } else {
      setPartners((prev) => [
        ...prev,
        { id: `ptr-${Date.now()}`, ...form, enteredBy: user.name },
      ]);
    }
    setSaved(true);
    setTimeout(() => {
      closeForm();
      setSaved(false);
    }, 800);
  }

  function removePartner(id: string) {
    if (!confirm("Retirer ce partenaire ? (démo — aucune suppression réelle en base)")) return;
    setPartners((prev) => prev.filter((p) => p.id !== id));
  }

  function validatePartner(id: string) {
    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, status: "validated" } : p)));
  }

  const activeMeta = PARTNER_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={clsx(
            "rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
            activeCategory === "all"
              ? "bg-brand-forest text-white"
              : "border border-line bg-white text-ink-muted hover:border-brand-forest"
          )}
        >
          Tous ({countByCategory.all ?? 0})
        </button>
        {PARTNER_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveCategory(c.id)}
            className={clsx(
              "rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
              activeCategory === c.id
                ? "bg-brand-forest text-white"
                : "border border-line bg-white text-ink-muted hover:border-brand-forest"
            )}
          >
            {c.label} ({countByCategory[c.id] ?? 0})
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink-muted">
          {activeMeta ? activeMeta.description : "Toutes catégories de partenaires confondues"} ·{" "}
          {visible.length} partenaire(s)
        </p>
        <div className="flex gap-2">
          {canExport && (
            <>
              <button className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-muted hover:bg-surface-green">
                Export PDF
              </button>
              <button className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-muted hover:bg-surface-green">
                Export Excel
              </button>
            </>
          )}
          {canCreate && (
            <button type="button" onClick={openAdd} className="btn-primary btn-sm inline-flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Ajouter
            </button>
          )}
        </div>
      </div>

      {formOpen && (canCreate || canEdit) && (
        <form onSubmit={handleSubmit} className="card mb-4 space-y-3 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink">
              {editingId ? "Modifier le partenaire" : "Nouveau partenaire"}
            </h3>
            <button type="button" onClick={closeForm} className="text-ink-muted hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Nom / raison sociale *</label>
              <input
                required
                className={inputCls}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Catégorie *</label>
              <select
                required
                className={inputCls}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as PartnerCategoryId })}
              >
                {PARTNER_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Spécialité / mission *</label>
              <input
                required
                className={inputCls}
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Planning</label>
              <input
                className={inputCls}
                value={form.planning}
                onChange={(e) => setForm({ ...form, planning: e.target.value })}
                placeholder="Lun, Mer · 17h–20h"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Diplômes / agréments</label>
              <input
                className={inputCls}
                value={form.credentials}
                onChange={(e) => setForm({ ...form, credentials: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Téléphone</label>
              <input
                type="tel"
                className={inputCls}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+213 5XX XX XX XX"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Statut du contrat</label>
              <select
                className={inputCls}
                value={form.status}
                disabled={!canValidate}
                onChange={(e) => setForm({ ...form, status: e.target.value as PartnerContractStatus })}
              >
                {(Object.keys(PARTNER_STATUS_LABELS) as PartnerContractStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {PARTNER_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              {!canValidate && (
                <p className="mt-1 text-[11px] text-ink-subtle">
                  La validation finale du contrat relève de l&apos;Admin Principal.
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" className="btn-primary btn-sm">
              {saved ? "Enregistré" : editingId ? "Mettre à jour" : "Ajouter le partenaire"}
            </button>
            <button type="button" onClick={closeForm} className="btn-secondary btn-sm">
              Annuler
            </button>
          </div>
          <p className="text-[11px] text-ink-subtle">
            Démonstration — les modifications restent en mémoire locale.
          </p>
        </form>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-xs">
            <thead>
              <tr className="border-b border-line bg-surface-green">
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Partenaire</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Catégorie</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Spécialité</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Planning</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Contrat</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Diplômes</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Saisi par</th>
                {(canEdit || canCreate || canValidate) && (
                  <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.id} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{p.name}</p>
                    {p.phone && <p className="text-[10px] text-ink-muted">{p.phone}</p>}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{partnerCategoryLabel(p.category)}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.specialty}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.planning || "—"}</td>
                  <td className="px-4 py-3">
                    <Tag color={PARTNER_STATUS_COLORS[p.status]}>{PARTNER_STATUS_LABELS[p.status]}</Tag>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{p.credentials || "—"}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.enteredBy}</td>
                  {(canEdit || canCreate || canValidate) && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {canValidate && p.status !== "validated" && (
                          <button
                            type="button"
                            onClick={() => validatePartner(p.id)}
                            className="rounded px-2 py-1 text-[11px] font-semibold text-brand-forest hover:bg-brand-light"
                          >
                            Valider
                          </button>
                        )}
                        {canEdit && (
                          <button
                            type="button"
                            onClick={() => openEdit(p)}
                            className="rounded p-1.5 text-ink-muted hover:bg-brand-light hover:text-brand-forest"
                            aria-label={`Modifier ${p.name}`}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {canCreate && (
                          <button
                            type="button"
                            onClick={() => removePartner(p.id)}
                            className="rounded p-1.5 text-ink-muted hover:bg-red-50 hover:text-red-600"
                            aria-label={`Supprimer ${p.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-ink-muted">
                    Aucun partenaire dans cette catégorie.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
