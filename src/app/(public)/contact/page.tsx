import { ESTABLISHMENT } from "@/lib/constants";
import HomeContactForm from "@/components/public/HomeContactForm";

/** City-level view of Algiers — no street address */
const ALGIERS_MAP_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=2.90%2C36.68%2C3.28%2C36.85&layer=mapnik";

export default function ContactPage() {
  return (
    <div className="bg-surface-green">
      <div className="site-wrap py-10 sm:py-14">
        <div className="mb-8 max-w-2xl">
          <p className="section-label">Nous joindre</p>
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Contact</h1>
          <p className="mt-2 text-sm text-ink-muted">{ESTABLISHMENT.name}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12">
          <div className="card overflow-hidden">
            <div className="border-b border-brand-deep/20 bg-brand-forest px-6 py-5 text-white">
              <p className="text-sm leading-relaxed">{ESTABLISHMENT.tagline}</p>
            </div>
            <div className="space-y-5 p-6 text-sm">
              <div>
                <p className="section-label mb-1">Téléphone</p>
                <p className="text-ink">+213 XX XX XX XX</p>
              </div>
              <div>
                <p className="section-label mb-1">Email</p>
                <p className="text-ink">contact@ssl-plus.dz</p>
              </div>
              <div>
                <p className="section-label mb-1">Zone</p>
                <p className="text-ink">Alger et environs</p>
              </div>
            </div>
          </div>

          <HomeContactForm />
        </div>

        <section className="mt-12 sm:mt-14">
          <div className="mb-4 max-w-2xl">
            <p className="section-label">Localisation</p>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Nous intervenons à Alger
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
              <iframe
                title="Carte — Alger"
                src={ALGIERS_MAP_EMBED}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-white px-4 py-3 text-xs text-ink-muted">
              <span>Alger, Algérie</span>
              <a
                href="https://www.openstreetmap.org/#map=12/36.7538/3.0588"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-forest hover:underline"
              >
                Ouvrir la carte
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
