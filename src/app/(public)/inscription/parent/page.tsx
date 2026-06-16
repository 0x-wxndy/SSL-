"use client";

import Link from "next/link";
import { useState } from "react";
import { ESTABLISHMENT, PACKAGES, REQUIRED_DOCUMENTS } from "@/lib/constants";

const steps = ["Enfant", "Parents / Tuteurs", "Santé & Urgences", "Documents", "Formule & Accord"];

export default function ParentInscriptionPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="site-wrap max-w-2xl py-10 sm:py-14">
      <Link href="/inscription" className="mb-4 inline-block text-sm text-ink-muted hover:text-brand-forest">
        ← Choisir un autre type de compte
      </Link>
      <div className="border border-line bg-white">
        <div className="border-b border-brand-deep/20 bg-brand-forest px-6 py-5 text-white">
          <h1 className="font-display text-xl">Inscription — dossier enfant</h1>
          <p className="mt-1 text-sm text-white/80">
            {ESTABLISHMENT.abbr} • Enfants {ESTABLISHMENT.ageRange}. Validation par Admin 1 & Admin 2 — délai{" "}
            {ESTABLISHMENT.validationDelay}.
          </p>
        </div>

        <div className="flex overflow-x-auto border-b border-line bg-surface-2">
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-xs font-semibold transition-colors ${
                step === i
                  ? "border-brand-forest text-brand-forest"
                  : "border-transparent text-ink-subtle hover:text-ink-muted"
              }`}
            >
              {i + 1}. {s}
            </button>
          ))}
        </div>

        <div className="p-6">
          {step === 0 && <StepEnfant />}
          {step === 1 && <StepParents />}
          {step === 2 && <StepSante />}
          {step === 3 && <StepDocuments />}
          {step === 4 && <StepFormule />}

          <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-lg border border-line px-5 py-2.5 text-sm text-ink-muted transition-colors hover:bg-surface-green disabled:opacity-30"
            >
              ← Précédent
            </button>
            <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} className="btn-primary">
              {step === steps.length - 1 ? "Soumettre le dossier ✓" : "Étape suivante →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-ink-muted">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm transition-colors focus:border-brand-forest focus:outline-none";

function StepEnfant() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom" required>
          <input className={inputCls} placeholder="Nom de famille" />
        </Field>
        <Field label="Prénom(s)" required>
          <input className={inputCls} placeholder="Prénom(s) de l'enfant" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Date de naissance / Âge" required>
          <input type="date" className={inputCls} />
        </Field>
        <Field label="Niveau scolaire" required>
          <select className={inputCls}>
            <option value="">-- Sélectionner --</option>
            <option>CE1 / CE2 / CM1 / CM2 (6–11 ans)</option>
            <option>6ème – 3ème (Collège)</option>
            <option>2nde – Terminale (Lycée)</option>
          </select>
        </Field>
      </div>
      <Field label="Établissement scolaire" required>
        <input className={inputCls} placeholder="Nom de l'école / collège / lycée" />
      </Field>
      <Field label="Adresse du domicile" required>
        <input className={inputCls} placeholder="Adresse complète" />
      </Field>
    </div>
  );
}

function StepParents() {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">Tutrice / Tuteur légal</p>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom" required>
          <input className={inputCls} placeholder="Nom" />
        </Field>
        <Field label="Prénom" required>
          <input className={inputCls} placeholder="Prénom" />
        </Field>
      </div>
      <Field label="Numéro de téléphone" required>
        <input className={inputCls} type="tel" placeholder="+213 XX XX XX XX" />
      </Field>
      <Field label="Email">
        <input className={inputCls} type="email" placeholder="email@exemple.com" />
      </Field>
      <hr className="border-line" />
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">Contact d&apos;urgence</p>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom complet" required>
          <input className={inputCls} placeholder="Nom complet" />
        </Field>
        <Field label="Téléphone urgence" required>
          <input className={inputCls} type="tel" placeholder="+213 XX XX XX XX" />
        </Field>
      </div>
      <Field label="Lien avec l'enfant">
        <select className={inputCls}>
          <option>Tutrice / Tuteur légal</option>
          <option>Père / Mère</option>
          <option>Grand-parent</option>
          <option>Autre membre famille</option>
        </select>
      </Field>
    </div>
  );
}

function StepSante() {
  return (
    <div className="space-y-4">
      <Field label="Carnet de vaccination">
        <p className="mb-1 text-xs text-ink-subtle">
          À joindre à l&apos;étape Documents — copie ou scan du carnet à jour.
        </p>
      </Field>
      <Field label="Problèmes de santé (si existants)">
        <textarea
          className={`${inputCls} min-h-[80px] resize-none`}
          placeholder="Maladies chroniques, traitements en cours..."
        />
      </Field>
      <Field label="Allergies alimentaires">
        <textarea
          className={`${inputCls} min-h-[80px] resize-none`}
          placeholder="Ex: arachides, lactose... — justificatif médical requis"
        />
      </Field>
      <Field label="Handicap physique (si applicable)">
        <textarea
          className={`${inputCls} min-h-[70px] resize-none`}
          placeholder="Précisez avec justificatif médical si applicable"
        />
      </Field>
      <Field label="Médecin traitant (nom & téléphone)">
        <input className={inputCls} placeholder="Dr. Nom — 0XX XX XX XX" />
      </Field>
    </div>
  );
}

function StepDocuments() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-ink-muted">
        Documents obligatoires : carnet vaccinal, certificat médical, contrat, justificatif de résidence, photos enfant &
        tutrice/tuteur légal.
      </p>
      {REQUIRED_DOCUMENTS.map((d) => (
        <div
          key={d.label}
          className="flex items-center justify-between rounded-lg border border-dashed border-line bg-surface-green p-3"
        >
          <div>
            <div className="text-sm font-semibold text-ink">
              {d.label} {d.required && <span className="text-red-400">*</span>}
            </div>
            <div className="mt-0.5 text-xs text-ink-subtle">{d.hint}</div>
          </div>
          <label className="cursor-pointer rounded-lg bg-brand-forest px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-80">
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
          </label>
        </div>
      ))}
    </div>
  );
}

function StepFormule() {
  const [selected, setSelected] = useState("");
  return (
    <div className="space-y-4">
      <Field label="Formule choisie" required>
        <div className="space-y-2">
          {PACKAGES.map((p) => (
            <label
              key={p.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                selected === String(p.id)
                  ? "border-green-forest bg-green-light"
                  : "border-line hover:border-brand-forest/40"
              }`}
            >
              <input
                type="radio"
                name="package"
                value={p.id}
                checked={selected === String(p.id)}
                onChange={() => setSelected(String(p.id))}
                className="accent-brand-forest"
              />
              <div>
                <span className="text-sm font-medium text-ink">{p.name}</span>
                <span className="block text-xs text-ink-muted">{p.hours}</span>
              </div>
            </label>
          ))}
        </div>
      </Field>
      <hr className="border-line" />
      <div className="space-y-3">
        {[
          "J'autorise SSL+++ à prendre des photos de mon enfant (usage interne / activités)",
          "J'autorise les sorties encadrées organisées par SSL+++",
          "J'accepte la politique de confidentialité et le règlement intérieur de SSL+++",
        ].map((text) => (
          <label key={text} className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" className="mt-0.5 accent-brand" />
            <span className="text-xs leading-relaxed text-ink-muted">{text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
