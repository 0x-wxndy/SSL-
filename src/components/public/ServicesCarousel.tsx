"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PLATFORM_SERVICES, type PlatformService } from "@/lib/constants";
import { useLocale } from "@/lib/i18n/locale-context";

const serviceStyles: Record<string, { box: string; badge?: string }> = {
  "accompagnement-scolaire": { box: "bg-green-light" },
  "services-domicile": { box: "bg-amber-light" },
  "accompagnement-seniors": { box: "bg-coral-light" },
  "activites-alzheimer": { box: "bg-sky-light" },
  "aide-familiale": { box: "bg-plum-light" },
};

function ServiceCard({ service }: { service: PlatformService }) {
  const { t } = useLocale();
  const style = serviceStyles[service.id] ?? serviceStyles["services-domicile"];
  const labels = t.serviceItems[service.id];

  const inner = (
    <>
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={clsx(
            "flex h-11 w-11 items-center justify-center rounded-xl text-xl",
            style.box
          )}
          aria-hidden
        >
          {service.icon}
        </span>
        {service.available ? (
          <span className="badge badge-valid">{t.common.available}</span>
        ) : (
          <span className="badge badge-wait">{t.common.comingSoon}</span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-ink">{labels?.title ?? service.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
        {labels?.description ?? service.description}
      </p>
      <p className="mt-4 text-sm font-semibold text-brand-forest group-hover:underline underline-offset-2">
        {service.available ? t.common.seeService : t.common.learnMore}
      </p>
    </>
  );

  return (
    <Link
      href={service.href}
      className="group flex h-full cursor-pointer flex-col rounded-xl border border-line bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-hover sm:p-6"
    >
      {inner}
    </Link>
  );
}

export default function ServicesCarousel() {
  const { t } = useLocale();
  const [index, setIndex] = useState(0);
  const count = PLATFORM_SERVICES.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const visible = [
    PLATFORM_SERVICES[index],
    PLATFORM_SERVICES[(index + 1) % count],
    PLATFORM_SERVICES[(index + 2) % count],
  ];

  return (
    <div>
      <div className="hidden gap-4 lg:grid lg:grid-cols-3">
        {visible.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="lg:hidden">
        <ServiceCard service={PLATFORM_SERVICES[index]} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-2">
          {PLATFORM_SERVICES.map((service, i) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${t.nav.services}: ${t.serviceItems[service.id]?.title ?? service.title}`}
              className={clsx(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-brand-forest" : "w-2 bg-line hover:bg-brand-forest/40"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Service précédent"
            className="rounded-lg border border-line bg-white p-2 transition-colors hover:border-brand-forest hover:text-brand-forest"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Service suivant"
            className="rounded-lg border border-line bg-white p-2 transition-colors hover:border-brand-forest hover:text-brand-forest"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
