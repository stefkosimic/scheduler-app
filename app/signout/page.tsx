import { signout } from "@/actions/auth";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

type Props = {};

export default async function Signout(props: Props) {
  const { error } = await signout();

  return null;
}
