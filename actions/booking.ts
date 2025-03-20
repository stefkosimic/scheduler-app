"use server";

import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import UTC plugin

// Extend Dayjs with UTC plugin
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { getOrAddCustomer } from "./customers";

dayjs.extend(utc);

export const getBookingData = async (username: string) => {
  const supabase = await createClient(await cookies());
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "*, services: services(*), availability: availability(*), appointment_settings: appointment_settings(*), appointments: appointments!inner(*)"
    )
    .eq("username", username)
    .eq("appointments.status", "upcoming")
    .single();

  return data;
};

export const bookAppointment = async ({
  date,
  service_id,
  user_id,
  customerData,
}: {
  date: dayjs.Dayjs;
  service_id: string;
  user_id: string;
  customerData: {
    name: string;
    email: string;
    phone: string | number;
    notes?: string;
  };
}) => {
  const supabase = await createClient(await cookies());

  const { customer } = await getOrAddCustomer(customerData, user_id);

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      user_id,
      service_id,
      date: dayjs(date).utc().format("YYYY-MM-DD HH:mm:ssZ"),
      customer_id: customer!.id,
    })
    .select("id")
    .single();

  if (error) return { error };

  return { appointment_id: data.id };
};
