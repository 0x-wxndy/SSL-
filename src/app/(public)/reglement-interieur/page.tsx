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
    <div className="site-wrap max-w-2xl py-8 sm:py-10">
      <p className="section-label">Service scolaire</p>
      <h1 className="mb-1 font-display text-xl font-bold text-ink">Règlement intérieur</h1>
      <p className="mb-6 text-sm text-ink-muted">
        {ESTABLISHMENT.abbr} — {ESTABLISHMENT.ageRange}
      </p>

      <div className="card mb-4 p-6">
        <h2 className="mb-3 font-display text-base font-semibold text-ink">Règles générales</h2>
        <ul className="space-y-2">
          {rules.map((rule) => (
            <li key={rule} className="flex gap-2 text-sm text-ink-muted">
              <span className="text-brand-forest">•</span>
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div className="card mb-4 p-6">
        <h2 className="mb-3 font-display text-base font-semibold text-ink">Formules & horaires</h2>
        <div className="space-y-2">
          {PACKAGES.map((p) => (
            <div key={p.id} className="text-sm">
              <span className="font-semibold text-ink">{p.name}</span>
              <span className="text-ink-muted"> — {p.hours}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-6 p-6">
        <h2 className="mb-3 font-display text-base font-semibold text-ink">Journée type</h2>
        <div className="space-y-2">
          {JOURNEE_TYPE.map((slot) => (
            <div key={slot.label} className="text-sm text-ink-muted">
              <span className="font-semibold text-ink">{slot.time}</span> — {slot.label}
            </div>
          ))}
        </div>
      </div>

      <Link href="/inscription" className="btn-primary">
        Procéder à l&apos;inscription →
      </Link>
    </div>
  );
}
