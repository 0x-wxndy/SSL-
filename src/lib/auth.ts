export type UserRole = "parent" | "admin" | "admin2" | "staff" | "provider" | "user";

export type AuthPortal = "parent" | "admin" | "marketplace" | "user";

export type Session = {
  email: string;
  name: string;
  role: UserRole;
  providerId?: string;
};

export const SESSION_COOKIE = "ssl-session";
export const CAMERA_OTP_COOKIE = "ssl-camera-otp";
export const CAMERA_DEMO_OTP = "482916";

export const DEMO_USERS = [
  {
    email: "parent@ssl.dz",
    password: "parent123",
    role: "parent" as const,
    name: "Mme Benali Meriem",
    portal: "parent" as const,
  },
  {
    email: "admin@ssl.dz",
    password: "admin123",
    role: "admin" as const,
    name: "Mme Amrani Soraya",
    portal: "admin" as const,
  },
  {
    email: "admin2@ssl.dz",
    password: "admin2123",
    role: "admin2" as const,
    name: "Mme Kara Nadia",
    portal: "admin" as const,
  },
  {
    email: "staff@ssl.dz",
    password: "staff123",
    role: "staff" as const,
    name: "M. Hamid Zerrouki",
    portal: "admin" as const,
  },
  {
    email: "prestataire@ssl.dz",
    password: "market123",
    role: "provider" as const,
    name: "Fatima Zohra K.",
    portal: "marketplace" as const,
    providerId: "prov-001",
  },
  {
    email: "user@ssl.dz",
    password: "user123",
    role: "user" as const,
    name: "Karim B.",
    portal: "user" as const,
  },
];

const ADMIN_ROLES: UserRole[] = ["admin", "admin2", "staff"];

export function verifyCredentials(
  email: string,
  password: string,
  portal: AuthPortal
): Session | null {
  const user = DEMO_USERS.find((u) => u.email === email && u.password === password);
  if (!user || user.portal !== portal) return null;
  return {
    email: user.email,
    name: user.name,
    role: user.role,
    providerId: "providerId" in user ? user.providerId : undefined,
  };
}

export function parseSession(raw: string | undefined): Session | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Session;
    if (!data.email || !data.role || !data.name) return null;
    return data;
  } catch {
    return null;
  }
}

export function canAccessParent(session: Session | null): boolean {
  return session?.role === "parent";
}

export function canAccessMarketplace(session: Session | null): boolean {
  return session?.role === "provider";
}

export function canAccessUser(session: Session | null): boolean {
  return session?.role === "user";
}

export function canAccessAdmin(session: Session | null): boolean {
  return session !== null && ADMIN_ROLES.includes(session.role);
}

export function roleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    parent: "Parent",
    admin: "Admin Principal",
    admin2: "Admin Secondaire",
    staff: "Staff",
    provider: "Prestataire",
    user: "Utilisateur",
  };
  return labels[role];
}
