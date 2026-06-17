import type { UserRole } from "@/lib/auth";

/** ERP modules — each maps to one back-office workspace */
export type AdminModuleId =
  | "school"
  | "staff"
  | "partners"
  | "marketplace"
  | "supply"
  | "governance"
  | "reporting";

export type AdminModuleGroup = "Pédagogie" | "Plateforme" | "Logistique" | "Gouvernance";

export type AdminModule = {
  id: AdminModuleId;
  label: string;
  group: AdminModuleGroup;
  description: string;
};

export const ADMIN_MODULES: AdminModule[] = [
  {
    id: "school",
    label: "Scolarité",
    group: "Pédagogie",
    description: "Dossiers enfants, formules et feuilles de présence",
  },
  {
    id: "staff",
    label: "Personnel interne",
    group: "Pédagogie",
    description: "Équipe permanente, badges et pointage",
  },
  {
    id: "partners",
    label: "Partenaires",
    group: "Pédagogie",
    description: "Intervenants TP et extras — contrats et plannings",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    group: "Plateforme",
    description: "Annonces, prestataires et modération",
  },
  {
    id: "supply",
    label: "Approvisionnement",
    group: "Logistique",
    description: "Fournisseurs, stocks et bons de commande",
  },
  {
    id: "governance",
    label: "Rôles & accès",
    group: "Gouvernance",
    description: "Matrice des permissions par profil",
  },
  {
    id: "reporting",
    label: "Reporting",
    group: "Gouvernance",
    description: "Indicateurs et exports direction",
  },
];

export type AdminAction =
  | "view"
  | "create"
  | "edit"
  | "validate"
  | "export"
  | "configure";

/** Which modules each back-office role can open */
const ROLE_MODULES: Record<UserRole, AdminModuleId[]> = {
  admin: ["school", "staff", "partners", "marketplace", "supply", "governance", "reporting"],
  admin2: ["school", "staff", "partners"],
  staff: ["school"],
  supply_manager: ["supply"],
  marketplace_admin: ["marketplace"],
  parent: [],
  provider: [],
  user: [],
};

/** Fine-grained actions inside a module (MVP matrix) */
const ROLE_ACTIONS: Partial<Record<UserRole, Partial<Record<AdminModuleId, AdminAction[]>>>> = {
  admin: {
    school: ["view", "create", "edit", "validate", "export"],
    staff: ["view", "create", "edit", "export"],
    partners: ["view", "create", "edit", "validate", "export"],
    marketplace: ["view", "edit", "validate", "export"],
    supply: ["view", "create", "edit", "export"],
    governance: ["view", "configure"],
    reporting: ["view", "export"],
  },
  admin2: {
    school: ["view", "create", "edit", "validate"],
    staff: ["view", "edit"],
    partners: ["view", "create", "edit"],
  },
  staff: {
    school: ["view"],
  },
  supply_manager: {
    supply: ["view", "create", "edit", "export"],
  },
  marketplace_admin: {
    marketplace: ["view", "edit", "validate"],
  },
};

export type ErpRoleDefinition = {
  role: UserRole;
  title: string;
  scope: string;
  modules: string;
  actions: string;
  restrictions: string;
};

export const ERP_ROLE_DEFINITIONS: ErpRoleDefinition[] = [
  {
    role: "admin",
    title: "Directeur · Admin Principal",
    scope: "Vision globale de la structure",
    modules: "Tous les modules ERP",
    actions: "Validation finale, configuration, reporting financier",
    restrictions: "—",
  },
  {
    role: "admin2",
    title: "Responsable pédagogique · Admin 2",
    scope: "Gestion interne scolaire",
    modules: "Scolarité, Personnel, Partenaires",
    actions: "Saisie dossiers, validation niveau 1, suivi équipe",
    restrictions: "Pas de reporting direction, gouvernance ni marketplace",
  },
  {
    role: "staff",
    title: "Staff opérationnel",
    scope: "Terrain — accueil & présences",
    modules: "Scolarité (consultation)",
    actions: "Consultation présences et dossiers",
    restrictions: "Aucune validation ni export",
  },
  {
    role: "supply_manager",
    title: "Responsable approvisionnement",
    scope: "Logistique & achats",
    modules: "Approvisionnement",
    actions: "Fournisseurs, stocks, bons de commande, exports",
    restrictions: "Pas d'accès pédagogie ni gouvernance",
  },
  {
    role: "marketplace_admin",
    title: "Administrateur marketplace",
    scope: "Modération plateforme",
    modules: "Marketplace",
    actions: "Validation annonces, suspension prestataires",
    restrictions: "Pas d'accès interne scolaire ni logistique",
  },
];

export function getModulesForRole(role: UserRole): AdminModule[] {
  const ids = ROLE_MODULES[role] ?? [];
  return ADMIN_MODULES.filter((m) => ids.includes(m.id));
}

export function canAccessModule(role: UserRole, moduleId: AdminModuleId): boolean {
  return (ROLE_MODULES[role] ?? []).includes(moduleId);
}

export function canPerformAction(
  role: UserRole,
  moduleId: AdminModuleId,
  action: AdminAction
): boolean {
  return (ROLE_ACTIONS[role]?.[moduleId] ?? []).includes(action);
}

export function defaultModuleForRole(role: UserRole): AdminModuleId {
  const modules = ROLE_MODULES[role];
  return modules?.[0] ?? "school";
}

export function erpRoleTitle(role: UserRole): string {
  return ERP_ROLE_DEFINITIONS.find((r) => r.role === role)?.title ?? role;
}
