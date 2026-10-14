"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  Brain,
  GraduationCap,
  Home,
  Store,
  type LucideIcon,
} from "lucide-react";
import type { NeedOption } from "@/lib/home-landing";

type Props = {
  title: string;
  hint: string;
  nextLabel: string;
  errorLabel: string;
  jobStrip: string;
  needs: NeedOption[];
};

const ICONS: Record<NeedOption["icon"], LucideIcon> = {
  school: GraduationCap,
  home: Home,
  brain: Brain,
  store: Store,
};

const TONE_BG: Record<NeedOption["tone"], string> = {
  green: "bg-green-forest",
  coral: "bg-coral",
  teal: "bg-teal",
  ink: "bg-brand-deep",
  sky: "bg-sky",
  yellow: "bg-yellow text-ink",
};

export default function NeedsWizard({
  title,
  hint,
  nextLabel,
  errorLabel,
  jobStrip,
  needs,
}: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState(false);

  function toggle(id: string) {
    setError(false);
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleNext() {
    if (selected.length === 0) {
      setError(true);
      return;
    }
    const first = needs.find((n) => n.id === selected[0]);
    router.push(first?.href ?? "/contact");
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-hover">
      <div className="px-5 pb-6 pt-7 sm:px-8 sm:pt-8">
        <h2 className="text-center font-display text-xl font-bold text-teal sm:text-2xl">
          {title}
        </h2>

        <div className="mt-4 flex items-center justify-center gap-0" aria-hidden>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-sm font-bold text-white">
            1
          </span>
          <span className="h-px w-10 bg-line sm:w-14" />
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-line text-sm font-bold text-ink-subtle">
            2
          </span>
        </div>
        <p className="sr-only">{hint}</p>

        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3">
          {needs.map((need) => {
            const active = selected.includes(need.id);
            const Icon = ICONS[need.icon];
            return (
              <button
                key={need.id}
                type="button"
                onClick={() => toggle(need.id)}
                className="group flex flex-col items-center text-center"
              >
                <span
                  className={clsx(
                    "flex h-16 w-16 items-center justify-center rounded-full text-white shadow-card transition-transform group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]",
                    TONE_BG[need.tone],
                    active && "ring-4 ring-offset-2 ring-brand-forest/30"
                  )}
                >
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
                </span>
                <span className="mt-3 min-h-[2.5rem] text-[12px] font-semibold leading-snug text-ink sm:text-[13px]">
                  {need.label}
                </span>
                <span
                  className={clsx(
                    "mt-2 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors",
                    active ? "border-brand-deep bg-brand-deep" : "border-brand-deep/50 bg-white"
                  )}
                  aria-hidden
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
              </button>
            );
          })}
        </div>

        {error && (
          <p className="mt-5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-center text-xs font-semibold text-red-700">
            {errorLabel}
          </p>
        )}

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={handleNext}
            className="rounded-md bg-brand-deep px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink"
          >
            {nextLabel}
          </button>
        </div>
      </div>

      <Link
        href="/rejoindre"
        className="flex items-center justify-center gap-2 border-t border-yellow/30 bg-yellow-light px-4 py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-yellow"
      >
        {jobStrip}
      </Link>
    </div>
  );
}
