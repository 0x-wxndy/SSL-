"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import Logo from "@/components/brand/Logo";
import type { AuthPortal } from "@/lib/auth";

type PortalKey = "user" | "provider" | "parent" | "admin";

type DemoAccount = { email: string; password: string; label: string };

type PortalConfig = {
  key: PortalKey;
  portal: AuthPortal;
  label: string;
  title: string;
  subtitle: string;
  demoAccounts: DemoAccount[];
};

const PORTALS: PortalConfig[] = [
  {
    key: "user",
    portal: "user",
    label: "Utilisateur",
    title: "Connexion — Utilisateur",
    subtitle: "Parcourez la marketplace, publiez des annonces et gérez votre profil",
    demoAccounts: [{ label: "Utilisateur — Karim B.", email: "user@ssl.dz", password: "user123" }],
  },
  {
    key: "provider",
    portal: "marketplace",
    label: "Prestataire",
    title: "Connexion — Prestataire",
    subtitle: "Publiez et gérez vos annonces d'aide sociale",
    demoAccounts: [
      { label: "Prestataire — Fatima Zohra K.", email: "prestataire@ssl.dz", password: "market123" },
    ],
  },
  {
    key: "parent",
    portal: "parent",
    label: "Parent",
    title: "Connexion — Espace Parent",
    subtitle: "Planning, messages, facturation et caméras",
    demoAccounts: [{ label: "Parent — Famille Benali", email: "parent@ssl.dz", password: "parent123" }],
  },
  {
    key: "admin",
    portal: "admin",
    label: "Administration",
    title: "Connexion — Back-office",
    subtitle: "Direction, administration et personnel SSL+++",
    demoAccounts: [
      { label: "Admin Principal", email: "admin@ssl.dz", password: "admin123" },
      { label: "Admin Secondaire", email: "admin2@ssl.dz", password: "admin2123" },
      { label: "Staff", email: "staff@ssl.dz", password: "staff123" },
    ],
  },
];

function parsePortalKey(value: string | null): PortalKey {
  if (value === "user" || value === "provider" || value === "parent" || value === "admin") {
    return value;
  }
  return "user";
}

export default function LoginHub() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialKey = parsePortalKey(searchParams.get("role"));
  const [portalKey, setPortalKey] = useState<PortalKey>(initialKey);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const active = useMemo(
    () => PORTALS.find((item) => item.key === portalKey) ?? PORTALS[0],
    [portalKey]
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, portal: active.portal }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Connexion impossible");
        return;
      }

      const from = searchParams.get("from");
      router.push(from ?? data.redirect);
      router.refresh();
    } catch {
      setError("Erreur réseau — réessayez");
    } finally {
      setLoading(false);
    }
  }

  function selectPortal(key: PortalKey) {
    setPortalKey(key);
    setEmail("");
    setPassword("");
    setError("");
  }

  function fillDemo(account: DemoAccount) {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <div className="mb-4 flex justify-center">
            <Logo href="/" imageClassName="w-[140px]" />
          </div>
          <h1 className="font-display text-xl font-semibold text-ink">Connexion</h1>
          <p className="mt-1 text-sm text-ink-muted">Choisissez votre type d&apos;accès</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PORTALS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => selectPortal(item.key)}
              className={clsx(
                "rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors sm:text-sm",
                portalKey === item.key
                  ? "border-brand-forest bg-brand-light text-brand-forest"
                  : "border-line bg-white text-ink-muted hover:border-brand-forest/30 hover:text-ink"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-4 rounded-xl border border-line bg-white px-4 py-3">
          <p className="font-display text-sm font-semibold text-ink">{active.title}</p>
          <p className="mt-0.5 text-xs text-ink-muted">{active.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 border border-line bg-white p-6">
          {error && (
            <div className="border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full border border-line bg-white px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none"
              placeholder="votre@email.dz"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full border border-line bg-white px-3 py-2.5 text-sm focus:border-brand-forest focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 border border-dashed border-line bg-white p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Comptes démo — {active.label}
          </p>
          <div className="space-y-2">
            {active.demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemo(account)}
                className="w-full border border-line px-3 py-2 text-left text-xs transition-colors hover:border-brand-forest hover:bg-brand-light"
              >
                <span className="font-semibold text-ink">{account.label}</span>
                <span className="mt-0.5 block text-muted">
                  {account.email} · {account.password}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-semibold text-brand-forest hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
