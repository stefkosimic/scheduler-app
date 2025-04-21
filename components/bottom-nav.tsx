"use client";

import Link from "next/link";
import { Home, User, Clock, Calendar, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const BottomNav = () => {
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/availability", label: "Availability", icon: Clock },
    { href: "/dashboard/appointments", label: "Appointments", icon: Calendar },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex md:hidden bottom-0 left-0 w-full bg-white border-t shadow-md fixed justify-around p-2 py-4">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center text-gray-700 hover:text-black transition"
        >
          <Icon className="h-6 w-6" />
          {/* <span className="text-xs">{label}</span> */}
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
