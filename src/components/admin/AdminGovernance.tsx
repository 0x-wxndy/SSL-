"use client";

import { useState } from "react";
import clsx from "clsx";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import type { Session } from "@/lib/auth";
import type { AdminModuleId } from "@/lib/admin-rbac";
import { canPerformAction } from "@/lib/admin-rbac";
import {
  ADMIN_ROLE_LABELS,
  GRANTABLE_MODULES,
  INITIAL_ADMIN_ACCOUNTS,
  INITIAL_AUDIT_LOGS,
  privilegesForRole,
  type AdminAccount,
  type AdminBackOfficeRole,
  type AuditLogLevel,
} from "@/lib/admin-governance-data";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-xs focus:border-brand-forest focus:outline-none";

const emptyForm = {
  name: "",
  email: "",
  role: "staff" as AdminBackOfficeRole,
  active: true,
  privileges: privilegesForRole("staff"),
};

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    slate: "bg-slate-100 text-slate-700",
  };
  return (
    <span className={clsx("rounded-full px-2 py-0.5 text-xs font-semibold", map[color] ?? "")}>
      {children}
    </span>
  );
}

function logLevelColor(level: AuditLogLevel): string {
  if (level === "security") return "red";
  if (level === "warn") return "amber";
  return "slate";
}

function logLevelLabel(level: AuditLogLevel): string {
  if (level === "security") return "Sécurité";
  if (level === "warn") return "Alerte";
  return "Info";
}

