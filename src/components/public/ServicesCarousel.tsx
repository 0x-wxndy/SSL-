"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PLATFORM_SERVICES, type PlatformService } from "@/lib/constants";
import { SERVICE_CAROUSEL_IMAGES, STOCK_IMAGES } from "@/lib/stock-images";
import { useLocale } from "@/lib/i18n/locale-context";

const serviceAccents: Record<string, { ring: string; gradient: string; iconBg: string }> = {
  "accompagnement-scolaire": {
    ring: "ring-green-forest/20",
    gradient: "from-green-deep/80 via-green-forest/50 to-transparent",
    iconBg: "bg-green-light text-green-forest",
  },
  "services-domicile": {
    ring: "ring-brand-forest/25",
    gradient: "from-brand-deep/75 via-brand-forest/45 to-transparent",
    iconBg: "bg-amber-light text-brand-deep",
  },
  "accompagnement-seniors": {
    ring: "ring-coral/25",
    gradient: "from-coral/80 via-coral/40 to-transparent",
    iconBg: "bg-coral-light text-coral",
  },
  "activites-alzheimer": {
    ring: "ring-sky/25",
    gradient: "from-sky/80 via-sky/40 to-transparent",
    iconBg: "bg-sky-light text-sky",
  },
  "aide-familiale": {
    ring: "ring-plum/25",
    gradient: "from-plum/80 via-plum/40 to-transparent",
    iconBg: "bg-plum-light text-plum",
  },
};

function ServiceCard({
  service,
  featured = false,
}: {
  service: PlatformService;
  featured?: boolean;
}) {
  const { t } = useLocale();
  const accent = serviceAccents[service.id] ?? serviceAccents["services-domicile"];
  const labels = t.serviceItems[service.id];
  const imageSrc = SERVICE_CAROUSEL_IMAGES[service.id] ?? STOCK_IMAGES.homeCare;

  return (
    <Link
      href={service.href}
      className={clsx(
        "group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300",
        featured
          ? "ring-2 ring-brand-forest/30 hover:-translate-y-1.5 hover:shadow-hover lg:scale-[1.02]"
          : "hover:-translate-y-1 hover:shadow-hover",
        accent.ring
      )}
    >
      <div className="relative h-40 overflow-hidden sm:h-44">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={clsx(
            "absolute inset-0 bg-gradient-to-t",
            accent.gradient
          )}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <span
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-sm backdrop-blur-sm",
              accent.iconBg
            )}
            aria-hidden
          >
            {service.icon}
          </span>
          {service.available ? (
            <span className="badge badge-valid shadow-sm">{t.common.available}</span>
          ) : (
            <span className="badge badge-wait shadow-sm">{t.common.comingSoon}</span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-forest">
          {labels?.subtitle ?? service.subtitle}
        </p>
        <h3 className="mt-1 font-display text-base font-bold text-ink">
          {labels?.title ?? service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {labels?.description ?? service.description}
        </p>
        <p className="mt-4 text-sm font-semibold text-brand-forest transition-colors group-hover:text-brand-deep group-hover:underline underline-offset-2">
          {service.available ? t.common.seeService : t.common.learnMore}
        </p>
      </div>
    </Link>
  );
}

export default function ServicesCarousel() {
  const { t } = useLocale();
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const count = PLATFORM_SERVICES.length;

  const goTo = useCallback(
    (nextIndex: number) => {
      if (animating || nextIndex === index) return;
      setAnimating(true);
      setIndex((nextIndex + count) % count);
      window.setTimeout(() => setAnimating(false), 350);
    },
    [animating, count, index]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setIndex((i) => (i + 1) % count);
      window.setTimeout(() => setAnimating(false), 350);
    }, 8000);
    return () => clearInterval(timer);
  }, [count]);

  const visible = [
    { service: PLATFORM_SERVICES[index], featured: true },
    { service: PLATFORM_SERVICES[(index + 1) % count], featured: false },
    { service: PLATFORM_SERVICES[(index + 2) % count], featured: false },
  ];

  return (
    <div className="services-carousel">
      <div
        className={clsx(
          "hidden gap-5 transition-opacity duration-300 lg:grid lg:grid-cols-3 lg:items-stretch",
          animating ? "opacity-70" : "opacity-100"
        )}
      >
        {visible.map(({ service, featured }) => (
          <ServiceCard key={`${service.id}-${index}`} service={service} featured={featured} />
        ))}
      </div>

      <div
        className={clsx(
          "lg:hidden transition-opacity duration-300",
          animating ? "opacity-70" : "opacity-100"
        )}
      >
        <ServiceCard service={PLATFORM_SERVICES[index]} featured />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-line bg-white/80 px-4 py-3 backdrop-blur-sm">
        <div className="flex flex-wrap gap-2">
          {PLATFORM_SERVICES.map((service, i) => (
            <button
              key={service.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${t.nav.services}: ${t.serviceItems[service.id]?.title ?? service.title}`}
              aria-current={i === index ? "true" : undefined}
              className={clsx(
                "h-2 rounded-full transition-all",
                i === index ? "w-7 bg-brand-forest" : "w-2 bg-line hover:bg-brand-forest/40"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Service précédent"
            className="rounded-lg border border-line bg-white p-2.5 text-ink-muted transition-colors hover:border-brand-forest hover:text-brand-forest"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Service suivant"
            className="rounded-lg border border-line bg-white p-2.5 text-ink-muted transition-colors hover:border-brand-forest hover:text-brand-forest"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
