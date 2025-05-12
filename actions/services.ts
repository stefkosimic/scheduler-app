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

export const createService = async (service: {
  name: string;
  duration: number;
  price: number;
  description?: string | null;
}) => {
  const supabase = await createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const { data, error } = await supabase
    .from("services")
    .insert([
      {
        ...service,
        user_id: user.id,
      },
    ])
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateService = async (id: string, service: {
  name: string;
  duration: number;
  price: number;
  description?: string | null;
}) => {
  const supabase = await createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const { data, error } = await supabase
    .from("services")
    .update({
      ...service,
      user_id: user.id,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteService = async (id: string) => {
  const supabase = await createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }
  return true;
};