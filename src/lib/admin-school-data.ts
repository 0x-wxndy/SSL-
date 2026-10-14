export type PackFormula = "Pack 1" | "Pack 2" | "Pack 3" | "Pack 4";

export type DossierStatus = "validated" | "pending_admin2" | "incomplete";

export type ChildGender = "F" | "M" | "Autre";

/** Pièces attendues dans le dossier physique */
export type DossierDocuments = {
  birthCertificate: boolean;
  identityPhoto: boolean;
  medicalCertificate: boolean;
  vaccinationRecord: boolean;
  schoolAttestation: boolean;
  photoAuthorization: boolean;
  outingAuthorization: boolean;
  parentalConsent: boolean;
};

export type ChildDossier = {
  id: string;
  /** Identité enfant */
  name: string;
  birthDate: string;
  age: string;
  gender: ChildGender;
  school: string;
  classLevel: string;
  badgeId: string;
  /** Parent / tuteur principal */
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  parentRelation: string;
  /**
   * Compte plateforme auquel l'enfant est rattaché. Vide = dossier non rattaché :
   * le parent n'aura aucun accès à l'espace parent tant qu'un compte n'est pas lié.
   * Plusieurs dossiers peuvent partager le même compte (fratrie).
   */
  linkedAccountEmail: string;
  /** Contact d'urgence */
  emergencyName: string;
  emergencyPhone: string;
  /** Santé & sécurité */
  allergies: string;
  medicalNotes: string;
  authorizedPickup: string;
  /** Formule & suivi admin */
  pack: PackFormula;
  status: DossierStatus;
  submittedAt: string;
  notes: string;
  /** Checklist pièces du dossier papier */
  documents: DossierDocuments;
  /** Confirmation réception / conformité du dossier physique */
  physicalValidated: boolean;
  physicalValidatedAt: string;
  physicalValidatedBy: string;
};

export type PresenceRecord = {
  id: string;
  /** Dossier rattaché — vide si la ligne a été saisie à la main */
  dossierId: string;
  name: string;
  badgeId: string;
  arrival: string;
  departure: string;
  status: "Présent" | "Absent";
};

export const PACK_FORMULAS: PackFormula[] = ["Pack 1", "Pack 2", "Pack 3", "Pack 4"];

export const PACK_FORMULA_HINTS: Record<PackFormula, string> = {
  "Pack 1": "Formule Matin · 07h–13h",
  "Pack 2": "Formule Après-midi · 15h–17h",
  "Pack 3": "Formule Soutien · 17h–20h",
  "Pack 4": "Formule Journée complète · 07h–20h",
};

export const DOSSIER_STATUS_LABELS: Record<DossierStatus, string> = {
  validated: "Validé Admin 1",
  pending_admin2: "Admin 2 — en attente",
  incomplete: "Incomplet",
};

export const DOSSIER_STATUS_COLORS: Record<DossierStatus, "green" | "amber" | "red"> = {
  validated: "green",
  pending_admin2: "amber",
  incomplete: "red",
};

export const DOCUMENT_FIELD_LABELS: { key: keyof DossierDocuments; label: string }[] = [
  { key: "birthCertificate", label: "Extrait / acte de naissance" },
  { key: "identityPhoto", label: "Photo d'identité récente" },
  { key: "medicalCertificate", label: "Certificat médical d'aptitude" },
  { key: "vaccinationRecord", label: "Carnet de vaccination" },
  { key: "schoolAttestation", label: "Attestation de scolarité" },
  { key: "photoAuthorization", label: "Autorisation photo / image" },
  { key: "outingAuthorization", label: "Autorisation de sortie encadrée" },
  { key: "parentalConsent", label: "Consentement parental signé" },
];

export const EMPTY_DOCUMENTS: DossierDocuments = {
  birthCertificate: false,
  identityPhoto: false,
  medicalCertificate: false,
  vaccinationRecord: false,
  schoolAttestation: false,
  photoAuthorization: false,
  outingAuthorization: false,
  parentalConsent: false,
};

export function documentsComplete(docs: DossierDocuments): boolean {
  return DOCUMENT_FIELD_LABELS.every(({ key }) => docs[key]);
}

export function documentsProgress(docs: DossierDocuments): { done: number; total: number } {
  const total = DOCUMENT_FIELD_LABELS.length;
  const done = DOCUMENT_FIELD_LABELS.filter(({ key }) => docs[key]).length;
  return { done, total };
}

