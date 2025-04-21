"use server";

import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

export const getServices = async () => {
  const supabase = await createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }
  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return { services };
};
