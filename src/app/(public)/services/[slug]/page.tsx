import Link from "next/link";
import { notFound } from "next/navigation";
import { ESTABLISHMENT, PLATFORM_SERVICES } from "@/lib/constants";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return PLATFORM_SERVICES.filter((s) => !s.available).map((s) => ({ slug: s.id }));
}

export default function ServiceComingSoonPage({ params }: Props) {
  const service = PLATFORM_SERVICES.find((s) => s.id === params.slug);

  if (!service || service.available) {
    notFound();
  }

  return (
    <div className="site-wrap py-12 sm:py-20 max-w-2xl">
      <Link href="/" className="mb-6 inline-block text-sm text-ink-muted hover:text-brand-forest">
        ← Retour à la plateforme
      </Link>

      <div className="border border-line bg-white">
        <div className="px-6 py-8 sm:px-10 sm:py-10 border-b border-line bg-surface-2">
          <span className="mb-4 inline-block rounded-md bg-yellow px-3 py-1 text-sm font-bold text-ink">
            {service.brand}
          </span>
          <p className="section-label mb-2">Service · Bientôt disponible</p>
          <h1 className="font-display text-2xl sm:text-3xl text-ink mb-2">{service.title}</h1>
          <p className="text-sm font-semibold text-brand-forest">{service.subtitle}</p>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-muted leading-relaxed mb-6">{service.description}</p>

          <div className="mb-8 rounded-xl border border-brand-forest/20 bg-brand-light p-5">
            <p className="mb-1 text-sm font-semibold text-ink">Ce service arrive prochainement</p>
            <p className="text-sm leading-relaxed text-ink-muted">
              {ESTABLISHMENT.abbr} développe actuellement cette offre. Laissez-nous vos
              coordonnées pour être informé(e) de son lancement.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-amber">
              Manifester mon intérêt
            </Link>
            <Link href="/#services" className="btn-secondary">
              Voir les autres services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
