export type BadgeHolderType = "enfant" | "parent" | "staff" | "partenaire";

export type BadgeAccessRecord = {
  id: string;
  badgeId: string;
  holderName: string;
  holderType: BadgeHolderType;
  roleLabel: string;
  active: boolean;
  lastScan: string;
  gate: string;
};

export const BADGE_HOLDER_LABELS: Record<BadgeHolderType, string> = {
  enfant: "Enfant",
  parent: "Parent",
  staff: "Personnel",
  partenaire: "Partenaire scolaire",
};

export const INITIAL_BADGE_ACCESS: BadgeAccessRecord[] = [
  {
    id: "b-001",
    badgeId: "BADGE-0187",
    holderName: "Benali Adam",
    holderType: "enfant",
    roleLabel: "Élève — Pack 4",
    active: true,
    lastScan: "Aujourd'hui · 07h14",
    gate: "Entrée principale",
  },
  {
    id: "b-002",
    badgeId: "BADGE-0188",
    holderName: "Benali Lina",
    holderType: "enfant",
    roleLabel: "Élève — Pack 2",
    active: false,
    lastScan: "Hier · 16h40",
    gate: "Entrée principale",
  },
  {
    id: "b-003",
    badgeId: "PAR-0001",
    holderName: "Mme Benali Meriem",
    holderType: "parent",
    roleLabel: "Tuteur légal",
    active: true,
    lastScan: "Aujourd'hui · 07h12",
    gate: "Entrée parents",
  },
  {
    id: "b-004",
    badgeId: "STF-010",
    holderName: "M. Hamid Zerrouki",
    holderType: "staff",
    roleLabel: "Staff — Cuisine",
    active: true,
    lastScan: "Aujourd'hui · 06h55",
    gate: "Entrée personnel",
  },
  {
    id: "b-005",
    badgeId: "STF-011",
    holderName: "Mme Samira Haddad",
    holderType: "staff",
    roleLabel: "Staff — Accueil",
    active: true,
    lastScan: "Aujourd'hui · 06h50",
    gate: "Entrée principale",
  },
  {
    id: "b-006",
    badgeId: "STF-012",
    holderName: "M. Youcef Mansouri",
    holderType: "staff",
    roleLabel: "Staff — Encadrement",
    active: true,
    lastScan: "Aujourd'hui · 07h00",
    gate: "Entrée personnel",
  },
  {
    id: "b-007",
    badgeId: "STF-013",
    holderName: "Mme Amina Cherif",
    holderType: "staff",
    roleLabel: "Staff — Soutien",
    active: true,
    lastScan: "Aujourd'hui · 16h50",
    gate: "Entrée personnel",
  },
  {
    id: "b-008",
    badgeId: "PTR-008",
    holderName: "M. Rachid Belkacem",
    holderType: "partenaire",
    roleLabel: "Enseignant TP — Maths",
    active: true,
    lastScan: "Aujourd'hui · 16h55",
    gate: "Entrée partenaires",
  },
  {
    id: "b-009",
    badgeId: "PTR-009",
    holderName: "M. Karim Saadi",
    holderType: "partenaire",
    roleLabel: "Enseignant TP — Physique",
    active: true,
    lastScan: "Hier · 17h02",
    gate: "Entrée partenaires",
  },
];

export type BadgeScanLog = {
  id: string;
  at: string;
  badgeId: string;
  holderName: string;
  holderType: BadgeHolderType;
  gate: string;
  result: "Autorisé" | "Refusé";
};

export const INITIAL_BADGE_SCANS: BadgeScanLog[] = [
  {
    id: "scan-1",
    at: "07h14",
    badgeId: "BADGE-0187",
    holderName: "Benali Adam",
    holderType: "enfant",
    gate: "Entrée principale",
    result: "Autorisé",
  },
  {
    id: "scan-2",
    at: "07h12",
    badgeId: "PAR-0001",
    holderName: "Mme Benali Meriem",
    holderType: "parent",
    gate: "Entrée parents",
    result: "Autorisé",
  },
  {
    id: "scan-3",
    at: "06h55",
    badgeId: "STF-010",
    holderName: "M. Hamid Zerrouki",
    holderType: "staff",
    gate: "Entrée personnel",
    result: "Autorisé",
  },
  {
    id: "scan-4",
    at: "16h55",
    badgeId: "PTR-008",
    holderName: "M. Rachid Belkacem",
    holderType: "partenaire",
    gate: "Entrée partenaires",
    result: "Autorisé",
  },
];
