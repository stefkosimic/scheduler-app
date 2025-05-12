import Link from "next/link";
import { Boxes, Calendar, Clock, Home, Settings, Users2 } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users2,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: Boxes,
  },
  {
    title: "Availability",
    href: "/dashboard/availability",
    icon: Clock,
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
] as const;

interface NavProps {
  className?: string;
  buttonClassName?: string;
}

export default function Nav({ className, buttonClassName }: NavProps) {
  return (
    <nav className={className}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          className={cn(buttonVariants({ variant: "ghost" }))} href={item.href}>
          <item.icon className="h-5 w-5" />
        </Link>
      ))}
    </nav>
  );
}

export { navItems };
