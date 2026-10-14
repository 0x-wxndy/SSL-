"use client";

import { PLATFORM_SERVICES } from "@/lib/constants";
import VoletCard from "@/components/public/VoletCard";

export default function ServicesCarousel() {
  return (
    <div className="grid gap-5 sm:grid-cols-3 sm:items-stretch sm:gap-6 lg:gap-7">
      {PLATFORM_SERVICES.map((service) => (
        <VoletCard key={service.id} service={service} />
      ))}
    </div>
  );
}
