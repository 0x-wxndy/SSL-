import type { Metadata } from "next";
import CareerTrackPage from "@/components/careers/CareerTrackPage";

export const metadata: Metadata = {
  title: "Coordination & siège | Rejoindre SSL+++",
};

export default function CoordinationPage() {
  return <CareerTrackPage trackId="coordination" />;
}
