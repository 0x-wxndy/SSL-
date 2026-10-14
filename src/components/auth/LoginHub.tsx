"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import Logo from "@/components/brand/Logo";
import type { AuthPortal } from "@/lib/auth";

import { FEATURES } from "@/lib/constants";

type PortalKey = "user" | "parent" | "admin" | "alzheimer";

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
    label: "Client",
    title: "Connexion — Espace client",
    subtitle: FEATURES.marketplace
      ? "Marketplace : parcourir les annonces, publier vos services et gérer votre profil"
      : "Demande de prestation d'aide sociale",
    demoAccounts: [{ label: "Utilisateur — Karim B.", email: "user@ssl.dz", password: "user123" }],
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
    key: "alzheimer",
    portal: "alzheimer",
    label: "Ateliers Alzheimer",
    title: "Connexion — Espace ateliers Alzheimer",
    subtitle: "Suivi des ateliers, présences et échanges avec l'équipe",
    demoAccounts: [{ label: "Proche aidant — Nadia K.", email: "alzheimer@ssl.dz", password: "alzheimer123" }],
  },
  {
    key: "admin",
    portal: "admin",
    label: "Administration",
    title: "Connexion — Back-office",
    subtitle: "Direction, administration et personnel SSL+++",
    demoAccounts: [
      { label: "Admin Principal — Mme Hayet Laker", email: "admin@ssl.dz", password: "admin123" },
      { label: "Admin pédagogique (dossiers)", email: "admin2@ssl.dz", password: "admin2123" },
      { label: "Admin stocks (cantine & fournitures)", email: "supply@ssl.dz", password: "supply123" },
      { label: "Staff 1 — Cuisine (stocks)", email: "staff@ssl.dz", password: "staff123" },
      { label: "Staff 2 — Accueil (présences)", email: "staff2@ssl.dz", password: "staff2123" },
      { label: "Staff 3 — Encadrement (pédagogie)", email: "staff3@ssl.dz", password: "staff3123" },
      { label: "Staff 4 — Soutien (pédagogie)", email: "staff4@ssl.dz", password: "staff4123" },
    ],
  },
];

function isPortalKey(value: string): value is PortalKey {
  return PORTALS.some((item) => item.key === value);
}

function parsePortalKey(value: string | null, allowed: PortalKey[]): PortalKey {
  if (value === "provider") return allowed.includes("user") ? "user" : allowed[0];
  if (value === "user" || value === "parent" || value === "admin" || value === "alzheimer") {
    return allowed.includes(value) ? value : allowed[0];
  }
  return allowed[0];
}

type LoginHubProps = {
  portals?: PortalKey[];
};

export default function LoginHub({ portals }: LoginHubProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedRole = searchParams.get("role");
  const available = useMemo(() => {
    const locked =
      requestedRole === "user" ||
      requestedRole === "parent" ||
      requestedRole === "admin" ||
      requestedRole === "alzheimer"
        ? [requestedRole]
        : ["user", "parent"];
    const base = portals ?? locked;
    return base.filter(isPortalKey);
  }, [portals, requestedRole]);
  const initialKey = parsePortalKey(searchParams.get("role"), available);
  const [portalKey, setPortalKey] = useState<PortalKey>(initialKey);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const active = useMemo(
    () => PORTALS.find((item) => item.key === portalKey) ?? PORTALS[0],
    [portalKey]
  );

  useEffect(() => {
    if (searchParams.get("role") === "admin" && !available.includes("admin")) {
      router.replace("/admin/connexion");
    }
  }, [available, router, searchParams]);

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

  const backHref =
    active.key === "parent"
      ? "/services/accompagnement-scolaire"
      : active.key === "user"
        ? "/services/aide-sociale-domicile"
        : active.key === "alzheimer"
          ? "/services/activites-alzheimer"
          : "/";

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-lg">
        <Link href={backHref} className="mb-4 inline-block text-sm font-semibold text-ink-muted hover:text-brand-forest">
          ← Retour
        </Link>
        <div className="mb-6 text-center">
          <div className="mb-4 flex justify-center">
            <Logo href="/" imageClassName="h-[160px] w-auto max-w-[160px]" />
          </div>
          <h1 className="font-display text-xl font-semibold text-ink">
            {available.length === 1 ? active.title : "Connexion"}
          </h1>
          {available.length > 1 && (
            <p className="mt-1 text-sm text-ink-muted">Choisissez votre espace : client ou parent</p>
          )}
        </div>

        {available.length > 1 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {PORTALS.filter((item) => available.includes(item.key)).map((item) => (
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
        )}

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
