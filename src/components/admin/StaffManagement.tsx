"use client";

import { useState } from "react";
import clsx from "clsx";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import type { Session } from "@/lib/auth";
import { canPerformAction } from "@/lib/admin-rbac";
import {
  INITIAL_STAFF,
  STAFF_ACCESS_LEVELS,
  nextStaffBadgeId,
  type StaffMember,
} from "@/lib/admin-personnel-data";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-xs focus:border-brand-forest focus:outline-none";

const emptyForm = {
  name: "",
  role: "",
  accessLevel: "Staff" as StaffMember["accessLevel"],
  email: "",
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

export default function StaffManagement({ user }: { user: Session }) {
  const [members, setMembers] = useState<StaffMember[]>(INITIAL_STAFF);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  const canCreate = canPerformAction(user, "staff", "create");
  const canEdit = canPerformAction(user, "staff", "edit");
  const canExport = canPerformAction(user, "staff", "export");

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
    setSaved(false);
  }

  function openEdit(member: StaffMember) {
    setEditingId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      accessLevel: member.accessLevel,
      email: member.email,
      phone: member.phone,
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
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? { ...m, name: form.name, role: form.role, accessLevel: form.accessLevel, email: form.email, phone: form.phone }
            : m
        )
      );
    } else {
      const badgeId = nextStaffBadgeId(members);
      setMembers((prev) => [
        ...prev,
        {
          id: `stf-${Date.now()}`,
          name: form.name,
          role: form.role,
          accessLevel: form.accessLevel,
          badgeId,
          email: form.email,
          phone: form.phone,
          presence: "Absent",
          clockIn: "—",
        },
      ]);
    }
    setSaved(true);
    setTimeout(() => {
      closeForm();
      setSaved(false);
    }, 800);
  }

  function removeMember(id: string) {
    if (!confirm("Retirer ce membre du personnel ? (démo — aucune suppression réelle en base)")) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink-muted">
          {members.length} membre(s) · badges & pointage synchronisés (démo)
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
        <form
          onSubmit={handleSubmit}
          className="card mb-4 space-y-3 p-4 sm:p-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink">
              {editingId ? "Modifier le membre" : "Nouveau membre du personnel"}
            </h3>
            <button type="button" onClick={closeForm} className="text-ink-muted hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Nom complet *</label>
              <input required className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Fonction *</label>
              <input required className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Niveau d&apos;accès *</label>
              <select
                required
                className={inputCls}
                value={form.accessLevel}
                onChange={(e) => setForm({ ...form, accessLevel: e.target.value as StaffMember["accessLevel"] })}
              >
                {STAFF_ACCESS_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Email</label>
              <input type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-ink-muted">Téléphone</label>
              <input type="tel" className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+213 5XX XX XX XX" />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" className="btn-primary btn-sm">
              {saved ? "Enregistré" : editingId ? "Mettre à jour" : "Ajouter le membre"}
            </button>
            <button type="button" onClick={closeForm} className="btn-secondary btn-sm">
              Annuler
            </button>
          </div>
          <p className="text-[11px] text-ink-subtle">Démonstration — les modifications restent en mémoire locale.</p>
        </form>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-xs">
            <thead>
              <tr className="border-b border-line bg-surface-green">
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Nom</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Fonction</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Accès</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Badge</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Pointage</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Présence</th>
                {(canEdit || canCreate) && (
                  <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {members.map((p) => (
                <tr key={p.id} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{p.name}</p>
                    {p.email && <p className="text-[10px] text-ink-muted">{p.email}</p>}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{p.role}</td>
                  <td className="px-4 py-3">
                    <Tag color="green">{p.accessLevel}</Tag>
                  </td>
                  <td className="px-4 py-3 font-mono text-ink-muted">{p.badgeId}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.clockIn}</td>
                  <td className="px-4 py-3">
                    <Tag color={p.presence === "Présent" ? "green" : "red"}>{p.presence}</Tag>
                  </td>
                  {(canEdit || canCreate) && (
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
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
                            onClick={() => removeMember(p.id)}
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
