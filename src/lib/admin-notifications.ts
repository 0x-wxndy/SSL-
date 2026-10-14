import {
  INITIAL_STOCK_ITEMS,
  STOCK_ALERT_LABELS,
  stockAlertLevel,
  type StockAlertLevel,
  type StockItem,
  type StockOwner,
} from "@/lib/admin-stock-data";
import type { Session, UserRole } from "@/lib/auth";

export type AdminNotification = {
  id: string;
  kind: "stock_alert";
  level: Exclude<StockAlertLevel, "ok">;
  title: string;
  body: string;
  href: string;
  owner: StockOwner;
  itemId: string;
  at: string;
};

/** Which stock owners a logged-in role should see in the bell. */
export function stockOwnersForRole(
  role: UserRole,
  staffTrack?: Session["staffTrack"]
): StockOwner[] | "all" {
  if (role === "admin") return "all";
  if (role === "supply_manager") return ["Admin stocks"];
  if (role === "staff" && staffTrack === "cuisine") return ["Admin stocks"];
  return [];
}

export function buildStockNotifications(items: StockItem[]): AdminNotification[] {
  return items
    .map((item) => {
      const level = stockAlertLevel(item);
      if (level === "ok") return null;
      return {
        id: `stock-${item.id}-${level}`,
        kind: "stock_alert" as const,
        level,
        title: `${STOCK_ALERT_LABELS[level]} — ${item.article}`,
        body: `Réserve ${item.quantity} ${item.unit} (seuil ${item.threshold} ${item.unit}) · ${item.owner}`,
        href: "/admin?m=supply",
        owner: item.owner,
        itemId: item.id,
        at: item.updatedAt,
      };
    })
    .filter((n): n is AdminNotification => n !== null)
    .sort((a, b) => {
      if (a.level === b.level) return 0;
      return a.level === "critical" ? -1 : 1;
    });
}

export function notificationsForRole(
  sessionOrRole: UserRole | Pick<Session, "role" | "staffTrack">,
  items: StockItem[] = INITIAL_STOCK_ITEMS
): AdminNotification[] {
  const role = typeof sessionOrRole === "string" ? sessionOrRole : sessionOrRole.role;
  const staffTrack = typeof sessionOrRole === "string" ? undefined : sessionOrRole.staffTrack;
  const owners = stockOwnersForRole(role, staffTrack);
  if (owners === "all") return buildStockNotifications(items);
  if (owners.length === 0) return [];
  return buildStockNotifications(items).filter((n) => owners.includes(n.owner));
}

type Listener = (items: StockItem[]) => void;

let stockItems: StockItem[] = INITIAL_STOCK_ITEMS.map((i) => ({ ...i }));
const listeners = new Set<Listener>();

export function getSharedStockItems(): StockItem[] {
  return stockItems;
}

export function setSharedStockItems(next: StockItem[]) {
  stockItems = next;
  listeners.forEach((l) => l(stockItems));
}

export function subscribeSharedStock(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
