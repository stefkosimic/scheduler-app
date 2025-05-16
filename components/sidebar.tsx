"use client";

import Link from "next/link";
import { Calendar, Clock, Home, Settings, User, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

import UserDropdown from "@/components/UserDropdown";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarSeparator,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  const { t } = useTranslation("sidebar");

  const navItems = [
    {
      title: t("navigation.dashboard"),
      href: "/dashboard",
      icon: Home,
    },
    {
      title: t("navigation.customers"),
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      title: t("navigation.services"),
      href: "/dashboard/services",
      icon: User,
    },
    {
      title: t("navigation.availability"),
      href: "/dashboard/availability",
      icon: Clock,
    },
    {
      title: t("navigation.appointments"),
      href: "/dashboard/appointments",
      icon: Calendar,
    },
    {
      title: t("navigation.settings"),
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" side="left">
        <SidebarContent className="p-4 relative">
          <SidebarHeader className="data-[state=collapsed]:hidden">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="font-bold">{t("app_name")}</span>
            </Link>
          </SidebarHeader>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild className="py-4">
                  <Link className="text-lg" href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className="flex justify-between p-2">
            <UserDropdown />
            <SidebarTrigger />
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
