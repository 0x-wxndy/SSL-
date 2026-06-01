"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ESTABLISHMENT } from "@/lib/constants";

type Portal = "parent" | "admin";

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
      router.push(from && from.startsWith(`/${portal}`) ? from : data.redirect);
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
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="font-sora text-2xl font-bold" style={{ color: "var(--brand)" }}>
            {ESTABLISHMENT.abbr}
          </div>
          <h1 className="font-sora text-lg font-semibold mt-2 text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
          {error && (
            <div className="text-xs font-semibold text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-500">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full text-sm px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-brand"
              placeholder="votre@email.dz"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full text-sm px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-brand"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "var(--brand)" }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 bg-white rounded-xl border border-dashed border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Comptes démo (MVP)</p>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemo(account)}
                className="w-full text-left text-xs px-3 py-2 rounded-lg border border-gray-100 hover:border-brand hover:bg-brand-light transition-colors"
              >
                <span className="font-semibold text-gray-800">{account.label}</span>
                <span className="block text-gray-400 mt-0.5">{account.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
