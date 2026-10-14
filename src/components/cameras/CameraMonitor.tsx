"use client";

import { useCallback, useState } from "react";
import clsx from "clsx";
import { Pause, Play } from "lucide-react";
import CameraOtpGate from "@/components/parent/CameraOtpGate";
import { cameraZones, type CameraFeed, type CameraZone } from "@/lib/parent-data";

function FeedPreview({ feed, zoneName }: { feed: CameraFeed; zoneName: string }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-[#1a1a18]">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white/50">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20">
          {feed.online ? (
            <Play className="h-5 w-5 fill-white/50 text-white/50" />
          ) : (
            <Pause className="h-5 w-5 text-white/50" />
          )}
        </div>
        <p className="text-center text-xs text-white/70">{feed.label}</p>
        <p className="mt-1 font-mono text-[10px] text-white/40">{feed.id}</p>
      </div>
      <div className="absolute left-2 top-2">
        <span
          className={clsx(
            "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            feed.online ? "bg-green-600 text-white" : "bg-gray-600 text-white/80"
          )}
        >
          {feed.online ? "En direct" : "Hors ligne"}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
        <p className="text-[11px] font-medium text-white/90">{zoneName}</p>
        <p className="text-[10px] text-white/50">{feed.lastMotion}</p>
      </div>
      <div className="absolute right-2 top-2 font-mono text-[10px] text-white/40">
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
    <div className="border border-line bg-white p-4">
      <p className="section-label mb-3">Plan du site — cliquez une zone</p>
      <div
        className="grid h-[280px] gap-2 sm:h-[320px]"
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
                "relative overflow-hidden border-2 p-3 text-left transition-all",
                active
                  ? "border-brand-forest bg-brand-light ring-2 ring-brand-forest/20"
                  : "border-line bg-surface-2 hover:border-brand-forest/50"
              )}
            >
              <span className="text-[10px] font-bold uppercase text-brand-forest">{zone.floor}</span>
              <p className="mt-0.5 text-sm font-semibold leading-tight text-ink">{zone.name}</p>
              <p className="mt-1 text-[11px] text-ink-muted">{zone.area}</p>
              <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                <span className="text-[10px] text-ink-muted">{onlineCount} cam.</span>
                <span
                  className={clsx("h-2 w-2 rounded-full", onlineCount > 0 ? "bg-green-500" : "bg-gray-400")}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

type CameraMonitorProps = {
  requireOtp?: boolean;
  supervisorMode?: boolean;
};

export default function CameraMonitor({
  requireOtp = true,
  supervisorMode = false,
}: CameraMonitorProps) {
  const [verified, setVerified] = useState(!requireOtp);
  const [selectedZoneId, setSelectedZoneId] = useState<string>(cameraZones[0].id);
  const [expandedFeedId, setExpandedFeedId] = useState<string>(cameraZones[0].feeds[0].id);

  const handleVerified = useCallback(() => setVerified(true), []);

  const selectedZone = cameraZones.find((z) => z.id === selectedZoneId) ?? cameraZones[0];
  const expandedFeed = selectedZone.feeds.find((f) => f.id === expandedFeedId) ?? selectedZone.feeds[0];

  function selectZone(id: string) {
    setSelectedZoneId(id);
    const zone = cameraZones.find((z) => z.id === id);
    if (zone?.feeds[0]) setExpandedFeedId(zone.feeds[0].id);
  }

  async function lockAccess() {
    if (requireOtp) {
      await fetch("/api/cameras/otp", { method: "DELETE" });
    }
    setVerified(false);
  }

  const totalOnline = cameraZones.reduce((n, z) => n + z.feeds.filter((f) => f.online).length, 0);
  const totalFeeds = cameraZones.reduce((n, z) => n + z.feeds.length, 0);

  if (!verified) {
    return <CameraOtpGate onVerified={handleVerified} />;
  }

  return (
    <>
      <div
        className={clsx(
          "mb-5 flex flex-wrap items-center justify-between gap-3 border px-4 py-3 text-sm",
          supervisorMode
            ? "border-brand-deep/20 bg-brand-deep/5"
            : "border-brand-forest/20 bg-brand-light"
        )}
      >
        <span className="text-ink">
          {supervisorMode ? (
            <>
              <strong className="text-brand-deep">Accès superviseur actif</strong> — {totalOnline}/
              {totalFeeds} caméras en ligne · journalisé
            </>
          ) : (
            <>
              <strong className="text-brand-forest">Accès caméras actif</strong> — session sécurisée
              (30 min)
            </>
          )}
        </span>
        {(requireOtp || supervisorMode) && (
          <button
            type="button"
            onClick={lockAccess}
            className="text-xs font-semibold text-ink-muted underline underline-offset-2 hover:text-brand-forest"
          >
            Verrouiller l&apos;accès
          </button>
        )}
      </div>

      <div className="mb-6 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <SiteMap zones={cameraZones} selectedId={selectedZoneId} onSelect={selectZone} />

        <div className="border border-line bg-white">
          <FeedPreview feed={expandedFeed} zoneName={selectedZone.name} />
          <div className="border-t border-line p-4">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-display text-lg text-ink">{selectedZone.name}</h2>
                <p className="text-xs text-ink-muted">
                  {selectedZone.floor} · {selectedZone.area}
                </p>
              </div>
              <span className="bg-brand-light px-2 py-1 text-xs font-semibold text-brand-forest">
                {selectedZone.childrenPresent} enfants
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-muted">{selectedZone.description}</p>
            <p className="mt-2 text-xs text-ink-muted">
              Plage active : <strong className="text-ink">{selectedZone.activeHours}</strong>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="section-label mb-3">Caméras — {selectedZone.name}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {selectedZone.feeds.map((feed) => (
            <button
              key={feed.id}
              type="button"
              onClick={() => setExpandedFeedId(feed.id)}
              className={clsx(
                "overflow-hidden border-2 text-left transition-all",
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
    </>
  );
}
