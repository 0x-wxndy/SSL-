import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { STOCK_IMAGES } from "@/lib/stock-images";

export default function AideSocialeDomicilePage() {
  return (
    <div>
      {/* Hero — Petits-fils “nos services” inspired header */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="pointer-events-none absolute inset-y-0 end-0 hidden w-[46%] lg:block">
          <Image
            src={STOCK_IMAGES.homeCare}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="46vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white" />
          <div className="absolute inset-0 bg-brand-deep/25" />
        </div>

        <div className="site-wrap relative z-[1] py-12 sm:py-16 lg:py-20">
          <nav className="mb-6 text-sm text-ink-muted" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-brand-forest">
              Accueil
            </Link>
            <span className="mx-2 text-ink-subtle">›</span>
            <span className="text-ink">Aide sociale : nos services</span>
          </nav>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-forest">
            SSL++
          </p>
          <h1 className="max-w-xl font-display text-[2.15rem] font-bold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem] lg:text-[3.15rem]">
            Aide sociale :{" "}
            <span className="text-teal">nos services</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink sm:text-lg">
            Nos prestations d&apos;aide à la personne sont disponibles{" "}
            <strong className="font-semibold text-ink">7 jours sur 7</strong>,{" "}
            <strong className="font-semibold text-ink">24 heures sur 24</strong>.
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-muted">
            Un accompagnement sur mesure pour les personnes âgées et les personnes en situation de
            handicap — à domicile, en journée comme de nuit.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Faire une demande
            </Link>
            <Link href="/#services" className="btn-secondary">
              Voir les volets
            </Link>
          </div>
        </div>

        {/* Mobile image strip */}
        <div className="relative h-48 w-full lg:hidden">
          <Image
            src={STOCK_IMAGES.homeCare}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-deep/20" />
        </div>
      </section>

      <section className="border-b border-line bg-surface-2">
        <div className="site-wrap py-14 sm:py-16">
          <div className="mx-auto flex max-w-sm flex-col items-center gap-4 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-card">
              <Lock className="h-7 w-7 text-ink-subtle" aria-hidden />
            </span>
            <span className="badge badge-wait px-4 py-1.5 text-sm font-semibold">
              Bientôt disponible
            </span>
            <p className="text-sm text-ink-muted">
              Le détail des prestations SSL++ sera publié ici prochainement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
