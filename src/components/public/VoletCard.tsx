"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { PlatformService } from "@/lib/constants";
import { SERVICE_CAROUSEL_IMAGES } from "@/lib/stock-images";
import { useLocale } from "@/lib/i18n/locale-context";

const VOLET_STYLES: Record<
  PlatformService["voletId"],
  { accent: string; badge: string; ring: string }
> = {
  scolaire: {
    accent: "from-green-deep/90 via-green-forest/55 to-transparent",
    badge: "bg-yellow text-ink",
    ring: "hover:ring-green-forest/40",
  },
  domicile: {
    accent: "from-brand-deep/90 via-coral/55 to-transparent",
    badge: "bg-yellow text-ink",
    ring: "hover:ring-coral/40",
  },
  alzheimer: {
    accent: "from-teal/95 via-sky/50 to-transparent",
    badge: "bg-yellow text-ink",
    ring: "hover:ring-teal/40",
  },
};

export default function VoletCard({ service }: { service: PlatformService }) {
  const { t } = useLocale();
  const volet = t.home.volets[service.voletId];
  const style = VOLET_STYLES[service.voletId];
  const image = SERVICE_CAROUSEL_IMAGES[service.id];

  return (
    <Link
      href={service.href}
      className={clsx(
        "group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl ring-2 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover sm:min-h-[380px]",
        style.ring
      )}
    >
      {image && (
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className={clsx("absolute inset-0 bg-gradient-to-t", style.accent)} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />

      <div className="relative z-[1] flex h-full flex-col justify-end p-5 sm:p-6">
        <span
          className={clsx(
            "mb-3 inline-flex w-fit rounded-md px-2.5 py-1 text-xs font-bold tracking-wide",
            style.badge
          )}
        >
          {volet.brand}
        </span>
        <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-[1.7rem]">
          {volet.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">{volet.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-yellow transition-transform group-hover:translate-x-1">
          {volet.cta}
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
