"use client";

import Link from "next/link";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { PLATFORM_SERVICES } from "@/lib/constants";
import { useLocale } from "@/lib/i18n/locale-context";

const serviceStyles: Record<string, { box: string; brand: string }> = {
  "accompagnement-scolaire": { box: "bg-green-light text-green-forest", brand: "SSL+" },
  "aide-sociale-domicile": { box: "bg-brand-light text-brand-deep", brand: "SSL++" },
  "activites-alzheimer": { box: "bg-sky-light text-teal", brand: "SSL+++" },
};

type Props = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  active?: boolean;
  className?: string;
};

export default function ServicesDropdown({ open, onToggle, onClose, active, className }: Props) {
  const { t } = useLocale();

  return (
    <div className={clsx("relative", className)}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="true"
        className={clsx(
          "flex items-center gap-1 py-1 text-sm transition-colors",
          active || open ? "font-semibold text-brand-forest" : "text-ink-muted hover:text-ink"
        )}
      >
        {t.nav.services}
        <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden />
          <div className="absolute start-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-line bg-white shadow-hover">
            <ul className="py-1">
              {PLATFORM_SERVICES.map((service) => {
                const style = serviceStyles[service.id] ?? serviceStyles["aide-sociale-domicile"];
                const labels = t.serviceItems[service.id];
                return (
                  <li key={service.id}>
                    <Link
                      href={service.href}
                      onClick={onClose}
                      className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-brand-light/40"
                    >
                      <span
                        className={clsx(
                          "mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-bold",
                          style.box
                        )}
                        aria-hidden
                      >
                        {style.brand}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-2">
                          <span className="block text-sm font-semibold text-ink">
                            {labels?.title ?? service.title}
                          </span>
                          {service.available ? (
                            <span className="badge badge-valid flex-shrink-0">{t.common.available}</span>
                          ) : (
                            <span className="badge badge-wait flex-shrink-0">{t.common.comingSoon}</span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-muted">
                          {labels?.subtitle ?? service.subtitle}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export function ServicesMobileList({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();

  return (
    <div className="pb-1 pt-2">
      <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
        {t.nav.services}
      </p>
      <ul className="space-y-1">
        {PLATFORM_SERVICES.map((service) => {
          const labels = t.serviceItems[service.id];
          return (
            <li key={service.id}>
              <Link
                href={service.href}
                onClick={onClose}
                className="flex items-center gap-3 px-1 py-2 text-sm text-ink hover:text-brand-forest"
              >
                <span className="text-[10px] font-bold text-ink-subtle">
                  {service.brand}
                </span>
                <span className="flex-1">{labels?.title ?? service.title}</span>
                {!service.available && <span className="badge badge-wait">{t.common.comingSoon}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
