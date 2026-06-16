"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import MarketplaceListingCard from "@/components/marketplace/MarketplaceListingCard";
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_LISTINGS,
  type MarketplaceCategory,
} from "@/lib/marketplace-data";

const WILAYAS = Array.from(new Set(MARKETPLACE_LISTINGS.map((l) => l.wilaya)));

export default function MarketplaceBrowse() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MarketplaceCategory | "all">("all");
  const [wilaya, setWilaya] = useState<string>("all");

  const filtered = useMemo(() => {
    return MARKETPLACE_LISTINGS.filter((l) => {
      if (category !== "all" && l.category !== category) return false;
      if (wilaya !== "all" && l.wilaya !== wilaya) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [query, category, wilaya]);

  return (
    <div>
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
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              category === "all"
                ? "bg-brand-forest text-white"
                : "bg-surface-green text-ink-muted hover:bg-brand-light"
            }`}
          >
            Tous
          </button>
          {MARKETPLACE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                category === c.id
                  ? "bg-brand-forest text-white"
                  : "bg-surface-green text-ink-muted hover:bg-brand-light"
              }`}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>
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
