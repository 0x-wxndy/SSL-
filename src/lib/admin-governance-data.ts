import type { AdminModuleId } from "@/lib/admin-rbac";

export type AdminBackOfficeRole =
  | "admin"
  | "admin2"
  | "staff"
  | "supply_manager"
  | "marketplace_admin";

export type AdminAccount = {
  id: string;
  name: string;
  email: string;
  role: AdminBackOfficeRole;
  active: boolean;
  privileges: AdminModuleId[];
};

export type AuditLogLevel = "info" | "warn" | "security";

export type AuditLogEntry = {
  id: string;
  at: string;
  actor: string;
  action: string;
  module: string;
  detail: string;
  level: AuditLogLevel;
};

export const ADMIN_ROLE_LABELS: Record<AdminBackOfficeRole, string> = {
  admin: "Admin Principal",
  admin2: "Admin pédagogique",
  staff: "Staff opérationnel",
  supply_manager: "Admin stocks",
  marketplace_admin: "Admin marketplace",
};

export const DEFAULT_PRIVILEGES: Record<AdminBackOfficeRole, AdminModuleId[]> = {
  admin: ["school", "staff", "cameras", "partners", "marketplace", "supply", "governance", "reporting"],
  admin2: ["school", "staff", "cameras", "partners", "reporting"],
  staff: ["school", "cameras"],
  supply_manager: ["supply", "reporting"],
  marketplace_admin: ["marketplace", "reporting"],
};

export const GRANTABLE_MODULES: { id: AdminModuleId; label: string }[] = [
  { id: "school", label: "Scolarité" },
  { id: "staff", label: "Personnel interne" },
  { id: "cameras", label: "Surveillance" },
  { id: "partners", label: "Partenaires" },
  { id: "marketplace", label: "Marketplace" },
  { id: "supply", label: "Approvisionnement" },
  { id: "governance", label: "Gestion admin" },
  { id: "reporting", label: "Statistiques" },
];

export const INITIAL_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: "adm-001",
    name: "Mme Hayet Laker",
    email: "admin@ssl.dz",
    role: "admin",
    active: true,
    privileges: DEFAULT_PRIVILEGES.admin,
  },
  {
    id: "adm-002",
    name: "Mme Kara Nadia",
    email: "admin2@ssl.dz",
    role: "admin2",
    active: true,
    privileges: DEFAULT_PRIVILEGES.admin2,
  },
  {
    id: "adm-004",
    name: "M. Djelloul Karim",
    email: "supply@ssl.dz",
    role: "supply_manager",
    active: true,
    privileges: DEFAULT_PRIVILEGES.supply_manager,
  },
  {
    id: "adm-003",
    name: "M. Hamid Zerrouki",
    email: "staff@ssl.dz",
    role: "staff",
    active: true,
    privileges: DEFAULT_PRIVILEGES.staff,
  },
  {
    id: "adm-006",
    name: "Mme Samira Haddad",
    email: "staff2@ssl.dz",
    role: "staff",
    active: true,
    privileges: DEFAULT_PRIVILEGES.staff,
  },
  {
    id: "adm-007",
    name: "M. Youcef Mansouri",
    email: "staff3@ssl.dz",
    role: "staff",
    active: true,
    privileges: DEFAULT_PRIVILEGES.staff,
  },
  {
    id: "adm-008",
    name: "Mme Amina Cherif",
    email: "staff4@ssl.dz",
    role: "staff",
    active: true,
    privileges: DEFAULT_PRIVILEGES.staff,
  },
  {
    id: "adm-005",
    name: "Mme Boudiaf Leila",
    email: "marketplace@ssl.dz",
    role: "marketplace_admin",
    active: true,
    privileges: DEFAULT_PRIVILEGES.marketplace_admin,
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-001",
    at: "30 Mai 2025 · 09h14",
    actor: "Mme Hayet Laker",
    action: "Connexion",
    module: "Gestion admin",
    detail: "Connexion back-office réussie",
    level: "security",
  },
  {
    id: "log-002",
    at: "30 Mai 2025 · 09h22",
    actor: "Mme Kara Nadia",
    action: "Validation",
    module: "Scolarité",
    detail: "Dossier Khelil Yasmine — validation Admin 2",
    level: "info",
  },
  {
    id: "log-003",
    at: "30 Mai 2025 · 10h05",
    actor: "Mme Hayet Laker",
    action: "Accès caméras",
    module: "Surveillance",
    detail: "Consultation flux — zone Salles de soutien",
    level: "security",
  },
  {
    id: "log-004",
    at: "30 Mai 2025 · 11h30",
    actor: "M. Hamid Zerrouki",
    action: "Consultation",
    module: "Scolarité",
    detail: "Feuille de présence du jour",
    level: "info",
  },
  {
    id: "log-005",
    at: "30 Mai 2025 · 14h18",
    actor: "Mme Boudiaf Leila",
    action: "Modération",
    module: "Marketplace",
    detail: "Annonce signalée — garde enfants week-end",
    level: "warn",
  },
  {
    id: "log-006",
    at: "30 Mai 2025 · 16h02",
    actor: "Mme Hayet Laker",
    action: "Modification",
    module: "Personnel interne",
    detail: "Ajout membre — M. Rachid Belkacem",
    level: "info",
  },
];

export function privilegesForRole(role: AdminBackOfficeRole): AdminModuleId[] {
  return [...DEFAULT_PRIVILEGES[role]];
}
