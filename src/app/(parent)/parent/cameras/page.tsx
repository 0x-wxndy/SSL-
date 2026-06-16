"use client";

import { useCallback, useState } from "react";
import clsx from "clsx";
import { ParentPageHeader } from "@/components/parent/ParentPageHeader";
import CameraOtpGate from "@/components/parent/CameraOtpGate";
import { cameraZones, type CameraFeed, type CameraZone } from "@/lib/parent-data";
import { useParentSession } from "@/hooks/useParentSession";

function FeedPreview({ feed, zoneName, large }: { feed: CameraFeed; zoneName: string; large?: boolean }) {
  return (
    <div className={clsx("relative bg-[#1a1a18] overflow-hidden", large ? "aspect-video" : "aspect-video")}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 p-4">
        <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center mb-2">
          <span className="text-lg">{feed.online ? "▶" : "⏸"}</span>
        </div>
        <p className="text-xs text-center text-white/70">{feed.label}</p>
        <p className="text-[10px] text-white/40 mt-1 font-mono">{feed.id}</p>
      </div>
      <div className="absolute top-2 left-2 flex gap-2">
        <span
          className={clsx(
            "text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide",
            feed.online ? "bg-green-600 text-white" : "bg-gray-600 text-white/80"
          )}
        >
          {feed.online ? "En direct" : "Hors ligne"}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
        <p className="text-[11px] text-white/90 font-medium">{zoneName}</p>
        <p className="text-[10px] text-white/50">{feed.lastMotion}</p>
      </div>
      <div className="absolute top-2 right-2 text-[10px] text-white/40 font-mono">
        {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </div>
    </div>
  );
}

function SiteMap({
  zones,
  selectedId,
  onSelect,
}: {
  zones: CameraZone[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="bg-white border border-line p-4">
      <p className="section-label mb-3">Plan du site — cliquez une zone</p>
      <div
        className="grid gap-2 h-[280px] sm:h-[320px]"
        style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr 0.7fr" }}
      >
        {zones.map((zone) => {
          const active = selectedId === zone.id;
          const onlineCount = zone.feeds.filter((f) => f.online).length;
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSelect(zone.id)}
              style={{
                gridColumn: zone.id === "cour" ? "1 / span 2" : zone.mapCol,
                gridRow: zone.mapRow,
              }}
              className={clsx(
                "text-left p-3 border-2 transition-all relative overflow-hidden",
                active
                  ? "border-brand-forest bg-brand-light ring-2 ring-brand-forest/20"
                  : "border-line bg-surface-2 hover:border-brand-forest/50"
              )}
            >
              <span className="text-[10px] font-bold text-brand-forest uppercase">{zone.floor}</span>
              <p className="text-sm font-semibold text-ink mt-0.5 leading-tight">{zone.name}</p>
              <p className="text-[11px] text-ink-muted mt-1">{zone.area}</p>
              <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                <span className="text-[10px] text-ink-muted">{onlineCount} cam.</span>
                <span
                  className={clsx("w-2 h-2 rounded-full", onlineCount > 0 ? "bg-green-500" : "bg-gray-400")}
                />
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-ink-muted mt-3">
        Les flux vidéo sont chiffrés et accessibles après vérification OTP.
      </p>
    </div>
  );
}

export default function ParentCamerasPage() {
  const { user } = useParentSession();
  const [verified, setVerified] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState<string>(cameraZones[0].id);
  const [expandedFeedId, setExpandedFeedId] = useState<string | null>(cameraZones[0].feeds[0].id);

  const handleVerified = useCallback(() => setVerified(true), []);

  const selectedZone = cameraZones.find((z) => z.id === selectedZoneId) ?? cameraZones[0];
  const expandedFeed = selectedZone.feeds.find((f) => f.id === expandedFeedId) ?? selectedZone.feeds[0];

  function selectZone(id: string) {
    setSelectedZoneId(id);
    const zone = cameraZones.find((z) => z.id === id);
    if (zone?.feeds[0]) setExpandedFeedId(zone.feeds[0].id);
  }

  async function lockAccess() {
    await fetch("/api/cameras/otp", { method: "DELETE" });
    setVerified(false);
  }

  const totalOnline = cameraZones.reduce((n, z) => n + z.feeds.filter((f) => f.online).length, 0);
  const totalFeeds = cameraZones.reduce((n, z) => n + z.feeds.length, 0);

  return (
    <div>
      <ParentPageHeader
        user={user}
        title="Surveillance — espaces SSL+++"
        subtitle={
          verified
            ? `${totalOnline}/${totalFeeds} caméras actives · accès OTP validé`
            : "Accès caméras protégé par code SMS"
        }
      />

      {!verified ? (
        <CameraOtpGate onVerified={handleVerified} />
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-4 py-3 bg-brand-light border border-brand-forest/20 text-sm">
            <span className="text-ink">
              <strong className="text-brand-forest">Accès caméras actif</strong> — session sécurisée (30 min)
            </span>
            <button
              type="button"
              onClick={lockAccess}
              className="text-xs font-semibold text-ink-muted hover:text-brand-forest underline underline-offset-2"
            >
              Verrouiller l&apos;accès
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5 mb-6">
            <SiteMap zones={cameraZones} selectedId={selectedZoneId} onSelect={selectZone} />

            <div className="bg-white border border-line">
              <FeedPreview feed={expandedFeed} zoneName={selectedZone.name} large />
              <div className="p-4 border-t border-line">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h2 className="font-display text-lg text-ink">{selectedZone.name}</h2>
                    <p className="text-xs text-ink-muted">
                      {selectedZone.floor} · {selectedZone.area}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-brand-light text-brand-forest">
                    {selectedZone.childrenPresent} enfants
                  </span>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{selectedZone.description}</p>
                <p className="text-xs text-ink-muted mt-2">
                  Plage active : <strong className="text-ink">{selectedZone.activeHours}</strong>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="section-label mb-3">Caméras — {selectedZone.name}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {selectedZone.feeds.map((feed) => (
                <button
                  key={feed.id}
                  type="button"
                  onClick={() => setExpandedFeedId(feed.id)}
                  className={clsx(
                    "text-left border-2 overflow-hidden transition-all",
                    expandedFeedId === feed.id
                      ? "border-brand-forest ring-2 ring-brand-forest/15"
                      : "border-line hover:border-brand-forest/40"
                  )}
                >
                  <FeedPreview feed={feed} zoneName={feed.label} />
                </button>
              ))}
            </div>
          </div>

          <details className="mt-8 border border-line bg-white">
            <summary className="px-4 py-3 text-sm font-semibold text-ink cursor-pointer hover:bg-surface-2">
              Toutes les zones ({cameraZones.length})
            </summary>
            <div className="divide-y divide-line border-t border-line">
              {cameraZones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => selectZone(zone.id)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between gap-4 hover:bg-surface-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{zone.name}</p>
                    <p className="text-xs text-ink-muted">
                      {zone.feeds.length} caméra(s) · {zone.activeHours}
                    </p>
                  </div>
                  <span className="text-xs text-brand-forest font-semibold">Voir →</span>
                </button>
              ))}
            </div>
          </details>
        </>
      )}
    </div>
  );
}
