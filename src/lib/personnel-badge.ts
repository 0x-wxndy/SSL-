import {
  INITIAL_BADGE_ACCESS,
  type BadgeAccessRecord,
} from "@/lib/badge-access-data";
import { INITIAL_STAFF, type StaffMember } from "@/lib/admin-personnel-data";

export type PersonnelBadgeProfile = {
  staff: StaffMember;
  badge: BadgeAccessRecord;
};

type Store = {
  badges: Map<string, BadgeAccessRecord>;
  staff: Map<string, StaffMember>;
};

const STORE_KEY = "__ssl_personnel_badges__";

function store(): Store {
  const holder = globalThis as typeof globalThis & { [STORE_KEY]?: Store };
  if (!holder[STORE_KEY]) {
    holder[STORE_KEY] = {
      badges: new Map(INITIAL_BADGE_ACCESS.map((b) => [b.badgeId, { ...b }])),
      staff: new Map(INITIAL_STAFF.map((s) => [s.email.toLowerCase(), { ...s }])),
    };
  }
  return holder[STORE_KEY];
}

/** Profil badge lié au compte connecté (personnel / direction) */
export function getPersonnelBadgeProfile(email: string): PersonnelBadgeProfile | null {
  const staff = store().staff.get(email.toLowerCase());
  if (!staff) return null;
  const badge = store().badges.get(staff.badgeId);
  if (!badge) return null;
  return { staff, badge };
}

export type BadgeProfilePatch = {
  phone?: string;
  holderName?: string;
  gate?: string;
  active?: boolean;
};

export function updatePersonnelBadgeProfile(
  email: string,
  patch: BadgeProfilePatch
): PersonnelBadgeProfile | null {
  const s = store();
  const key = email.toLowerCase();
  const staff = s.staff.get(key);
  if (!staff) return null;
  const badge = s.badges.get(staff.badgeId);
  if (!badge) return null;

  const nextStaff: StaffMember = {
    ...staff,
    phone: patch.phone !== undefined ? patch.phone : staff.phone,
    name: patch.holderName !== undefined ? patch.holderName : staff.name,
  };
  const nextBadge: BadgeAccessRecord = {
    ...badge,
    holderName: patch.holderName !== undefined ? patch.holderName : badge.holderName,
    gate: patch.gate !== undefined ? patch.gate : badge.gate,
    active: patch.active !== undefined ? patch.active : badge.active,
  };

  s.staff.set(key, nextStaff);
  s.badges.set(badge.badgeId, nextBadge);
  return { staff: nextStaff, badge: nextBadge };
}