export default function AdminGovernance({ user }: { user: Session }) {
  const [tab, setTab] = useState<"accounts" | "logs">("accounts");
  const [accounts, setAccounts] = useState<AdminAccount[]>(INITIAL_ADMIN_ACCOUNTS);
  const [logs] = useState(INITIAL_AUDIT_LOGS);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  const canConfigure = user.role === "admin" && canPerformAction(user, "governance", "configure");

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
    setSaved(false);
  }

  function openEdit(account: AdminAccount) {
    setEditingId(account.id);
    setForm({
      name: account.name,
      email: account.email,
      role: account.role,
      active: account.active,
      privileges: [...account.privileges],
    });
    setFormOpen(true);
    setSaved(false);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleRoleChange(role: AdminBackOfficeRole) {
    setForm((prev) => ({
      ...prev,
      role,
      privileges: privilegesForRole(role),
    }));
  }

  function togglePrivilege(moduleId: AdminModuleId) {
    setForm((prev) => ({
      ...prev,
      privileges: prev.privileges.includes(moduleId)
        ? prev.privileges.filter((p) => p !== moduleId)
        : [...prev.privileges, moduleId],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canConfigure) return;
    if (editingId) {
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? { ...a, name: form.name, email: form.email, role: form.role, active: form.active, privileges: form.privileges }
            : a
        )
      );
    } else {
      setAccounts((prev) => [
        ...prev,
        {
          id: `adm-${Date.now()}`,
          name: form.name,
          email: form.email,
          role: form.role,
          active: form.active,
          privileges: form.privileges,
        },
      ]);
    }
    setSaved(true);
    setTimeout(() => {
      closeForm();
      setSaved(false);
    }, 800);
  }

  function removeAccount(id: string) {
    if (!canConfigure) return;
    if (!confirm("Désactiver / retirer ce compte administrateur ? (démo)")) return;
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  }

  function toggleActive(id: string) {
    if (!canConfigure) return;
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(["accounts", "logs"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={clsx(
              "rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
              tab === t
                ? "bg-brand-forest text-white"
                : "border border-line bg-white text-ink-muted hover:border-brand-forest"
            )}
          >
            {t === "accounts" ? "Comptes administrateurs" : "Journal d'activité"}
          </button>
        ))}
      </div>

      {tab === "accounts" && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-ink-muted">
              {accounts.length} compte(s) · privilèges par module ERP
            </p>
            {canConfigure && (
              <button type="button" onClick={openAdd} className="btn-primary btn-sm inline-flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Ajouter un admin
              </button>
            )}
          </div>

          {formOpen && canConfigure && (
            <form onSubmit={handleSubmit} className="card mb-4 space-y-4 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink">
                  {editingId ? "Modifier le compte" : "Nouveau compte administrateur"}
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
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Email *</label>
                  <input required type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Profil ERP *</label>
                  <select
                    required
                    className={inputCls}
                    value={form.role}
                    onChange={(e) => handleRoleChange(e.target.value as AdminBackOfficeRole)}
                  >
                    {(Object.keys(ADMIN_ROLE_LABELS) as AdminBackOfficeRole[]).map((role) => (
                      <option key={role} value={role}>
                        {ADMIN_ROLE_LABELS[role]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-ink-muted">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) => setForm({ ...form, active: e.target.checked })}
                      className="rounded border-line text-brand-forest focus:ring-brand-forest"
                    />
                    Compte actif
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-ink-muted">Privilèges — modules accessibles</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {GRANTABLE_MODULES.map((mod) => (
                    <label
                      key={mod.id}
                      className={clsx(
                        "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-colors",
                        form.privileges.includes(mod.id)
                          ? "border-brand-forest bg-brand-light text-brand-forest"
                          : "border-line bg-white text-ink-muted"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={form.privileges.includes(mod.id)}
                        onChange={() => togglePrivilege(mod.id)}
                        className="rounded border-line text-brand-forest focus:ring-brand-forest"
                      />
                      {mod.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="btn-primary btn-sm">
                  {saved ? "Enregistré" : editingId ? "Mettre à jour" : "Créer le compte"}
                </button>
                <button type="button" onClick={closeForm} className="btn-secondary btn-sm">
                  Annuler
                </button>
              </div>
            </form>
          )}

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-xs">
                <thead>
                  <tr className="border-b border-line bg-surface-green">
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Nom</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Email</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Profil</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Statut</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Privilèges</th>
                    {canConfigure && (
                      <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((a) => (
                    <tr key={a.id} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
                      <td className="px-4 py-3 font-semibold text-ink">{a.name}</td>
                      <td className="px-4 py-3 text-ink-muted">{a.email}</td>
                      <td className="px-4 py-3">
                        <Tag color="green">{ADMIN_ROLE_LABELS[a.role]}</Tag>
                      </td>
                      <td className="px-4 py-3">
                        <Tag color={a.active ? "green" : "red"}>{a.active ? "Actif" : "Inactif"}</Tag>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {a.privileges.map((p) => {
                            const label = GRANTABLE_MODULES.find((m) => m.id === p)?.label ?? p;
                            return (
                              <span key={p} className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-ink-muted">
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      {canConfigure && (
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => toggleActive(a.id)}
                              className="rounded px-2 py-1 text-[10px] font-semibold text-brand-forest hover:bg-brand-light"
                            >
                              {a.active ? "Désactiver" : "Activer"}
                            </button>
                            <button
                              type="button"
                              onClick={() => openEdit(a)}
                              className="rounded p-1.5 text-ink-muted hover:bg-brand-light hover:text-brand-forest"
                              aria-label={`Modifier ${a.name}`}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeAccount(a.id)}
                              className="rounded p-1.5 text-ink-muted hover:bg-red-50 hover:text-red-600"
                              aria-label={`Supprimer ${a.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "logs" && (
        <>
          <p className="mb-4 text-xs text-ink-muted">
            Journal des actions sensibles — connexions, validations, accès caméras, modération
          </p>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-xs">
                <thead>
                  <tr className="border-b border-line bg-surface-green">
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Date / heure</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Acteur</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Action</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Module</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Niveau</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Détail</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
                      <td className="px-4 py-3 whitespace-nowrap text-ink-muted">{log.at}</td>
                      <td className="px-4 py-3 font-semibold text-ink">{log.actor}</td>
                      <td className="px-4 py-3 text-ink-muted">{log.action}</td>
                      <td className="px-4 py-3 text-ink-muted">{log.module}</td>
                      <td className="px-4 py-3">
                        <Tag color={logLevelColor(log.level)}>{logLevelLabel(log.level)}</Tag>
                      </td>
                      <td className="px-4 py-3 text-ink-muted">{log.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <p className="mt-4 text-[11px] text-ink-subtle">Démonstration — comptes et journal en mémoire locale.</p>
    </div>
  );
}
