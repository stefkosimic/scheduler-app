import { redirect } from "next/dist/server/api-utils";
import React from "react";
import { signout } from "@/actions/auth";

type Props = {};

export default async function Signout(props: Props) {
  const { error } = await signout();

  return null;
}
