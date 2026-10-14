"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Camera, ChevronDown, User } from "lucide-react";
import type { Session } from "@/lib/auth";
import { roleLabel } from "@/lib/auth";

type Theme = "dark" | "light";

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({
  user,
  size = "md",
}: {
  user: Session;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "h-16 w-16 text-lg" : size === "sm" ? "h-8 w-8 text-xs" : "h-9 w-9 text-xs";

  if (user.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.avatarUrl}
        alt=""
        className={clsx(
          "shrink-0 rounded-full object-cover ring-2 ring-white/25",
          sizeClass
        )}
      />
    );
  }

  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-white/20 font-bold",
        sizeClass
      )}
    >
      {initialsFromName(user.name)}
    </span>
  );
}

function ProfileModal({
  user,
  open,
  onClose,
  onSaved,
}: {
  user: Session;
  open: boolean;
  onClose: () => void;
  onSaved: (user: Session) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [badgeId, setBadgeId] = useState("");
  const [badgeGate, setBadgeGate] = useState("");
  const [badgeActive, setBadgeActive] = useState(true);
  const [badgeRole, setBadgeRole] = useState("");
  const [badgeLastScan, setBadgeLastScan] = useState("");
  const [hasBadge, setHasBadge] = useState(false);
  const [badgeLoading, setBadgeLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setName(user.name);
    setPhone(user.phone ?? "");
    setBio(user.bio ?? "");
    setAvatarUrl(user.avatarUrl ?? "");
    setError("");

    setBadgeLoading(true);
    fetch("/api/auth/profile/badge")
      .then((r) => (r.ok ? r.json() : { profile: null }))
      .then((data) => {
        const profile = data.profile as
          | {
              staff: { phone: string; role: string };
              badge: {
                badgeId: string;
                gate: string;
                active: boolean;
                roleLabel: string;
                lastScan: string;
              };
            }
          | null;
        if (!profile) {
          setHasBadge(false);
          return;
        }
        setHasBadge(true);
        setBadgeId(profile.badge.badgeId);
        setBadgeGate(profile.badge.gate);
        setBadgeActive(profile.badge.active);
        setBadgeRole(profile.badge.roleLabel || profile.staff.role);
        setBadgeLastScan(profile.badge.lastScan);
        if (!user.phone && profile.staff.phone) setPhone(profile.staff.phone);
      })
      .catch(() => setHasBadge(false))
      .finally(() => setBadgeLoading(false));
  }, [open, user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, bio, avatarUrl: avatarUrl || "" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Enregistrement impossible");
        return;
      }

      if (hasBadge) {
        const badgeRes = await fetch("/api/auth/profile/badge", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            holderName: name,
            gate: badgeGate,
            active: badgeActive,
          }),
        });
        if (!badgeRes.ok) {
          const badgeData = await badgeRes.json().catch(() => ({}));
          setError(badgeData.error ?? "Profil enregistré, badge non mis à jour");
          onSaved(data.user as Session);
          return;
        }
      }

      onSaved(data.user as Session);
      onClose();
    } catch {
      setError("Erreur réseau");
    } finally {
      setSaving(false);
    }
  }

  function handlePhotoFile(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choisissez une image (JPG, PNG, WebP…)");
      return;
    }
    if (file.size > 200_000) {
      setError("Image max 200 Ko en démonstration");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(String(reader.result ?? ""));
    reader.readAsDataURL(file);
    setError("");
  }

  if (!open) return null;

  const previewUser: Session = { ...user, name, avatarUrl: avatarUrl || undefined };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="Fermer"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-line bg-white p-6 shadow-hover">
        <h2 className="font-display text-xl font-bold text-ink">Mon profil</h2>
        <p className="mt-1 text-sm text-ink-muted">
          {roleLabel(user.role, user.staffTrack)} · {user.email}
        </p>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar user={previewUser} size="lg" />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -end-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-forest text-white shadow-sm"
                aria-label="Changer la photo"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <div className="min-w-0 flex-1">
              <label className="mb-1 block text-xs font-semibold text-ink-muted">
                Photo (URL optionnelle)
              </label>
              <input
                type="url"
                value={avatarUrl.startsWith("data:") ? "" : avatarUrl}
                placeholder="https://…"
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm"
              />
              {avatarUrl && (
                <button
                  type="button"
                  onClick={() => setAvatarUrl("")}
                  className="mt-1 text-xs text-brand-forest hover:underline"
                >
                  Supprimer la photo
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-muted">Nom affiché</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-line px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-muted">Téléphone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+213 XX XX XX XX"
              className="w-full rounded-lg border border-line px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-muted">À propos</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Quelques mots sur vous…"
              className="w-full resize-none rounded-lg border border-line px-3 py-2 text-sm"
            />
          </div>

          {(hasBadge || badgeLoading) && (
            <div className="rounded-xl border border-line bg-surface-2 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-forest">
                Badge d&apos;accès — voir / modifier
              </p>
              {badgeLoading ? (
                <p className="mt-2 text-xs text-ink-muted">Chargement du badge…</p>
              ) : (
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-semibold text-ink-muted">ID badge</p>
                      <p className="mt-0.5 font-mono text-ink">{badgeId}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-ink-muted">Poste</p>
                      <p className="mt-0.5 text-ink">{badgeRole}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold text-ink-muted">Dernier scan</p>
                      <p className="mt-0.5 text-ink">{badgeLastScan || "—"}</p>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-ink-muted">
                      Portail d&apos;accès
                    </label>
                    <input
                      value={badgeGate}
                      onChange={(e) => setBadgeGate(e.target.value)}
                      className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
                      placeholder="Entrée personnel"
                    />
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-ink">
                    <input
                      type="checkbox"
                      checked={badgeActive}
                      onChange={(e) => setBadgeActive(e.target.checked)}
                      className="rounded border-line text-brand-forest focus:ring-brand-forest"
                    />
                    Badge actif
                  </label>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-sm text-status-error">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary btn-sm">
              Annuler
            </button>
            <button type="submit" disabled={saving} className="btn-primary btn-sm">
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-[11px] text-ink-subtle">
          Démonstration — profil session + badge personnel en mémoire serveur.
        </p>
      </div>
    </div>
  );
}

export default function UserAccountMenu({
  user,
  onUserChange,
  theme = "light",
  className,
}: {
  user: Session;
  onUserChange?: (user: Session) => void;
  theme?: Theme;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const isDark = theme === "dark";

  return (
    <>
      <div ref={menuRef} className={clsx("relative", className)}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            "flex max-w-[220px] items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors sm:max-w-none",
            isDark ? "hover:bg-white/10" : "hover:bg-surface-2"
          )}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <Avatar user={user} size="sm" />
          <span
            className={clsx(
              "hidden min-w-0 truncate text-xs font-medium sm:inline",
              isDark ? "text-white/90" : "text-ink-muted"
            )}
          >
            {user.name}
          </span>
          <ChevronDown
            className={clsx(
              "hidden h-3.5 w-3.5 shrink-0 sm:block",
              isDark ? "text-white/60" : "text-ink-subtle",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute end-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-hover"
          >
            <div className="border-b border-line px-3 py-2.5">
              <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
              <p className="truncate text-[11px] text-ink-muted">{user.email}</p>
              <p className="text-[10px] text-ink-subtle">{roleLabel(user.role, user.staffTrack)}</p>
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                setProfileOpen(true);
              }}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-ink hover:bg-surface-2"
            >
              <User className="h-4 w-4 text-brand-forest" />
              Voir / modifier le profil
            </button>
          </div>
        )}
      </div>

      <ProfileModal
        user={user}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onSaved={(updated) => onUserChange?.(updated)}
      />
    </>
  );
}

export { Avatar, initialsFromName };
