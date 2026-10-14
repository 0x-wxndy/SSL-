"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ESTABLISHMENT, PACKAGES, REQUIRED_DOCUMENTS } from "@/lib/constants";
import type { Session } from "@/lib/auth";

const steps = ["Enfant", "Parents / Tuteurs", "Santé & Urgences", "Documents", "Formule & Accord"];

const POLICY_PLACEHOLDER = [
  "Ce texte est un emplacement. La politique de confidentialité et le règlement intérieur définitifs de SSL+++ seront publiés ici.",
  "SSL+++ collecte les informations du dossier enfant (identité, santé, contacts d'urgence et pièces jointes) uniquement pour organiser l'accueil, la sécurité et la facturation du service de scolarité.",
  "Les données ne sont accessibles qu'aux équipes habilitées. Les parents peuvent demander la consultation ou la mise à jour de leur dossier auprès de l'administration.",
  "Le contrat de scolarité est mensuel. Les règles de présence, d'absence et de facturation figurent dans le règlement intérieur de l'établissement.",
  "En confirmant « Lu et approuvé », vous attestez avoir pris connaissance de ce document avant l'envoi du dossier.",
];

type FormState = {
  childLast: string;
  childFirst: string;
  birth: string;
  level: string;
  school: string;
  address: string;
  parentLast: string;
  parentFirst: string;
  phone: string;
  parentEmail: string;
  emergencyName: string;
  emergencyPhone: string;
  docs: Record<string, string>;
  formula: string;
  photoAuth: boolean;
  outingAuth: boolean;
  policyApproved: boolean;
};

const emptyForm: FormState = {
  childLast: "",
  childFirst: "",
  birth: "",
  level: "",
  school: "",
  address: "",
  parentLast: "",
  parentFirst: "",
  phone: "",
  parentEmail: "",
  emergencyName: "",
  emergencyPhone: "",
  docs: {},
  formula: "",
  photoAuth: false,
  outingAuth: false,
  policyApproved: false,
};

function validateStep(step: number, form: FormState): string | null {
  if (step === 0) {
    if (!form.childLast.trim() || !form.childFirst.trim() || !form.birth || !form.level || !form.school.trim() || !form.address.trim()) {
      return "Complétez tous les champs obligatoires de l'enfant avant de continuer.";
    }
  }
  if (step === 1) {
    if (!form.parentLast.trim() || !form.parentFirst.trim() || !form.phone.trim() || !form.emergencyName.trim() || !form.emergencyPhone.trim()) {
      return "Complétez les coordonnées du tuteur et du contact d'urgence avant de continuer.";
    }
  }
  if (step === 3) {
    const missing = REQUIRED_DOCUMENTS.filter((doc) => doc.required && !form.docs[doc.label]);
    if (missing.length > 0) {
      return "Joignez tous les documents obligatoires avant de continuer.";
    }
  }
  if (step === 4) {
    if (!form.formula) return "Choisissez une formule avant d'envoyer le dossier.";
    if (!form.policyApproved) {
      return "Lisez et approuvez la politique de confidentialité et le règlement intérieur avant d'envoyer le dossier.";
    }
  }
  return null;
}

const CIVILITY = /^(mme|mr|m\.|mlle|monsieur|madame|mademoiselle)\s+/i;

