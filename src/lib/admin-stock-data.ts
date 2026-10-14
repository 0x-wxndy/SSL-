export type StockCategory = "Cantine" | "Bureautique" | "Hygiène" | "Extra" | "Réserve";

export type StockOwner = "Admin stocks" | "Admin Principal";

export type StockItem = {
  id: string;
  article: string;
  category: StockCategory;
  quantity: number;
  unit: string;
  /** Seuil d'alerte — en dessous, l'article est signalé aux admins */
  threshold: number;
  owner: StockOwner;
  updatedAt: string;
};

export type StockMovementType = "entree" | "sortie" | "ajustement";

export type StockMovement = {
  id: string;
  at: string;
  itemId: string;
  article: string;
  type: StockMovementType;
  quantity: number;
  unit: string;
  balanceAfter: number;
  actor: string;
  note: string;
};

export const STOCK_CATEGORIES: StockCategory[] = [
  "Cantine",
  "Bureautique",
  "Hygiène",
  "Extra",
  "Réserve",
];

export const STOCK_MOVEMENT_LABELS: Record<StockMovementType, string> = {
  entree: "Entrée",
  sortie: "Sortie",
  ajustement: "Ajustement",
};

export type StockAlertLevel = "ok" | "low" | "critical";

export function stockAlertLevel(item: StockItem): StockAlertLevel {
  if (item.quantity <= 0) return "critical";
  if (item.quantity <= item.threshold * 0.5) return "critical";
  if (item.quantity <= item.threshold) return "low";
  return "ok";
}

export const STOCK_ALERT_LABELS: Record<StockAlertLevel, string> = {
  ok: "Suffisant",
  low: "Stock bas",
  critical: "Critique",
};

export const STOCK_ALERT_COLORS: Record<StockAlertLevel, "green" | "amber" | "red"> = {
  ok: "green",
  low: "amber",
  critical: "red",
};

export function formatStockTimestamp(date: Date): string {
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const INITIAL_STOCK_ITEMS: StockItem[] = [
  {
    id: "stk-001",
    article: "Produits laitiers",
    category: "Cantine",
    quantity: 2,
    unit: "kg",
    threshold: 15,
    owner: "Admin stocks",
    updatedAt: "30 mai 2025, 08:12",
  },
  {
    id: "stk-002",
    article: "Cahiers A4",
    category: "Bureautique",
    quantity: 75,
    unit: "pcs",
    threshold: 40,
    owner: "Admin stocks",
    updatedAt: "29 mai 2025, 15:40",
  },
  {
    id: "stk-003",
    article: "Gants hygiène",
    category: "Hygiène",
    quantity: 140,
    unit: "pcs",
    threshold: 60,
    owner: "Admin stocks",
    updatedAt: "28 mai 2025, 11:05",
  },
  {
    id: "stk-004",
    article: "Matériel sportif",
    category: "Extra",
    quantity: 7,
    unit: "pcs",
    threshold: 10,
    owner: "Admin Principal",
    updatedAt: "27 mai 2025, 16:20",
  },
  {
    id: "stk-005",
    article: "Riz & féculents",
    category: "Cantine",
    quantity: 48,
    unit: "kg",
    threshold: 25,
    owner: "Admin stocks",
    updatedAt: "30 mai 2025, 07:30",
  },
  {
    id: "stk-006",
    article: "Savon liquide",
    category: "Hygiène",
    quantity: 9,
    unit: "L",
    threshold: 20,
    owner: "Admin stocks",
    updatedAt: "30 mai 2025, 09:02",
  },
];

export const INITIAL_STOCK_MOVEMENTS: StockMovement[] = [
  {
    id: "mv-001",
    at: "30 mai 2025, 09:02",
    itemId: "stk-006",
    article: "Savon liquide",
    type: "sortie",
    quantity: 6,
    unit: "L",
    balanceAfter: 9,
    actor: "M. Hamid Zerrouki",
    note: "Réapprovisionnement sanitaires étage 1",
  },
  {
    id: "mv-002",
    at: "30 mai 2025, 08:12",
    itemId: "stk-001",
    article: "Produits laitiers",
    type: "sortie",
    quantity: 28,
    unit: "kg",
    balanceAfter: 2,
    actor: "M. Hamid Zerrouki",
    note: "Repas du midi — 47 couverts",
  },
  {
    id: "mv-003",
    at: "30 mai 2025, 07:30",
    itemId: "stk-005",
    article: "Riz & féculents",
    type: "entree",
    quantity: 50,
    unit: "kg",
    balanceAfter: 48,
    actor: "M. Djelloul Karim",
    note: "Livraison Cantine El Baraka — BC-2025-041",
  },
  {
    id: "mv-004",
    at: "29 mai 2025, 15:40",
    itemId: "stk-002",
    article: "Cahiers A4",
    type: "sortie",
    quantity: 45,
    unit: "pcs",
    balanceAfter: 75,
    actor: "Mme Samira Haddad",
    note: "Distribution salles de soutien",
  },
  {
    id: "mv-005",
    at: "28 mai 2025, 11:05",
    itemId: "stk-003",
    article: "Gants hygiène",
    type: "entree",
    quantity: 200,
    unit: "pcs",
    balanceAfter: 140,
    actor: "M. Djelloul Karim",
    note: "Livraison Clean Pro Services",
  },
];

export function nextMovementId(): string {
  return `mv-${Date.now()}`;
}
