"use client";

import clsx from "clsx";
import Logo from "@/components/brand/Logo";
import { ESTABLISHMENT } from "@/lib/constants";
import { useLocale } from "@/lib/i18n/locale-context";
import ServicesCarousel from "@/components/public/ServicesCarousel";
import HomeContactForm, { HomeContactInfo } from "@/components/public/HomeContactForm";

export default function HomePageContent() {
  const { t } = useLocale();

  return (
    <div>
      <section className="hero-home border-b border-line">
        <div className="site-wrap hero-home__content py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10 lg:gap-16">
            <div className="flex w-full shrink-0 justify-center sm:w-auto sm:mt-6 sm:justify-start lg:mt-8">
              <Logo
                href=""
                priority
                imageClassName="h-[120px] w-auto max-w-[168px] object-contain sm:h-[148px] sm:max-w-[200px] lg:h-[176px] lg:max-w-[236px]"
              />
            </div>
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand-forest">
                {t.home.badge}
              </span>
              <h1 className="mb-5 font-display text-[2rem] font-bold leading-tight text-ink sm:text-[2.75rem] lg:text-4xl">
                {t.home.titleBefore}
                <span className="text-brand-forest">{t.home.titleHighlight}</span>
                {t.home.titleAfter}
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-ink-muted">
                {t.home.description.replace("{name}", ESTABLISHMENT.name)}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#services" className="btn-primary">
                  {t.home.discoverServices}
                </a>
                <a href="#contact" className="btn-secondary">
                  {t.home.contactUs}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 border-b border-line bg-white">
        <div className="site-wrap py-12 sm:py-14">
          <div className="mb-8">
            <p className="section-label">{t.home.servicesLabel}</p>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {t.home.servicesTitle}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
              {t.home.servicesDescription}
            </p>
          </div>
          <ServicesCarousel />
        </div>
      </section>

      <section className="border-b border-line bg-surface-green">
        <div className="site-wrap py-12 sm:py-14">
          <div className="grid gap-6 md:grid-cols-[180px_1fr] md:gap-12">
            <p className="section-label md:pt-1">{t.home.commitmentLabel}</p>
            <div>
              <h2 className="mb-6 font-display text-2xl font-bold text-ink sm:text-3xl">
                {t.home.commitmentTitle}
              </h2>
              <ul className="space-y-4 text-[15px] leading-relaxed text-ink-muted">
                {t.home.commitmentItems.map(([title, desc], i) => (
                  <li
                    key={title}
                    className={clsx(
                      "border-s-2 ps-4",
                      i === 0 ? "border-brand-forest" : "border-line"
                    )}
                  >
                    <strong className="font-semibold text-ink">{title}</strong> — {desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-home scroll-mt-20">
        <div className="site-wrap about-home__content py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="section-label">{t.home.aboutLabel}</p>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
              {t.home.aboutTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              {t.home.aboutLead.replace("{name}", ESTABLISHMENT.name)}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
            {t.home.aboutPillars.map(([title, desc]) => (
              <div
                key={title}
                className="rounded-xl border border-line bg-white/85 p-5 shadow-card backdrop-blur-sm sm:p-6"
              >
                <p className="mb-2 text-sm font-bold text-brand-forest">{title}</p>
                <p className="text-sm leading-relaxed text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-surface-2">
        <div className="site-wrap py-12 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
            <div>
              <p className="section-label">{t.home.contactLabel}</p>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {t.home.contactTitle}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
                {t.home.contactDescription}
              </p>
              <HomeContactInfo />
            </div>
            <HomeContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
