"use client";

import Link from "next/link";
import { Tables } from "@/types/db";
import dayjs from "dayjs";
import { CalendarDays, Clock, Users, LinkIcon, User } from "lucide-react";
import { useTranslation } from "react-i18next";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardData({ profile }: any) {
  const { t } = useTranslation("dashboard");

  // Mock data - would come from database in real app
  const stats = {
    totalAppointments: profile.appointments.length,
    upcomingAppointments: profile.appointments.filter(
      (app: any) => app.status === "upcoming"
    ).length,
    totalClients: profile.customers.length,
  };

  console.log("profile", profile);

  return (
    <DashboardPageWrapper
      title={t("overview.title")}
      subtitle={t("overview.subtitle")}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.total_appointments")}
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.upcoming_appointments")}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.upcomingAppointments}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.total_clients")}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("booking_link.title")}</CardTitle>
          <CardDescription>{t("booking_link.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="bg-muted p-2 rounded-md flex-1 overflow-hidden">
              <p className="text-sm truncate">
                {`${process.env.NEXT_PUBLIC_URL}/book/${profile.username}`}
              </p>
            </div>
            <Button size="sm" variant="outline">
              <LinkIcon className="h-4 w-4 mr-2" />
              {t("booking_link.copy")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("recent_appointments.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock data - would come from database */}
              {profile.appointments.map(
                (
                  appointment: Tables<"appointments"> & {
                    service: Tables<"services">;
                    customer: Tables<"customers">;
                  },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{appointment.customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.service.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {dayjs(appointment.date).format("ddd DD, MMM YYYY")}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/appointments">
                  {t("recent_appointments.view_all")}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("quick_actions.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard/settings">
                <Button className="w-full justify-start" asChild>
                  <User className="mr-2 h-4 w-4" />
                  {t("quick_actions.update_profile")}
                </Button>
              </Link>
              <Link href="/dashboard/availability">
                <Button className="w-full justify-start" asChild>
                  <Clock className="mr-2 h-4 w-4" />
                  {t("quick_actions.set_availability")}
                </Button>
              </Link>
              <Link href={`/book/${profile.username}`} target="_blank">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {t("quick_actions.preview_booking")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardPageWrapper>
  );
}
