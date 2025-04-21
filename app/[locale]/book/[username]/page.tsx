import { getBookingData } from "@/actions/booking";

import BookingData from "./booking-data";

export default async function BookingPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const provider = (await getBookingData(username)) as any;

  return <BookingData provider={provider} />;
}
