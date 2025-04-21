import { ReactNode } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
        <CardHeader className="p-0 pb-2 flex flex-row items-center justify-between">
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
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </CardHeader>
      </Card>
      {children}
    </div>
  );
}