function splitParentName(name: string): { parentFirst: string; parentLast: string } {
  const cleaned = name.replace(CIVILITY, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { parentFirst: "", parentLast: "" };
  if (parts.length === 1) return { parentFirst: parts[0], parentLast: "" };
  return {
    parentFirst: parts.slice(0, -1).join(" "),
    parentLast: parts[parts.length - 1],
  };
}

export default function ParentInscriptionPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { user?: Session | null } | null) => {
        const user = data?.user;
        if (!user || (user.role !== "parent" && user.role !== "user")) return;
        const names = splitParentName(user.name);
        setLoggedIn(true);
        setForm((current) => ({
          ...current,
          parentFirst: current.parentFirst || names.parentFirst,
          parentLast: current.parentLast || names.parentLast,
          phone: current.phone || user.phone || "",
          parentEmail: current.parentEmail || user.email,
        }));
      })
      .catch(() => undefined);
  }, []);

  function patch(partial: Partial<FormState>) {
    setError(null);
    setForm((current) => ({ ...current, ...partial }));
  }

  function goTo(target: number) {
    if (target === step) return;
    if (target < step) {
      setError(null);
      setStep(target);
      return;
    }
    for (let index = step; index < target; index += 1) {
      const message = validateStep(index, form);
      if (message) {
        setError(message);
        setStep(index);
        return;
      }
    }
    setError(null);
    setStep(target);
  }

  function handleNext() {
    const message = validateStep(step, form);
    if (message) {
      setError(message);
      return;
    }
    if (step === steps.length - 1) {
      setSubmitted(true);
      return;
    }
    setError(null);
    setStep((current) => current + 1);
  }

  return (
    <div className="site-wrap max-w-2xl py-10 sm:py-14">
      <Link
        href={loggedIn ? "/parent" : "/inscription"}
        className="mb-4 inline-block text-sm text-ink-muted hover:text-brand-forest"
      >
        {loggedIn ? "← Retour à l'espace parent" : "← Choisir un autre type de compte"}
      </Link>
      <div className="border border-line bg-white">
        <div className="border-b border-brand-deep/20 bg-brand-forest px-6 py-5 text-white">
          <h1 className="font-display text-xl">Inscription — dossier enfant</h1>
          <p className="mt-1 text-sm text-white/80">
            {ESTABLISHMENT.abbr} • Enfants {ESTABLISHMENT.ageRange}. Contrat mensuel. Validation par
            l&apos;administration sous {ESTABLISHMENT.validationDelay}.
          </p>
        </div>

        <div className="flex overflow-x-auto border-b border-line bg-surface-2">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => goTo(index)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-xs font-semibold transition-colors ${
                step === index
                  ? "border-brand-forest text-brand-forest"
                  : "border-transparent text-ink-subtle hover:text-ink-muted"
              }`}
            >
              {index + 1}. {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {step === 0 && <StepEnfant form={form} patch={patch} />}
          {step === 1 && <StepParents form={form} patch={patch} />}
          {step === 2 && <StepSante />}
          {step === 3 && <StepDocuments form={form} patch={patch} />}
          {step === 4 && (
            <StepFormule form={form} patch={patch} onOpenPolicy={() => setPolicyOpen(true)} />
          )}

          {error && (
            <p className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              disabled={step === 0}
              className="rounded-lg border border-line px-5 py-2.5 text-sm text-ink-muted transition-colors hover:bg-surface-green disabled:opacity-30"
            >
              ← Précédent
            </button>
            <button type="button" onClick={handleNext} className="btn-primary">
              {step === steps.length - 1 ? "Soumettre le dossier ✓" : "Étape suivante →"}
            </button>
          </div>
        </div>
      </div>

      {policyOpen && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-white">
          <div className="site-wrap max-w-2xl py-10">
            <p className="section-label">SSL+++</p>
            <h2 className="font-display text-2xl font-bold text-ink">
              Politique de confidentialité et règlement intérieur
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-muted">
              {POLICY_PLACEHOLDER.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <button
              type="button"
              className="btn-primary mt-8"
              onClick={() => {
                patch({ policyApproved: true });
                setPolicyOpen(false);
              }}
            >
              Lu et approuvé
            </button>
          </div>
        </div>
      )}

      {submitted && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/45 px-4">
          <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-hover">
            <p className="section-label">Dossier envoyé</p>
            <h2 className="font-display text-xl font-bold text-ink">Validation sous 72 heures</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Votre dossier a bien été transmis. L&apos;administration le valide sous 72 heures.
              Le contrat de scolarité est mensuel.
            </p>
            <Link href="/" className="btn-primary mt-6 inline-flex">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      )}
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

function StepEnfant({ form, patch }: { form: FormState; patch: (partial: Partial<FormState>) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom" required>
          <input
            className={inputCls}
            placeholder="Nom de famille"
            value={form.childLast}
            onChange={(event) => patch({ childLast: event.target.value })}
          />
        </Field>
        <Field label="Prénom(s)" required>
          <input
            className={inputCls}
            placeholder="Prénom(s) de l'enfant"
            value={form.childFirst}
            onChange={(event) => patch({ childFirst: event.target.value })}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Date de naissance / Âge" required>
          <input
            type="date"
            className={inputCls}
            value={form.birth}
            onChange={(event) => patch({ birth: event.target.value })}
          />
        </Field>
        <Field label="Niveau scolaire" required>
          <select className={inputCls} value={form.level} onChange={(event) => patch({ level: event.target.value })}>
            <option value="">-- Sélectionner --</option>
            <option>CE1 / CE2 / CM1 / CM2 (6–11 ans)</option>
            <option>6ème – 3ème (Collège)</option>
            <option>2nde – Terminale (Lycée)</option>
          </select>
        </Field>
      </div>
      <Field label="Établissement scolaire" required>
        <input
          className={inputCls}
          placeholder="Nom de l'école / collège / lycée"
          value={form.school}
          onChange={(event) => patch({ school: event.target.value })}
        />
      </Field>
      <Field label="Adresse du domicile" required>
        <input
          className={inputCls}
          placeholder="Adresse complète"
          value={form.address}
          onChange={(event) => patch({ address: event.target.value })}
        />
      </Field>
    </div>
  );
}

function StepParents({ form, patch }: { form: FormState; patch: (partial: Partial<FormState>) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">Tutrice / Tuteur légal</p>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom" required>
          <input
            className={inputCls}
            placeholder="Nom"
            value={form.parentLast}
            onChange={(event) => patch({ parentLast: event.target.value })}
          />
        </Field>
        <Field label="Prénom" required>
          <input
            className={inputCls}
            placeholder="Prénom"
            value={form.parentFirst}
            onChange={(event) => patch({ parentFirst: event.target.value })}
          />
        </Field>
      </div>
      <Field label="Numéro de téléphone" required>
        <input
          className={inputCls}
          type="tel"
          placeholder="+213 XX XX XX XX"
          value={form.phone}
          onChange={(event) => patch({ phone: event.target.value })}
        />
      </Field>
      <Field label="Email">
        <input
          className={inputCls}
          type="email"
          placeholder="email@exemple.com"
          value={form.parentEmail}
          onChange={(event) => patch({ parentEmail: event.target.value })}
        />
      </Field>
      <hr className="border-line" />
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">Contact d&apos;urgence</p>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom complet" required>
          <input
            className={inputCls}
            placeholder="Nom complet"
            value={form.emergencyName}
            onChange={(event) => patch({ emergencyName: event.target.value })}
          />
        </Field>
        <Field label="Téléphone urgence" required>
          <input
            className={inputCls}
            type="tel"
            placeholder="+213 XX XX XX XX"
            value={form.emergencyPhone}
            onChange={(event) => patch({ emergencyPhone: event.target.value })}
          />
        </Field>
      </div>
      <Field label="Lien avec l'enfant">
        <select className={inputCls} defaultValue="Tutrice / Tuteur légal">
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

function StepDocuments({ form, patch }: { form: FormState; patch: (partial: Partial<FormState>) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-ink-muted">
        Documents obligatoires : carnet vaccinal, certificat médical, contrat mensuel, justificatif
        de résidence, photos enfant & tutrice/tuteur légal.
      </p>
      {REQUIRED_DOCUMENTS.map((doc) => (
        <div
          key={doc.label}
          className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-line bg-surface-green p-3"
        >
          <div>
            <div className="text-sm font-semibold text-ink">
              {doc.label} {doc.required && <span className="text-red-400">*</span>}
            </div>
            <div className="mt-0.5 text-xs text-ink-subtle">
              {form.docs[doc.label] ? form.docs[doc.label] : doc.hint}
            </div>
          </div>
          <label className="cursor-pointer rounded-lg bg-brand-forest px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-80">
            {form.docs[doc.label] ? "Remplacer" : "Ajouter"}
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                patch({ docs: { ...form.docs, [doc.label]: file.name } });
              }}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

function StepFormule({
  form,
  patch,
  onOpenPolicy,
}: {
  form: FormState;
  patch: (partial: Partial<FormState>) => void;
  onOpenPolicy: () => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-ink-muted">
        Le contrat de scolarité est mensuel. La formule choisie est facturée chaque mois.
      </p>
      <Field label="Formule choisie" required>
        <div className="space-y-2">
          {PACKAGES.map((pkg) => (
            <label
              key={pkg.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                form.formula === String(pkg.id)
                  ? "border-green-forest bg-green-light"
                  : "border-line hover:border-brand-forest/40"
              }`}
            >
              <input
                type="radio"
                name="package"
                value={pkg.id}
                checked={form.formula === String(pkg.id)}
                onChange={() => patch({ formula: String(pkg.id) })}
                className="accent-brand-forest"
              />
              <div>
                <span className="text-sm font-medium text-ink">{pkg.name}</span>
                <span className="block text-xs text-ink-muted">{pkg.hours}</span>
              </div>
            </label>
          ))}
        </div>
      </Field>
      <hr className="border-line" />
      <div className="space-y-3">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 accent-brand"
            checked={form.photoAuth}
            onChange={(event) => patch({ photoAuth: event.target.checked })}
          />
          <span className="text-xs leading-relaxed text-ink-muted">
            J&apos;autorise SSL+++ à prendre des photos de mon enfant (usage interne / activités)
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 accent-brand"
            checked={form.outingAuth}
            onChange={(event) => patch({ outingAuth: event.target.checked })}
          />
          <span className="text-xs leading-relaxed text-ink-muted">
            J&apos;autorise les sorties encadrées organisées par SSL+++
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 accent-brand"
            checked={form.policyApproved}
            onChange={(event) => {
              if (event.target.checked) {
                onOpenPolicy();
                return;
              }
              patch({ policyApproved: false });
            }}
          />
          <span className="text-xs leading-relaxed text-ink-muted">
            J&apos;accepte la politique de confidentialité et le règlement intérieur de SSL+++
          </span>
        </label>
      </div>
    </div>
  );
}
