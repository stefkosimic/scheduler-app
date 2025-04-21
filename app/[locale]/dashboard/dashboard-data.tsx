"use client";

import Link from "next/link";
import { Tables } from "@/types/db";
import dayjs from "dayjs";
import { CalendarDays, Clock, Users, LinkIcon, User } from "lucide-react";

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
      title="Dashboard"
      subtitle="Overview of your scheduling activity"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Appointments
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
              Upcoming Appointments
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
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Booking Link</CardTitle>
          <CardDescription>
            Share this link with your customers so they can book appointments
            with you
          </CardDescription>
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
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
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
                  View all appointments
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/dashboard/availability">
                  <Clock className="mr-2 h-4 w-4" />
                  Set Availability
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link href={`/book/${profile.username}`} target="_blank">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Preview Booking Page
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardPageWrapper>
  );
}
