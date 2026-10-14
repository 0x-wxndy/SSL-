"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AlertTriangle, Bell } from "lucide-react";
import type { Session } from "@/lib/auth";
import {
  getSharedStockItems,
  notificationsForRole,
  stockOwnersForRole,
  subscribeSharedStock,
  type AdminNotification,
} from "@/lib/admin-notifications";

export default function AdminNotifications({ user }: { user: Session }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(getSharedStockItems);
  const [readIds, setReadIds] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const canReceive = stockOwnersForRole(user.role) === "all" || stockOwnersForRole(user.role).length > 0;

  useEffect(() => {
    if (!canReceive) return;
    return subscribeSharedStock(setItems);
  }, [canReceive]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  if (!canReceive) return null;

  const notifications = notificationsForRole(user, items);
  const unread = notifications.filter((n) => !readIds.includes(n.id));

  function markAllRead() {
    setReadIds(notifications.map((n) => n.id));
  }

  function markRead(id: string) {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-lg p-2 text-ink-muted hover:bg-surface-green hover:text-brand-forest"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className="h-4 w-4" />
        {unread.length > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[9px] font-bold text-white">
            {unread.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute end-0 z-40 mt-2 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-xl border border-line bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-line px-3 py-2.5">
            <p className="text-xs font-bold text-ink">Notifications</p>
            {unread.length > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-[11px] font-semibold text-brand-forest hover:underline"
              >
                Tout marquer lu
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-ink-muted">
              Aucune alerte stock pour le moment.
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <NotificationRow
                  key={n.id}
                  notification={n}
                  unread={!readIds.includes(n.id)}
                  onOpen={() => {
                    markRead(n.id);
                    setOpen(false);
                  }}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationRow({
  notification,
  unread,
  onOpen,
}: {
  notification: AdminNotification;
  unread: boolean;
  onOpen: () => void;
}) {
  return (
    <li>
      <Link
        href={notification.href}
        onClick={onOpen}
        className={clsx(
          "flex gap-2.5 border-b border-line/60 px-3 py-3 transition-colors last:border-b-0 hover:bg-surface-green",
          unread ? "bg-amber-50/60" : "bg-white"
        )}
      >
        <span
          className={clsx(
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
            notification.level === "critical" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"
          )}
        >
          <AlertTriangle className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-2">
            <span className="text-xs font-semibold text-ink">{notification.title}</span>
            {unread && <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />}
          </span>
          <span className="mt-0.5 block text-[11px] leading-snug text-ink-muted">
            {notification.body}
          </span>
          <span className="mt-1 block text-[10px] text-ink-subtle">{notification.at}</span>
        </span>
      </Link>
    </li>
  );
}
