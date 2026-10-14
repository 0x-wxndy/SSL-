import Link from "next/link";
import { CAREER_VALUES, getJobsByTrack, getTrackById, type CareerTrackId } from "@/lib/careers-data";

type Props = {
  trackId: CareerTrackId;
};

export default function CareerTrackPage({ trackId }: Props) {
  const track = getTrackById(trackId);
  if (!track) return null;
  const jobs = getJobsByTrack(trackId);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={track.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/40" />
        </div>
        <div className="site-wrap relative py-16 sm:py-24">
          <Link href="/rejoindre" className="text-sm font-medium text-white/70 hover:text-white">
            Rejoindre SSL+++
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-mint">
            {track.eyebrow}
          </p>
          <h1 className="mt-2 max-w-xl font-display text-3xl font-bold text-white sm:text-4xl">
            {track.title}
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
            {track.teaser}
          </p>
          <Link
            href={`/rejoindre/postuler?track=${trackId}`}
            className="btn-primary mt-6 inline-flex"
          >
            Postuler à cette filière
          </Link>
        </div>
      </section>

      <section className="site-wrap py-12 sm:py-16">
        <h2 className="font-display text-2xl font-bold text-ink">Pourquoi nous rejoindre</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {track.benefits.map((b) => (
            <li key={b} className="rounded-xl border border-line bg-white p-5 shadow-card">
              <p className="text-sm font-semibold text-ink">{b}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface-2 py-12 sm:py-16">
        <div className="site-wrap">
          <h2 className="font-display text-2xl font-bold text-ink">Postes ouverts</h2>
          <p className="mt-1 text-sm text-ink-muted">Sélectionnez un poste pour candidater.</p>
          <div className="mt-6 grid gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col gap-3 rounded-xl border border-line bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{job.title}</h3>
                  <p className="mt-1 text-xs text-ink-muted">
                    {job.location} · {job.type}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{job.summary}</p>
                </div>
                <Link
                  href={`/rejoindre/postuler?poste=${job.id}`}
                  className="btn-primary btn-sm shrink-0"
                >
                  Candidater
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-wrap py-12 sm:py-16">
        <h2 className="font-display text-2xl font-bold text-ink">Nos engagements</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {CAREER_VALUES.map((v) => (
            <div key={v.title} className="rounded-xl border border-line bg-white p-5">
              <h3 className="text-sm font-bold text-brand-forest">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
