import AppointmentsData from "./appointments-data";
import { getUserAppointments } from "@/actions/appointments";

export default async function AppointmentsPage() {
  const { appointments } = (await getUserAppointments()) as any;
  return <AppointmentsData appointments={appointments} />;
}
