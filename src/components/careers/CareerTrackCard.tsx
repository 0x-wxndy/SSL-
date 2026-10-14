import Link from "next/link";
import clsx from "clsx";
import type { CareerTrack } from "@/lib/careers-data";

const accentBorder: Record<CareerTrack["accent"], string> = {
  coral: "border-brand-forest",
  teal: "border-teal",
  plum: "border-plum",
};

const accentBg: Record<CareerTrack["accent"], string> = {
  coral: "bg-brand-light text-brand-deep",
  teal: "bg-teal-light text-teal",
  plum: "bg-plum-light text-plum",
};

export default function CareerTrackCard({ track }: { track: CareerTrack }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-hover">
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={track.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <span
          className={clsx(
            "absolute bottom-3 start-3 rounded-lg px-2.5 py-1 text-[11px] font-bold",
            accentBg[track.accent]
          )}
        >
          {track.eyebrow}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-ink">{track.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{track.teaser}</p>
        <ul className="mt-4 space-y-1.5">
          {track.benefits.map((b) => (
            <li key={b} className="flex gap-2 text-xs text-ink-muted">
              <span className={clsx("mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-forest")} />
              {b}
            </li>
          ))}
        </ul>
        <Link
          href={track.href}
          className={clsx(
            "mt-5 inline-flex text-sm font-semibold text-brand-forest underline-offset-4 hover:underline",
            "border-t pt-4",
            accentBorder[track.accent]
          )}
        >
          Je découvre
        </Link>
      </div>
    </article>
  );
}
