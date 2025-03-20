"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
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
