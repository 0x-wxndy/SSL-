import Link from "next/link";
import { ESTABLISHMENT, JOURNEE_TYPE, PACKAGES } from "@/lib/constants";

const rules = [
  "Accès au site contrôlé par badge ID (enfant, personnel, carte d'adhésion).",
  "Autorisations photo et sortie encadrée à confirmer lors de l'inscription.",
  "Allergies alimentaires et handicaps physiques : déclaration obligatoire avec justificatifs médicaux.",
  "Absences et annulations : préavis minimum requis — facturation et crédits selon la formule.",
  "Liste d'attente active : une place libérée peut être proposée à la famille suivante.",
  "Le mois d'août : établissement fermé (Package 5 vacances non disponible).",
  "SSL+++ ne propose pas de créneau sieste sur site.",
  "Caméras : accès réservé aux parents via l'espace parent sécurisé.",
];

export default function ReglementPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-sora text-xl font-semibold mb-1">Règlement intérieur</h1>
      <p className="text-sm text-gray-500 mb-6">{ESTABLISHMENT.abbr} — {ESTABLISHMENT.ageRange}</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <h2 className="font-sora text-base font-semibold mb-3">Règles générales</h2>
        <ul className="space-y-2">
          {rules.map((rule) => (
            <li key={rule} className="text-sm text-gray-700 flex gap-2">
              <span style={{ color: "var(--brand)" }}>•</span>
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <h2 className="font-sora text-base font-semibold mb-3">Formules & horaires</h2>
        <div className="space-y-2">
          {PACKAGES.map((p) => (
            <div key={p.id} className="text-sm">
              <span className="font-semibold text-gray-900">{p.name}</span>
              <span className="text-gray-500"> — {p.hours}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-sora text-base font-semibold mb-3">Journée type</h2>
        <div className="space-y-2">
          {JOURNEE_TYPE.map((slot) => (
            <div key={slot.label} className="text-sm text-gray-700">
              <span className="font-semibold">{slot.time}</span> — {slot.label}
            </div>
          ))}
        </div>
      </div>

      <Link href="/inscription" className="inline-block px-5 py-2.5 rounded-lg text-sm font-bold text-white"
        style={{ backgroundColor: "var(--brand)" }}>
        Procéder à l&apos;inscription →
      </Link>
    </div>
  );
}
