import type { Metadata } from "next";
import Link from "next/link";
import CareerJobSearch, { CareerStickyCtas } from "@/components/careers/CareerJobSearch";
import CareerTestimonials from "@/components/careers/CareerTestimonials";
import CareerTrackCard from "@/components/careers/CareerTrackCard";
import { CAREER_TRACKS, CAREER_VALUES } from "@/lib/careers-data";
import { STOCK_IMAGES } from "@/lib/stock-images";

export const metadata: Metadata = {
  title: "Rejoindre SSL+++ | Carrières & recrutement",
  description:
    "Venez exercer votre talent chez SSL+++ — intervenants terrain, équipe établissement et coordination.",
};

export default function RejoindrePage() {
  return (
    <div className="pb-20 md:pb-0">
      <section className="relative min-h-[72vh] overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={STOCK_IMAGES.family}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-brand-deep/90" />
        </div>

        <div className="site-wrap relative flex min-h-[72vh] flex-col justify-center py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-mint">
            Carrières SSL+++
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-bold text-white sm:text-5xl">
            Venez exercer votre talent chez SSL+++
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Pour nous aider à proposer les meilleurs services d&apos;accompagnement scolaire, d&apos;aide
            à domicile et d&apos;ateliers Alzheimer en Algérie.
          </p>
          <div className="mt-8">
            <CareerJobSearch />
          </div>
        </div>
      </section>

      <CareerTestimonials />

      <section className="site-wrap py-14 sm:py-20">
        <p className="section-label">Filières</p>
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Trois chemins pour nous rejoindre
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Terrain, établissement ou coordination — choisissez le parcours qui correspond à votre
          métier et vos ambitions.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {CAREER_TRACKS.map((track) => (
            <CareerTrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="bg-teal py-14 text-white sm:py-16">
        <div className="site-wrap grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Engagement</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              SSL+++, réseau engagé…
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              …pour les familles, les intervenants et les équipes qui font vivre chaque volet de
              la plateforme — avec du sens, de la proximité et des parcours durables.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {CAREER_VALUES.map((v) => (
              <div key={v.title} className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm font-bold">{v.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/80">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-wrap py-14 sm:py-16">
        <div className="rounded-2xl border border-line bg-brand-light px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-2xl font-bold text-ink">Prêt·e à candidater ?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
            Envoyez votre dossier en quelques minutes — terrain, site ou siège.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/rejoindre/intervenants" className="btn-secondary">
              Candidater terrain
            </Link>
            <Link href="/rejoindre/postuler" className="btn-primary">
              Postuler maintenant
            </Link>
          </div>
        </div>
      </section>

      <CareerStickyCtas />
    </div>
  );
}
