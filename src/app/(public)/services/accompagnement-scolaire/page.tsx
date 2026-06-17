import clsx from "clsx";
import {
  ArrowRight,
  BookOpen,
  FileCheck,
  Languages,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";
import Link from "next/link";
import SchoolingHeroFrame from "@/components/public/SchoolingHeroFrame";
import { ESTABLISHMENT, JOURNEE_TYPE, PACKAGES } from "@/lib/constants";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Sécurité à l'entrée",
    description:
      "Badge d'accès pour chaque enfant et chaque membre du personnel — contrôle systématique à l'entrée du site.",
    accent: true,
  },
  {
    icon: FileCheck,
    title: "Dossier médical & administratif",
    description:
      "Vaccins, allergies, autorisations photo et sortie : un dossier complet, validé par l'administration avant l'accueil.",
    accent: false,
  },
  {
    icon: Smartphone,
    title: "Espace parent en ligne",
    description:
      "Planning, messages, caméras et suivi des prestations — tout est accessible après connexion, où que vous soyez.",
    accent: false,
  },
  {
    icon: Languages,
    title: "Communication trilingue",
    description:
      "Notre équipe vous accueille en français, arabe et anglais pour un dialogue fluide avec chaque famille.",
    accent: false,
  },
] as const;

const QUICK_LINKS = [
  { href: "/inscription/parent", label: "Inscription en ligne", note: "Ouvrir le dossier de votre enfant" },
  { href: "/reglement-interieur", label: "Règlement intérieur", note: "Règles, horaires et fonctionnement" },
  { href: "/connexion?role=parent", label: "Espace parent", note: "Planning, messages et caméras" },
  { href: "/connexion?role=admin", label: "Accès équipe", note: "Connexion staff & administration" },
  { href: "/contact", label: "Nous contacter", note: "Coordonnées et prise de rendez-vous" },
] as const;

