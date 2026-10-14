"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { AlertTriangle, Pencil, Plus, Trash2, X } from "lucide-react";
import type { Session } from "@/lib/auth";
import { canPerformAction } from "@/lib/admin-rbac";
import {
  getSharedStockItems,
  setSharedStockItems,
  subscribeSharedStock,
} from "@/lib/admin-notifications";
import {
  INITIAL_STOCK_MOVEMENTS,
  STOCK_ALERT_COLORS,
  STOCK_ALERT_LABELS,
  STOCK_CATEGORIES,
  STOCK_MOVEMENT_LABELS,
  formatStockTimestamp,
  nextMovementId,
  stockAlertLevel,
  type StockCategory,
  type StockItem,
  type StockMovement,
  type StockMovementType,
} from "@/lib/admin-stock-data";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-xs focus:border-brand-forest focus:outline-none";

const fournisseurs = [
  { nom: "Cantine El Baraka", type: "Cantine", contrat: "Actif", factures: "3 en attente", bons: "2 BC ouverts" },
  { nom: "Papeterie Modern", type: "Bureautique", contrat: "Actif", factures: "1 en attente", bons: "1 BC ouvert" },
  { nom: "Clean Pro Services", type: "Entretien", contrat: "Actif", factures: "Payée", bons: "—" },
];

const emptyItemForm = {
  article: "",
  category: "Cantine" as StockCategory,
  quantity: 0,
  unit: "pcs",
  threshold: 10,
  owner: "Admin stocks" as StockItem["owner"],
};

