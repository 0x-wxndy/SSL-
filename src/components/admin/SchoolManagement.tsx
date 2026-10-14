"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Check, Link2, Link2Off, Pencil, Plus, Trash2, X } from "lucide-react";
import type { LinkableAccount, Session } from "@/lib/auth";
import { ESTABLISHMENT } from "@/lib/constants";
import { canPerformAction } from "@/lib/admin-rbac";
import ParentActivationQueue from "@/components/admin/ParentActivationQueue";
import BadgeAccessPanel from "@/components/admin/BadgeAccessPanel";
import {
  DOCUMENT_FIELD_LABELS,
  DOSSIER_STATUS_COLORS,
  DOSSIER_STATUS_LABELS,
  EMPTY_DOCUMENTS,
  PACK_FORMULA_HINTS,
  PACK_FORMULAS,
  documentsProgress,
  packColor,
  type ChildDossier,
  type ChildGender,
  type DossierDocuments,
  type DossierStatus,
  type PackFormula,
  type PresenceRecord,
} from "@/lib/admin-school-data";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-xs focus:border-brand-forest focus:outline-none";

const textareaCls = `${inputCls} min-h-[64px] resize-y`;

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={clsx("rounded-full px-2 py-0.5 text-xs font-semibold", map[color] ?? "")}>
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="col-span-full border-b border-line pb-1 text-[11px] font-bold uppercase tracking-wide text-brand-forest">
      {children}
    </p>
  );
}

type DossierFormState = {
  name: string;
  birthDate: string;
  age: string;
  gender: ChildGender;
  school: string;
  classLevel: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  parentRelation: string;
  linkedAccountEmail: string;
  emergencyName: string;
  emergencyPhone: string;
  allergies: string;
  medicalNotes: string;
  authorizedPickup: string;
  pack: PackFormula;
  status: DossierStatus;
  submittedAt: string;
  notes: string;
  documents: DossierDocuments;
  physicalValidated: boolean;
};

