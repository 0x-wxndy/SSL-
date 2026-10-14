"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  BADGE_HOLDER_LABELS,
  INITIAL_BADGE_ACCESS,
  INITIAL_BADGE_SCANS,
  type BadgeAccessRecord,
  type BadgeHolderType,
  type BadgeScanLog,
} from "@/lib/badge-access-data";

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    slate: "bg-slate-100 text-slate-700",
    teal: "bg-teal-light text-teal",
  };
  return (
    <span className={clsx("rounded-full px-2 py-0.5 text-xs font-semibold", map[color] ?? "")}>
      {children}
    </span>
  );
}

function typeColor(type: BadgeHolderType): string {
  if (type === "enfant") return "green";
  if (type === "parent") return "amber";
  if (type === "staff") return "teal";
  return "slate";
}

export default function BadgeAccessPanel() {
  const [badges, setBadges] = useState<BadgeAccessRecord[]>(INITIAL_BADGE_ACCESS);
  const [scans, setScans] = useState<BadgeScanLog[]>(INITIAL_BADGE_SCANS);
  const [scanInput, setScanInput] = useState("");
  const [scanMessage, setScanMessage] = useState("");

  function toggleActive(id: string) {
    setBadges((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
  }

  function simulateScan(e: React.FormEvent) {
    e.preventDefault();
    const code = scanInput.trim().toUpperCase();
    if (!code) return;
    const match = badges.find((b) => b.badgeId.toUpperCase() === code);
    const now = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    if (!match) {
      setScanMessage(`Badge ${code} — inconnu / refusé`);
      setScans((prev) => [
        {
          id: `scan-${Date.now()}`,
          at: now,
          badgeId: code,
          holderName: "—",
          holderType: "staff",
          gate: "Entrée principale",
          result: "Refusé",
        },
        ...prev,
      ]);
    } else if (!match.active) {
      setScanMessage(`${match.holderName} — badge inactif / refusé`);
      setScans((prev) => [
        {
          id: `scan-${Date.now()}`,
          at: now,
          badgeId: match.badgeId,
          holderName: match.holderName,
          holderType: match.holderType,
          gate: match.gate,
          result: "Refusé",
        },
        ...prev,
      ]);
    } else {
      setScanMessage(`${match.holderName} (${BADGE_HOLDER_LABELS[match.holderType]}) — autorisé · ${match.gate}`);
      setBadges((prev) =>
        prev.map((b) =>
          b.id === match.id ? { ...b, lastScan: `Aujourd'hui · ${now}` } : b
        )
      );
      setScans((prev) => [
        {
          id: `scan-${Date.now()}`,
          at: now,
          badgeId: match.badgeId,
          holderName: match.holderName,
          holderType: match.holderType,
          gate: match.gate,
          result: "Autorisé",
        },
        ...prev,
      ]);
    }
    setScanInput("");
  }

  const counts = {
    parent: badges.filter((b) => b.holderType === "parent").length,
    staff: badges.filter((b) => b.holderType === "staff").length,
    partenaire: badges.filter((b) => b.holderType === "partenaire").length,
    enfant: badges.filter((b) => b.holderType === "enfant").length,
  };

  return (
    <div>
      <p className="mb-4 text-xs text-ink-muted">
        Contrôle d&apos;accès aux entrées — badges enfants, parents, personnel et partenaires
        scolaires · {counts.enfant} enfants · {counts.parent} parent(s) · {counts.staff} staff ·{" "}
        {counts.partenaire} partenaire(s)
      </p>

      <form onSubmit={simulateScan} className="card mb-4 flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-xs font-semibold text-ink-muted">
            Scanner un badge (démo)
          </label>
          <input
            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-mono focus:border-brand-forest focus:outline-none"
            value={scanInput}
            onChange={(e) => setScanInput(e.target.value)}
            placeholder="ex. BADGE-0187, PAR-0001, STF-010, PTR-008"
          />
        </div>
        <button type="submit" className="btn-primary btn-sm">
          Simuler le scan
        </button>
        {scanMessage && (
          <p className="w-full text-xs font-semibold text-brand-forest">{scanMessage}</p>
        )}
      </form>

      <div className="card mb-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-xs">
            <thead>
              <tr className="border-b border-line bg-surface-green">
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Badge</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Titulaire</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Type</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Profil</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Portail</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Dernier scan</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Accès</th>
              </tr>
            </thead>
            <tbody>
              {badges.map((b) => (
                <tr key={b.id} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
                  <td className="px-4 py-3 font-mono text-ink-muted">{b.badgeId}</td>
                  <td className="px-4 py-3 font-semibold text-ink">{b.holderName}</td>
                  <td className="px-4 py-3">
                    <Tag color={typeColor(b.holderType)}>{BADGE_HOLDER_LABELS[b.holderType]}</Tag>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{b.roleLabel}</td>
                  <td className="px-4 py-3 text-ink-muted">{b.gate}</td>
                  <td className="px-4 py-3 text-ink-muted">{b.lastScan}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(b.id)}
                      className="text-xs font-semibold text-brand-forest hover:underline"
                    >
                      <Tag color={b.active ? "green" : "red"}>{b.active ? "Actif" : "Inactif"}</Tag>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h3 className="mb-2 text-sm font-bold text-ink">Journal des scans — aujourd&apos;hui</h3>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-xs">
            <thead>
              <tr className="border-b border-line bg-surface-green">
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Heure</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Badge</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Titulaire</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Type</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Portail</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Résultat</th>
              </tr>
            </thead>
            <tbody>
              {scans.slice(0, 12).map((s) => (
                <tr key={s.id} className="border-b border-line/60 last:border-b-0">
                  <td className="px-4 py-3 font-mono text-ink-muted">{s.at}</td>
                  <td className="px-4 py-3 font-mono text-ink-muted">{s.badgeId}</td>
                  <td className="px-4 py-3 font-semibold text-ink">{s.holderName}</td>
                  <td className="px-4 py-3">
                    <Tag color={typeColor(s.holderType)}>{BADGE_HOLDER_LABELS[s.holderType]}</Tag>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{s.gate}</td>
                  <td className="px-4 py-3">
                    <Tag color={s.result === "Autorisé" ? "green" : "red"}>{s.result}</Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
