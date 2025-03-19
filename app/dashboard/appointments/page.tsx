"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

// Mock data - would be fetched from database
const APPOINTMENTS = [
  {
    id: "1",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    service: "Initial Consultation",
    date: new Date(2025, 2, 19, 14, 0), // March 19, 2025, 2:00 PM
    status: "upcoming",
  },
  {
    id: "2",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    service: "Follow-up Session",
    date: new Date(2025, 2, 20, 10, 30), // March 20, 2025, 10:30 AM
    status: "upcoming",
  },
  {
    id: "3",
    customerName: "Sarah Williams",
    customerEmail: "sarah@example.com",
    service: "Initial Meeting",
    date: new Date(2025, 5, 15, 15, 15), // June 15, 2025, 3:15 PM
    status: "upcoming",
  },
  {
    id: "4",
    customerName: "Robert Brown",
    customerEmail: "robert@example.com",
    service: "Initial Consultation",
    date: new Date(2025, 2, 15, 11, 0), // March 15, 2025, 11:00 AM
    status: "completed",
  },
  {
    id: "5",
    customerName: "Emily Davis",
    customerEmail: "emily@example.com",
    service: "Follow-up Session",
    date: new Date(2025, 2, 10, 13, 30), // March 10, 2025, 1:30 PM
    status: "completed",
  },
  {
    id: "6",
    customerName: "David Wilson",
    customerEmail: "david@example.com",
    service: "Initial Meeting",
    date: new Date(2025, 2, 12, 9, 0), // March 12, 2025, 9:00 AM
    status: "cancelled",
  },
]

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState(APPOINTMENTS)

  const upcomingAppointments = appointments.filter((app) => app.status === "upcoming")
  const completedAppointments = appointments.filter((app) => app.status === "completed")
  const cancelledAppointments = appointments.filter((app) => app.status === "cancelled")

  // Get appointments for the selected date
  const selectedDateAppointments = date
    ? appointments.filter(
        (app) =>
          app.date.getDate() === date.getDate() &&
          app.date.getMonth() === date.getMonth() &&
          app.date.getFullYear() === date.getFullYear(),
      )
    : []

  // Function to format date and time
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  // Function to mark appointment as completed
  const markAsCompleted = (id: string) => {
    setAppointments(appointments.map((app) => (app.id === id ? { ...app, status: "completed" } : app)))
  }

  // Function to cancel appointment
  const cancelAppointment = (id: string) => {
    setAppointments(appointments.map((app) => (app.id === id ? { ...app, status: "cancelled" } : app)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">Manage your upcoming and past appointments</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View your appointments by date</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="mt-6 space-y-2">
              <h3 className="font-medium">
                {date
                  ? date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                  : "No date selected"}
              </h3>
              {selectedDateAppointments.length > 0 ? (
                <div className="space-y-2">
                  {selectedDateAppointments.map((app) => (
                    <div key={app.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{app.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {app.service} - {app.date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                        </div>
                      </div>
                      <Badge
                        variant={
                          app.status === "upcoming" ? "default" : app.status === "completed" ? "success" : "destructive"
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No appointments for this date</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <Tabs defaultValue="upcoming">
              <div className="flex items-center justify-between">
                <CardTitle>Appointments</CardTitle>
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((app) => (
                    <div key={app.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{app.customerName}</div>
                          <div className="text-sm text-muted-foreground">{app.customerEmail}</div>
                        </div>
                        <Badge>Upcoming</Badge>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{app.service}</span>
                        <div>{formatDateTime(app.date)}</div>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline" onClick={() => markAsCompleted(app.id)}>
                          <Check className="h-4 w-4 mr-1" />
                          Mark Completed
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => cancelAppointment(app.id)}>
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No upcoming appointments</p>
                )}
              </TabsContent>
              <TabsContent value="completed" className="space-y-4">
                {completedAppointments.length > 0 ? (
                  completedAppointments.map((app) => (
                    <div key={app.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{app.customerName}</div>
                          <div className="text-sm text-muted-foreground">{app.customerEmail}</div>
                        </div>
                        <Badge variant="success">Completed</Badge>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{app.service}</span>
                        <div>{formatDateTime(app.date)}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No completed appointments</p>
                )}
              </TabsContent>
              <TabsContent value="cancelled" className="space-y-4">
                {cancelledAppointments.length > 0 ? (
                  cancelledAppointments.map((app) => (
                    <div key={app.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{app.customerName}</div>
                          <div className="text-sm text-muted-foreground">{app.customerEmail}</div>
                        </div>
                        <Badge variant="destructive">Cancelled</Badge>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{app.service}</span>
                        <div>{formatDateTime(app.date)}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No cancelled appointments</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