function todayStamp() {
  return new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const emptyDossierForm: DossierFormState = {
  name: "",
  birthDate: "",
  age: "",
  gender: "F",
  school: "",
  classLevel: "",
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  parentRelation: "Parent",
  linkedAccountEmail: "",
  emergencyName: "",
  emergencyPhone: "",
  allergies: "",
  medicalNotes: "",
  authorizedPickup: "",
  pack: "Pack 1",
  status: "incomplete",
  submittedAt: todayStamp(),
  notes: "",
  documents: { ...EMPTY_DOCUMENTS },
  physicalValidated: false,
};

const emptyPresenceForm = {
  dossierId: "",
  name: "",
  arrival: "",
  departure: "—",
  status: "Absent" as PresenceRecord["status"],
};

export default function SchoolManagement({ user }: { user: Session }) {
  const [tab, setTab] = useState<"dossiers" | "presence" | "badges">("dossiers");
  const [dossiers, setDossiers] = useState<ChildDossier[]>([]);
  const [presences, setPresences] = useState<PresenceRecord[]>([]);
  const [accounts, setAccounts] = useState<LinkableAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [queueKey, setQueueKey] = useState(0);

  const [dossierFormOpen, setDossierFormOpen] = useState(false);
  const [editingDossierId, setEditingDossierId] = useState<string | null>(null);
  const [dossierForm, setDossierForm] = useState(emptyDossierForm);
  const [dossierSaved, setDossierSaved] = useState(false);

  const [presenceFormOpen, setPresenceFormOpen] = useState(false);
  const [editingPresenceId, setEditingPresenceId] = useState<string | null>(null);
  const [presenceForm, setPresenceForm] = useState(emptyPresenceForm);
  const [presenceSaved, setPresenceSaved] = useState(false);

  const canCreate = canPerformAction(user, "school", "create");
  const canEdit = canPerformAction(user, "school", "edit");
  const canValidate = canPerformAction(user, "school", "validate");
  const canExport = canPerformAction(user, "school", "export");

  const load = useCallback(() => {
    return fetch("/api/admin/dossiers")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Chargement impossible"))))
      .then((data) => {
        setDossiers(data.dossiers ?? []);
        setPresences(data.presences ?? []);
        setAccounts(data.accounts ?? []);
        setError("");
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /** Applique la réponse d'une mutation et resynchronise la file d'attente parent */
  function applyMutation(data: { dossiers?: ChildDossier[]; presences?: PresenceRecord[] }) {
    if (data.dossiers) setDossiers(data.dossiers);
    if (data.presences) setPresences(data.presences);
    setQueueKey((k) => k + 1);
  }

  async function mutate(url: string, init: RequestInit) {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error ?? "Opération refusée");
      return null;
    }
    setError("");
    applyMutation(data);
    return data;
  }

  const pendingCount = dossiers.filter((d) => d.status === "pending_admin2").length;
  const linkedCount = dossiers.filter((d) => d.linkedAccountEmail).length;

  /** Nombre d'enfants déjà rattachés par compte — permet de repérer les fratries */
  const childrenPerAccount = useMemo(() => {
    const counts = new Map<string, number>();
    for (const d of dossiers) {
      if (!d.linkedAccountEmail) continue;
      counts.set(d.linkedAccountEmail, (counts.get(d.linkedAccountEmail) ?? 0) + 1);
    }
    return counts;
  }, [dossiers]);

  const accountName = useCallback(
    (email: string) => accounts.find((a) => a.email === email)?.name ?? email,
    [accounts]
  );

  function openAddDossier() {
    setEditingDossierId(null);
    setDossierForm({
      ...emptyDossierForm,
      documents: { ...EMPTY_DOCUMENTS },
      submittedAt: todayStamp(),
    });
    setDossierFormOpen(true);
    setDossierSaved(false);
  }

  function openEditDossier(d: ChildDossier) {
    setEditingDossierId(d.id);
    setDossierForm({
      name: d.name,
      birthDate: d.birthDate,
      age: d.age,
      gender: d.gender,
      school: d.school,
      classLevel: d.classLevel,
      parentName: d.parentName,
      parentPhone: d.parentPhone,
      parentEmail: d.parentEmail,
      parentRelation: d.parentRelation,
      linkedAccountEmail: d.linkedAccountEmail,
      emergencyName: d.emergencyName,
      emergencyPhone: d.emergencyPhone,
      allergies: d.allergies,
      medicalNotes: d.medicalNotes,
      authorizedPickup: d.authorizedPickup,
      pack: d.pack,
      status: d.status,
      submittedAt: d.submittedAt,
      notes: d.notes,
      documents: { ...d.documents },
      physicalValidated: d.physicalValidated,
    });
    setDossierFormOpen(true);
    setDossierSaved(false);
  }

  function closeDossierForm() {
    setDossierFormOpen(false);
    setEditingDossierId(null);
    setDossierForm({ ...emptyDossierForm, documents: { ...EMPTY_DOCUMENTS } });
  }

  /** Préremplit le parent depuis le compte choisi si les champs sont vides */
  function selectLinkedAccount(email: string) {
    const account = accounts.find((a) => a.email === email);
    setDossierForm((prev) => ({
      ...prev,
      linkedAccountEmail: email,
      parentName: prev.parentName || account?.name || "",
      parentEmail: account?.email ?? prev.parentEmail,
    }));
  }

  async function submitDossier(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...dossierForm, documents: { ...dossierForm.documents } };
    const result = editingDossierId
      ? await mutate(`/api/admin/dossiers/${editingDossierId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        })
      : await mutate("/api/admin/dossiers", {
          method: "POST",
          body: JSON.stringify(payload),
        });
    if (!result) return;
    setDossierSaved(true);
    setTimeout(() => {
      closeDossierForm();
      setDossierSaved(false);
    }, 800);
  }

  async function removeDossier(d: ChildDossier) {
    const warning = d.linkedAccountEmail
      ? `Supprimer le dossier de ${d.name} ? Le compte ${d.linkedAccountEmail} perdra l'accès à cet enfant.`
      : `Supprimer le dossier de ${d.name} ?`;
    if (!confirm(`${warning} (démo — aucune suppression réelle en base)`)) return;
    await mutate(`/api/admin/dossiers/${d.id}`, { method: "DELETE" });
  }

  async function setStatus(id: string, status: DossierStatus) {
    await mutate(`/api/admin/dossiers/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  async function togglePhysicalValidated(d: ChildDossier) {
    if (!canValidate && !canEdit) return;
    await mutate(`/api/admin/dossiers/${d.id}`, {
      method: "PATCH",
      body: JSON.stringify({ physicalValidated: !d.physicalValidated }),
    });
  }

  async function unlinkAccount(d: ChildDossier) {
    if (!confirm(`Détacher ${d.name} du compte ${d.linkedAccountEmail} ?`)) return;
    await mutate(`/api/admin/dossiers/${d.id}`, {
      method: "PATCH",
      body: JSON.stringify({ linkedAccountEmail: "" }),
    });
  }

  function setDocument(key: keyof DossierDocuments, value: boolean) {
    setDossierForm((prev) => ({
      ...prev,
      documents: { ...prev.documents, [key]: value },
    }));
  }

  function openAddPresence() {
    setEditingPresenceId(null);
    setPresenceForm(emptyPresenceForm);
    setPresenceFormOpen(true);
    setPresenceSaved(false);
  }

  function openEditPresence(p: PresenceRecord) {
    setEditingPresenceId(p.id);
    setPresenceForm({
      dossierId: p.dossierId,
      name: p.name,
      arrival: p.arrival,
      departure: p.departure,
      status: p.status,
    });
    setPresenceFormOpen(true);
    setPresenceSaved(false);
  }

  function closePresenceForm() {
    setPresenceFormOpen(false);
    setEditingPresenceId(null);
    setPresenceForm(emptyPresenceForm);
  }

  async function submitPresence(e: React.FormEvent) {
    e.preventDefault();
    const result = editingPresenceId
      ? await mutate(`/api/admin/presences/${editingPresenceId}`, {
          method: "PATCH",
          body: JSON.stringify(presenceForm),
        })
      : await mutate("/api/admin/presences", {
          method: "POST",
          body: JSON.stringify(presenceForm),
        });
    if (!result) return;
    setPresenceSaved(true);
    setTimeout(() => {
      closePresenceForm();
      setPresenceSaved(false);
    }, 800);
  }

  async function removePresence(id: string) {
    if (!confirm("Retirer cette ligne de présence ? (démo)")) return;
    await mutate(`/api/admin/presences/${id}`, { method: "DELETE" });
  }

  async function togglePresenceStatus(p: PresenceRecord) {
    const becomingPresent = p.status === "Absent";
    await mutate(`/api/admin/presences/${p.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: becomingPresent ? "Présent" : "Absent",
        arrival: becomingPresent
          ? new Date()
              .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
              .replace(":", "h")
          : p.arrival,
      }),
    });
  }

  if (loading) {
    return <p className="text-sm text-ink-muted">Chargement des dossiers…</p>;
  }

  return (
    <div>
      <ParentActivationQueue
        canValidate={canValidate}
        refreshKey={queueKey}
        onApproved={load}
      />

      {error && (
        <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {(["dossiers", "presence", "badges"] as const).map((t) => (
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
            {t === "dossiers"
              ? "Dossiers enfants"
              : t === "presence"
                ? "Feuille de présence"
                : "Contrôle d'accès badges"}
          </button>
        ))}
      </div>

      {tab === "dossiers" && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-ink-muted">
              Validation Admin 1 &amp; Admin 2 · Délai {ESTABLISHMENT.validationDelay} ·{" "}
              {pendingCount} dossier(s) en cours · {linkedCount}/{dossiers.length} rattaché(s) à un
              compte parent
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
                <button
                  type="button"
                  onClick={openAddDossier}
                  className="btn-primary btn-sm inline-flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Nouveau dossier
                </button>
              )}
            </div>
          </div>

          {dossierFormOpen && (canCreate || canEdit) && (
            <form onSubmit={submitDossier} className="card mb-4 space-y-4 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink">
                  {editingDossierId ? "Modifier le dossier" : "Nouveau dossier enfant"}
                </h3>
                <button
                  type="button"
                  onClick={closeDossierForm}
                  className="text-ink-muted hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <SectionTitle>Identité de l&apos;enfant</SectionTitle>
                <div className="sm:col-span-2 lg:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Nom complet *
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={dossierForm.name}
                    onChange={(e) => setDossierForm({ ...dossierForm, name: e.target.value })}
                    placeholder="Prénom et nom de famille"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Date de naissance *
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={dossierForm.birthDate}
                    onChange={(e) => setDossierForm({ ...dossierForm, birthDate: e.target.value })}
                    placeholder="JJ/MM/AAAA"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Âge *</label>
                  <input
                    required
                    className={inputCls}
                    value={dossierForm.age}
                    onChange={(e) => setDossierForm({ ...dossierForm, age: e.target.value })}
                    placeholder="ex. 10 ans"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Sexe *</label>
                  <select
                    required
                    className={inputCls}
                    value={dossierForm.gender}
                    onChange={(e) =>
                      setDossierForm({ ...dossierForm, gender: e.target.value as ChildGender })
                    }
                  >
                    <option value="F">Fille</option>
                    <option value="M">Garçon</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Établissement scolaire *
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={dossierForm.school}
                    onChange={(e) => setDossierForm({ ...dossierForm, school: e.target.value })}
                    placeholder="Nom de l'école / CEM / lycée"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Classe / niveau *
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={dossierForm.classLevel}
                    onChange={(e) => setDossierForm({ ...dossierForm, classLevel: e.target.value })}
                    placeholder="ex. 5e AP, 1re AS"
                  />
                </div>

                <SectionTitle>Compte parent rattaché</SectionTitle>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Compte plateforme
                  </label>
                  <select
                    className={inputCls}
                    value={dossierForm.linkedAccountEmail}
                    onChange={(e) => selectLinkedAccount(e.target.value)}
                  >
                    <option value="">Aucun — dossier non rattaché</option>
                    {accounts.map((a) => {
                      const count = childrenPerAccount.get(a.email) ?? 0;
                      return (
                        <option key={a.email} value={a.email}>
                          {a.name} — {a.email}
                          {count > 0 ? ` (${count} enfant${count > 1 ? "s" : ""} déjà rattaché${count > 1 ? "s" : ""})` : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex items-end">
                  <p className="text-[11px] leading-snug text-ink-muted">
                    Un même compte peut porter plusieurs enfants. L&apos;espace parent s&apos;ouvre
                    dès qu&apos;un dossier rattaché passe en « Validé ».
                  </p>
                </div>

                <SectionTitle>Parent / tuteur principal</SectionTitle>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Nom du parent *
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={dossierForm.parentName}
                    onChange={(e) => setDossierForm({ ...dossierForm, parentName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Lien *</label>
                  <select
                    required
                    className={inputCls}
                    value={dossierForm.parentRelation}
                    onChange={(e) =>
                      setDossierForm({ ...dossierForm, parentRelation: e.target.value })
                    }
                  >
                    <option value="Mère">Mère</option>
                    <option value="Père">Père</option>
                    <option value="Tuteur légal">Tuteur légal</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Téléphone *
                  </label>
                  <input
                    required
                    type="tel"
                    className={inputCls}
                    value={dossierForm.parentPhone}
                    onChange={(e) => setDossierForm({ ...dossierForm, parentPhone: e.target.value })}
                    placeholder="+213 5XX XX XX XX"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Email</label>
                  <input
                    type="email"
                    className={inputCls}
                    value={dossierForm.parentEmail}
                    onChange={(e) => setDossierForm({ ...dossierForm, parentEmail: e.target.value })}
                  />
                </div>

                <SectionTitle>Contact d&apos;urgence</SectionTitle>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Personne à contacter *
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={dossierForm.emergencyName}
                    onChange={(e) =>
                      setDossierForm({ ...dossierForm, emergencyName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Téléphone urgence *
                  </label>
                  <input
                    required
                    type="tel"
                    className={inputCls}
                    value={dossierForm.emergencyPhone}
                    onChange={(e) =>
                      setDossierForm({ ...dossierForm, emergencyPhone: e.target.value })
                    }
                    placeholder="+213 5XX XX XX XX"
                  />
                </div>

                <SectionTitle>Santé &amp; sécurité</SectionTitle>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Allergies *
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={dossierForm.allergies}
                    onChange={(e) => setDossierForm({ ...dossierForm, allergies: e.target.value })}
                    placeholder="Aucune, ou préciser"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Notes médicales / besoins particuliers
                  </label>
                  <input
                    className={inputCls}
                    value={dossierForm.medicalNotes}
                    onChange={(e) =>
                      setDossierForm({ ...dossierForm, medicalNotes: e.target.value })
                    }
                    placeholder="Traitement, appareil, régime…"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Personnes autorisées à récupérer l&apos;enfant *
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={dossierForm.authorizedPickup}
                    onChange={(e) =>
                      setDossierForm({ ...dossierForm, authorizedPickup: e.target.value })
                    }
                    placeholder="Noms complets, séparés par une virgule"
                  />
                </div>

                <SectionTitle>Formule &amp; suivi</SectionTitle>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Formule *
                  </label>
                  <select
                    required
                    className={inputCls}
                    value={dossierForm.pack}
                    onChange={(e) =>
                      setDossierForm({ ...dossierForm, pack: e.target.value as PackFormula })
                    }
                  >
                    {PACK_FORMULAS.map((p) => (
                      <option key={p} value={p}>
                        {p} — {PACK_FORMULA_HINTS[p]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Statut dossier
                  </label>
                  <select
                    className={inputCls}
                    value={dossierForm.status}
                    onChange={(e) =>
                      setDossierForm({ ...dossierForm, status: e.target.value as DossierStatus })
                    }
                  >
                    {(Object.keys(DOSSIER_STATUS_LABELS) as DossierStatus[]).map((s) => (
                      <option key={s} value={s}>
                        {DOSSIER_STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Notes administratives
                  </label>
                  <textarea
                    className={textareaCls}
                    value={dossierForm.notes}
                    onChange={(e) => setDossierForm({ ...dossierForm, notes: e.target.value })}
                    placeholder="Observations internes, pièces manquantes, etc."
                  />
                </div>

                <SectionTitle>Pièces du dossier physique</SectionTitle>
                <div className="col-span-full grid gap-2 sm:grid-cols-2">
                  {DOCUMENT_FIELD_LABELS.map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink hover:border-brand-forest"
                    >
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 rounded border-line text-brand-forest focus:ring-brand-forest"
                        checked={dossierForm.documents[key]}
                        onChange={(e) => setDocument(key, e.target.checked)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
                <div className="col-span-full">
                  <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-ink">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-3.5 w-3.5 rounded border-line text-brand-forest focus:ring-brand-forest"
                      checked={dossierForm.physicalValidated}
                      onChange={(e) =>
                        setDossierForm({ ...dossierForm, physicalValidated: e.target.checked })
                      }
                      disabled={!canValidate && !canEdit}
                    />
                    <span>
                      <span className="font-semibold">Dossier physique validé</span>
                      <span className="mt-0.5 block text-[11px] text-ink-muted">
                        Confirme la réception et la conformité du dossier papier (pièces ci-dessus
                        vérifiées).
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button type="submit" className="btn-primary btn-sm">
                  {dossierSaved
                    ? "Enregistré"
                    : editingDossierId
                      ? "Mettre à jour"
                      : "Créer le dossier"}
                </button>
                <button type="button" onClick={closeDossierForm} className="btn-secondary btn-sm">
                  Annuler
                </button>
              </div>
            </form>
          )}

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px] text-xs">
                <thead>
                  <tr className="border-b border-line bg-surface-green">
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Enfant</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">
                      École / classe
                    </th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Parent</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">
                      Compte parent lié
                    </th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Formule</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Statut</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Pièces</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">
                      Dossier physique validé
                    </th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Soumis le</th>
                    {(canValidate || canEdit || canCreate) && (
                      <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {dossiers.map((d) => {
                    const progress = documentsProgress(d.documents);
                    const siblings = d.linkedAccountEmail
                      ? (childrenPerAccount.get(d.linkedAccountEmail) ?? 1) - 1
                      : 0;
                    return (
                      <tr
                        key={d.id}
                        className="border-b border-line/60 last:border-b-0 hover:bg-surface-green"
                      >
                        <td className="px-4 py-3">
                          <p className="font-semibold text-ink">{d.name}</p>
                          <p className="text-[10px] text-ink-muted">
                            {d.age}
                            {d.birthDate ? ` · née/né le ${d.birthDate}` : ""}
                          </p>
                          <p className="text-[10px] font-mono text-ink-subtle">{d.badgeId}</p>
                          {d.allergies && d.allergies !== "Aucune" && (
                            <p className="mt-0.5 text-[10px] font-semibold text-red-600">
                              Allergie : {d.allergies}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-ink-muted">
                          <p>{d.school || "—"}</p>
                          <p className="text-[10px]">{d.classLevel || "—"}</p>
                        </td>
                        <td className="px-4 py-3 text-ink-muted">
                          <p className="font-medium text-ink">{d.parentName || "—"}</p>
                          <p className="text-[10px]">{d.parentPhone || "—"}</p>
                        </td>
                        <td className="px-4 py-3">
                          {d.linkedAccountEmail ? (
                            <>
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-forest">
                                <Link2 className="h-3 w-3" />
                                {accountName(d.linkedAccountEmail)}
                              </span>
                              <p className="font-mono text-[10px] text-ink-muted">
                                {d.linkedAccountEmail}
                              </p>
                              {siblings > 0 && (
                                <p className="mt-0.5 text-[10px] text-ink-subtle">
                                  + {siblings} autre enfant{siblings > 1 ? "s" : ""} sur ce compte
                                </p>
                              )}
                            </>
                          ) : (
                            <Tag color="slate">Non rattaché</Tag>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Tag color={packColor(d.pack)}>{d.pack}</Tag>
                        </td>
                        <td className="px-4 py-3">
                          <Tag color={DOSSIER_STATUS_COLORS[d.status]}>
                            {DOSSIER_STATUS_LABELS[d.status]}
                          </Tag>
                        </td>
                        <td className="px-4 py-3 text-ink-muted">
                          {progress.done}/{progress.total}
                        </td>
                        <td className="px-4 py-3">
                          {canValidate || canEdit ? (
                            <label className="inline-flex cursor-pointer items-center gap-2">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-line text-brand-forest focus:ring-brand-forest"
                                checked={d.physicalValidated}
                                onChange={() => togglePhysicalValidated(d)}
                                aria-label={`Dossier physique validé — ${d.name}`}
                              />
                              <span
                                className={clsx(
                                  "text-[11px] font-semibold",
                                  d.physicalValidated ? "text-green-700" : "text-ink-muted"
                                )}
                              >
                                {d.physicalValidated ? "Confirmé" : "À confirmer"}
                              </span>
                            </label>
                          ) : d.physicalValidated ? (
                            <Tag color="green">Confirmé</Tag>
                          ) : (
                            <Tag color="amber">À confirmer</Tag>
                          )}
                          {d.physicalValidated && d.physicalValidatedBy && (
                            <p className="mt-1 text-[10px] text-ink-subtle">
                              {d.physicalValidatedBy}
                              {d.physicalValidatedAt ? ` · ${d.physicalValidatedAt}` : ""}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-ink-muted">{d.submittedAt}</td>
                        {(canValidate || canEdit || canCreate) && (
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap items-center gap-1">
                              {canValidate && d.status === "pending_admin2" && (
                                <button
                                  type="button"
                                  onClick={() => setStatus(d.id, "validated")}
                                  className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-brand-forest hover:bg-brand-light"
                                >
                                  <Check className="h-3 w-3" />
                                  Valider
                                </button>
                              )}
                              {canValidate && d.status === "incomplete" && (
                                <button
                                  type="button"
                                  onClick={() => setStatus(d.id, "pending_admin2")}
                                  className="text-xs font-semibold text-red-600 hover:underline"
                                >
                                  Relancer
                                </button>
                              )}
                              {canEdit && (
                                <button
                                  type="button"
                                  onClick={() => openEditDossier(d)}
                                  className="rounded p-1.5 text-ink-muted hover:bg-brand-light hover:text-brand-forest"
                                  aria-label={`Modifier ${d.name}`}
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                              )}
                              {canEdit && d.linkedAccountEmail && (
                                <button
                                  type="button"
                                  onClick={() => unlinkAccount(d)}
                                  className="rounded p-1.5 text-ink-muted hover:bg-amber-50 hover:text-amber-700"
                                  aria-label={`Détacher ${d.name} du compte parent`}
                                >
                                  <Link2Off className="h-3.5 w-3.5" />
                                </button>
                              )}
                              {canCreate && (
                                <button
                                  type="button"
                                  onClick={() => removeDossier(d)}
                                  className="rounded p-1.5 text-ink-muted hover:bg-red-50 hover:text-red-600"
                                  aria-label={`Supprimer ${d.name}`}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "presence" && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-ink-muted">
              Badgeuse automatique par carte ID / badge adhésion · les présences remontent dans
              l&apos;espace parent
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
                <button
                  type="button"
                  onClick={openAddPresence}
                  className="btn-primary btn-sm inline-flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Ajouter une ligne
                </button>
              )}
            </div>
          </div>

          {presenceFormOpen && (canCreate || canEdit) && (
            <form onSubmit={submitPresence} className="card mb-4 space-y-3 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink">
                  {editingPresenceId ? "Modifier la présence" : "Nouvelle entrée"}
                </h3>
                <button
                  type="button"
                  onClick={closePresenceForm}
                  className="text-ink-muted hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    Enfant (dossier) *
                  </label>
                  <select
                    required
                    className={inputCls}
                    value={presenceForm.dossierId}
                    onChange={(e) => {
                      const dossier = dossiers.find((d) => d.id === e.target.value);
                      setPresenceForm({
                        ...presenceForm,
                        dossierId: e.target.value,
                        name: dossier?.name ?? presenceForm.name,
                      });
                    }}
                  >
                    <option value="">Sélectionner un dossier…</option>
                    {dossiers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} — {d.badgeId}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Statut</label>
                  <select
                    className={inputCls}
                    value={presenceForm.status}
                    onChange={(e) =>
                      setPresenceForm({
                        ...presenceForm,
                        status: e.target.value as PresenceRecord["status"],
                      })
                    }
                  >
                    <option value="Présent">Présent</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Arrivée</label>
                  <input
                    className={inputCls}
                    value={presenceForm.arrival}
                    onChange={(e) =>
                      setPresenceForm({ ...presenceForm, arrival: e.target.value })
                    }
                    placeholder="07h14 ou —"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Départ</label>
                  <input
                    className={inputCls}
                    value={presenceForm.departure}
                    onChange={(e) =>
                      setPresenceForm({ ...presenceForm, departure: e.target.value })
                    }
                    placeholder="17h30 ou —"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" className="btn-primary btn-sm">
                  {presenceSaved ? "Enregistré" : editingPresenceId ? "Mettre à jour" : "Ajouter"}
                </button>
                <button type="button" onClick={closePresenceForm} className="btn-secondary btn-sm">
                  Annuler
                </button>
              </div>
            </form>
          )}

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-xs">
                <thead>
                  <tr className="border-b border-line bg-surface-green">
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Enfant</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Badge ID</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Arrivée</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Départ</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Statut</th>
                    {(canEdit || canCreate) && (
                      <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {presences.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-line/60 last:border-b-0 hover:bg-surface-green"
                    >
                      <td className="px-4 py-3 font-semibold text-ink">{p.name}</td>
                      <td className="px-4 py-3 font-mono text-ink-muted">{p.badgeId}</td>
                      <td className="px-4 py-3 text-ink-muted">{p.arrival}</td>
                      <td className="px-4 py-3 text-ink-muted">{p.departure}</td>
                      <td className="px-4 py-3">
                        <Tag color={p.status === "Présent" ? "green" : "red"}>{p.status}</Tag>
                      </td>
                      {(canEdit || canCreate) && (
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {canEdit && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => togglePresenceStatus(p)}
                                  className="rounded px-2 py-1 text-[10px] font-semibold text-brand-forest hover:bg-brand-light"
                                >
                                  Basculer
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openEditPresence(p)}
                                  className="rounded p-1.5 text-ink-muted hover:bg-brand-light hover:text-brand-forest"
                                  aria-label={`Modifier ${p.name}`}
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                              </>
                            )}
                            {canCreate && (
                              <button
                                type="button"
                                onClick={() => removePresence(p.id)}
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
        </>
      )}

      {tab === "badges" && <BadgeAccessPanel />}

      <p className="mt-4 text-[11px] text-ink-subtle">
        Démonstration — les dossiers sont conservés en mémoire côté serveur et partagés avec
        l&apos;espace parent.
      </p>
    </div>
  );
}
