import Link from "next/link";
import { Lock } from "lucide-react";

type Props = {
  backHref?: string;
  label: string;
  brand: string;
  title: string;
  lead: string;
  locked?: boolean;
  accent?: "green" | "brand" | "plum";
  ctaHref?: string;
  ctaLabel?: string;
};

const accentStyles = {
  green: "bg-green-forest text-white border-green-deep/20",
  brand: "bg-brand-forest text-white border-brand-deep/20",
  plum: "bg-plum text-white border-plum/30",
};

export default function VoletServicePage({
  backHref = "/#services",
  label,
  brand,
  title,
  lead,
  locked = false,
  accent = "brand",
  ctaHref = "/contact",
  ctaLabel = "Nous contacter",
}: Props) {
  return (
    <div>
      <section className="border-b border-line">
        <div className="site-wrap py-12 sm:py-16 lg:py-20">
          <Link
            href={backHref}
            className="mb-4 inline-block text-sm text-ink-muted hover:text-brand-forest"
          >
            ← Retour aux prestations
          </Link>
          <p className="section-label mb-3">{label}</p>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-brand-forest">
            {brand}
          </p>
          <h1 className="max-w-3xl font-display text-[2rem] font-bold leading-tight text-ink sm:text-[2.5rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {lead}
          </p>
        </div>
      </section>

      {locked ? (
        <section className="border-b border-line bg-surface-2">
          <div className="site-wrap py-14 sm:py-16">
            <div className="mx-auto flex max-w-sm flex-col items-center gap-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-card">
                <Lock className="h-7 w-7 text-ink-subtle" aria-hidden />
              </span>
              <span className="badge badge-wait px-4 py-1.5 text-sm font-semibold">
                Bientôt disponible
              </span>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="site-wrap py-12 sm:py-14">
            <div className={`card max-w-xl overflow-hidden ${accentStyles[accent]}`}>
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold">Une question sur ce volet ?</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  Notre équipe vous oriente vers la prestation adaptée à votre situation.
                </p>
                <Link
                  href={ctaHref}
                  className="mt-5 inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
