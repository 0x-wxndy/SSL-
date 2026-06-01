"use client";

import { useState } from "react";
import { ESTABLISHMENT, PACKAGES, REQUIRED_DOCUMENTS } from "@/lib/constants";

const steps = ["Enfant", "Parents / Tuteurs", "Santé & Urgences", "Documents", "Formule & Accord"];

export default function InscriptionPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="site-wrap py-10 sm:py-14 max-w-2xl">
      <div className="border border-line bg-white">
        <div className="px-6 py-5 bg-brand text-white border-b border-brand-dark">
          <h1 className="font-display text-xl">Inscription — dossier enfant</h1>
          <p className="text-sm text-white/80 mt-1">
            {ESTABLISHMENT.abbr} • Enfants {ESTABLISHMENT.ageRange}. Validation par Admin 1 & Admin 2 — délai {ESTABLISHMENT.validationDelay}.
          </p>
        </div>

        <div className="flex overflow-x-auto border-b border-line bg-surface-2">
          {steps.map((s, i) => (
            <button key={s} onClick={() => setStep(i)}
              className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                step === i ? "border-brand text-brand" : "border-transparent text-gray-400 hover:text-gray-600"
              }`} style={{ borderBottomColor: step === i ? "var(--brand)" : undefined, color: step === i ? "var(--brand)" : undefined }}>
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

          <div className="flex justify-between items-center pt-5 mt-5 border-t border-gray-100">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-5 py-2.5 text-sm rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition-colors">
              ← Précédent
            </button>
            <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              className="px-5 py-2.5 text-sm font-bold rounded-lg text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--brand)" }}>
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
      <label className="text-xs font-semibold text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full text-sm px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-brand transition-colors";

function StepEnfant() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom" required><input className={inputCls} placeholder="Nom de famille" /></Field>
        <Field label="Prénom(s)" required><input className={inputCls} placeholder="Prénom(s) de l'enfant" /></Field>
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
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tutrice / Tuteur légal</p>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom" required><input className={inputCls} placeholder="Nom" /></Field>
        <Field label="Prénom" required><input className={inputCls} placeholder="Prénom" /></Field>
      </div>
      <Field label="Numéro de téléphone" required>
        <input className={inputCls} type="tel" placeholder="+213 XX XX XX XX" />
      </Field>
      <Field label="Email">
        <input className={inputCls} type="email" placeholder="email@exemple.com" />
      </Field>
      <hr className="border-gray-100" />
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Contact d&apos;urgence</p>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom complet" required><input className={inputCls} placeholder="Nom complet" /></Field>
        <Field label="Téléphone urgence" required><input className={inputCls} type="tel" placeholder="+213 XX XX XX XX" /></Field>
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
        <p className="text-xs text-gray-400 mb-1">À joindre à l&apos;étape Documents — copie ou scan du carnet à jour.</p>
      </Field>
      <Field label="Problèmes de santé (si existants)">
        <textarea className={`${inputCls} resize-none min-h-[80px]`} placeholder="Maladies chroniques, traitements en cours..." />
      </Field>
      <Field label="Allergies alimentaires">
        <textarea className={`${inputCls} resize-none min-h-[80px]`} placeholder="Ex: arachides, lactose... — justificatif médical requis" />
      </Field>
      <Field label="Handicap physique (si applicable)">
        <textarea className={`${inputCls} resize-none min-h-[70px]`} placeholder="Précisez avec justificatif médical si applicable" />
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
      <p className="text-xs text-gray-500">
        Documents obligatoires : carnet vaccinal, certificat médical, contrat, justificatif de résidence, photos enfant & tutrice/tuteur légal.
      </p>
      {REQUIRED_DOCUMENTS.map((d) => (
        <div key={d.label} className="flex items-center justify-between p-3 rounded-xl border border-dashed border-gray-200 bg-gray-50">
          <div>
            <div className="text-sm font-semibold text-gray-700">
              {d.label} {d.required && <span className="text-red-400">*</span>}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{d.hint}</div>
          </div>
          <label className="cursor-pointer px-3 py-1.5 text-xs font-bold rounded-lg text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--brand)" }}>
            Choisir
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
            <label key={p.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
              selected === String(p.id) ? "border-brand bg-brand-light" : "border-gray-200 hover:border-gray-300"
            }`} style={{ borderColor: selected === String(p.id) ? "var(--brand)" : undefined, backgroundColor: selected === String(p.id) ? "var(--brand-light)" : undefined }}>
              <input type="radio" name="package" value={p.id} checked={selected === String(p.id)} onChange={() => setSelected(String(p.id))} className="accent-brand" />
              <div>
                <span className="text-sm font-medium text-gray-800">{p.name}</span>
                <span className="text-xs text-gray-500 block">{p.hours}</span>
              </div>
            </label>
          ))}
        </div>
      </Field>
      <hr className="border-gray-100" />
      <div className="space-y-3">
        {[
          "J'autorise SSL+++ à prendre des photos de mon enfant (usage interne / activités)",
          "J'autorise les sorties encadrées organisées par SSL+++",
          "J'accepte la politique de confidentialité et le règlement intérieur de SSL+++",
        ].map((text) => (
          <label key={text} className="flex gap-3 items-start cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-brand" />
            <span className="text-xs text-gray-600 leading-relaxed">{text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
