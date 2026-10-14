"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import Logo from "@/components/brand/Logo";
import ServicesCarousel from "@/components/public/ServicesCarousel";
import HomeContactForm, { HomeContactInfo } from "@/components/public/HomeContactForm";
import { useLocale } from "@/lib/i18n/locale-context";
import { getHomeLanding } from "@/lib/home-landing";

export default function HomePageContent() {
  const { locale, t } = useLocale();
  const L = getHomeLanding(locale);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonial = L.testimonials[testimonialIndex];

  return (
    <div>
      {/* Hero — brand mark + claim; background sized to this block */}
      <section className="hero-home">
        <div className="site-wrap hero-home__content py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10 lg:gap-14">
            <div className="animate-[fadeUp_0.55s_ease-out] shrink-0">
              <Logo
                href={false}
                priority
                imageClassName="h-[140px] w-auto max-w-[140px] object-contain sm:h-[180px] sm:max-w-[180px] lg:h-[220px] lg:max-w-[220px]"
              />
            </div>
            <div className="max-w-xl animate-[fadeUp_0.55s_ease-out]">
              <h1 className="font-display text-[2.55rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
                {L.heroLine1}
                <br />
                <span className="text-teal">{L.heroLine2}</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink sm:text-lg">
                {L.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prestations SSL — before the needs wizard */}
      <section id="services" className="scroll-mt-20 border-b border-line bg-white">
        <div className="site-wrap py-12 sm:py-16">
          <div className="mb-10 max-w-3xl">
            <p className="section-label">{t.home.voletsLabel}</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              {t.home.voletsTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              {t.home.servicesDescription}
            </p>
          </div>
          <ServicesCarousel />
        </div>
      </section>

      {/* Why choose */}
      <section className="border-b border-line bg-surface-2">
        <div className="site-wrap grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div>
            <p className="section-label">{t.home.commitmentLabel}</p>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{L.whyTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{L.whyLead}</p>
            <ul className="mt-6 space-y-3">
              {L.whyItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-yellow" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/#services" className="btn-primary mt-8 inline-flex">
              {L.whyCta}
            </Link>
          </div>
          <div className="rounded-2xl border border-yellow/40 bg-yellow-light p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-yellow-deep">SSL+++</p>
            <p className="mt-3 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
              {t.home.commitmentTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t.home.commitmentLead}</p>
            <Link href="/rejoindre" className="mt-5 inline-block text-sm font-bold text-brand-forest hover:underline">
              {L.workWithUs}
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="about-home scroll-mt-20">
        <div className="site-wrap about-home__content py-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="section-label">{t.home.aboutLabel}</p>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{L.howTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{L.howLead}</p>
            <Link href="/notre-fonctionnement" className="btn-secondary mt-6 inline-flex">
              {L.howCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-line bg-brand-deep py-14 text-white">
        <div className="site-wrap">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{L.testimonialsTitle}</h2>
          <blockquote className="mx-auto mt-8 max-w-3xl">
            <p className="font-display text-lg leading-relaxed text-white/95 sm:text-xl">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="mt-5">
              <p className="text-sm font-bold">{testimonial.author}</p>
              <p className="text-sm text-white/65">{testimonial.meta}</p>
            </footer>
          </blockquote>
          <div className="mt-8 flex gap-2">
            {L.testimonials.map((item, i) => (
              <button
                key={item.author}
                type="button"
                aria-label={`Témoignage ${i + 1}`}
                onClick={() => setTestimonialIndex(i)}
                className={clsx(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  i === testimonialIndex ? "bg-yellow" : "bg-white/35 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="border-b border-line bg-yellow-light">
        <div className="site-wrap flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{L.careersTitle}</h2>
            <p className="mt-2 max-w-lg text-sm text-ink-muted">{L.careersLead}</p>
          </div>
          <Link href="/rejoindre" className="btn-primary shrink-0">
            {L.careersCta}
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-surface-green">
        <div className="site-wrap py-12 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12">
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
