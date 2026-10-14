"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import type { Session } from "@/lib/auth";
import { marketplacePublisherId } from "@/lib/auth";
import { FEATURES } from "@/lib/constants";
import UserAccountMenu from "@/components/auth/UserAccountMenu";
import MarketplaceListingCard from "@/components/marketplace/MarketplaceListingCard";
import MarketplacePublishPrompt from "@/components/marketplace/MarketplacePublishPrompt";
import ParentSpaceCard from "@/components/marketplace/ParentSpaceCard";
import { getListingsByProvider } from "@/lib/marketplace-data";

export default function MarketplaceAccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const marketplaceOn = FEATURES.marketplace;

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/connexion?role=user&from=/marketplace/compte");
    }
  }, [loading, user, router]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  if (loading || !user) {
    return (
      <div className="site-wrap py-12 text-center text-sm text-ink-muted">Chargement…</div>
    );
  }

  const publisherId = marketplacePublisherId(user);
  const myListings = publisherId ? getListingsByProvider(publisherId) : [];

  return (
    <div className="site-wrap py-10 sm:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-label">{marketplaceOn ? "Mon espace marketplace" : "Mon compte"}</p>
          <h1 className="font-display text-2xl font-bold text-ink">Bonjour, {user.name}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {marketplaceOn
              ? "Parcourez les annonces, publiez vos services et gérez votre profil"
              : "Gérez votre profil et activez l'espace parent pour l'accompagnement scolaire SSL+++"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <UserAccountMenu user={user} onUserChange={setUser} theme="light" />
          <button type="button" onClick={logout} className="btn-secondary inline-flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </div>

      {marketplaceOn && (
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
      )}

      {marketplaceOn && <MarketplacePublishPrompt />}

      <ParentSpaceCard user={user} />

      {marketplaceOn && (
        <>
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
        </>
      )}
    </div>
  );
}
