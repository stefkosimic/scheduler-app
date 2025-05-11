"use server";

import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

import { getProfile } from "./auth";

export const getUserAppointments = async () => {
  const supabase = await createClient(await cookies());

  const { profile } = await getProfile();
  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("*, service: services(*), customer: customers(*)")
    .eq("user_id", profile.id);

  if (error) throw Error(error.message);

  return { appointments };
};

export const getDashboardData = async () => {
  const supabase = await createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "*, appointments: appointments(*, service: services(*), customer: customers(*)), customers: customers(*)"
    )

    .eq("id", user.id)
    .single();

  if (error) throw error;

  return { profile };
};

export const acceptAppointment = async (appointmentId: string) => {
  const supabase = await createClient(await cookies());

  const { error } = await supabase
    .from("appointments")
    .update({ status: "upcoming" })
    .eq("id", appointmentId);

  if (error) throw Error(error.message);

  return { success: true };
};

export const cancelAppointment = async (appointmentId: string) => {
  const supabase = await createClient(await cookies());

  const { error } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", appointmentId);

  if (error) throw Error(error.message);

  return { success: true };
};
