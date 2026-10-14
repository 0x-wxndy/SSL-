"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CAREER_JOBS,
  CAREER_TRACKS,
  getJobById,
  type CareerTrackId,
} from "@/lib/careers-data";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none";

export default function CareerApplyForm() {
  const searchParams = useSearchParams();
  const posteParam = searchParams.get("poste") ?? "";
  const trackParam = (searchParams.get("track") ?? "") as CareerTrackId | "";

  const initialJob = useMemo(() => {
    if (posteParam && getJobById(posteParam)) return posteParam;
    if (trackParam) {
      const first = CAREER_JOBS.find((j) => j.track === trackParam);
      return first?.id ?? "";
    }
    return "";
  }, [posteParam, trackParam]);

  const [jobId, setJobId] = useState(initialJob);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [cvs, setCvs] = useState<string[]>([]);
  const [cvError, setCvError] = useState("");
  const [done, setDone] = useState(false);

  function addCvs(list: FileList | null) {
    if (!list || list.length === 0) return;
    setCvError("");
    setCvs((current) => [...current, ...Array.from(list).map((file) => file.name)]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cvs.length === 0) {
      setCvError("Ajoutez au moins un CV. Vous pouvez en joindre autant que nécessaire.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-forest">Candidature reçue</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink">Merci, {name || "candidat"}</h1>
        <p className="mt-3 text-sm text-ink-muted">
          Votre candidature a bien été enregistrée (démonstration). L&apos;équipe RH vous recontactera
          sous peu.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/rejoindre" className="btn-primary">
            Retour à Rejoindre
          </Link>
          <Link href="/" className="btn-secondary">
            Accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card mx-auto max-w-lg space-y-4 p-6 sm:p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-brand-forest">Candidature</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink">Postuler chez SSL+++</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Remplissez ce formulaire — un seul parcours pour terrain, établissement et coordination.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-ink-muted">Poste souhaité *</label>
        <select
          required
          className={inputCls}
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
        >
          <option value="">Choisir un poste</option>
          {CAREER_TRACKS.map((track) => (
            <optgroup key={track.id} label={track.title}>
              {CAREER_JOBS.filter((j) => j.track === track.id).map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} — {job.location}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-ink-muted">Nom complet *</label>
          <input required className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-ink-muted">Email *</label>
          <input
            required
            type="email"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-ink-muted">Téléphone *</label>
          <input
            required
            type="tel"
            className={inputCls}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+213 …"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-ink-muted">Wilaya / ville *</label>
          <input required className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-ink-muted">CV *</label>
          <p className="mb-2 text-[11px] text-ink-subtle">Ajoutez un ou plusieurs CV.</p>
          <label className="inline-flex cursor-pointer rounded-lg bg-brand-forest px-3 py-2 text-xs font-bold text-white hover:opacity-90">
            Ajouter des CV
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => {
                addCvs(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          {cvs.length > 0 && (
            <ul className="mt-3 space-y-1">
              {cvs.map((name, index) => (
                <li key={`${name}-${index}`} className="flex items-center justify-between gap-3 text-xs text-ink">
                  <span className="truncate">{name}</span>
                  <button
                    type="button"
                    className="shrink-0 font-semibold text-ink-muted hover:text-red-700"
                    onClick={() => setCvs((current) => current.filter((_, i) => i !== index))}
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
          )}
          {cvError && <p className="mt-2 text-xs font-semibold text-red-700">{cvError}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-ink-muted">Message</label>
          <textarea
            rows={4}
            className={inputCls}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Disponibilités, expérience, motivations…"
          />
        </div>
      </div>

      <p className="text-[11px] text-ink-subtle">Démonstration — aucune donnée n&apos;est envoyée à un serveur RH.</p>

      <div className="flex gap-2 pt-1">
        <button type="submit" className="btn-primary">
          Envoyer ma candidature
        </button>
        <Link href="/rejoindre" className="btn-secondary">
          Annuler
        </Link>
      </div>
    </form>
  );
}
