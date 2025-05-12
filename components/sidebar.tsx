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
      {/* SidebarTrigger is visible on mobile, hidden on desktop */}
      <div className="md:hidden fixed top-4 right-4 p-2">
        <SidebarTrigger />
      </div>
      <Sidebar collapsible="icon" side="left">
        <SidebarContent className="p-2">
          <Link href="/dashboard" className="p-2 flex items-center space-x-2">
            <span className="font-bold">{t("app_name")}</span>
          </Link>
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
          <div className="flex justify-center">
            <UserDropdown />
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
