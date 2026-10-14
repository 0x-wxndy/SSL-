"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import clsx from "clsx";
import MarketplaceListingCard from "@/components/marketplace/MarketplaceListingCard";
import MarketplacePublishPrompt from "@/components/marketplace/MarketplacePublishPrompt";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_LISTINGS,
  type MarketplaceCategory,
  type MarketplaceListing,
} from "@/lib/marketplace-data";
import {
  SSL_VOLETS,
  VOLET_CATEGORIES,
  categoryBelongsToVolet,
  getVoletForCategory,
  type VoletId,
} from "@/lib/volets";

const WILAYAS = Array.from(new Set(MARKETPLACE_LISTINGS.map((l) => l.wilaya)));

const VOLET_TAB_STYLES: Record<VoletId, { active: string; idle: string }> = {
  scolaire: {
    active: "bg-green-light text-green-forest border-green-forest/25",
    idle: "bg-white text-ink-muted border-line hover:border-green-forest/20 hover:bg-green-light/40",
  },
  domicile: {
    active: "bg-brand-light text-brand-deep border-brand-forest/25",
    idle: "bg-white text-ink-muted border-line hover:border-brand-forest/20 hover:bg-brand-light/60",
  },
  alzheimer: {
    active: "bg-plum-light text-plum border-plum/25",
    idle: "bg-white text-ink-muted border-line hover:border-plum/20 hover:bg-plum-light/60",
  },
};

function matchesQuery(listing: MarketplaceListing, query: string) {
  const q = query.toLowerCase();
  return (
    listing.title.toLowerCase().includes(q) ||
    listing.description.toLowerCase().includes(q) ||
    listing.location.toLowerCase().includes(q) ||
    listing.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export default function MarketplaceBrowse() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [volet, setVolet] = useState<VoletId | "all">("all");
  const [category, setCategory] = useState<MarketplaceCategory | "all">("all");
  const [wilaya, setWilaya] = useState<string>("all");

  useEffect(() => {
    const param = searchParams.get("volet");
    if (param === "scolaire" || param === "domicile" || param === "alzheimer") {
      setVolet(param);
      setCategory("all");
    }
  }, [searchParams]);

  const subcategories = useMemo(() => {
    if (volet === "all") return MARKETPLACE_CATEGORIES;
    return MARKETPLACE_CATEGORIES.filter((c) => VOLET_CATEGORIES[volet].includes(c.id));
  }, [volet]);

  const filtered = useMemo(() => {
    return MARKETPLACE_LISTINGS.filter((l) => {
      if (volet !== "all" && !categoryBelongsToVolet(l.category, volet)) return false;
      if (category !== "all" && l.category !== category) return false;
      if (wilaya !== "all" && l.wilaya !== wilaya) return false;
      if (query && !matchesQuery(l, query)) return false;
      return true;
    });
  }, [query, volet, category, wilaya]);

  const grouped = useMemo(() => {
    if (volet !== "all") return null;
    return SSL_VOLETS.map((v) => ({
      volet: v,
      listings: filtered.filter((l) => getVoletForCategory(l.category) === v.id),
    })).filter((g) => g.listings.length > 0);
  }, [volet, filtered]);

  function selectVolet(next: VoletId | "all") {
    setVolet(next);
    setCategory("all");
  }

  return (
    <div>
      <MarketplacePublishPrompt />

      <div className="mb-6 rounded-xl border border-line bg-white p-4 shadow-card sm:p-5">
        <div className="relative mb-4">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un service, une ville, un mot-clé…"
            className="w-full rounded-full border border-line bg-surface-base py-2.5 pe-4 ps-10 text-sm focus:border-brand-forest focus:outline-none"
          />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Volets SSL
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => selectVolet("all")}
            className={clsx(
              "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              volet === "all"
                ? "border-brand-forest/25 bg-brand-light text-brand-deep"
                : "border-line bg-white text-ink-muted hover:bg-surface-2"
            )}
          >
            Tous les volets
          </button>
          {SSL_VOLETS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => selectVolet(v.id)}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                volet === v.id ? VOLET_TAB_STYLES[v.id].active : VOLET_TAB_STYLES[v.id].idle
              )}
            >
              {v.brand} · {v.shortLabel}
            </button>
          ))}
        </div>

        {volet !== "all" && (
          <>
            <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Services du volet
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={clsx(
                  "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                  category === "all"
                    ? VOLET_TAB_STYLES[volet].active
                    : VOLET_TAB_STYLES[volet].idle
                )}
              >
                Tous
              </button>
              {subcategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={clsx(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                    category === c.id
                      ? VOLET_TAB_STYLES[volet].active
                      : VOLET_TAB_STYLES[volet].idle
                  )}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-ink-muted">Wilaya :</span>
          <select
            value={wilaya}
            onChange={(e) => setWilaya(e.target.value)}
            className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs focus:border-brand-forest focus:outline-none"
          >
            <option value="all">Toutes</option>
            {WILAYAS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          <span className="ms-auto text-xs text-ink-subtle">{filtered.length} annonce(s)</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line bg-surface-green py-16 text-center">
          <p className="text-sm font-semibold text-ink">Aucune annonce trouvée</p>
          <p className="mt-1 text-xs text-ink-muted">Modifiez vos filtres ou publiez la vôtre.</p>
        </div>
      ) : volet === "all" && grouped ? (
        <div className="space-y-10">
          {grouped.map(({ volet: v, listings }) => (
            <section key={v.id}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                    {v.brand}
                  </p>
                  <h2 className="font-display text-xl font-bold text-ink">{v.label}</h2>
                </div>
                <Link
                  href={`/marketplace?volet=${v.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    selectVolet(v.id);
                  }}
                  className="text-sm font-semibold text-brand-forest hover:underline"
                >
                  Voir tout le volet →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                  <MarketplaceListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <MarketplaceListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
