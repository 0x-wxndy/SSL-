import type { UserRole } from "@/lib/auth";
import { FEATURES } from "@/lib/constants";

/** Specialisation terrain des comptes staff (les 4 postes démo) */
export type StaffTrack = "cuisine" | "accueil" | "pedagogie";

export type AccessSubject = {
  role: UserRole;
  staffTrack?: StaffTrack;
};

/** ERP modules — each maps to one back-office workspace */
export type AdminModuleId =
  | "school"
  | "staff"
  | "cameras"
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
    id: "cameras",
    label: "Surveillance",
    group: "Pédagogie",
    description: "Flux caméras des espaces SSL+++ en temps réel",
  },
  {
    id: "partners",
    label: "Partenaires",
    group: "Pédagogie",
    description: "Intervenants par catégorie — contrats, plannings et validations",
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
    description: "Fournisseurs, stocks avec seuils d'alerte et journal horodaté",
  },
  {
    id: "governance",
    label: "Gestion admin",
    group: "Gouvernance",
    description: "Comptes administrateurs, privilèges et journal d'activité",
  },
  {
    id: "reporting",
    label: "Statistiques",
    group: "Gouvernance",
    description: "Indicateurs clés et exports direction",
  },
];

export type AdminAction =
  | "view"
  | "create"
  | "edit"
  | "validate"
  | "export"
  | "configure";

export const STAFF_TRACK_LABELS: Record<StaffTrack, string> = {
  cuisine: "Staff — Cuisine",
  accueil: "Staff — Accueil",
  pedagogie: "Staff — Pédagogie",
};

/** Modules de base par rôle (staff affiné via staffTrack) */
const ROLE_MODULES: Record<UserRole, AdminModuleId[]> = {
  admin: ["school", "staff", "cameras", "partners", "marketplace", "supply", "governance", "reporting"],
  admin2: ["school", "staff", "cameras", "partners", "reporting"],
  staff: ["school", "cameras"],
  supply_manager: ["supply", "reporting"],
  marketplace_admin: ["marketplace", "reporting"],
  parent: [],
  provider: [],
  user: [],
  alzheimer: [],
};

const STAFF_TRACK_MODULES: Record<StaffTrack, AdminModuleId[]> = {
  cuisine: ["supply", "reporting"],
  accueil: ["school", "cameras"],
  pedagogie: ["school", "staff", "cameras", "partners", "reporting"],
};

const ROLE_ACTIONS: Partial<Record<UserRole, Partial<Record<AdminModuleId, AdminAction[]>>>> = {
  admin: {
    school: ["view", "create", "edit", "validate", "export"],
    staff: ["view", "create", "edit", "export"],
    cameras: ["view"],
    partners: ["view", "create", "edit", "validate", "export"],
    marketplace: ["view", "edit", "validate", "export"],
    supply: ["view", "create", "edit", "export"],
    governance: ["view", "configure"],
    reporting: ["view", "export"],
  },
  admin2: {
    school: ["view", "create", "edit", "validate"],
    staff: ["view", "edit"],
    cameras: ["view"],
    partners: ["view", "create", "edit"],
    reporting: ["view", "export"],
  },
  staff: {
    school: ["view"],
    cameras: ["view"],
  },
  supply_manager: {
    supply: ["view", "create", "edit", "export"],
    reporting: ["view", "export"],
  },
  marketplace_admin: {
    marketplace: ["view", "edit", "validate"],
    reporting: ["view", "export"],
  },
};

