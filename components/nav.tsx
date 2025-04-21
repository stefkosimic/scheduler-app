import Link from "next/link";
import { Calendar, Clock, Home, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
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
        <Button
          key={item.href}
          variant="ghost"
          className={buttonClassName}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

export { navItems };
