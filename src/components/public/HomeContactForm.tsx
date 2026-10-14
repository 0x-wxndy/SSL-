"use client";

import { FormEvent, useState } from "react";
import { FEATURES } from "@/lib/constants";
import { useLocale } from "@/lib/i18n/locale-context";

const inputCls =
  "w-full rounded-md border border-line bg-white px-2.5 py-1.5 text-xs transition-colors focus:border-brand-forest focus:outline-none";

const SUBJECT_KEYS = (
  ["general", "schooling", "home", "seniors", "marketplace", "other"] as const
).filter((key) => FEATURES.marketplace || key !== "marketplace");

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
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-ink-muted">
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
      <div className="card flex h-full flex-col justify-center p-4 sm:p-5">
        <div className="rounded-lg border border-status-valid/20 bg-status-valid-bg px-4 py-5 text-center">
          <p className="font-display text-lg font-bold text-status-valid">{f.successTitle}</p>
          <p className="mt-2 text-xs leading-relaxed text-ink-muted">{f.successMessage}</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="btn-secondary btn-sm mt-4"
          >
            {t.home.contactUs}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2">
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

      <div className="mt-3">
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

      <div className="mt-3">
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

      <div className="mt-3">
        <Field label={f.message} required>
          <textarea
            required
            rows={3}
            className={`${inputCls} resize-none`}
            placeholder={f.messagePlaceholder}
          />
        </Field>
      </div>

      <button type="submit" className="btn-primary btn-sm mt-4 w-full sm:w-auto">
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
