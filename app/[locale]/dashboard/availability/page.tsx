import { getAvailabilitySettings } from "@/actions/auth";

import AvailabilityData from "./availability-data";

export default async function AvailabilityPage() {
  const { profile } = await getAvailabilitySettings();

  return (
    <AvailabilityData
      availability={profile.availability}
      appointment_settings={profile.appointment_settings[0]}
    />
  );
}
