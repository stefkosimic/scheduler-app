"use server";

import { Tables } from "@/types/db";
import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const getOrAddCustomer = async (
  data: any,
  user_id: string
): Promise<{ customer: Tables<"customers"> }> => {
  const supabase = await createClient(await cookies());

  let customer;

  const { data: customerData, error } = await supabase
    .from("customers")
    .select("*")
    .eq("email", data.email)
    .single();

  customer = customerData;

  if (!customer) {
    const { data: newCustomer, error } = await supabase
      .from("customers")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        user_id,
      })
      .select("*")
      .single();
    console.log("new customer added: ", newCustomer);

    customer = newCustomer;
  }

  if (!customer) {
    throw new Error("Customer not found or could not be created");
  }

  return { customer };
};