export const INITIAL_DOSSIERS: ChildDossier[] = [
  {
    id: "dos-001",
    name: "Benali Adam",
    birthDate: "12/03/2013",
    age: "12 ans",
    gender: "M",
    school: "CEM Ibn Khaldoun — Hydra",
    classLevel: "4e AM",
    badgeId: "BADGE-0187",
    parentName: "Mme Benali Meriem",
    parentPhone: "+213 555 01 02 03",
    parentEmail: "parent@ssl.dz",
    parentRelation: "Mère",
    linkedAccountEmail: "parent@ssl.dz",
    emergencyName: "M. Benali Karim",
    emergencyPhone: "+213 555 01 02 04",
    allergies: "Aucune",
    medicalNotes: "—",
    authorizedPickup: "Mme Benali Meriem, M. Benali Karim",
    pack: "Pack 4",
    status: "validated",
    submittedAt: "12 Mai 2025",
    notes: "Inscription journée complète — badge parent + enfant actifs",
    documents: {
      birthCertificate: true,
      identityPhoto: true,
      medicalCertificate: true,
      vaccinationRecord: true,
      schoolAttestation: true,
      photoAuthorization: true,
      outingAuthorization: true,
      parentalConsent: true,
    },
    physicalValidated: true,
    physicalValidatedAt: "13 Mai 2025",
    physicalValidatedBy: "Mme Hayet Laker",
  },
  {
    id: "dos-002",
    name: "Khelil Yasmine",
    birthDate: "04/09/2017",
    age: "8 ans",
    gender: "F",
    school: "École primaire El Amel — Kouba",
    classLevel: "3e AP",
    badgeId: "BADGE-0192",
    parentName: "Mme Khelil Amel",
    parentPhone: "+213 555 11 22 33",
    parentEmail: "amel.khelil@email.dz",
    parentRelation: "Mère",
    linkedAccountEmail: "",
    emergencyName: "Mme Saadi Nora",
    emergencyPhone: "+213 555 11 22 44",
    allergies: "Arachides",
    medicalNotes: "Stylo d'adrénaline remis à l'accueil",
    authorizedPickup: "Mme Khelil Amel, Mme Saadi Nora",
    pack: "Pack 2",
    status: "pending_admin2",
    submittedAt: "26 Mai 2025",
    notes: "Attente validation Admin pédagogique",
    documents: {
      birthCertificate: true,
      identityPhoto: true,
      medicalCertificate: true,
      vaccinationRecord: true,
      schoolAttestation: true,
      photoAuthorization: true,
      outingAuthorization: false,
      parentalConsent: true,
    },
    physicalValidated: false,
    physicalValidatedAt: "",
    physicalValidatedBy: "",
  },
  {
    id: "dos-003",
    name: "Merzougui Samir",
    birthDate: "21/11/2010",
    age: "15 ans",
    gender: "M",
    school: "Lycée Emir Abdelkader — Alger Centre",
    classLevel: "2e AS",
    badgeId: "BADGE-0201",
    parentName: "M. Merzougui Farid",
    parentPhone: "+213 555 44 55 66",
    parentEmail: "f.merzougui@email.dz",
    parentRelation: "Père",
    linkedAccountEmail: "",
    emergencyName: "Mme Merzougui Leila",
    emergencyPhone: "+213 555 44 55 67",
    allergies: "Aucune",
    medicalNotes: "Port de lunettes",
    authorizedPickup: "M. Merzougui Farid, Mme Merzougui Leila",
    pack: "Pack 3",
    status: "pending_admin2",
    submittedAt: "27 Mai 2025",
    notes: "Soutien maths / physique le soir",
    documents: {
      birthCertificate: true,
      identityPhoto: true,
      medicalCertificate: true,
      vaccinationRecord: false,
      schoolAttestation: true,
      photoAuthorization: true,
      outingAuthorization: true,
      parentalConsent: true,
    },
    physicalValidated: false,
    physicalValidatedAt: "",
    physicalValidatedBy: "",
  },
  {
    id: "dos-004",
    name: "Hadj Fatima",
    birthDate: "15/06/2015",
    age: "10 ans",
    gender: "F",
    school: "École primaire Les Glycines — Ben Aknoun",
    classLevel: "5e AP",
    badgeId: "BADGE-0205",
    parentName: "Mme Hadj Samira",
    parentPhone: "+213 555 77 88 99",
    parentEmail: "s.hadj@email.dz",
    parentRelation: "Mère",
    linkedAccountEmail: "",
    emergencyName: "",
    emergencyPhone: "",
    allergies: "Lactose",
    medicalNotes: "",
    authorizedPickup: "Mme Hadj Samira",
    pack: "Pack 1",
    status: "incomplete",
    submittedAt: "25 Mai 2025",
    notes: "Manque certificat médical et contact d'urgence",
    documents: {
      birthCertificate: true,
      identityPhoto: true,
      medicalCertificate: false,
      vaccinationRecord: false,
      schoolAttestation: true,
      photoAuthorization: false,
      outingAuthorization: false,
      parentalConsent: true,
    },
    physicalValidated: false,
    physicalValidatedAt: "",
    physicalValidatedBy: "",
  },
  /** Fratrie — rattachée au même compte parent que dos-001 */
  {
    id: "dos-005",
    name: "Benali Lina",
    birthDate: "08/02/2016",
    age: "9 ans",
    gender: "F",
    school: "École primaire Ibn Sina — Hydra",
    classLevel: "CM2",
    badgeId: "BADGE-0188",
    parentName: "Mme Benali Meriem",
    parentPhone: "+213 555 01 02 03",
    parentEmail: "parent@ssl.dz",
    parentRelation: "Mère",
    linkedAccountEmail: "parent@ssl.dz",
    emergencyName: "M. Benali Karim",
    emergencyPhone: "+213 555 01 02 04",
    allergies: "Aucune",
    medicalNotes: "—",
    authorizedPickup: "Mme Benali Meriem, M. Benali Karim",
    pack: "Pack 2",
    status: "validated",
    submittedAt: "12 Mai 2025",
    notes: "Sœur d'Adam Benali — même compte parent",
    documents: {
      birthCertificate: true,
      identityPhoto: true,
      medicalCertificate: true,
      vaccinationRecord: true,
      schoolAttestation: true,
      photoAuthorization: true,
      outingAuthorization: true,
      parentalConsent: true,
    },
    physicalValidated: true,
    physicalValidatedAt: "13 Mai 2025",
    physicalValidatedBy: "Mme Hayet Laker",
  },
];

