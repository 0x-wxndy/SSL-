import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, ShieldCheck, Tag } from "lucide-react";
import {
  getCategoryLabel,
  getListingById,
  MARKETPLACE_LISTINGS,
} from "@/lib/marketplace-data";

type Props = { params: { id: string } };

export function generateStaticParams() {
  return MARKETPLACE_LISTINGS.map((l) => ({ id: l.id }));
}

export default function MarketplaceDetailPage({ params }: Props) {
  const listing = getListingById(params.id);
  if (!listing) notFound();

  return (
    <div className="site-wrap py-8 sm:py-12">
      <Link href="/marketplace" className="mb-6 inline-block text-sm text-ink-muted hover:text-brand-forest">
        ← Retour au marketplace
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="relative mb-6 aspect-video overflow-hidden rounded-xl bg-surface-2">
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 700px"
              priority
            />
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="badge badge-wait">{getCategoryLabel(listing.category)}</span>
            {listing.verified && (
              <span className="badge badge-valid inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Prestataire vérifié
              </span>
            )}
            <span className="text-xs text-ink-subtle">{listing.postedAt}</span>
          </div>

          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">{listing.title}</h1>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-muted">
            <MapPin className="h-4 w-4" />
            {listing.location} · {listing.wilaya}
          </p>

          <p className="mt-6 leading-relaxed text-ink-muted">{listing.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {listing.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-surface-green px-2.5 py-1 text-xs text-ink-muted"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-line bg-white p-6 shadow-card lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Tarif</p>
          <p className="mt-1 font-display text-3xl font-bold text-brand-forest">
            {listing.price}
            <span className="ms-1 text-sm font-normal text-ink-muted">{listing.priceUnit}</span>
          </p>

          <hr className="my-5 border-line" />

          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Prestataire</p>
          <p className="mt-1 font-semibold text-ink">{listing.providerName}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
            <Phone className="h-4 w-4 text-brand-forest" />
            {listing.providerPhone}
          </p>

          <button type="button" className="btn-primary mt-6 w-full">
            Contacter le prestataire
          </button>
          <p className="mt-3 text-center text-[11px] text-ink-subtle">
            MVP — contact simulé. En production : messagerie sécurisée SSL+++.
          </p>
        </aside>
      </div>
    </div>
  );
}
