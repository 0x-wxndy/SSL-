"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ImageIcon, Megaphone } from "lucide-react";
import type { Session } from "@/lib/auth";
import { canAccessMarketplace } from "@/lib/auth";

function promptAvatar(user: Session) {
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (user.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.avatarUrl}
        alt=""
        className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-brand-light"
      />
    );
  }

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-brand-forest">
      {initials}
    </span>
  );
}

export default function MarketplacePublishPrompt() {
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);

  const canPublish = user && canAccessMarketplace(user);

  if (canPublish) {
    return (
      <div className="mb-5 overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="flex items-center gap-3 p-4">
          {promptAvatar(user)}
          <Link
            href="/marketplace/publier"
            className="flex flex-1 items-center rounded-full border border-line bg-surface-base px-4 py-2.5 text-sm text-ink-muted transition-colors hover:border-brand-forest/40 hover:bg-brand-light/30"
          >
            Qu&apos;avez-vous à proposer, {user.name.split(" ")[0]} ?
          </Link>
        </div>
        <div className="flex border-t border-line">
          <Link
            href="/marketplace/publier"
            className="flex flex-1 items-center justify-center gap-2 py-3 text-xs font-semibold text-ink-muted transition-colors hover:bg-surface-green sm:text-sm"
          >
            <Megaphone className="h-4 w-4 text-brand-forest" />
            Publier une annonce
          </Link>
          <Link
            href="/marketplace/publier"
            className="flex flex-1 items-center justify-center gap-2 border-s border-line py-3 text-xs font-semibold text-ink-muted transition-colors hover:bg-surface-green sm:text-sm"
          >
            <ImageIcon className="h-4 w-4 text-green-forest" />
            Ajouter une photo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5 rounded-xl border border-line bg-white p-4 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-brand-forest">
          +
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">Proposer un service sur SSL+++</p>
          <p className="text-xs text-ink-muted">
            Connectez-vous pour publier une annonce visible par les familles.
          </p>
        </div>
        <Link href="/connexion?role=user&from=/marketplace/publier" className="btn-primary btn-sm shrink-0">
          Se connecter
        </Link>
      </div>
    </div>
  );
}
