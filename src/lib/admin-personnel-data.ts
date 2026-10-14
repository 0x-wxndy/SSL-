export type StaffAccessLevel = "Admin Principal" | "Admin pédagogique" | "Admin stocks" | "Staff" | "Partenaire";

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  accessLevel: StaffAccessLevel;
  badgeId: string;
  email: string;
  phone: string;
  presence: "Présent" | "Absent";
  clockIn: string;
};

export const STAFF_ACCESS_LEVELS: StaffAccessLevel[] = [
  "Admin Principal",
  "Admin pédagogique",
  "Admin stocks",
  "Staff",
  "Partenaire",
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: "stf-001",
    name: "Mme Hayet Laker",
    role: "Direction",
    accessLevel: "Admin Principal",
    badgeId: "STF-001",
    email: "admin@ssl.dz",
    phone: "+213 555 10 01 01",
    presence: "Présent",
    clockIn: "07h02",
  },
  {
    id: "stf-002",
    name: "Mme Kara Nadia",
    role: "Admin pédagogique — dossiers & procédures",
    accessLevel: "Admin pédagogique",
    badgeId: "STF-002",
    email: "admin2@ssl.dz",
    phone: "+213 555 10 02 02",
    presence: "Présent",
    clockIn: "07h10",
  },
  {
    id: "stf-003",
    name: "M. Djelloul Karim",
    role: "Admin stocks — cantine & fournitures",
    accessLevel: "Admin stocks",
    badgeId: "STF-003",
    email: "supply@ssl.dz",
    phone: "+213 555 10 03 03",
    presence: "Présent",
    clockIn: "07h05",
  },
  {
    id: "stf-010",
    name: "M. Hamid Zerrouki",
    role: "Staff — Cuisine",
    accessLevel: "Staff",
    badgeId: "STF-010",
    email: "staff@ssl.dz",
    phone: "+213 555 10 10 10",
    presence: "Présent",
    clockIn: "06h55",
  },
  {
    id: "stf-011",
    name: "Mme Samira Haddad",
    role: "Staff — Accueil",
    accessLevel: "Staff",
    badgeId: "STF-011",
    email: "staff2@ssl.dz",
    phone: "+213 555 10 11 11",
    presence: "Présent",
    clockIn: "06h50",
  },
  {
    id: "stf-012",
    name: "M. Youcef Mansouri",
    role: "Staff — Encadrement",
    accessLevel: "Staff",
    badgeId: "STF-012",
    email: "staff3@ssl.dz",
    phone: "+213 555 10 12 12",
    presence: "Présent",
    clockIn: "07h00",
  },
  {
    id: "stf-013",
    name: "Mme Amina Cherif",
    role: "Staff — Soutien scolaire",
    accessLevel: "Staff",
    badgeId: "STF-013",
    email: "staff4@ssl.dz",
    phone: "+213 555 10 13 13",
    presence: "Présent",
    clockIn: "16h50",
  },
  {
    id: "stf-008",
    name: "M. Rachid Belkacem",
    role: "Enseignant Maths (TP)",
    accessLevel: "Partenaire",
    badgeId: "PTR-008",
    email: "r.belkacem@ssl.dz",
    phone: "+213 555 10 08 08",
    presence: "Présent",
    clockIn: "16h55",
  },
];

export function nextStaffBadgeId(members: StaffMember[]): string {
  const nums = members
    .map((m) => parseInt(m.badgeId.replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `STF-${String(next).padStart(3, "0")}`;
}
