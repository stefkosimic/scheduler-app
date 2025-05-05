"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { initialAppointmentSettings, initialAvailability } from "@/lib/helpers";

import { createClient } from "@/utils/supabase/server";

// Signup with additional data (full_name)
export const signUp = async (
  email: string,
  password: string,
  fullName: string
) => {
  const supabase = await createClient(await cookies());
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, onboarded: false },
    },
  });

  if (error) throw error;

  redirect("/onboarding");
};

// Sign in user
export const signIn = async (email: string, password: string) => {
  const supabase = await createClient(await cookies());

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data.user && !data.user?.user_metadata.onboarded) {
    return redirect("/onboarding", RedirectType.replace);
  }

  if (error) throw error;
  redirect("/dashboard", RedirectType.replace);
};

// Logout user
export const signout = async () => {
  const supabase = await createClient(await cookies());

  const { error } = await supabase.auth.signOut();

  if (error) throw error;
  return redirect("/login", RedirectType.replace);
};

export const updateProfile = async (
  companyName: string,
  jobTitle: string,
  onboarding: boolean,
  username?: string
) => {
  const supabase = await createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { error } = await supabase
    .from("profiles")
    .update({
      company_name: companyName,
      job_title: jobTitle,
      ...(username && { username }),
    })
    .eq("id", user.id);

  if (error) throw error;

  const { data: availabilityData, error: availabilityError } = await supabase
    .from("availability")
    .insert(initialAvailability.map((day) => ({ ...day, user_id: user.id })));

  if (availabilityError) throw availabilityError;

  const { data: appointmentSettingsData, error: appointmentSettingsError } =
    await supabase
      .from("appointment_settings")
      .insert({ ...initialAppointmentSettings, user_id: user.id })
      .select();

  if (appointmentSettingsError) throw appointmentSettingsError;

  if (onboarding) {
    const {
      data: { user },
    } = await supabase.auth.updateUser({ data: { onboarded: true } });
  }
};

export const getProfile = async () => {
  const supabase = await createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return { profile };
};

export const getProfileAndServices = async () => {
  const supabase = await createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*, services: services(*)")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return { profile };
};

export const getAvailabilitySettings = async () => {
  const supabase = await createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "*, availability: availability(*), appointment_settings: appointment_settings(*)"
    )
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return { profile };
};
