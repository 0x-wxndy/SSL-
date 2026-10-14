"use client";

import CameraMonitor from "@/components/cameras/CameraMonitor";
import { ParentPageHeader } from "@/components/parent/ParentPageHeader";
import { cameraZones } from "@/lib/parent-data";
import { useParentSession } from "@/hooks/useParentSession";

export default function ParentCamerasPage() {
  const { user } = useParentSession();
  const totalOnline = cameraZones.reduce((n, z) => n + z.feeds.filter((f) => f.online).length, 0);
  const totalFeeds = cameraZones.reduce((n, z) => n + z.feeds.length, 0);

  return (
    <div>
      <ParentPageHeader
        user={user}
        title="Surveillance — espaces SSL+++"
        subtitle={`${totalOnline}/${totalFeeds} caméras · accès protégé par code SMS`}
      />
      <CameraMonitor requireOtp />
    </div>
  );
}
