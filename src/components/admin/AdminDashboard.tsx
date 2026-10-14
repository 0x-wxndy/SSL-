"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import type { Session } from "@/lib/auth";
import CameraMonitor from "@/components/cameras/CameraMonitor";
import AdminGovernance from "@/components/admin/AdminGovernance";
import PartnersManagement from "@/components/admin/PartnersManagement";
import SchoolManagement from "@/components/admin/SchoolManagement";
import StaffManagement from "@/components/admin/StaffManagement";
import SupplyManagement from "@/components/admin/SupplyManagement";
import { INITIAL_PARTNERS } from "@/lib/admin-partners-data";
import type { ChildDossier, PresenceRecord } from "@/lib/admin-school-data";
import { INITIAL_STOCK_ITEMS, stockAlertLevel } from "@/lib/admin-stock-data";
import {
  getSharedStockItems,
  subscribeSharedStock,
} from "@/lib/admin-notifications";
import { FEATURES } from "@/lib/constants";
import {
  ADMIN_MODULES,
  canAccessModule,
  canPerformAction,
  defaultModuleForRole,
  erpRoleTitle,
  type AdminModuleId,
} from "@/lib/admin-rbac";

const marketplaceListings = [
  { titre: "Soutien maths — Hydra", prestataire: "Fatima Zohra K.", statut: "En attente", statutColor: "amber", date: "28 Mai 2025" },
  { titre: "Ménage 3h/sem — Kouba", prestataire: "Amina R.", statut: "Publiée", statutColor: "green", date: "25 Mai 2025" },
  { titre: "Garde enfants week-end", prestataire: "Samira T.", statut: "Signalée", statutColor: "red", date: "27 Mai 2025" },
];

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

function ModuleHeader({
  moduleId,
  user,
}: {
  moduleId: AdminModuleId;
  user: Session;
}) {
  const meta = ADMIN_MODULES.find((m) => m.id === moduleId);
  const canValidate = canPerformAction(user, moduleId, "validate");
  const readOnly = !canPerformAction(user, moduleId, "edit");

  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="section-label">{meta?.group}</p>
        <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">{meta?.label}</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">{meta?.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="badge badge-info">{erpRoleTitle(user)}</span>
        {readOnly && <span className="badge badge-wait">Lecture seule</span>}
        {canValidate && <span className="badge badge-valid">Validation autorisée</span>}
      </div>
    </div>
  );
}

function CamerasModule() {
  return <CameraMonitor requireOtp={false} supervisorMode />;
}

