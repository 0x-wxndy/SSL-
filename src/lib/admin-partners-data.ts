export type PartnerCategoryId =
  | "enseignants"
  | "sante"
  | "extras"
  | "transport"
  | "fournisseurs";

export type PartnerContractStatus = "validated" | "pending" | "expired";

export type Partner = {
  id: string;
  name: string;
  category: PartnerCategoryId;
  specialty: string;
  planning: string;
  status: PartnerContractStatus;
  credentials: string;
  phone: string;
  enteredBy: string;
};

export const PARTNER_CATEGORIES: { id: PartnerCategoryId; label: string; description: string }[] = [
  {
    id: "enseignants",
    label: "Enseignants TP",
    description: "Cours de soutien par matière — vacations du soir",
  },
  {
    id: "sante",
    label: "Santé & paramédical",
    description: "Suivi médical, psychologie et protocoles Alzheimer",
  },
  {
    id: "extras",
    label: "Intervenants extras",
    description: "Événements, ateliers et animations ponctuelles",
  },
  {
    id: "transport",
    label: "Transport & accompagnement",
    description: "Navettes école, sorties encadrées",
  },
  {
    id: "fournisseurs",
    label: "Prestataires site",
    description: "Entretien, maintenance et services au site",
  },
];

export const PARTNER_STATUS_LABELS: Record<PartnerContractStatus, string> = {
  validated: "Contrat validé",
  pending: "En validation",
  expired: "Contrat expiré",
};

export const PARTNER_STATUS_COLORS: Record<PartnerContractStatus, "green" | "amber" | "red"> = {
  validated: "green",
  pending: "amber",
  expired: "red",
};

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: "ptr-001",
    name: "M. Rachid Belkacem",
    category: "enseignants",
    specialty: "Mathématiques",
    planning: "Lun, Mer, Ven · 17h–20h",
    status: "validated",
    credentials: "Master Mathématiques",
    phone: "+213 555 10 08 08",
    enteredBy: "Admin pédagogique",
  },
  {
    id: "ptr-002",
    name: "M. Karim Saadi",
    category: "enseignants",
    specialty: "Physique",
    planning: "Mar, Jeu · 17h–20h",
    status: "validated",
    credentials: "Licence Physique",
    phone: "+213 555 10 09 09",
    enteredBy: "Admin pédagogique",
  },
  {
    id: "ptr-003",
    name: "Mme Sarah Meddour",
    category: "enseignants",
    specialty: "Français & Anglais",
    planning: "Sam · 09h–13h",
    status: "pending",
    credentials: "Licence Lettres",
    phone: "+213 555 10 14 14",
    enteredBy: "Admin pédagogique",
  },
  {
    id: "ptr-004",
    name: "Dr. Nadia Hamidi",
    category: "sante",
    specialty: "Psychologue — protocoles Alzheimer",
    planning: "Mer · 10h–14h",
    status: "validated",
    credentials: "Doctorat Psychologie clinique",
    phone: "+213 555 66 55 44",
    enteredBy: "Admin Principal",
  },
  {
    id: "ptr-005",
    name: "Mme Halima Bouzid",
    category: "sante",
    specialty: "Infirmière — visites de contrôle",
    planning: "Ven · 08h–12h",
    status: "pending",
    credentials: "Diplôme d'État Infirmier",
    phone: "+213 555 11 99 00",
    enteredBy: "Admin pédagogique",
  },
  {
    id: "ptr-006",
    name: "Mme Leila Boudiaf",
    category: "extras",
    specialty: "Ateliers événementiels",
    planning: "Vacances — Juillet",
    status: "pending",
    credentials: "CAP Petite Enfance",
    phone: "+213 555 22 33 44",
    enteredBy: "Admin pédagogique",
  },
  {
    id: "ptr-007",
    name: "M. Salim Hadjadj",
    category: "transport",
    specialty: "Navette école — secteur Hydra",
    planning: "Lun–Ven · 07h–08h / 16h–17h",
    status: "validated",
    credentials: "Permis D + agrément transport scolaire",
    phone: "+213 555 77 33 22",
    enteredBy: "Admin Principal",
  },
  {
    id: "ptr-008",
    name: "Clean Pro Services",
    category: "fournisseurs",
    specialty: "Entretien des locaux",
    planning: "Quotidien · 20h–22h",
    status: "expired",
    credentials: "Registre de commerce",
    phone: "+213 555 44 11 66",
    enteredBy: "Admin stocks",
  },
];

export function partnerCategoryLabel(id: PartnerCategoryId): string {
  return PARTNER_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
