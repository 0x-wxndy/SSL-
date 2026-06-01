export const children = [
  {
    id: "SSL-2024-0187",
    badgeId: "BADGE-0187",
    initials: "AY",
    name: "Adam Benali",
    age: 12,
    level: "5ème",
    package: "Package 4 – Full Services",
    present: true,
    arrival: "07h14",
    meal: "✅ Pris à 12h30",
    session: "Mathématiques, Physique",
    allergy: "Arachides",
    vaccin: "À jour",
    tutor: "Mme Benali Meriem",
    phone: "+213 55 XX XX XX",
  },
  {
    id: "SSL-2024-0188",
    badgeId: "BADGE-0188",
    initials: "LB",
    name: "Lina Benali",
    age: 9,
    level: "CM2",
    package: "Package 2 – Après-midi",
    present: false,
    arrival: null,
    meal: null,
    session: null,
    allergy: null,
    vaccin: "À jour",
    tutor: "Mme Benali Meriem",
    phone: "+213 55 XX XX XX",
  },
] as const;

export type Child = (typeof children)[number];

export const planning = [
  { time: "7h–13h", slots: ["Matin SSL+\nRepas", "Matin SSL+\nRepas", "Matin SSL+\nRepas", "Matin SSL+\nRepas", "Matin SSL+\nRepas"], type: "brand" as const },
  { time: "15h–17h", slots: ["Révision\nMaths", "Révision\nFrançais", "—", "Révision\nPhysique", "Révision\nAnglais"], type: "accent" as const },
  { time: "17h–20h", slots: ["Soutien\nMaths", "—", "—", "Soutien\nPhys.", "—"], type: "brand" as const },
];

export const days = ["Lun", "Mar", "Mer", "Jeu", "Ven"] as const;

export type CameraFeed = {
  id: string;
  label: string;
  online: boolean;
  lastMotion: string;
};

export type CameraZone = {
  id: string;
  name: string;
  floor: string;
  area: string;
  description: string;
  activeHours: string;
  childrenPresent: number;
  mapCol: number;
  mapRow: number;
  feeds: CameraFeed[];
};

export const cameraZones: CameraZone[] = [
  {
    id: "accueil",
    name: "Hall d'accueil",
    floor: "RDC",
    area: "Entrée & badgeuse",
    description: "Contrôle d'accès, accueil matinal et remise des badges.",
    activeHours: "07h – 20h",
    childrenPresent: 4,
    mapCol: 1,
    mapRow: 1,
    feeds: [
      { id: "CAM-A1", label: "Entrée principale", online: true, lastMotion: "Il y a 2 min" },
      { id: "CAM-A2", label: "Badgeuse & vestiaire", online: true, lastMotion: "Il y a 5 min" },
    ],
  },
  {
    id: "refectoire",
    name: "Réfectoire",
    floor: "RDC",
    area: "Repas",
    description: "Espace déjeuner — allergies signalées au dossier de chaque enfant.",
    activeHours: "12h – 13h30",
    childrenPresent: 18,
    mapCol: 2,
    mapRow: 1,
    feeds: [
      { id: "CAM-R1", label: "Vue générale salle", online: true, lastMotion: "Il y a 1 min" },
    ],
  },
  {
    id: "revisions",
    name: "Salle de révisions",
    floor: "RDC",
    area: "Après-midi 15h–17h",
    description: "Collation et séances de révision encadrées (Pack 2 & 4).",
    activeHours: "15h – 17h",
    childrenPresent: 12,
    mapCol: 1,
    mapRow: 2,
    feeds: [
      { id: "CAM-REV1", label: "Zone travail A", online: true, lastMotion: "En direct" },
      { id: "CAM-REV2", label: "Zone travail B", online: true, lastMotion: "En direct" },
    ],
  },
  {
    id: "soutien",
    name: "Salles de soutien",
    floor: "1er étage",
    area: "Soutien 17h–20h",
    description: "Cours par matière — maths, français, physique, anglais.",
    activeHours: "17h – 20h",
    childrenPresent: 8,
    mapCol: 2,
    mapRow: 2,
    feeds: [
      { id: "CAM-S1", label: "Salle Maths", online: true, lastMotion: "En direct" },
      { id: "CAM-S2", label: "Salle Français", online: false, lastMotion: "Hors plage horaire" },
      { id: "CAM-S3", label: "Couloir étage", online: true, lastMotion: "Il y a 8 min" },
    ],
  },
  {
    id: "cour",
    name: "Cour extérieure",
    floor: "Extérieur",
    area: "Pause & activités",
    description: "Cour sécurisée — accès encadré, pas de sieste sur site.",
    activeHours: "11h30 – 12h · 16h – 16h30",
    childrenPresent: 6,
    mapCol: 1,
    mapRow: 3,
    feeds: [
      { id: "CAM-C1", label: "Cour principale", online: true, lastMotion: "Il y a 3 min" },
      { id: "CAM-C2", label: "Portail latéral", online: true, lastMotion: "Il y a 12 min" },
    ],
  },
];
