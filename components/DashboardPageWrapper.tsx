import { ReactNode } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SidebarTrigger } from "./ui/sidebar";

interface DashboardPageWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function DashboardPageWrapper({
  title,
  subtitle,
  children,
  actions,
}: DashboardPageWrapperProps) {
  return (
    <div className="space-y-6 w-full">
      <Card className="bg-transparent shadow-none border-none">
        <CardHeader className="p-0 sticky top-0 z-50 pb-2 gap-4 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {title}
            </CardTitle>
            {subtitle && (
              <CardDescription className="text-muted-foreground">
                {subtitle}
              </CardDescription>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 w-full md:w-auto">{actions}</div>}
        </CardHeader>
      </Card>
      {children}
    </div>
  );
}
