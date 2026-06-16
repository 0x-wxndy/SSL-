"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "@/lib/i18n/locale-context";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm transition-colors focus:border-brand-forest focus:outline-none";

const SUBJECT_KEYS = [
  "general",
  "schooling",
  "home",
  "seniors",
  "marketplace",
  "other",
] as const;

type SubjectKey = (typeof SUBJECT_KEYS)[number];

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-ink-muted">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function HomeContactForm() {
  const { t } = useLocale();
  const f = t.home.contactForm;
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState<SubjectKey>("general");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card flex h-full flex-col justify-center p-6 sm:p-8">
        <div className="rounded-xl border border-status-valid/20 bg-status-valid-bg px-5 py-6 text-center">
          <p className="font-display text-xl font-bold text-status-valid">{f.successTitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.successMessage}</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="btn-secondary mt-6"
          >
            {t.home.contactUs}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.name} required>
          <input
            required
            className={inputCls}
            placeholder={f.namePlaceholder}
            autoComplete="name"
          />
        </Field>
        <Field label={f.phone}>
          <input
            className={inputCls}
            type="tel"
            placeholder={f.phonePlaceholder}
            autoComplete="tel"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label={f.email} required>
          <input
            required
            className={inputCls}
            type="email"
            placeholder={f.emailPlaceholder}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label={f.subject} required>
          <select
            required
            value={subject}
            onChange={(event) => setSubject(event.target.value as SubjectKey)}
            className={inputCls}
          >
            {SUBJECT_KEYS.map((key) => (
              <option key={key} value={key}>
                {f.subjectOptions[key]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label={f.message} required>
          <textarea
            required
            className={`${inputCls} min-h-[120px] resize-none`}
            placeholder={f.messagePlaceholder}
          />
        </Field>
      </div>

      <p className="mt-4 text-xs text-ink-subtle">{f.mockNote}</p>

      <button type="submit" className="btn-primary mt-5 w-full sm:w-auto">
        {f.submit}
      </button>
    </form>
  );
}

export function HomeContactInfo() {
  const { t } = useLocale();
  const f = t.home.contactForm;

  return (
    <ul className="mt-8 space-y-4 text-sm">
      <li>
        <p className="section-label mb-1">{f.infoPhone}</p>
        <p className="text-ink">+213 XX XX XX XX</p>
      </li>
      <li>
        <p className="section-label mb-1">{f.infoEmail}</p>
        <p className="text-ink">contact@ssl-plus.dz</p>
      </li>
      <li>
        <p className="section-label mb-1">{f.infoHours}</p>
        <p className="text-ink">{f.infoHoursValue}</p>
      </li>
    </ul>
  );
}
