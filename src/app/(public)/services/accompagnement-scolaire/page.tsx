import Link from "next/link";
import { ESTABLISHMENT, JOURNEE_TYPE, PACKAGES } from "@/lib/constants";

export default function AccompagnementScolairePage() {
  return (
    <div>
      <section className="border-b border-line">
        <div className="site-wrap py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">
            <div>
              <Link
                href="/"
                className="text-sm text-ink-muted hover:text-brand-forest mb-4 inline-block"
              >
                ← Retour à la plateforme
              </Link>
              <p className="section-label mb-4">Service · Accompagnement scolaire</p>
              <h1 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] leading-[1.15] text-ink mb-5">
                Un lieu d&apos;accueil entre{" "}
                <span className="italic text-green-forest">l&apos;école</span> et{" "}
                <span className="italic text-green-forest">la maison</span>
              </h1>
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-lg mb-8">
                Garderie, accompagnement scolaire et soutien éducatif pour les{" "}
                {ESTABLISHMENT.ageRange}. Une équipe trilingue, des horaires adaptés à votre
                rythme familial.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/inscription/parent" className="btn-primary">
                  Demander une inscription
                </Link>
                <Link href="/connexion?role=parent" className="btn-secondary">
                  Espace parent
                </Link>
                <Link href="/connexion?role=admin" className="btn-secondary">
                  Accès équipe
                </Link>
              </div>
            </div>

            <aside className="bg-green-forest p-6 text-white sm:p-7 lg:sticky lg:top-20">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">
                Horaires
              </p>
              <ul className="space-y-3 text-sm leading-snug">
                <li className="flex justify-between gap-4 border-b border-white/15 pb-3">
                  <span className="text-white/80">Matin</span>
                  <span className="font-semibold tabular-nums">07h – 13h</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-white/15 pb-3">
                  <span className="text-white/80">Après-midi</span>
                  <span className="font-semibold tabular-nums">15h – 17h</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-white/15 pb-3">
                  <span className="text-white/80">Soutien</span>
                  <span className="font-semibold tabular-nums">17h – 20h</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-white/80">Journée complète</span>
                  <span className="font-semibold tabular-nums">07h – 20h</span>
                </li>
              </ul>
              <p className="text-xs text-white/55 mt-5 leading-relaxed">
                Pas de sieste sur site. Fermeture au mois d&apos;août.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="site-wrap py-12 sm:py-14">
          <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12">
            <p className="section-label md:pt-1">Ce que nous proposons</p>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-ink mb-6">
                Suivi, sécurité et dialogue avec les familles
              </h2>
              <ul className="space-y-4 text-[15px] text-ink-muted leading-relaxed">
                <li className="border-s-2 border-green-forest ps-4">
                  <strong className="text-ink font-semibold">Badge d&apos;accès</strong> — chaque
                  enfant et chaque membre du personnel est identifié à l&apos;entrée du site.
                </li>
                <li className="pl-4 border-l-2 border-line">
                  <strong className="text-ink font-semibold">Dossier médical & administratif</strong>{" "}
                  — vaccins, allergies, autorisations photo et sortie, validés par
                  l&apos;administration.
                </li>
                <li className="pl-4 border-l-2 border-line">
                  <strong className="text-ink font-semibold">Espace parent</strong> — planning,
                  messages, caméras et coût des prestations, accessibles après connexion.
                </li>
                <li className="pl-4 border-l-2 border-line">
                  <strong className="text-ink font-semibold">Communication</strong> — équipe
                  disponible en français, arabe et anglais.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="site-wrap py-12 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="section-label mb-2">Tarification</p>
              <h2 className="font-display text-2xl sm:text-3xl text-ink">Nos formules</h2>
            </div>
            <p className="text-sm text-ink-muted max-w-xs sm:text-right">
              Facturation par package. Absences avec préavis. Liste d&apos;attente possible.
            </p>
          </div>

          <div className="border border-line bg-white divide-y divide-line">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 p-5 sm:p-6 ${
                  pkg.featured ? "bg-brand-light/50" : ""
                }`}
              >
                <div className="flex items-baseline gap-3 sm:w-48 flex-shrink-0">
                  <span className="font-display text-2xl tabular-nums text-green-forest/30">
                    {String(pkg.id).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink text-[15px] leading-snug">{pkg.name}</h3>
                    {pkg.featured && (
                      <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-wider text-brand-forest">
                        Recommandé
                      </span>
                    )}
                  </div>
                </div>
                <p className="flex-shrink-0 text-sm font-medium tabular-nums text-green-forest sm:w-36">
                  {pkg.hours}
                </p>
                <p className="text-sm text-ink-muted leading-relaxed flex-1">{pkg.desc}</p>
              </article>
            ))}
          </div>

          <p className="text-sm text-ink-muted mt-5">
            Une question sur la formule adaptée à votre enfant ?{" "}
            <Link href="/contact" className="text-brand-forest font-semibold underline underline-offset-2">
              Contactez-nous
            </Link>{" "}
            ou{" "}
            <Link href="/inscription/parent" className="text-brand-forest font-semibold underline underline-offset-2">
              lancez une inscription
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface-2">
        <div className="site-wrap py-12 sm:py-14">
          <p className="section-label mb-2">Organisation</p>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-8">Une journée type</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[480px]">
              <thead>
                <tr className="border-b-2 border-ink/20 text-left">
                  <th className="pb-3 pr-6 font-semibold text-ink-muted text-xs uppercase tracking-wider w-28">
                    Heure
                  </th>
                  <th className="pb-3 pr-6 font-semibold text-ink-muted text-xs uppercase tracking-wider w-40">
                    Activité
                  </th>
                  <th className="pb-3 font-semibold text-ink-muted text-xs uppercase tracking-wider">
                    Détail
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {JOURNEE_TYPE.map((slot) => (
                  <tr key={slot.label} className="group">
                    <td className="py-3.5 pr-6 font-medium text-brand-forest tabular-nums align-top">
                      {slot.time}
                    </td>
                    <td className="py-3.5 pr-6 font-semibold text-ink align-top">{slot.label}</td>
                    <td className="py-3.5 text-ink-muted align-top leading-relaxed">{slot.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="site-wrap py-12 sm:py-14">
          <p className="section-label mb-6">Accès — service scolaire</p>
          <div className="grid sm:grid-cols-2 gap-px bg-line border border-line">
            {[
              { href: "/inscription/parent", label: "Inscription en ligne", note: "Créer le dossier enfant" },
              { href: "/reglement-interieur", label: "Règlement intérieur", note: "Règles et fonctionnement" },
              { href: "/connexion?role=parent", label: "Espace parent", note: "Planning, messages, caméras" },
              { href: "/connexion?role=admin", label: "Accès équipe", note: "Connexion staff & administration" },
              { href: "/contact", label: "Contact", note: "Coordonnées et horaires d'accueil" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block bg-white p-5 transition-colors hover:bg-brand-light/40 sm:p-6 group"
              >
                <span className="font-display text-lg text-ink group-hover:text-brand-forest transition-colors">
                  {item.label}
                </span>
                <span className="block text-sm text-ink-muted mt-1">{item.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
