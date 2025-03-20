import { getDashboardData } from "@/actions/appointments";
import DashboardData from "./dashboard-data";

export default async function DashboardPage() {
  const { profile } = await getDashboardData();

  return <DashboardData profile={profile} />;
}
