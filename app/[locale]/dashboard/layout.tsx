import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getProfile } from "@/actions/auth";

import BottomNav from "@/components/bottom-nav";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Card } from "@/components/ui/card";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { profile } = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex w-full md:p-4 flex-col">
        {/* <Header /> */}
        <main className="container min-h-[calc(100vh-2rem)] bg-background md:rounded-2xl md:border mx-auto w-full p-4 md:p-6 pb-20">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