export default function AccompagnementScolairePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-x-clip border-b border-line bg-green-light">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-light via-white/40 to-brand-light/30"
          aria-hidden
        />
        <div className="site-wrap relative py-12 sm:py-16 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
            <div>
              <Link
                href="/"
                className="mb-5 inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-green-forest"
              >
                ← Retour à l&apos;accueil
              </Link>

              <span className="mb-4 inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-green-forest shadow-card backdrop-blur-sm">
                🎓 Accompagnement scolaire · {ESTABLISHMENT.ageRange}
              </span>

              <h1 className="mb-5 font-display text-[2rem] font-bold leading-[1.12] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
                Un pont entre{" "}
                <span className="italic text-green-forest">l&apos;école</span> et{" "}
                <span className="italic text-green-forest">la maison</span>
              </h1>

              <p className="mb-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Garderie, sorties d&apos;école, soutien scolaire et suivi parental pour les{" "}
                {ESTABLISHMENT.ageRange}. Une équipe trilingue, des horaires souples et un cadre
                sécurisé pensé pour votre rythme familial.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/inscription/parent" className="btn-primary">
                  Demander une inscription
                </Link>
                <Link href="/connexion?role=parent" className="btn-secondary">
                  Espace parent
                </Link>
              </div>
            </div>

            <div className="flex min-h-[320px] w-full items-center justify-center py-4 sm:min-h-[360px] lg:sticky lg:top-20 lg:min-h-[380px] lg:justify-end lg:py-0">
              <SchoolingHeroFrame />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-line bg-white">
        <div className="site-wrap py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="section-label text-green-forest">Notre promesse</p>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Suivi éducatif, sécurité et dialogue avec les familles
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              Chaque enfant est accueilli dans un environnement structuré, où la sécurité et la
              communication avec les parents sont au cœur de notre mission.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {FEATURES.map(({ icon: Icon, title, description, accent }) => (
              <div
                key={title}
                className={clsx(
                  "rounded-xl border p-5 sm:p-6",
                  accent
                    ? "border-green-forest/25 bg-green-light/70"
                    : "border-line bg-surface-2"
                )}
              >
                <span
                  className={clsx(
                    "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl",
                    accent ? "bg-green-forest text-white" : "bg-white text-green-forest shadow-card"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-b border-line bg-surface-2">
        <div className="site-wrap py-12 sm:py-16">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label text-green-forest">Tarification</p>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Des formules adaptées à chaque besoin
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted sm:text-right">
              Facturation par package. Absences avec préavis. Liste d&apos;attente possible selon
              les places disponibles.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={clsx(
                  "relative flex flex-col rounded-xl border bg-white p-5 shadow-card transition-shadow hover:shadow-hover sm:p-6",
                  pkg.featured
                    ? "border-green-forest/40 ring-2 ring-green-forest/15"
                    : "border-line"
                )}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 right-5 rounded-full bg-green-forest px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Recommandé
                  </span>
                )}
                <div className="mb-3 flex items-start gap-3">
                  <span className="text-2xl" aria-hidden>
                    {pkg.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{pkg.name}</h3>
                    <p className="mt-1 text-sm font-semibold tabular-nums text-green-forest">
                      {pkg.hours}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-ink-muted">{pkg.desc}</p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-ink-muted">
            Besoin d&apos;aide pour choisir la formule idéale ?{" "}
            <Link
              href="/contact"
              className="font-semibold text-green-forest underline underline-offset-2 hover:text-green-deep"
            >
              Contactez-nous
            </Link>{" "}
            ou{" "}
            <Link
              href="/inscription/parent"
              className="font-semibold text-green-forest underline underline-offset-2 hover:text-green-deep"
            >
              lancez une inscription en ligne
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Daily schedule */}
      <section className="border-b border-line bg-green-light/60">
        <div className="site-wrap py-12 sm:py-16">
          <div className="mb-10 max-w-2xl">
            <p className="section-label text-green-forest">Organisation</p>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Une journée type chez {ESTABLISHMENT.abbr}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              De l&apos;accueil matinal au soutien du soir, chaque créneau est encadré par notre
              équipe éducative.
            </p>
          </div>

          <div className="relative space-y-0">
            {JOURNEE_TYPE.map((slot, i) => (
              <div
                key={slot.label}
                className={clsx(
                  "relative grid gap-3 border-l-2 border-green-forest/30 py-5 pl-6 sm:grid-cols-[120px_180px_1fr] sm:gap-6 sm:pl-8",
                  i === 0 && "pt-0",
                  i === JOURNEE_TYPE.length - 1 && "pb-0"
                )}
              >
                <span
                  className="absolute -left-[7px] top-6 h-3 w-3 rounded-full bg-green-forest ring-4 ring-green-light"
                  aria-hidden
                />
                <p className="text-sm font-bold tabular-nums text-green-forest">{slot.time}</p>
                <p className="font-semibold text-ink">{slot.label}</p>
                <p className="text-sm leading-relaxed text-ink-muted sm:col-start-3 sm:row-start-1">
                  {slot.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent value */}
      <section className="border-b border-line bg-white">
        <div className="site-wrap py-12 sm:py-14">
          <div className="rounded-2xl border border-green-forest/20 bg-gradient-to-br from-green-light/80 to-white p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <p className="section-label text-green-forest">Pour les parents</p>
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                Restez informés, à chaque étape
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                Dossier en ligne, validation sous {ESTABLISHMENT.validationDelay}, suivi des
                présences et facturation transparente — tout est centralisé sur la plateforme{" "}
                {ESTABLISHMENT.abbr}.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
              <Link href="/inscription/parent" className="btn-primary">
                <Users className="h-4 w-4" aria-hidden />
                Inscrire mon enfant
              </Link>
              <Link href="/connexion?role=parent" className="btn-secondary !border-green-forest !text-green-forest hover:!bg-green-light">
                <BookOpen className="h-4 w-4" aria-hidden />
                Mon espace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="bg-surface-green">
        <div className="site-wrap py-12 sm:py-14">
          <p className="section-label mb-2 text-green-forest">Accès rapides</p>
          <h2 className="mb-8 font-display text-2xl font-bold text-ink sm:text-3xl">
            Tout ce dont vous avez besoin
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-4 rounded-xl border border-line bg-white p-5 transition-all hover:border-green-forest/30 hover:bg-green-light/40 hover:shadow-card sm:p-6"
              >
                <div>
                  <span className="font-display text-lg text-ink transition-colors group-hover:text-green-forest">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">{item.note}</span>
                </div>
                <ArrowRight
                  className="mt-1 h-4 w-4 shrink-0 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-green-forest"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
