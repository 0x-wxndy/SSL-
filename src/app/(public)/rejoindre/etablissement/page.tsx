import type { Metadata } from "next";
import CareerTrackPage from "@/components/careers/CareerTrackPage";

export const metadata: Metadata = {
  title: "Équipe établissement | Rejoindre SSL+++",
};

export default function EtablissementPage() {
  return <CareerTrackPage trackId="etablissement" />;
}