/** Actions staff selon le poste — jamais de validation dossiers pour la pédagogie terrain */
const STAFF_TRACK_ACTIONS: Record<StaffTrack, Partial<Record<AdminModuleId, AdminAction[]>>> = {
  cuisine: {
    supply: ["view", "create", "edit"],
    reporting: ["view"],
  },
  accueil: {
    school: ["view", "create", "edit"],
    cameras: ["view"],
  },
  pedagogie: {
    school: ["view", "create", "edit"],
    staff: ["view"],
    cameras: ["view"],
    partners: ["view", "create", "edit"],
    reporting: ["view"],
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
    title: "Admin pédagogique · Volet scolaire",
    scope: "Procédures pédagogiques & dossiers enfants",
    modules: "Scolarité, Personnel, Surveillance, Partenaires, Statistiques",
    actions: "Saisie dossiers, validation niveau 1, suivi équipe, analytics",
    restrictions: "Pas de stocks, marketplace, ni gestion des comptes admin",
  },
  {
    role: "staff",
    title: "Staff opérationnel (4 postes)",
    scope: "Cuisine · Accueil · Encadrement / Soutien",
    modules: "Selon le poste (stocks OU scolarité / partenaires)",
    actions: "Cuisine = stocks · Accueil = présences · Pédagogie = dossiers sans validation",
    restrictions: "Aucun staff ne valide les dossiers · pas de Gestion admin",
  },
  {
    role: "supply_manager",
    title: "Admin stocks · Volet scolaire",
    scope: "Cantine, fournitures et réserves du site",
    modules: "Approvisionnement, Statistiques (stocks)",
    actions: "Fournisseurs, stocks, bons de commande, analytics stocks",
    restrictions: "Pas d'accès validation dossiers ni gestion des comptes admin",
  },
  {
    role: "marketplace_admin",
    title: "Administrateur marketplace",
    scope: "Modération plateforme",
    modules: "Marketplace, Statistiques (annonces)",
    actions: "Validation annonces, suspension prestataires, analytics marketplace",
    restrictions: "Pas d'accès interne scolaire ni logistique, ni gestion des comptes admin",
  },
];

function asSubject(subject: AccessSubject | UserRole): AccessSubject {
  return typeof subject === "string" ? { role: subject } : subject;
}

function moduleIdsFor(subject: AccessSubject): AdminModuleId[] {
  if (subject.role === "staff") {
    return STAFF_TRACK_MODULES[subject.staffTrack ?? "accueil"] ?? STAFF_TRACK_MODULES.accueil;
  }
  return ROLE_MODULES[subject.role] ?? [];
}

function actionsFor(subject: AccessSubject, moduleId: AdminModuleId): AdminAction[] {
  if (subject.role === "staff") {
    const track = subject.staffTrack ?? "accueil";
    return STAFF_TRACK_ACTIONS[track]?.[moduleId] ?? [];
  }
  return ROLE_ACTIONS[subject.role]?.[moduleId] ?? [];
}

export function getModulesForRole(subject: AccessSubject | UserRole): AdminModule[] {
  const ids = moduleIdsFor(asSubject(subject));
  return ADMIN_MODULES.filter((m) => {
    if (!ids.includes(m.id)) return false;
    if (m.id === "marketplace" && !FEATURES.marketplace) return false;
    return true;
  });
}

export function canAccessModule(
  subject: AccessSubject | UserRole,
  moduleId: AdminModuleId
): boolean {
  if (moduleId === "marketplace" && !FEATURES.marketplace) return false;
  return moduleIdsFor(asSubject(subject)).includes(moduleId);
}

export function canPerformAction(
  subject: AccessSubject | UserRole,
  moduleId: AdminModuleId,
  action: AdminAction
): boolean {
  return actionsFor(asSubject(subject), moduleId).includes(action);
}

export function defaultModuleForRole(subject: AccessSubject | UserRole): AdminModuleId {
  return moduleIdsFor(asSubject(subject))[0] ?? "school";
}

export function erpRoleTitle(subject: AccessSubject | UserRole): string {
  const s = asSubject(subject);
  if (s.role === "staff" && s.staffTrack) {
    return STAFF_TRACK_LABELS[s.staffTrack];
  }
  return ERP_ROLE_DEFINITIONS.find((r) => r.role === s.role)?.title ?? s.role;
}

export function accessSubjectFromSession(session: {
  role: UserRole;
  staffTrack?: StaffTrack;
}): AccessSubject {
  return { role: session.role, staffTrack: session.staffTrack };
}
