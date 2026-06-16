"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/locale-context";
import { LOCALES, type Locale } from "@/lib/i18n/types";

type Props = {
  className?: string;
  compact?: boolean;
};

export default function LanguageSwitcher({ className, compact }: Props) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const current = LOCALES.find((item) => item.code === locale) ?? LOCALES[0];

  function choose(next: Locale) {
    setLocale(next);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Choisir la langue"
        className={clsx(
          "flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:border-brand-forest/40 hover:bg-brand-light/40",
          compact && "w-full justify-between"
        )}
      >
        <span>{current.label}</span>
        <ChevronDown className={clsx("h-4 w-4 text-ink-muted transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 top-full z-50 mt-2 min-w-[9rem] overflow-hidden rounded-xl border border-line bg-white py-1 shadow-hover"
        >
          {LOCALES.map((item) => (
            <li key={item.code} role="option" aria-selected={locale === item.code}>
              <button
                type="button"
                onClick={() => choose(item.code)}
                className={clsx(
                  "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-start text-sm transition-colors hover:bg-brand-light/40",
                  locale === item.code ? "font-semibold text-brand-forest" : "text-ink"
                )}
              >
                <span>{item.label}</span>
                <span className="text-xs text-ink-muted">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
