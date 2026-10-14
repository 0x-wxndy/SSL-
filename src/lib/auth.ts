import type { StaffTrack } from "@/lib/admin-rbac";

export type UserRole =
  | "parent"
  | "admin"
  | "admin2"
  | "staff"
  | "supply_manager"
  | "marketplace_admin"
  | "provider"
  | "user"
  | "alzheimer";

export type AuthPortal = "parent" | "admin" | "user" | "alzheimer";

export type ParentAccessStatus = "pending" | "active";

export type Session = {
  email: string;
  name: string;
  role: UserRole;
  /** Poste terrain pour les comptes staff */
  staffTrack?: StaffTrack;
  providerId?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  parentStatus?: ParentAccessStatus;
  parentChildName?: string;
};

export const SESSION_COOKIE = "ssl-session";
export const CAMERA_OTP_COOKIE = "ssl-camera-otp";
export const CAMERA_DEMO_OTP = "482916";

type DemoUser = {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  portal: AuthPortal;
  staffTrack?: StaffTrack;
  providerId?: string;
};

export const DEMO_USERS: DemoUser[] = [
  {
    email: "parent@ssl.dz",
    password: "parent123",
    role: "parent",
    name: "Mme Benali Meriem",
    portal: "parent",
  },
  {
    email: "admin@ssl.dz",
    password: "admin123",
    role: "admin",
    name: "Mme Hayet Laker",
    portal: "admin",
  },
  {
    email: "admin2@ssl.dz",
    password: "admin2123",
    role: "admin2",
    name: "Mme Kara Nadia",
    portal: "admin",
  },
  {
    email: "supply@ssl.dz",
    password: "supply123",
    role: "supply_manager",
    name: "M. Djelloul Karim",
    portal: "admin",
  },
  {
    email: "staff@ssl.dz",
    password: "staff123",
    role: "staff",
    staffTrack: "cuisine",
    name: "M. Hamid Zerrouki",
    portal: "admin",
  },
  {
    email: "staff2@ssl.dz",
    password: "staff2123",
    role: "staff",
    staffTrack: "accueil",
    name: "Mme Samira Haddad",
    portal: "admin",
  },
  {
    email: "staff3@ssl.dz",
    password: "staff3123",
    role: "staff",
    staffTrack: "pedagogie",
    name: "M. Youcef Mansouri",
    portal: "admin",
  },
  {
    email: "staff4@ssl.dz",
    password: "staff4123",
    role: "staff",
    staffTrack: "pedagogie",
    name: "Mme Amina Cherif",
    portal: "admin",
  },
  {
    email: "marketplace@ssl.dz",
    password: "market123",
    role: "marketplace_admin",
    name: "Mme Boudiaf Leila",
    portal: "admin",
  },
  {
    email: "user@ssl.dz",
    password: "user123",
    role: "user",
    name: "Karim B.",
    portal: "user",
    providerId: "user-001",
  },
  {
    email: "alzheimer@ssl.dz",
    password: "alzheimer123",
    role: "alzheimer",
    name: "Nadia K.",
    portal: "alzheimer",
  },
];

const ADMIN_ROLES: UserRole[] = [
  "admin",
  "admin2",
  "staff",
  "supply_manager",
  "marketplace_admin",
];

export function verifyCredentials(
  email: string,
  password: string,
  portal: AuthPortal
): Session | null {
  const user = DEMO_USERS.find((u) => u.email === email && u.password === password);
  if (!user || user.portal !== portal) return null;
  return enrichSession({
    email: user.email,
    name: user.name,
    role: user.role,
    staffTrack: user.staffTrack,
    providerId: user.providerId,
  });
}

/**
 * Normalisation d'une session, sans accès au store des dossiers : cette fonction
 * tourne aussi dans le middleware (runtime edge). Le rattachement parent/enfant est
 * résolu côté Node par `withParentAccess` puis conservé dans le cookie.
 */
export function enrichSession(session: Session): Session {
  const demo = DEMO_USERS.find((u) => u.email.toLowerCase() === session.email.toLowerCase());
  const withTrack: Session =
    session.role === "staff" && !session.staffTrack && demo?.staffTrack
      ? { ...session, staffTrack: demo.staffTrack }
      : session;

  if (withTrack.role === "parent") {
    return { ...withTrack, parentStatus: "active" };
  }
  if (withTrack.role !== "user") {
    const { parentStatus: _s, parentChildName: _c, ...rest } = withTrack;
    return rest;
  }
  return withTrack;
}

export type LinkableAccount = {
  email: string;
  name: string;
  role: UserRole;
};

/** Comptes auxquels un dossier enfant peut être rattaché */
export function listLinkableAccounts(): LinkableAccount[] {
  return DEMO_USERS.filter((u) => u.role === "user" || u.role === "parent").map((u) => ({
    email: u.email,
    name: u.name,
    role: u.role,
  }));
}

export function parseSession(raw: string | undefined): Session | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Session;
    if (!data.email || !data.role || !data.name) return null;
    return enrichSession(data);
  } catch {
    return null;
  }
}

export function canAccessParent(session: Session | null): boolean {
  if (!session) return false;
  if (session.role === "parent") return true;
  return session.role === "user" && session.parentStatus === "active";
}

export function canAccessMarketplace(session: Session | null): boolean {
  return session?.role === "user";
}

export function canAccessUser(session: Session | null): boolean {
  return session?.role === "user";
}

export function canAccessAlzheimer(session: Session | null): boolean {
  return session?.role === "alzheimer";
}

export function marketplacePublisherId(session: Session | null): string | undefined {
  if (!session) return undefined;
  return session.providerId;
}

export function canAccessAdmin(session: Session | null): boolean {
  return session !== null && ADMIN_ROLES.includes(session.role);
}

export function roleLabel(role: UserRole, staffTrack?: StaffTrack): string {
  if (role === "staff" && staffTrack) {
    const labels: Record<StaffTrack, string> = {
      cuisine: "Staff — Cuisine",
      accueil: "Staff — Accueil",
      pedagogie: "Staff — Pédagogie",
    };
    return labels[staffTrack];
  }
  const labels: Record<UserRole, string> = {
    parent: "Parent",
    admin: "Admin Principal",
    admin2: "Admin pédagogique",
    staff: "Staff opérationnel",
    supply_manager: "Admin stocks",
    marketplace_admin: "Admin marketplace",
    provider: "Prestataire",
    user: "Utilisateur",
    alzheimer: "Ateliers Alzheimer",
  };
  return labels[role];
}
