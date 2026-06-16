import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel, type MarketplaceListing } from "@/lib/marketplace-data";
import { MapPin, ShieldCheck } from "lucide-react";

export default function MarketplaceListingCard({ listing }: { listing: MarketplaceListing }) {
  return (
    <Link
      href={`/marketplace/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {listing.verified && (
          <span className="absolute start-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-green-forest shadow-sm">
            <ShieldCheck className="h-3 w-3" />
            Vérifié SSL+++
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-forest">
          {getCategoryLabel(listing.category)}
        </span>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-ink group-hover:text-brand-forest">
          {listing.title}
        </h3>
        <p className="mt-2 flex items-center gap-1 text-xs text-ink-muted">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          {listing.location}
        </p>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <span className="font-display text-lg font-bold text-brand-forest">{listing.price}</span>
            <span className="ms-1 text-xs text-ink-muted">{listing.priceUnit}</span>
          </div>
          <span className="text-[10px] text-ink-subtle">{listing.postedAt}</span>
        </div>
      </div>
    </Link>
  );
}
