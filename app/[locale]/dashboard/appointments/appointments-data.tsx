"use client";

import { useMemo, useState } from "react";
import { Tables } from "@/types/db";
import dayjs from "dayjs";
import { Check, X } from "lucide-react";

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

  // Function to mark appointment as completed
  const markAsCompleted = (id: string) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: "completed" } : app
      )
    );
  };

  // Function to cancel appointment
  const cancelAppointment = (id: string) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: "cancelled" } : app
      )
    );
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
    [activeTab]
  );

  return (
    <DashboardPageWrapper
      title="Appointments"
      subtitle="Manage your upcoming and past appointments"
    >
      <div className="flex gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View your appointments by date</CardDescription>
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
                {date ? dayjs(date).format("dddd, MMMM D") : "No date selected"}
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
                        {app.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No appointments for this date
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="pb-3">
            <Tabs defaultValue="upcoming">
              <div className="flex gap-4 flex-col w-full items-start justify-between">
                <CardTitle>Appointments</CardTitle>
                <TabsList className="flex w-full">
                  <TabsTrigger
                    onClick={() => setActiveTab("pending")}
                    className="w-full text-xs p-2 md:text-sm"
                    value="pending"
                  >
                    Pending
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setActiveTab("upcoming")}
                    className="w-full text-xs p-2 md:text-sm"
                    value="upcoming"
                  >
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setActiveTab("completed")}
                    className="w-full text-xs p-2 md:text-sm"
                    value="completed"
                  >
                    Completed
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setActiveTab("cancelled")}
                    className="w-full text-xs p-2 md:text-sm"
                    value="cancelled"
                  >
                    Cancelled
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
                        className="flex flex-col space-y-2 p-4 border rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">
                              {app.customer.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {app.customer.email}
                            </div>
                          </div>
                          <Badge>{activeTab}</Badge>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">
                            {app.service.name}
                          </span>
                          <div>{formatDateTime(app.date!)}</div>
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-2 pt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsCompleted(app.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Mark Completed
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => cancelAppointment(app.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No {activeTab} appointments
                    </p>
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
