import { enrichSession, type Session } from "@/lib/auth";
import { parentAccessForAccount } from "@/lib/school-dossiers";

/**
 * Résout l'accès espace parent depuis les dossiers rattachés au compte.
 * À n'utiliser que côté Node (routes API) — le middleware edge ne voit pas le store.
 */
export function withParentAccess(session: Session): Session {
  const base = enrichSession(session);
  const access = parentAccessForAccount(base.email);

  if (base.role === "parent") {
    return access
      ? { ...base, parentStatus: "active", parentChildName: access.childNames.join(", ") }
      : base;
  }
  if (base.role !== "user") return base;

  if (!access) {
    const { parentStatus: _s, parentChildName: _c, ...rest } = base;
    return rest;
  }
  return {
    ...base,
    parentStatus: access.status,
    parentChildName: access.childNames.join(", "),
  };
}
