"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import type { Session } from "@/lib/auth";
import { ESTABLISHMENT } from "@/lib/constants";
import {
  ADMIN_MODULES,
  ERP_ROLE_DEFINITIONS,
  canAccessModule,
  canPerformAction,
  defaultModuleForRole,
  erpRoleTitle,
  type AdminModuleId,
} from "@/lib/admin-rbac";

const dossiers = [
  { nom: "Benali Adam", age: "12 ans", pack: "Pack 4", packColor: "green", statut: "✅ Validé Admin 1", statutColor: "green", date: "12 Mai 2025", action: "Voir →", actionColor: "brand" },
  { nom: "Khelil Yasmine", age: "8 ans", pack: "Pack 2", packColor: "amber", statut: "⏳ Admin 2 — J+1", statutColor: "amber", date: "26 Mai 2025", action: "Valider →", actionColor: "brand" },
  { nom: "Merzougui Samir", age: "15 ans", pack: "Pack 3", packColor: "green", statut: "⏳ Admin 2 — J+2", statutColor: "amber", date: "27 Mai 2025", action: "Valider →", actionColor: "brand" },
  { nom: "Hadj Fatima", age: "10 ans", pack: "Pack 1", packColor: "green", statut: "❌ Incomplet", statutColor: "red", date: "25 Mai 2025", action: "Relancer →", actionColor: "red" },
];

const presences = [
  { nom: "Benali Adam", badge: "BADGE-0187", arrivee: "07h14", depart: "—", statut: "Présent", color: "green" },
  { nom: "Khelil Yasmine", badge: "BADGE-0192", arrivee: "15h01", depart: "—", statut: "Présent", color: "green" },
  { nom: "Merzougui Samir", badge: "BADGE-0201", arrivee: "17h05", depart: "—", statut: "Présent", color: "green" },
  { nom: "Benali Lina", badge: "BADGE-0188", arrivee: "—", depart: "—", statut: "Absent", color: "red" },
];

const personnel = [
  { nom: "Mme Amrani Soraya", role: "Direction", niveau: "Admin Principal", badge: "#STF-001", statut: "Présent", pointage: "07h02" },
  { nom: "M. Rachid Belkacem", role: "Enseignant Maths (TP)", niveau: "Partenaire", badge: "#STF-008", statut: "Présent", pointage: "16h55" },
  { nom: "Mme Kara Nadia", role: "Responsable pédagogique", niveau: "Admin 2", badge: "#STF-002", statut: "Présent", pointage: "07h10" },
  { nom: "M. Hamid Zerrouki", role: "Cuisine", niveau: "Staff", badge: "#STF-010", statut: "Absent", pointage: "—" },
];

const partenaires = [
  { nom: "M. Rachid Belkacem", type: "Enseignant TP — Maths", planning: "Lun, Mer, Ven 17h–20h", contrat: "✅ Validé Admin 1", diplomes: "Master Maths", saisiPar: "Admin 2" },
  { nom: "Mme Leila Boudiaf", type: "Intervenante extras — Événements", planning: "Vacances — Juillet", contrat: "⏳ En validation", diplomes: "CAP Petite Enfance", saisiPar: "Admin 2" },
  { nom: "M. Karim Saadi", type: "Enseignant TP — Physique", planning: "Mar, Jeu 17h–20h", contrat: "✅ Validé Admin 1", diplomes: "Licence Physique", saisiPar: "Admin 2" },
];

const fournisseurs = [
  { nom: "Cantine El Baraka", type: "Cantine", contrat: "Actif", factures: "3 en attente", bons: "2 BC ouverts" },
  { nom: "Papeterie Modern", type: "Bureautique", contrat: "Actif", factures: "1 en attente", bons: "1 BC ouvert" },
  { nom: "Clean Pro Services", type: "Entretien", contrat: "Actif", factures: "Payée", bons: "—" },
];

const stocks = [
  { article: "Cahiers A4", categorie: "Bureautique", entree: 120, sortie: 45, reserve: 75, unite: "pcs" },
  { article: "Produits laitiers", categorie: "Cantine", entree: 30, sortie: 28, reserve: 2, unite: "kg" },
  { article: "Matériel sportif", categorie: "Extra", entree: 15, sortie: 8, reserve: 7, unite: "pcs" },
  { article: "Gants hygiène", categorie: "Réserve", entree: 200, sortie: 60, reserve: 140, unite: "pcs" },
];

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

