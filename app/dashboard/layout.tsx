import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Home, Settings, User, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-8 flex h-14 items-center">
          <div className="mr-4 flex">
            <Link
              href="/dashboard"
              className="mr-6 flex items-center space-x-2"
            >
              <span className="font-bold">Scheduler</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/40 hidden md:block">
          <nav className="flex flex-col gap-2 p-4">
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/dashboard/availability">
                <Clock className="mr-2 h-4 w-4" />
                Availability
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/dashboard/appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Appointments
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
