"use client";

import { useEffect, useState } from "react";
import { Clock, Lock, ShieldCheck } from "lucide-react";
import { CAMERA_DEMO_OTP } from "@/lib/auth";

type Props = {
  onVerified: () => void;
};

export default function CameraOtpGate({ onVerified }: Props) {
  const [checking, setChecking] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [demoHint, setDemoHint] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cameras/otp")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.verified) onVerified();
      })
      .finally(() => setChecking(false));
  }, [onVerified]);

  async function requestCode() {
    setError("");
    setRequesting(true);
    try {
      const res = await fetch("/api/cameras/otp/request", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Envoi impossible");
        return;
      }
      setOtpSent(true);
      setDemoHint(data.demoHint ?? null);
    } catch {
      setError("Erreur réseau — réessayez");
    } finally {
      setRequesting(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/cameras/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Vérification impossible");
        return;
      }
      onVerified();
    } catch {
      setError("Erreur réseau — réessayez");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="card p-8 text-center text-sm text-ink-muted">
        Vérification de l&apos;accès caméras…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm py-10 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light">
        <Lock className="h-7 w-7 text-brand-forest" />
      </div>
      <h2 className="font-display text-lg font-semibold text-ink">Double authentification requise</h2>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
        Les flux vidéo sont protégés. Un code SMS est envoyé au numéro enregistré sur votre dossier.
      </p>

      {!otpSent ? (
        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={requestCode}
            disabled={requesting}
            className="btn-primary w-full max-w-xs disabled:opacity-50"
          >
            {requesting ? "Envoi en cours…" : "Recevoir un code SMS"}
          </button>
          {error && <p className="text-xs font-semibold text-status-error">{error}</p>}
        </div>
      ) : (
        <form onSubmit={verifyCode} className="mt-8 space-y-4">
          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[i] ?? ""}
                onChange={(e) => {
                  const digit = e.target.value.replace(/\D/g, "").slice(-1);
                  const next = otp.split("");
                  next[i] = digit;
                  setOtp(next.join("").slice(0, 6));
                  if (digit && i < 5) {
                    (e.target.nextElementSibling as HTMLInputElement | null)?.focus();
                  }
                }}
                className={`h-[50px] w-[42px] rounded-xl border-2 text-center text-xl font-bold ${
                  otp[i]
                    ? "border-brand-forest bg-brand-light text-brand-forest"
                    : "border-line bg-surface-2 text-ink-subtle"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs font-semibold text-status-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="btn-primary w-full max-w-xs disabled:opacity-50"
          >
            {loading ? "Vérification…" : "Accéder aux caméras"}
          </button>
          <button
            type="button"
            onClick={requestCode}
            disabled={requesting}
            className="text-xs font-semibold text-brand-forest underline underline-offset-2"
          >
            Renvoyer le code
          </button>
        </form>
      )}

      <div className="mt-6 rounded-xl border border-dashed border-line bg-surface-green p-4 text-start">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Démo MVP</p>
        <p className="mt-1 text-xs text-ink-muted">
          {demoHint ?? `Code de démonstration : ${CAMERA_DEMO_OTP}`}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-ink-subtle">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" /> Accès chiffré
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> Session 30 min
        </span>
      </div>
    </div>
  );
}