function ExportButtons({ role, moduleId }: { role: Session["role"]; moduleId: AdminModuleId }) {
  if (!canPerformAction(role, moduleId, "export")) return null;
  return (
    <div className="mb-3 flex gap-2">
      <button className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-muted hover:bg-surface-green">
        Export PDF
      </button>
      <button className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-muted hover:bg-surface-green">
        Export Excel
      </button>
    </div>
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
  const canValidate = canPerformAction(user.role, moduleId, "validate");
  const readOnly = !canPerformAction(user.role, moduleId, "edit");

  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="section-label">{meta?.group}</p>
        <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">{meta?.label}</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">{meta?.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="badge badge-info">{erpRoleTitle(user.role)}</span>
        {readOnly && <span className="badge badge-wait">Lecture seule</span>}
        {canValidate && <span className="badge badge-valid">Validation autorisée</span>}
      </div>
    </div>
  );
}

function SchoolModule({ user }: { user: Session }) {
  const canValidate = canPerformAction(user.role, "school", "validate");

  return (
    <>
      <h2 className="mb-0.5 font-display text-base font-semibold">Dossiers enfants</h2>
      <p className="mb-4 text-xs text-ink-muted">
        Validation Admin 1 & Admin 2 · Délai {ESTABLISHMENT.validationDelay} · 2 dossiers en cours
      </p>
      <div className="card mb-6 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-line bg-surface-green">
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Nom complet</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Âge</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Formule</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Statut dossier</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Soumis le</th>
              {canValidate && (
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {dossiers.map((d) => (
              <tr key={d.nom} className="border-b border-line/60 hover:bg-surface-green">
                <td className="px-4 py-3 font-semibold text-ink">{d.nom}</td>
                <td className="px-4 py-3 text-ink-muted">{d.age}</td>
                <td className="px-4 py-3">
                  <Tag color={d.packColor}>{d.pack}</Tag>
                </td>
                <td className="px-4 py-3">
                  <Tag color={d.statutColor}>{d.statut}</Tag>
                </td>
                <td className="px-4 py-3 text-ink-muted">{d.date}</td>
                {canValidate && (
                  <td className="px-4 py-3">
                    <button
                      className="text-xs font-semibold"
                      style={{ color: d.actionColor === "red" ? "#B91C1C" : "var(--brand-forest)" }}
                    >
                      {d.action}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mb-0.5 font-display text-base font-semibold">Feuille de présence — 30 Mai 2025</h2>
      <p className="mb-2 text-xs text-ink-muted">Badgeuse automatique par carte ID / badge adhésion</p>
      <ExportButtons role={user.role} moduleId="school" />
      <div className="card overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-line bg-surface-green">
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Enfant</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Badge ID</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Arrivée</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Départ</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Statut</th>
            </tr>
          </thead>
          <tbody>
            {presences.map((p) => (
              <tr key={p.nom} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
                <td className="px-4 py-3 font-semibold text-ink">{p.nom}</td>
                <td className="px-4 py-3 font-mono text-ink-muted">{p.badge}</td>
                <td className="px-4 py-3 text-ink-muted">{p.arrivee}</td>
                <td className="px-4 py-3 text-ink-muted">{p.depart}</td>
                <td className="px-4 py-3">
                  <Tag color={p.color}>{p.statut}</Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function StaffModule({ user }: { user: Session }) {
  return (
    <>
      <ExportButtons role={user.role} moduleId="staff" />
      <div className="card overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-line bg-surface-green">
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Nom</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Rôle</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Niveau d&apos;accès</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Badge ID</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Pointage</th>
              <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Présence</th>
            </tr>
          </thead>
          <tbody>
            {personnel.map((p) => (
              <tr key={p.nom} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
                <td className="px-4 py-3 font-semibold text-ink">{p.nom}</td>
                <td className="px-4 py-3 text-ink-muted">{p.role}</td>
                <td className="px-4 py-3">
                  <Tag color="green">{p.niveau}</Tag>
                </td>
                <td className="px-4 py-3 font-mono text-ink-muted">{p.badge}</td>
                <td className="px-4 py-3 text-ink-muted">{p.pointage}</td>
                <td className="px-4 py-3">
                  <Tag color={p.statut === "Présent" ? "green" : "red"}>{p.statut}</Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PartnersModule() {
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-line bg-surface-green">
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Nom</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Type</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Planning</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Contrat</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Diplômes</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Saisi par</th>
          </tr>
        </thead>
        <tbody>
          {partenaires.map((p) => (
            <tr key={p.nom} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
              <td className="px-4 py-3 font-semibold text-ink">{p.nom}</td>
              <td className="px-4 py-3 text-ink-muted">{p.type}</td>
              <td className="px-4 py-3 text-ink-muted">{p.planning}</td>
              <td className="px-4 py-3">
                <Tag color={p.contrat.includes("✅") ? "green" : "amber"}>{p.contrat}</Tag>
              </td>
              <td className="px-4 py-3 text-ink-muted">{p.diplomes}</td>
              <td className="px-4 py-3 text-ink-muted">{p.saisiPar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SupplyModule({ user }: { user: Session }) {
  const [tab, setTab] = useState<"fournisseurs" | "stocks">("fournisseurs");

  return (
    <>
      <div className="mb-4 flex gap-2">
        {(["fournisseurs", "stocks"] as const).map((t) => (
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
            {t === "fournisseurs" ? "Fournisseurs" : "Stocks"}
          </button>
        ))}
      </div>

      <ExportButtons role={user.role} moduleId="supply" />

      {tab === "fournisseurs" ? (
        <div className="card overflow-hidden">
          <table className="w-full text-xs">
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
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-line bg-surface-green">
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Article</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Catégorie</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Entrées</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Sorties</th>
                <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Réserve</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((s) => (
                <tr key={s.article} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
                  <td className="px-4 py-3 font-semibold text-ink">{s.article}</td>
                  <td className="px-4 py-3 text-ink-muted">{s.categorie}</td>
                  <td className="px-4 py-3 text-green-700">
                    +{s.entree} {s.unite}
                  </td>
                  <td className="px-4 py-3 text-red-600">
                    −{s.sortie} {s.unite}
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink">
                    {s.reserve} {s.unite}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function MarketplaceModule({ user }: { user: Session }) {
  const canValidate = canPerformAction(user.role, "marketplace", "validate");

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
                    Modérer →
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

function GovernanceModule() {
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-line bg-surface-green">
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Profil ERP</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Périmètre</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Modules</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Actions</th>
            <th className="px-4 py-2.5 text-left font-bold text-ink-subtle">Restrictions</th>
          </tr>
        </thead>
        <tbody>
          {ERP_ROLE_DEFINITIONS.map((r) => (
            <tr key={r.role} className="border-b border-line/60 last:border-b-0 hover:bg-surface-green">
              <td className="px-4 py-3 font-semibold text-ink">{r.title}</td>
              <td className="px-4 py-3 text-ink-muted">{r.scope}</td>
              <td className="px-4 py-3 text-ink-muted">{r.modules}</td>
              <td className="px-4 py-3 text-ink-muted">{r.actions}</td>
              <td className="px-4 py-3 text-ink-muted">{r.restrictions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReportingModule() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {[
        { label: "Enfants inscrits", value: "47" },
        { label: "Taux présence", value: "92%" },
        { label: "Dossiers en attente", value: "3" },
        { label: "Partenaires actifs", value: "8" },
        { label: "Annonces marketplace", value: "24" },
        { label: "Alertes stock", value: "1" },
      ].map((k) => (
        <div key={k.label} className="rounded-xl border border-line bg-white p-4 text-center">
          <div className="font-display text-2xl font-bold text-brand-forest">{k.value}</div>
          <div className="mt-1 text-xs text-ink-muted">{k.label}</div>
        </div>
      ))}
    </div>
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
    const allowed = moduleParam && canAccessModule(user.role, moduleParam);
    if (!allowed) {
      router.replace(`/admin?m=${defaultModuleForRole(user.role)}`);
    }
  }, [user, moduleParam, router]);

  if (!user) {
    return <p className="text-sm text-ink-muted">Chargement…</p>;
  }

  const activeModule = moduleParam && canAccessModule(user.role, moduleParam)
    ? moduleParam
    : defaultModuleForRole(user.role);

  return (
    <div className="mx-auto max-w-5xl">
      <ModuleHeader moduleId={activeModule} user={user} />

      {activeModule === "school" && <SchoolModule user={user} />}
      {activeModule === "staff" && <StaffModule user={user} />}
      {activeModule === "partners" && <PartnersModule />}
      {activeModule === "marketplace" && <MarketplaceModule user={user} />}
      {activeModule === "supply" && <SupplyModule user={user} />}
      {activeModule === "governance" && <GovernanceModule />}
      {activeModule === "reporting" && <ReportingModule />}
    </div>
  );
}
