import { getProfile } from "@/actions/auth";
import { Tables } from "@/types/db";

import SettingsContent from "./settings-content";

export default async function SettingsPage() {
  const { profile } = await getProfile();
  return <SettingsContent profile={profile} />;
}
