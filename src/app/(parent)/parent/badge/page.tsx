"use client";

import Image from "next/image";
import { ParentPageHeader } from "@/components/parent/ParentPageHeader";
import { children } from "@/lib/parent-data";
import { useParentSession } from "@/hooks/useParentSession";

export default function ParentBadgePage() {
  const { user } = useParentSession();

  return (
    <div>
      <ParentPageHeader
        user={user}
        title="Badge ID & carte d'adhésion"
        subtitle="Identification à l'entrée du site et badgeuse de présence"
      />

      <p className="mb-6 text-sm leading-relaxed text-ink-muted">
        Chaque enfant reçoit une carte d&apos;adhésion avec un identifiant unique. Le badge est activé
        à l&apos;arrivée et désactivé au départ.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {children.map((child, index) => {
          const gradient =
            index === 0
              ? "bg-gradient-to-br from-brand-forest to-brand-deep"
              : "bg-gradient-to-br from-amber to-[#8B5200]";

          return (
            <article
              key={child.badgeId}
              className={`relative aspect-[1.6/1] w-full max-w-[280px] overflow-hidden rounded-xl ${gradient} p-5 text-white shadow-card`}
            >
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")" }} />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="rounded bg-white/95 px-1.5 py-0.5">
                    <Image
                      src="/assets/ssl-logo.png"
                      alt="SSL+++"
                      width={64}
                      height={32}
                      className="h-5 w-auto"
                    />
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-[10px]">
                    QR
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 bg-white/20 text-lg font-bold">
                    {child.initials}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">{child.name}</h2>
                    <p className="font-mono text-xs text-white/60">{child.badgeId}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">{child.level}</span>
                  <span className={child.present ? "badge bg-brand-mint text-brand-deep" : "badge bg-amber-200 text-amber-900"}>
                    {child.present ? "Actif" : "Inactif"}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
