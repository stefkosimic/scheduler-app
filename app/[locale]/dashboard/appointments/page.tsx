import { getUserAppointments } from "@/actions/appointments";

import AppointmentsData from "./appointments-data";

export default async function AppointmentsPage() {
  const { appointments } = (await getUserAppointments()) as any;
  return <AppointmentsData appointments={appointments} />;
}
