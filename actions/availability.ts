
'use server'

import { Tables } from "@/types/db";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function updateAvailabilityRow(
  availability: Tables<"availability">[]
) {
  const supabase = await createClient(await cookies());
  const { data, error } = await supabase
    .from('availability')
    .upsert(availability)

  if (error) throw error;

}

export async function updateAppointmentSettings(
  settings: Partial<Tables<"appointment_settings">>
) {
  const supabase = await createClient(await cookies());
  console.log("settings", settings);
  const { data, error } = await supabase
    .from('appointment_settings')
    .update(settings)
    .eq('id', settings.id as string)
    .select()
    .single();
  console.log("error", error);

  if (error) throw error;

  return data;
}
