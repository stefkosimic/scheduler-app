import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Tables } from "@/types/db";

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
  const { start_time, end_time } = workingHours;
  const { duration, buffer, max_per_day } = settings;
  const userTimezone = "Europe/Belgrade";

  // Parse times with proper timezone handling
  const parseTime = (timeStr: string, date: dayjs.Dayjs): dayjs.Dayjs => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return date
      .tz(userTimezone)
      .set("hour", hours)
      .set("minute", minutes)
      .set("second", seconds);
  };

  // Format time consistently
  const formatTime = (date: dayjs.Dayjs): string => {
    return date.format("HH:mm");
  };

  // Convert booked appointments to time slots with minutes
  const bookedTimes = new Set<string>();
  bookedAppointments.forEach((appt) => {
    const apptDate = dayjs(appt.date).tz(userTimezone);
    if (apptDate.isSame(selectedDate, "day")) {
      const formattedTime = formatTime(apptDate);
      bookedTimes.add(formattedTime);
    }
  });

  const startTime = parseTime(start_time, selectedDate);
  const endTime = parseTime(end_time, selectedDate);
  let currentTime = startTime;
  const slots: string[] = [];
  let count = 0;

  while (currentTime.isBefore(endTime) && count < max_per_day) {
    const slotTime = formatTime(currentTime);
    const slotStartMinutes = currentTime.hour() * 60 + currentTime.minute();
    const slotEndMinutes = slotStartMinutes + duration;

    // Check if this slot overlaps with any booked appointment
    let isBooked = false;

    for (const bookedTime of bookedTimes) {
      const [bookedHours, bookedMinutes] = bookedTime.split(":").map(Number);
      const bookedTimeMinutes = bookedHours * 60 + bookedMinutes;

      // Check if booked time falls within this slot
      if (
        bookedTimeMinutes >= slotStartMinutes &&
        bookedTimeMinutes < slotEndMinutes
      ) {
        isBooked = true;
        break;
      }
    }

    if (!isBooked) {
      slots.push(slotTime);
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
