/** Shared images — local assets in /public/assets plus verified remote fallbacks */
const q = "w=800&q=80&auto=format&fit=crop";

export const STOCK_IMAGES = {
  schooling: `https://images.unsplash.com/photo-1503676260728-1c00da094a0b?${q}`,
  homeCare: `https://images.unsplash.com/photo-1581578731548-c64695cc6952?${q}`,
  elderlyCare: "/assets/elderly-care-facilities.jpeg",
  alzheimer: "/assets/actvitealzeimer.webp",
  family: `https://images.unsplash.com/photo-1511895426328-dc8714191300?${q}`,
  childcare: `https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?${q}`,
  babysitting: "/assets/babysitting.jpg",
  meals: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?${q}`,
  concierge: `https://images.unsplash.com/photo-1450101499163-c8848c66ca85?${q}`,
  transport: `https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?${q}`,
  laundry: "/assets/repassage_et_lingerie_a_dmc.png",
  cognitiveCare: "/assets/actvitealzeimer.webp",
} as const;

export const SERVICE_CAROUSEL_IMAGES: Record<string, string> = {
  "accompagnement-scolaire": STOCK_IMAGES.schooling,
  "services-domicile": STOCK_IMAGES.homeCare,
  "accompagnement-seniors": STOCK_IMAGES.elderlyCare,
  "activites-alzheimer": STOCK_IMAGES.alzheimer,
  "aide-familiale": STOCK_IMAGES.family,
};