const emptyMovementForm = {
  itemId: "",
  type: "entree" as StockMovementType,
  quantity: 1,
  note: "",
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

export default function SupplyManagement({ user }: { user: Session }) {
  const [tab, setTab] = useState<"stocks" | "journal" | "fournisseurs" | "analytics">("stocks");
  const [items, setItems] = useState<StockItem[]>(getSharedStockItems);
  const [movements, setMovements] = useState<StockMovement[]>(INITIAL_STOCK_MOVEMENTS);

  const [itemFormOpen, setItemFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState(emptyItemForm);

  const [movementFor, setMovementFor] = useState<StockItem | null>(null);
  const [movementForm, setMovementForm] = useState(emptyMovementForm);

  const [journalType, setJournalType] = useState<StockMovementType | "all">("all");
  const [journalItem, setJournalItem] = useState<string>("all");

  const canCreate = canPerformAction(user, "supply", "create");
  const canEdit = canPerformAction(user, "supply", "edit");
  const canExport = canPerformAction(user, "supply", "export");

  useEffect(() => subscribeSharedStock(setItems), []);

  function syncItems(next: StockItem[] | ((prev: StockItem[]) => StockItem[])) {
    setItems((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      setSharedStockItems(resolved);
      return resolved;
    });
  }

  const alerts = useMemo(
    () => items.filter((i) => stockAlertLevel(i) !== "ok"),
    [items]
  );

  const analytics = useMemo(() => {
    const byCategory = STOCK_CATEGORIES.map((cat) => ({
      category: cat,
      count: items.filter((i) => i.category === cat).length,
      alerts: items.filter((i) => i.category === cat && stockAlertLevel(i) !== "ok").length,
    }));
    const entries = movements.filter((m) => m.type === "entree").length;
    const exits = movements.filter((m) => m.type === "sortie").length;
    const adjustments = movements.filter((m) => m.type === "ajustement").length;
    return {
      total: items.length,
      ok: items.filter((i) => stockAlertLevel(i) === "ok").length,
      low: items.filter((i) => stockAlertLevel(i) === "low").length,
      critical: items.filter((i) => stockAlertLevel(i) === "critical").length,
      byCategory,
      entries,
      exits,
      adjustments,
      movementsTotal: movements.length,
    };
  }, [items, movements]);

  const visibleMovements = useMemo(
    () =>
      movements.filter(
        (m) =>
          (journalType === "all" || m.type === journalType) &&
          (journalItem === "all" || m.itemId === journalItem)
      ),
    [movements, journalType, journalItem]
  );

  function logMovement(item: StockItem, type: StockMovementType, quantity: number, note: string) {
    const now = new Date();
    const delta = type === "sortie" ? -quantity : type === "entree" ? quantity : quantity - item.quantity;
    const balanceAfter = Math.max(0, item.quantity + delta);
    const stamp = formatStockTimestamp(now);

    syncItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: balanceAfter, updatedAt: stamp } : i))
    );
    setMovements((prev) => [
      {
        id: nextMovementId(),
        at: stamp,
        itemId: item.id,
        article: item.article,
        type,
        quantity: type === "ajustement" ? quantity : Math.abs(quantity),
        unit: item.unit,
        balanceAfter,
        actor: user.name,
        note: note || "—",
      },
      ...prev,
    ]);
  }

  function openAddItem() {
    setEditingId(null);
    setItemForm(emptyItemForm);
    setItemFormOpen(true);
  }

  function openEditItem(item: StockItem) {
    setEditingId(item.id);
    setItemForm({
      article: item.article,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      threshold: item.threshold,
      owner: item.owner,
    });
    setItemFormOpen(true);
  }

  function closeItemForm() {
    setItemFormOpen(false);
    setEditingId(null);
    setItemForm(emptyItemForm);
  }

  function submitItem(e: React.FormEvent) {
    e.preventDefault();
    const stamp = formatStockTimestamp(new Date());
    if (editingId) {
      syncItems((prev) =>
        prev.map((i) => (i.id === editingId ? { ...i, ...itemForm, updatedAt: stamp } : i))
      );
    } else {
      syncItems((prev) => [...prev, { id: `stk-${Date.now()}`, ...itemForm, updatedAt: stamp }]);
    }
    closeItemForm();
  }

  function removeItem(id: string) {
    if (!confirm("Retirer cet article du stock ? (démo — aucune suppression réelle en base)")) return;
    syncItems((prev) => prev.filter((i) => i.id !== id));
  }

  function openMovement(item: StockItem) {
    setMovementFor(item);
    setMovementForm({ ...emptyMovementForm, itemId: item.id });
  }

  function submitMovement(e: React.FormEvent) {
    e.preventDefault();
    if (!movementFor) return;
    logMovement(movementFor, movementForm.type, Number(movementForm.quantity), movementForm.note);
    setMovementFor(null);
    setMovementForm(emptyMovementForm);
  }

  return (
    <>
      {alerts.length > 0 && (
        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <h3 className="text-sm font-bold text-ink">
                {alerts.length} article(s) sous le seuil d&apos;alerte
              </h3>
            </div>
            <p className="text-[11px] text-ink-muted">
              Notifications envoyées aux admins responsables (cloche en en-tête)
            </p>
          </div>
          <ul className="space-y-2">
            {alerts.map((item) => {
              const level = stockAlertLevel(item);
              return (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-3 py-2"
                >
                  <div className="text-xs">
                    <span className="font-semibold text-ink">{item.article}</span>{" "}
                    <span className="text-ink-muted">
                      — réserve {item.quantity} {item.unit} / seuil {item.threshold} {item.unit} ·
                      notifié à {item.owner}
                    </span>
                  </div>
                  <Tag color={STOCK_ALERT_COLORS[level]}>{STOCK_ALERT_LABELS[level]}</Tag>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {(["stocks", "journal", "fournisseurs", "analytics"] as const).map((t) => (
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
            {t === "stocks"
              ? "Stocks"
              : t === "journal"
                ? "Journal des mouvements"
                : t === "fournisseurs"
                  ? "Fournisseurs"
                  : "Analytics"}
          </button>
        ))}
      </div>

      {tab === "stocks" && (
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-ink-muted">
              {items.length} article(s) suivis · seuils d&apos;alerte configurables par article
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
                  onClick={openAddItem}
                  className="btn-primary btn-sm inline-flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Nouvel article
                </button>
              )}
            </div>
          </div>

          {itemFormOpen && (canCreate || canEdit) && (
            <form onSubmit={submitItem} className="card mb-4 space-y-3 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink">
                  {editingId ? "Modifier l'article" : "Nouvel article de stock"}
                </h3>
                <button type="button" onClick={closeItemForm} className="text-ink-muted hover:text-ink">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Article *</label>
                  <input
                    required
                    className={inputCls}
                    value={itemForm.article}
                    onChange={(e) => setItemForm({ ...itemForm, article: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Catégorie *</label>
                  <select
                    className={inputCls}
                    value={itemForm.category}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, category: e.target.value as StockCategory })
                    }
                  >
                    {STOCK_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Quantité en réserve *</label>
                  <input
                    required
                    type="number"
                    min={0}
                    className={inputCls}
                    value={itemForm.quantity}
                    onChange={(e) => setItemForm({ ...itemForm, quantity: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Unité *</label>
                  <input
                    required
                    className={inputCls}
                    value={itemForm.unit}
                    onChange={(e) => setItemForm({ ...itemForm, unit: e.target.value })}
                    placeholder="pcs, kg, L…"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Seuil d&apos;alerte *</label>
                  <input
                    required
                    type="number"
                    min={0}
                    className={inputCls}
                    value={itemForm.threshold}
                    onChange={(e) => setItemForm({ ...itemForm, threshold: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Admin responsable *</label>
                  <select
                    className={inputCls}
                    value={itemForm.owner}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, owner: e.target.value as StockItem["owner"] })
                    }
                  >
                    <option value="Admin stocks">Admin stocks</option>
                    <option value="Admin Principal">Admin Principal</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" className="btn-primary btn-sm">
                  {editingId ? "Mettre à jour" : "Ajouter l'article"}
                </button>
                <button type="button" onClick={closeItemForm} className="btn-secondary btn-sm">
                  Annuler
                </button>
              </div>
            </form>
          )}

          {movementFor && (
            <form onSubmit={submitMovement} className="card mb-4 space-y-3 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink">
                  Mouvement — {movementFor.article} ({movementFor.quantity} {movementFor.unit} en réserve)
                </h3>
                <button
                  type="button"
                  onClick={() => setMovementFor(null)}
                  className="text-ink-muted hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Type *</label>
                  <select
                    className={inputCls}
                    value={movementForm.type}
                    onChange={(e) =>
                      setMovementForm({ ...movementForm, type: e.target.value as StockMovementType })
                    }
                  >
                    {(Object.keys(STOCK_MOVEMENT_LABELS) as StockMovementType[]).map((t) => (
                      <option key={t} value={t}>
                        {STOCK_MOVEMENT_LABELS[t]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    {movementForm.type === "ajustement" ? "Nouvelle quantité *" : "Quantité *"}
                  </label>
                  <input
                    required
                    type="number"
                    min={0}
                    className={inputCls}
                    value={movementForm.quantity}
                    onChange={(e) =>
                      setMovementForm({ ...movementForm, quantity: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">Motif</label>
                  <input
                    className={inputCls}
                    value={movementForm.note}
                    onChange={(e) => setMovementForm({ ...movementForm, note: e.target.value })}
                    placeholder="Repas du midi, livraison BC-…"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" className="btn-primary btn-sm">
                  Enregistrer le mouvement
                </button>
                <button
                  type="button"
                  onClick={() => setMovementFor(null)}
                  className="btn-secondary btn-sm"
                >
                  Annuler
                </button>
              </div>
              <p className="text-[11px] text-ink-subtle">
                Chaque mouvement est horodaté et alimente automatiquement les notifications des
                admins responsables lorsque la réserve passe sous le seuil.
              </p>
            </form>
          )}

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-xs">
                <thead>
                  <tr className="border-b border-line bg-surface-green">
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Article</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Catégorie</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Réserve</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Seuil</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">État</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Responsable</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Dernier mouvement</th>
                    {(canEdit || canCreate) && (
                      <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const level = stockAlertLevel(item);
                    return (
                      <tr
                        key={item.id}
                        className="border-b border-line/60 last:border-b-0 hover:bg-surface-green"
                      >
                        <td className="px-4 py-3 font-semibold text-ink">{item.article}</td>
                        <td className="px-4 py-3 text-ink-muted">{item.category}</td>
                        <td
                          className={clsx(
                            "px-4 py-3 font-semibold",
                            level === "critical"
                              ? "text-red-600"
                              : level === "low"
                                ? "text-amber-600"
                                : "text-ink"
                          )}
                        >
                          {item.quantity} {item.unit}
                        </td>
                        <td className="px-4 py-3 text-ink-muted">
                          {item.threshold} {item.unit}
                        </td>
                        <td className="px-4 py-3">
                          <Tag color={STOCK_ALERT_COLORS[level]}>{STOCK_ALERT_LABELS[level]}</Tag>
                        </td>
                        <td className="px-4 py-3 text-ink-muted">{item.owner}</td>
                        <td className="px-4 py-3 text-ink-muted">{item.updatedAt}</td>
                        {(canEdit || canCreate) && (
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              {canEdit && (
                                <button
                                  type="button"
                                  onClick={() => openMovement(item)}
                                  className="rounded px-2 py-1 text-[11px] font-semibold text-brand-forest hover:bg-brand-light"
                                >
                                  Mouvement
                                </button>
                              )}
                              {canEdit && (
                                <button
                                  type="button"
                                  onClick={() => openEditItem(item)}
                                  className="rounded p-1.5 text-ink-muted hover:bg-brand-light hover:text-brand-forest"
                                  aria-label={`Modifier ${item.article}`}
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                              )}
                              {canCreate && (
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.id)}
                                  className="rounded p-1.5 text-ink-muted hover:bg-red-50 hover:text-red-600"
                                  aria-label={`Supprimer ${item.article}`}
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
        </div>
      )}

      {tab === "journal" && (
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <select
              className="rounded-lg border border-line bg-white px-3 py-2 text-xs"
              value={journalType}
              onChange={(e) => setJournalType(e.target.value as StockMovementType | "all")}
            >
              <option value="all">Tous les types</option>
              {(Object.keys(STOCK_MOVEMENT_LABELS) as StockMovementType[]).map((t) => (
                <option key={t} value={t}>
                  {STOCK_MOVEMENT_LABELS[t]}
                </option>
              ))}
            </select>
            <select
              className="rounded-lg border border-line bg-white px-3 py-2 text-xs"
              value={journalItem}
              onChange={(e) => setJournalItem(e.target.value)}
            >
              <option value="all">Tous les articles</option>
              {items.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.article}
                </option>
              ))}
            </select>
            <p className="text-xs text-ink-muted">{visibleMovements.length} entrée(s)</p>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-xs">
                <thead>
                  <tr className="border-b border-line bg-surface-green">
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Horodatage</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Article</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Type</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Quantité</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Réserve après</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Opérateur</th>
                    <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Motif</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleMovements.map((m) => (
                    <tr key={m.id} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
                      <td className="px-4 py-3 font-mono text-ink-muted">{m.at}</td>
                      <td className="px-4 py-3 font-semibold text-ink">{m.article}</td>
                      <td className="px-4 py-3">
                        <Tag
                          color={
                            m.type === "entree" ? "green" : m.type === "sortie" ? "red" : "amber"
                          }
                        >
                          {STOCK_MOVEMENT_LABELS[m.type]}
                        </Tag>
                      </td>
                      <td
                        className={clsx(
                          "px-4 py-3 font-semibold",
                          m.type === "entree"
                            ? "text-green-700"
                            : m.type === "sortie"
                              ? "text-red-600"
                              : "text-ink-muted"
                        )}
                      >
                        {m.type === "entree" ? "+" : m.type === "sortie" ? "−" : ""}
                        {m.quantity} {m.unit}
                      </td>
                      <td className="px-4 py-3 text-ink">
                        {m.balanceAfter} {m.unit}
                      </td>
                      <td className="px-4 py-3 text-ink-muted">{m.actor}</td>
                      <td className="px-4 py-3 text-ink-muted">{m.note}</td>
                    </tr>
                  ))}
                  {visibleMovements.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-ink-muted">
                        Aucun mouvement pour ce filtre.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "fournisseurs" && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-xs">
              <thead>
                <tr className="border-b border-line bg-surface-green">
                  <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Fournisseur</th>
                  <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Type</th>
                  <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Contrat</th>
                  <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Factures</th>
                  <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Bons de commande</th>
                </tr>
              </thead>
              <tbody>
                {fournisseurs.map((f) => (
                  <tr key={f.nom} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
                    <td className="px-4 py-3 font-semibold text-ink">{f.nom}</td>
                    <td className="px-4 py-3 text-ink-muted">{f.type}</td>
                    <td className="px-4 py-3">
                      <Tag color="green">{f.contrat}</Tag>
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{f.factures}</td>
                    <td className="px-4 py-3 text-ink-muted">{f.bons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "analytics" && (
        <div className="space-y-4">
          <p className="text-xs text-ink-muted">
            Vue synthétique des stocks et mouvements — périmètre Admin stocks
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Articles suivis", value: String(analytics.total) },
              { label: "Stock OK", value: String(analytics.ok) },
              { label: "Stock bas", value: String(analytics.low) },
              { label: "Critique", value: String(analytics.critical) },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-line bg-white p-4 text-center">
                <div className="font-display text-2xl font-bold text-brand-forest">{k.value}</div>
                <div className="mt-1 text-xs text-ink-muted">{k.label}</div>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-4">
              <h3 className="mb-3 text-sm font-bold text-ink">Par catégorie</h3>
              <ul className="space-y-2 text-xs">
                {analytics.byCategory.map((row) => (
                  <li
                    key={row.category}
                    className="flex items-center justify-between border-b border-line/60 pb-2 last:border-0"
                  >
                    <span className="font-semibold text-ink">{row.category}</span>
                    <span className="text-ink-muted">
                      {row.count} article{row.count > 1 ? "s" : ""}
                      {row.alerts > 0 && (
                        <span className="ms-2 font-semibold text-amber-700">
                          · {row.alerts} alerte{row.alerts > 1 ? "s" : ""}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-4">
              <h3 className="mb-3 text-sm font-bold text-ink">Mouvements (journal)</h3>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between border-b border-line/60 pb-2">
                  <span className="text-ink-muted">Total enregistrés</span>
                  <span className="font-semibold text-ink">{analytics.movementsTotal}</span>
                </li>
                <li className="flex justify-between border-b border-line/60 pb-2">
                  <span className="text-ink-muted">Entrées</span>
                  <span className="font-semibold text-green-700">{analytics.entries}</span>
                </li>
                <li className="flex justify-between border-b border-line/60 pb-2">
                  <span className="text-ink-muted">Sorties</span>
                  <span className="font-semibold text-red-700">{analytics.exits}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-ink-muted">Ajustements</span>
                  <span className="font-semibold text-ink">{analytics.adjustments}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
