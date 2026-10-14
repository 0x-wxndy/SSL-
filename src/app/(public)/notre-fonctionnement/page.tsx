import { FONCTIONNEMENT_FAQS, FONCTIONNEMENT_STEPS } from "@/lib/fonctionnement-data";

export default function NotreFonctionnementPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-white">
        <div className="site-wrap py-12 sm:py-16 lg:py-20">
          <h1 className="max-w-3xl font-display text-[2.15rem] font-bold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem] lg:text-[3.15rem]">
            Notre fonctionnement
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink sm:text-lg">
            Votre conseiller SSL+++ est votre interlocuteur unique. Il organise le bon déroulement
            des prestations et répond à vos questions — de l&apos;orientation initiale au suivi au
            quotidien.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Nous proposons des services sur mesure — scolarité, aide sociale, ateliers Alzheimer —
            avec le souci constant de rendre le quotidien des familles plus serein et de faciliter
            l&apos;accès à un cadre clair et encadré.
          </p>
        </div>
      </section>

      {/* 4 steps */}
      <section className="border-b border-line bg-surface-2">
        <div className="site-wrap py-14 sm:py-16">
          <h2 className="max-w-2xl font-display text-2xl font-bold text-ink sm:text-3xl">
            Votre accompagnement en 4 étapes
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FONCTIONNEMENT_STEPS.map((step) => (
              <li
                key={step.n}
                className="relative flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-coral text-sm font-bold text-white">
                  {step.n}
                </span>
                <h3 className="font-display text-lg font-bold leading-snug text-ink">{step.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Role highlight */}
      <section className="border-b border-line bg-white">
        <div className="site-wrap py-14 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Quel est le rôle de mon conseiller SSL+++&nbsp;?
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink sm:text-base">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow" />
                Écouter et cadrer le besoin (famille, enfant, proche aidé)
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow" />
                Orienter vers le bon volet et accompagner le dossier
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow" />
                Suivre le déroulement des prestations et ajuster le planning
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow" />
                Rester joignable pour les questions du quotidien
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-line bg-surface-green">
        <div className="site-wrap py-14 sm:py-16">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Questions fréquentes
          </h2>
          <div className="mt-8 space-y-3">
            {FONCTIONNEMENT_FAQS.map((item) => (
              <article key={item.q} className="rounded-xl border border-line bg-white px-5 py-4">
                <h3 className="text-sm font-semibold text-ink sm:text-base">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
