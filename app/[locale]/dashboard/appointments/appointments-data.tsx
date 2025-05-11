"use client";

import { useMemo, useState } from "react";
import {
  acceptAppointment,
  cancelAppointment as cancelAppointmentAction,
} from "@/actions/appointments";
import { Tables } from "@/types/db";
import dayjs from "dayjs";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Appointment = Tables<"appointments"> & {
  customer: Tables<"customers">;
  service: Tables<"services">;
};

export default function AppointmentsData(props: {
  appointments: Appointment[];
}) {
  const { t } = useTranslation("appointments");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState(props.appointments);
  const [activeTab, setActiveTab] = useState<string>("upcoming");

  const pendingAppointments = appointments.filter(
    (app) => app.status === "pending"
  );
  const upcomingAppointments = appointments.filter(
    (app) => app.status === "upcoming"
  );
  const completedAppointments = appointments.filter(
    (app) => app.status === "completed"
  );
  const cancelledAppointments = appointments.filter(
    (app) => app.status === "cancelled"
  );

  // Ensure app.date is parsed as a Day.js object
  const parseDate = (timestamp: string) => dayjs(timestamp);

  // Get appointments for the selected date
  const selectedDateAppointments =
    appointments && date
      ? appointments.filter((app) =>
          parseDate(app.date!).isSame(dayjs(date), "day")
        )
      : [];

  // Function to format date and time
  const formatDateTime = (timestamp: string) => {
    return parseDate(timestamp).format("ddd, MMM D, YYYY h:mm A");
  };

  // Function to format time only
  const formatTime = (timestamp: string) => {
    return parseDate(timestamp).format("h:mm A");
  };

  // Function to accept appointment
  const accept = async (id: string) => {
    try {
      await acceptAppointment(id);
      setAppointments(
        appointments.map((app) =>
          app.id === id ? { ...app, status: "upcoming" } : app
        )
      );
      toast(t("appointments.actions.accept_success"));
    } catch (error) {
      toast.error(t("appointments.actions.accept_error"));
    }
  };

  // Cancel appointment
  const cancelAppointment = async (id: string) => {
    try {
      await cancelAppointmentAction(id);
      setAppointments(
        appointments.map((app) =>
          app.id === id ? { ...app, status: "cancelled" } : app
        )
      );
      toast(t("appointments.actions.cancel_success"));
    } catch (error) {
      toast.error(t("appointments.actions.cancel_error"));
    }
  };

  const tabs: {
    [key: string]: Appointment[];
  } = useMemo(
    () => ({
      pending: pendingAppointments,
      completed: completedAppointments,
      upcoming: upcomingAppointments,
      cancelled: cancelledAppointments,
    }),
    [activeTab, appointments]
  );

  return (
    <DashboardPageWrapper title={t("page.title")} subtitle={t("page.subtitle")}>
      <div className="flex flex-col md:flex-row gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("calendar.title")}</CardTitle>
            <CardDescription>{t("calendar.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-6 space-y-2">
              <h3 className="font-medium">
                {date
                  ? dayjs(date).format("dddd, MMMM D")
                  : t("calendar.no_date")}
              </h3>
              {selectedDateAppointments.length > 0 ? (
                <div className="space-y-2">
                  {selectedDateAppointments.map((app) => (
                    <div
                      key={app.id}
                      className="flex justify-between items-center p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{app.customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {app.service.name} - {formatTime(app.date!)}
                        </div>
                      </div>
                      <Badge
                        variant={
                          app.status === "upcoming"
                            ? "default"
                            : app.status === "completed"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {t(`appointments.status.${app.status}`)}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t("calendar.no_appointments")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="pb-3">
            <Tabs defaultValue="upcoming">
              <div className="flex gap-4 flex-col w-full items-start justify-between">
                <CardTitle>{t("appointments.title")}</CardTitle>
                <TabsList className="flex w-full">
                  <TabsTrigger
                    onClick={() => setActiveTab("pending")}
                    className="w-full text-xs p-2 md:text-sm"
                    value="pending"
                  >
                    {t("appointments.tabs.pending")}
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setActiveTab("upcoming")}
                    className="w-full text-xs p-2 md:text-sm"
                    value="upcoming"
                  >
                    {t("appointments.tabs.upcoming")}
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setActiveTab("completed")}
                    className="w-full text-xs p-2 md:text-sm"
                    value="completed"
                  >
                    {t("appointments.tabs.completed")}
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setActiveTab("cancelled")}
                    className="w-full text-xs p-2 md:text-sm"
                    value="cancelled"
                  >
                    {t("appointments.tabs.cancelled")}
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              {Object.keys(tabs).map((tab, index) => (
                <TabsContent key={index} value={tab} className="space-y-4">
                  {tabs[activeTab].length > 0 ? (
                    tabs[activeTab].map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <div className="font-medium">{app.customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {app.service.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatDateTime(app.date!)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {app.status === "pending" && (
                            <>
                              <Button
                                onClick={() => accept(app.id)}
                                size="sm"
                                className="h-8"
                              >
                                <Check className="mr-2 h-4 w-4" />
                                {t("appointments.actions.accept")}
                              </Button>
                              <Button
                                onClick={() => cancelAppointment(app.id)}
                                variant="destructive"
                                size="sm"
                                className="h-8"
                              >
                                <X className="mr-2 h-4 w-4" />
                                {t("appointments.actions.cancel")}
                              </Button>
                            </>
                          )}
                          <Badge
                            variant={
                              app.status === "upcoming"
                                ? "default"
                                : app.status === "completed"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {t(`appointments.status.${app.status}`)}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      {t(`appointments.empty.${activeTab}`)}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardPageWrapper>
  );
}
