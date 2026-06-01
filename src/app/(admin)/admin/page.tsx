"use client";

import { useState } from "react";
import { ESTABLISHMENT, STAFF_ROLES } from "@/lib/constants";

const sidebarItems = [
  { icon: "👥", label: "Enfants" },
  { icon: "🪪", label: "Personnel" },
  { icon: "🏫", label: "Partenaires" },
  { icon: "🚚", label: "Fournisseurs" },
  { icon: "📦", label: "Stocks" },
  { icon: "🔐", label: "Rôles & accès" },
  { icon: "📊", label: "Reporting" },
];

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
  { nom: "Mme Kara Nadia", role: "Admin secondaire", niveau: "Admin 2", badge: "#STF-002", statut: "Présent", pointage: "07h10" },
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

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
  };
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[color] ?? ""}`}>{children}</span>;
}

function ExportButtons() {
  return (
    <div className="flex gap-2 mb-3">
      <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Export PDF</button>
      <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Export Excel</button>
    </div>
  );
}

export default function AdminPage() {
  const [active, setActive] = useState("Enfants");

  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 56px)" }}>
      <aside className="w-36 flex-shrink-0 py-4" style={{ backgroundColor: "var(--brand-dark)" }}>
        {sidebarItems.map((item) => (
          <button key={item.label} onClick={() => setActive(item.label)}
            className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors text-left ${
              active === item.label ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </aside>

      <div className="flex-1 p-6 overflow-x-auto">
        {active === "Enfants" && (
          <>
            <h2 className="font-sora text-base font-semibold mb-0.5">Gestion des dossiers enfants</h2>
            <p className="text-xs text-gray-500 mb-4">
              Validation Admin 1 & Admin 2 • Délai {ESTABLISHMENT.validationDelay} • 2 dossiers en cours
            </p>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Nom complet</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Âge</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Formule</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Statut dossier</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Soumis le</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dossiers.map((d) => (
                    <tr key={d.nom} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-800">{d.nom}</td>
                      <td className="px-4 py-3 text-gray-600">{d.age}</td>
                      <td className="px-4 py-3"><Tag color={d.packColor}>{d.pack}</Tag></td>
                      <td className="px-4 py-3"><Tag color={d.statutColor}>{d.statut}</Tag></td>
                      <td className="px-4 py-3 text-gray-500">{d.date}</td>
                      <td className="px-4 py-3">
                        <button className="font-semibold text-xs" style={{ color: d.actionColor === "red" ? "#e24b4a" : "var(--brand)" }}>
                          {d.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-sora text-base font-semibold mb-0.5">Feuille de présence — 30 Mai 2025</h2>
            <p className="text-xs text-gray-500 mb-2">Badgeuse automatique par carte ID / badge adhésion</p>
            <ExportButtons />
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Enfant</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Badge ID</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Arrivée</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Départ</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {presences.map((p) => (
                    <tr key={p.nom} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-800">{p.nom}</td>
                      <td className="px-4 py-3 text-gray-500 font-mono">{p.badge}</td>
                      <td className="px-4 py-3 text-gray-600">{p.arrivee}</td>
                      <td className="px-4 py-3 text-gray-600">{p.depart}</td>
                      <td className="px-4 py-3"><Tag color={p.color}>{p.statut}</Tag></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === "Personnel" && (
          <>
            <h2 className="font-sora text-base font-semibold mb-0.5">Personnel & pointage</h2>
            <p className="text-xs text-gray-500 mb-2">Staff permanent, consultants et badgeuse — pointage activé</p>
            <ExportButtons />
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Nom</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Rôle</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Niveau d&apos;accès</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Badge ID</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Pointage</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Présence</th>
                  </tr>
                </thead>
                <tbody>
                  {personnel.map((p) => (
                    <tr key={p.nom} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-800">{p.nom}</td>
                      <td className="px-4 py-3 text-gray-600">{p.role}</td>
                      <td className="px-4 py-3"><Tag color="green">{p.niveau}</Tag></td>
                      <td className="px-4 py-3 text-gray-500 font-mono">{p.badge}</td>
                      <td className="px-4 py-3 text-gray-600">{p.pointage}</td>
                      <td className="px-4 py-3"><Tag color={p.statut === "Présent" ? "green" : "red"}>{p.statut}</Tag></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === "Partenaires" && (
          <>
            <h2 className="font-sora text-base font-semibold mb-0.5">Partenaires & intervenants</h2>
            <p className="text-xs text-gray-500 mb-4">
              Enseignants à temps partiel et intervenants extras (événements) — saisie Admin 2, validation Admin 1
            </p>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Nom</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Type</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Planning intervention</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Contrat</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Diplômes</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Saisi par</th>
                  </tr>
                </thead>
                <tbody>
                  {partenaires.map((p) => (
                    <tr key={p.nom} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-800">{p.nom}</td>
                      <td className="px-4 py-3 text-gray-600">{p.type}</td>
                      <td className="px-4 py-3 text-gray-600">{p.planning}</td>
                      <td className="px-4 py-3"><Tag color={p.contrat.includes("✅") ? "green" : "amber"}>{p.contrat}</Tag></td>
                      <td className="px-4 py-3 text-gray-600">{p.diplomes}</td>
                      <td className="px-4 py-3 text-gray-500">{p.saisiPar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === "Fournisseurs" && (
          <>
            <h2 className="font-sora text-base font-semibold mb-0.5">Fournisseurs</h2>
            <p className="text-xs text-gray-500 mb-4">Annuaire, contrats, factures et bons de commande</p>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Fournisseur</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Type</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Contrat</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Factures</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Bons de commande</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseurs.map((f) => (
                    <tr key={f.nom} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-800">{f.nom}</td>
                      <td className="px-4 py-3 text-gray-600">{f.type}</td>
                      <td className="px-4 py-3"><Tag color="green">{f.contrat}</Tag></td>
                      <td className="px-4 py-3 text-gray-600">{f.factures}</td>
                      <td className="px-4 py-3 text-gray-600">{f.bons}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === "Stocks" && (
          <>
            <h2 className="font-sora text-base font-semibold mb-0.5">Stocks — entrées / sorties</h2>
            <p className="text-xs text-gray-500 mb-4">Bureautique, cantine, extra et réserves</p>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Article</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Catégorie</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Entrées</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Sorties</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Réserve</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((s) => (
                    <tr key={s.article} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-800">{s.article}</td>
                      <td className="px-4 py-3 text-gray-600">{s.categorie}</td>
                      <td className="px-4 py-3 text-green-700">+{s.entree} {s.unite}</td>
                      <td className="px-4 py-3 text-red-600">−{s.sortie} {s.unite}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{s.reserve} {s.unite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === "Rôles & accès" && (
          <>
            <h2 className="font-sora text-base font-semibold mb-0.5">Rôles & autorisations</h2>
            <p className="text-xs text-gray-500 mb-4">
              Direction : 2 niveaux d&apos;accès (Admin Principal / Admin Secondaire) — permissions Admin 2 à affiner
            </p>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Rôle</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Pages autorisées</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Actions interdites</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-400">Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {STAFF_ROLES.map((r) => (
                    <tr key={r.role} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-800">{r.role}</td>
                      <td className="px-4 py-3 text-gray-600">{r.pages}</td>
                      <td className="px-4 py-3 text-gray-600">{r.forbidden}</td>
                      <td className="px-4 py-3">{r.badge ? "✅" : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === "Reporting" && (
          <div className="space-y-4">
            <h2 className="font-sora text-base font-semibold mb-0.5">Reporting — Admin Principal</h2>
            <p className="text-xs text-gray-500 mb-4">Accès complet réservé à la direction (niveau Admin Principal)</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Enfants inscrits", value: "47" },
                { label: "Taux présence", value: "92%" },
                { label: "Dossiers en attente", value: "3" },
                { label: "Partenaires actifs", value: "8" },
                { label: "Factures fournisseurs", value: "4" },
                { label: "Alertes stock", value: "1" },
              ].map((k) => (
                <div key={k.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                  <div className="font-sora text-2xl font-bold" style={{ color: "var(--brand)" }}>{k.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{k.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