function MarketplaceModule({ user }: { user: Session }) {
  const canValidate = canPerformAction(user, "marketplace", "validate");

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-line bg-surface-green">
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Annonce</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Prestataire</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Statut</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Soumise le</th>
            {canValidate && (
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {marketplaceListings.map((l) => (
            <tr key={l.titre} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
              <td className="px-4 py-3 font-semibold text-ink">{l.titre}</td>
              <td className="px-4 py-3 text-ink-muted">{l.prestataire}</td>
              <td className="px-4 py-3">
                <Tag color={l.statutColor}>{l.statut}</Tag>
              </td>
              <td className="px-4 py-3 text-ink-muted">{l.date}</td>
              {canValidate && (
                <td className="px-4 py-3">
                  <button className="text-xs font-semibold text-brand-forest hover:underline">
                    Modérer
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GovernanceModule({ user }: { user: Session }) {
  return <AdminGovernance user={user} />;
}

function StatisticsModule({ user }: { user: Session }) {
  const canExport = canPerformAction(user, "reporting", "export");
  const [dossiers, setDossiers] = useState<ChildDossier[]>([]);
  const [presences, setPresences] = useState<PresenceRecord[]>([]);
  const [stockItems, setStockItems] = useState(INITIAL_STOCK_ITEMS);

  const showSchool =
    user.role === "admin" ||
    user.role === "admin2" ||
    (user.role === "staff" && (user.staffTrack === "pedagogie" || user.staffTrack === "accueil"));
  const showPartners =
    user.role === "admin" ||
    user.role === "admin2" ||
    (user.role === "staff" && user.staffTrack === "pedagogie");
  const showSupply =
    user.role === "admin" ||
    user.role === "supply_manager" ||
    (user.role === "staff" && user.staffTrack === "cuisine");
  const showMarketplace =
    FEATURES.marketplace && (user.role === "admin" || user.role === "marketplace_admin");

  useEffect(() => {
    if (!showSchool) return;
    fetch("/api/admin/dossiers")
      .then((r) => (r.ok ? r.json() : { dossiers: [], presences: [] }))
      .then((data) => {
        setDossiers(data.dossiers ?? []);
        setPresences(data.presences ?? []);
      })
      .catch(() => undefined);
  }, [showSchool]);

  useEffect(() => {
    if (!showSupply) return;
    setStockItems(getSharedStockItems());
    return subscribeSharedStock(setStockItems);
  }, [showSupply]);

  const enrolled = dossiers.filter((d) => d.status === "validated").length;
  const pending = dossiers.filter((d) => d.status !== "validated").length;
  const presenceRate = presences.length
    ? `${Math.round((presences.filter((p) => p.status === "Présent").length / presences.length) * 100)}%`
    : "—";
  const stockAlerts = stockItems.filter((i) => stockAlertLevel(i) !== "ok").length;
  const stockCritical = stockItems.filter((i) => stockAlertLevel(i) === "critical").length;
  const stockOk = stockItems.filter((i) => stockAlertLevel(i) === "ok").length;
  const activePartners = INITIAL_PARTNERS.filter((p) => p.status === "validated").length;
  const pendingPartners = INITIAL_PARTNERS.filter((p) => p.status === "pending").length;

  const cards: { label: string; value: string }[] = [];
  if (showSchool) {
    cards.push(
      { label: "Enfants inscrits", value: String(enrolled) },
      { label: "Taux présence", value: presenceRate },
      { label: "Dossiers en attente", value: String(pending) }
    );
  }
  if (showPartners) {
    cards.push(
      { label: "Partenaires actifs", value: String(activePartners) },
      { label: "Contrats en attente", value: String(pendingPartners) }
    );
  }
  if (showSupply) {
    cards.push(
      { label: "Articles en stock", value: String(stockItems.length) },
      { label: "Alertes stock", value: String(stockAlerts) },
      { label: "Stock critique", value: String(stockCritical) },
      { label: "Stock OK", value: String(stockOk) }
    );
  }
  if (showMarketplace) {
    cards.push({ label: "Annonces marketplace", value: String(marketplaceListings.length) });
  }

  return (
    <>
      <p className="mb-4 text-xs text-ink-muted">
        Indicateurs du périmètre {erpRoleTitle(user).split("·")[0].trim()}
      </p>
      {canExport && (
        <div className="mb-4 flex gap-2">
          <button className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-muted hover:bg-surface-green">
            Export PDF
          </button>
          <button className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-muted hover:bg-surface-green">
            Export Excel
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cards.map((k) => (
          <div key={k.label} className="rounded-xl border border-line bg-white p-4 text-center">
            <div className="font-display text-2xl font-bold text-brand-forest">{k.value}</div>
            <div className="mt-1 text-xs text-ink-muted">{k.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<Session | null>(null);
  const moduleParam = searchParams.get("m") as AdminModuleId | null;

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (!user) return;
    const allowed = moduleParam && canAccessModule(user, moduleParam);
    if (!allowed) {
      router.replace(`/admin?m=${defaultModuleForRole(user)}`);
    }
  }, [user, moduleParam, router]);

  if (!user) {
    return <p className="text-sm text-ink-muted">Chargement…</p>;
  }

  const activeModule = moduleParam && canAccessModule(user, moduleParam)
    ? moduleParam
    : defaultModuleForRole(user);

  return (
    <div className="mx-auto max-w-5xl">
      <ModuleHeader moduleId={activeModule} user={user} />

      {activeModule === "school" && <SchoolManagement user={user} />}
      {activeModule === "staff" && <StaffManagement user={user} />}
      {activeModule === "cameras" && <CamerasModule />}
      {activeModule === "partners" && <PartnersManagement user={user} />}
      {activeModule === "marketplace" && <MarketplaceModule user={user} />}
      {activeModule === "supply" && <SupplyManagement user={user} />}
      {activeModule === "governance" && <GovernanceModule user={user} />}
      {activeModule === "reporting" && <StatisticsModule user={user} />}
    </div>
  );
}
