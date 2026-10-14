import {
  EMPTY_DOCUMENTS,
  INITIAL_DOSSIERS,
  INITIAL_PRESENCES,
  PACK_FORMULA_HINTS,
  childInitials,
  nextDossierBadgeId,
  packIncludesMeal,
  type ChildDossier,
  type DossierStatus,
  type PresenceRecord,
} from "@/lib/admin-school-data";

/**
 * Source de vérité (démo) pour les dossiers enfants et la feuille de présence.
 * Stocké sur globalThis afin de survivre au rechargement à chaud en développement
 * et d'être partagé entre les routes API du même processus.
 */
type SchoolStore = {
  dossiers: Map<string, ChildDossier>;
  presences: Map<string, PresenceRecord>;
};

const STORE_KEY = "__ssl_school_store__";

function store(): SchoolStore {
  const holder = globalThis as typeof globalThis & { [STORE_KEY]?: SchoolStore };
  if (!holder[STORE_KEY]) {
    holder[STORE_KEY] = {
      dossiers: new Map(INITIAL_DOSSIERS.map((d) => [d.id, { ...d }])),
      presences: new Map(INITIAL_PRESENCES.map((p) => [p.id, { ...p }])),
    };
  }
  return holder[STORE_KEY];
}

function stamp(): string {
  return new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/* ------------------------------------------------------------------ dossiers */

export function listDossiers(): ChildDossier[] {
  return Array.from(store().dossiers.values());
}

export function getDossier(id: string): ChildDossier | null {
  return store().dossiers.get(id) ?? null;
}

export type DossierInput = Partial<Omit<ChildDossier, "id">> & { name: string };

export function createDossier(input: DossierInput): ChildDossier {
  const s = store();
  const dossier: ChildDossier = {
    id: `dos-${Date.now()}`,
    name: input.name,
    birthDate: input.birthDate ?? "",
    age: input.age ?? "",
    gender: input.gender ?? "F",
    school: input.school ?? "",
    classLevel: input.classLevel ?? "",
    badgeId: input.badgeId?.trim() || nextDossierBadgeId(listDossiers()),
    parentName: input.parentName ?? "",
    parentPhone: input.parentPhone ?? "",
    parentEmail: input.parentEmail ?? "",
    parentRelation: input.parentRelation ?? "Parent",
    linkedAccountEmail: normalizeEmail(input.linkedAccountEmail ?? ""),
    emergencyName: input.emergencyName ?? "",
    emergencyPhone: input.emergencyPhone ?? "",
    allergies: input.allergies ?? "",
    medicalNotes: input.medicalNotes ?? "",
    authorizedPickup: input.authorizedPickup ?? "",
    pack: input.pack ?? "Pack 1",
    status: input.status ?? "incomplete",
    submittedAt: input.submittedAt ?? stamp(),
    notes: input.notes ?? "",
    documents: { ...EMPTY_DOCUMENTS, ...input.documents },
    physicalValidated: input.physicalValidated ?? false,
    physicalValidatedAt: input.physicalValidated ? (input.physicalValidatedAt ?? stamp()) : "",
    physicalValidatedBy: input.physicalValidated ? (input.physicalValidatedBy ?? "") : "",
  };
  s.dossiers.set(dossier.id, dossier);
  syncPresenceForDossier(dossier);
  return dossier;
}

export function updateDossier(id: string, patch: Partial<ChildDossier>): ChildDossier | null {
  const s = store();
  const current = s.dossiers.get(id);
  if (!current) return null;

  const next: ChildDossier = { ...current, ...patch, id: current.id };
  if (patch.documents) next.documents = { ...current.documents, ...patch.documents };
  if (patch.linkedAccountEmail !== undefined) {
    next.linkedAccountEmail = normalizeEmail(patch.linkedAccountEmail);
  }

  // La date/l'auteur de validation physique suivent la case à cocher
  if (patch.physicalValidated !== undefined) {
    if (patch.physicalValidated) {
      next.physicalValidatedAt = patch.physicalValidatedAt || current.physicalValidatedAt || stamp();
      next.physicalValidatedBy = patch.physicalValidatedBy || current.physicalValidatedBy || "";
    } else {
      next.physicalValidatedAt = "";
      next.physicalValidatedBy = "";
    }
  }

  s.dossiers.set(id, next);
  syncPresenceForDossier(next);
  return next;
}

export function deleteDossier(id: string): boolean {
  const s = store();
  if (!s.dossiers.delete(id)) return false;
  for (const presence of Array.from(s.presences.values())) {
    if (presence.dossierId === id) s.presences.delete(presence.id);
  }
  return true;
}

export function setDossierStatus(id: string, status: DossierStatus): ChildDossier | null {
  return updateDossier(id, { status });
}

/* ------------------------------------------------------------- rattachements */

export function listDossiersForAccount(email: string): ChildDossier[] {
  const key = normalizeEmail(email);
  if (!key) return [];
  return listDossiers().filter((d) => d.linkedAccountEmail === key);
}

export type ParentAccess = {
  status: "pending" | "active";
  childNames: string[];
};

/**
 * Détermine l'accès espace parent d'un compte à partir de ses dossiers rattachés.
 * Au moins un dossier validé suffit à ouvrir l'accès.
 */
export function parentAccessForAccount(email: string): ParentAccess | null {
  const linked = listDossiersForAccount(email);
  if (linked.length === 0) return null;
  const validated = linked.filter((d) => d.status === "validated");
  return {
    status: validated.length > 0 ? "active" : "pending",
    childNames: (validated.length > 0 ? validated : linked).map((d) => d.name),
  };
}

/** Dossiers rattachés à un compte mais pas encore validés — file d'attente admin */
export function listPendingAccountLinks(): ChildDossier[] {
  return listDossiers().filter((d) => d.linkedAccountEmail && d.status !== "validated");
}

/* ------------------------------------------------------------------ présences */

export function listPresences(): PresenceRecord[] {
  return Array.from(store().presences.values());
}

export function createPresence(
  input: Omit<PresenceRecord, "id" | "badgeId"> & { badgeId?: string }
): PresenceRecord {
  const s = store();
  const linked = input.dossierId ? s.dossiers.get(input.dossierId) : undefined;
  const record: PresenceRecord = {
    id: `pre-${Date.now()}`,
    dossierId: input.dossierId ?? "",
    name: linked?.name ?? input.name,
    badgeId: input.badgeId || linked?.badgeId || nextDossierBadgeId(listDossiers()),
    arrival: input.arrival,
    departure: input.departure,
    status: input.status,
  };
  s.presences.set(record.id, record);
  return record;
}

export function updatePresence(
  id: string,
  patch: Partial<PresenceRecord>
): PresenceRecord | null {
  const s = store();
  const current = s.presences.get(id);
  if (!current) return null;
  const next = { ...current, ...patch, id: current.id };
  s.presences.set(id, next);
  return next;
}

export function deletePresence(id: string): boolean {
  return store().presences.delete(id);
}

/** Garde le nom / badge de la feuille de présence alignés sur le dossier */
function syncPresenceForDossier(dossier: ChildDossier) {
  const s = store();
  for (const presence of Array.from(s.presences.values())) {
    if (presence.dossierId !== dossier.id) continue;
    s.presences.set(presence.id, { ...presence, name: dossier.name, badgeId: dossier.badgeId });
  }
}

/* --------------------------------------------------- vue côté espace parent */

export type ParentChildView = {
  id: string;
  badgeId: string;
  initials: string;
  name: string;
  age: string;
  level: string;
  school: string;
  package: string;
  status: DossierStatus;
  present: boolean;
  arrival: string | null;
  departure: string | null;
  meal: string | null;
  session: string | null;
  allergy: string | null;
  vaccin: string;
  tutor: string;
  phone: string;
};

export function parentChildrenForAccount(email: string): ParentChildView[] {
  const presences = listPresences();
  return listDossiersForAccount(email)
    .filter((d) => d.status === "validated")
    .map((d) => {
      const presence = presences.find((p) => p.dossierId === d.id);
      const present = presence?.status === "Présent";
      return {
        id: d.id,
        badgeId: d.badgeId,
        initials: childInitials(d.name),
        name: d.name,
        age: d.age,
        level: d.classLevel,
        school: d.school,
        package: `${d.pack} — ${PACK_FORMULA_HINTS[d.pack]}`,
        status: d.status,
        present,
        arrival: present ? (presence?.arrival ?? null) : null,
        departure: presence?.departure && presence.departure !== "—" ? presence.departure : null,
        meal: present && packIncludesMeal(d.pack) ? "Pris à 12h30" : null,
        session: PACK_FORMULA_HINTS[d.pack],
        allergy: d.allergies && d.allergies !== "Aucune" ? d.allergies : null,
        vaccin: d.documents.vaccinationRecord ? "À jour" : "À fournir",
        tutor: d.parentName,
        phone: d.parentPhone,
      };
    });
}
