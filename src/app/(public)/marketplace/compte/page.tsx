"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, LogOut } from "lucide-react";
import type { Session } from "@/lib/auth";
import MarketplaceListingCard from "@/components/marketplace/MarketplaceListingCard";
import { getListingsByProvider } from "@/lib/marketplace-data";

export default function MarketplaceAccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/marketplace");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="site-wrap py-12 text-center text-sm text-ink-muted">Chargement…</div>
    );
  }

  if (!user?.providerId) {
    return null;
  }

  const myListings = getListingsByProvider(user.providerId);

  return (
    <div className="site-wrap py-10 sm:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-label">Espace prestataire</p>
          <h1 className="font-display text-2xl font-bold text-ink">Bonjour, {user.name}</h1>
          <p className="mt-1 text-sm text-ink-muted">Gérez vos annonces sur le marketplace SSL+++</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/marketplace/publier" className="btn-primary inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle annonce
          </Link>
          <button type="button" onClick={logout} className="btn-secondary inline-flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { n: String(myListings.length), l: "Annonces actives" },
          { n: String(myListings.filter((x) => x.verified).length), l: "Vérifiées" },
          { n: "—", l: "Messages (MVP)" },
        ].map((k) => (
          <div key={k.l} className="card p-3 text-center">
            <div className="font-display text-xl font-bold text-brand-forest">{k.n}</div>
            <div className="mt-1 text-[11px] text-ink-muted">{k.l}</div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 font-display text-lg font-semibold text-ink">Mes annonces</h2>
      {myListings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line py-12 text-center">
          <p className="text-sm text-ink-muted">Aucune annonce pour le moment.</p>
          <Link href="/marketplace/publier" className="btn-primary mt-4 inline-block">
            Publier ma première annonce
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myListings.map((listing) => (
            <MarketplaceListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
