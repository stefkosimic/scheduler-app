import { Tables } from "@/types/db";
import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { twMerge } from "tailwind-merge";

dayjs.extend(utc);
dayjs.extend(timezone);

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateTimeSlots = (
  workingHours: Tables<"availability">,
  settings: Tables<"appointment_settings">,
  bookedAppointments: Tables<"appointments">[],
  selectedDate: dayjs.Dayjs
): string[] => {
  if (!workingHours || !settings) return [];

  const { start_time, end_time } = workingHours;
  const { duration, buffer, max_per_day } = settings;

  // Parse start and end times for the selected date
  const startTime = selectedDate
    .set("hour", parseInt(start_time.split(":")[0]))
    .set("minute", parseInt(start_time.split(":")[1]))
    .set("second", 0);
  const endTime = selectedDate
    .set("hour", parseInt(end_time.split(":")[0]))
    .set("minute", parseInt(end_time.split(":")[1]))
    .set("second", 0);

  // Get booked slots for the selected date
  const bookedSlots = bookedAppointments
    .filter((appointment) => {
      const appointmentDate = dayjs(appointment.date);
      return appointmentDate.isSame(selectedDate, "date");
    })
    .map((appointment) => {
      const appointmentDate = dayjs(appointment.date);
      return {
        start: appointmentDate.format("HH:mm"),
        end: appointmentDate.add(duration, "minute").format("HH:mm"),
      };
    });

  // Generate all possible time slots
  const slots: string[] = [];
  let currentTime = startTime;
  let count = 0;

  while (currentTime.isBefore(endTime) && count < max_per_day) {
    const slotStart = currentTime.format("HH:mm");
    const slotEnd = currentTime.add(duration, "minute").format("HH:mm");

    // Check if this slot overlaps with any booked appointment
    const isAvailable = !bookedSlots.some((bookedSlot) => {
      // Check for overlap
      return (
        (slotStart >= bookedSlot.start && slotStart < bookedSlot.end) ||
        (slotEnd > bookedSlot.start && slotEnd <= bookedSlot.end) ||
        (slotStart <= bookedSlot.start && slotEnd >= bookedSlot.end)
      );
    });

    if (isAvailable && currentTime.add(duration, "minute").isBefore(endTime)) {
      slots.push(slotStart);
      count++;
    }

    currentTime = currentTime.add(duration + buffer, "minute");
  }

  return slots;
};

// const testSelectedDate = dayjs("2025-03-26T23:00:00.000Z");
// const testWorkingHours = { start_time: "09:00:00", end_time: "17:00:00" };
// const testSettings = { duration: 30, buffer: 15, max_per_day: 8 };
// const testBookedAppointments = [{ date: "2025-03-21T11:00:07+00:00" }];

// const testSlots = generateTimeSlots(
//   testWorkingHours,
//   testSettings,
//   testBookedAppointments,
//   testSelectedDate
// );

// console.log("testSlots", testSlots);
