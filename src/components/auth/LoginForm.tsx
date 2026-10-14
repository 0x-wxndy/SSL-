"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/brand/Logo";

type Portal = "parent" | "admin" | "marketplace";

type DemoAccount = { email: string; password: string; label: string };

type LoginFormProps = {
  portal: Portal;
  title: string;
  subtitle: string;
  demoAccounts: DemoAccount[];
};

export default function LoginForm({ portal, title, subtitle, demoAccounts }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, portal }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Connexion impossible");
        return;
      }

      const from = searchParams.get("from");
      const defaultRedirect =
        portal === "parent" ? "/parent" : portal === "marketplace" ? "/marketplace/compte" : "/admin";
      router.push(from && from.startsWith(`/${portal === "marketplace" ? "marketplace" : portal}`) ? from : data.redirect ?? defaultRedirect);
      router.refresh();
    } catch {
      setError("Erreur réseau — réessayez");
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(account: DemoAccount) {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-surface">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mb-4 flex justify-center">
            <Logo href="/" imageClassName="h-[160px] w-auto max-w-[160px]" />
          </div>
          <h1 className="font-display text-lg font-semibold text-ink">{title}</h1>
          <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-line p-6 space-y-4">
          {error && (
            <div className="text-xs font-semibold text-red-700 bg-red-50 border border-red-100 px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full text-sm px-3 py-2.5 border border-line bg-white focus:outline-none focus:border-brand-forest"
              placeholder="votre@email.dz"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full text-sm px-3 py-2.5 border border-line bg-white focus:outline-none focus:border-brand-forest"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 bg-white border border-dashed border-line p-4">
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
            Comptes démo (MVP)
          </p>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemo(account)}
                className="w-full text-left text-xs px-3 py-2 border border-line hover:border-brand-forest hover:bg-brand-light transition-colors"
              >
                <span className="font-semibold text-ink">{account.label}</span>
                <span className="block text-muted mt-0.5">{account.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
