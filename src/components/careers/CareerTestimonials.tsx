"use client";

import { useState } from "react";
import clsx from "clsx";
import { CAREER_TESTIMONIALS } from "@/lib/careers-data";

export default function CareerTestimonials() {
  const [index, setIndex] = useState(0);
  const t = CAREER_TESTIMONIALS[index];

  return (
    <section className="bg-brand-deep py-14 text-white sm:py-20">
      <div className="site-wrap">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">Témoignages</p>
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
          L&apos;équipe SSL+++ témoigne
        </h2>

        <blockquote className="mx-auto mt-10 max-w-3xl">
          <p className="font-display text-lg leading-relaxed text-white/95 sm:text-xl">
            &ldquo;{t.quote}&rdquo;
          </p>
          <footer className="mt-6">
            <p className="text-sm font-bold">{t.name}</p>
            <p className="text-sm text-white/65">{t.role}</p>
          </footer>
        </blockquote>

        <div className="mt-8 flex justify-center gap-2">
          {CAREER_TESTIMONIALS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Témoignage ${i + 1}`}
              onClick={() => setIndex(i)}
              className={clsx(
                "h-2.5 w-2.5 rounded-full transition-colors",
                i === index ? "bg-white" : "bg-white/35 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