export const INITIAL_PRESENCES: PresenceRecord[] = [
  {
    id: "pre-001",
    dossierId: "dos-001",
    name: "Benali Adam",
    badgeId: "BADGE-0187",
    arrival: "07h14",
    departure: "—",
    status: "Présent",
  },
  {
    id: "pre-002",
    dossierId: "dos-002",
    name: "Khelil Yasmine",
    badgeId: "BADGE-0192",
    arrival: "15h01",
    departure: "—",
    status: "Présent",
  },
  {
    id: "pre-003",
    dossierId: "dos-003",
    name: "Merzougui Samir",
    badgeId: "BADGE-0201",
    arrival: "17h05",
    departure: "—",
    status: "Présent",
  },
  {
    id: "pre-004",
    dossierId: "dos-005",
    name: "Benali Lina",
    badgeId: "BADGE-0188",
    arrival: "—",
    departure: "—",
    status: "Absent",
  },
];

function formatBadgeId(nums: number[]): string {
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `BADGE-${String(next).padStart(4, "0")}`;
}

function badgeNumbers(ids: string[]): number[] {
  return ids.map((id) => parseInt(id.replace(/\D/g, ""), 10)).filter((n) => !Number.isNaN(n));
}

export function nextBadgeId(records: PresenceRecord[]): string {
  return formatBadgeId(badgeNumbers(records.map((r) => r.badgeId)));
}

export function nextDossierBadgeId(dossiers: ChildDossier[]): string {
  return formatBadgeId(badgeNumbers(dossiers.map((d) => d.badgeId)));
}

export function childInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Les formules couvrant la matinée incluent le repas de midi */
export function packIncludesMeal(pack: PackFormula): boolean {
  return pack === "Pack 1" || pack === "Pack 4";
}

export function packColor(pack: PackFormula): "green" | "amber" {
  return pack === "Pack 2" ? "amber" : "green";
}
