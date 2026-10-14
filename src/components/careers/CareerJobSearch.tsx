"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CAREER_JOBS } from "@/lib/careers-data";

export default function CareerJobSearch() {
  const router = useRouter();
  const [jobId, setJobId] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (jobId) {
      router.push(`/rejoindre/postuler?poste=${encodeURIComponent(jobId)}`);
    } else {
      router.push("/rejoindre/postuler");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-hover sm:flex-row sm:items-stretch sm:p-2"
    >
      <label className="sr-only" htmlFor="career-job">
        Sélectionner un poste
      </label>
      <select
        id="career-job"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
        className="min-w-0 flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-brand-forest focus:outline-none"
      >
        <option value="">Tous les postes</option>
        {CAREER_JOBS.map((job) => (
          <option key={job.id} value={job.id}>
            {job.title} — {job.location}
          </option>
        ))}
      </select>
      <button type="submit" className="btn-primary shrink-0 rounded-xl px-8">
        Postuler
      </button>
    </form>
  );
}

export function CareerStickyCtas() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur-sm md:hidden">
      <div className="flex gap-2">
        <Link href="/rejoindre/intervenants" className="btn-secondary flex-1 rounded-xl px-3 py-2.5 text-xs">
          Terrain
        </Link>
        <Link href="/rejoindre/postuler" className="btn-primary flex-1 rounded-xl px-3 py-2.5 text-xs">
          Postuler
        </Link>
      </div>
    </div>
  );
}
