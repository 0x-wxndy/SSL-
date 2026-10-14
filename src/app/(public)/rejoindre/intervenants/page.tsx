import type { Metadata } from "next";
import CareerTrackPage from "@/components/careers/CareerTrackPage";

export const metadata: Metadata = {
  title: "Intervenants terrain | Rejoindre SSL+++",
};

export default function IntervenantsPage() {
  return <CareerTrackPage trackId="intervenants" />;
}
