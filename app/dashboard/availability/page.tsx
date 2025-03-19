"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const ampm = i < 12 ? "AM" : "PM";
  return `${hour}:00 ${ampm}`;
});

export default function AvailabilityPage() {
  // Mock data - would be fetched from database
  const [availability, setAvailability] = useState([
    {
      id: "1",
      day: "Monday",
      enabled: true,
      startTime: "9:00 AM",
      endTime: "5:00 PM",
    },
    {
      id: "2",
      day: "Tuesday",
      enabled: true,
      startTime: "9:00 AM",
      endTime: "5:00 PM",
    },
    {
      id: "3",
      day: "Wednesday",
      enabled: true,
      startTime: "9:00 AM",
      endTime: "5:00 PM",
    },
    {
      id: "4",
      day: "Thursday",
      enabled: true,
      startTime: "9:00 AM",
      endTime: "5:00 PM",
    },
    {
      id: "5",
      day: "Friday",
      enabled: true,
      startTime: "9:00 AM",
      endTime: "3:00 PM",
    },
    {
      id: "6",
      day: "Saturday",
      enabled: false,
      startTime: "10:00 AM",
      endTime: "2:00 PM",
    },
    {
      id: "7",
      day: "Sunday",
      enabled: false,
      startTime: "10:00 AM",
      endTime: "2:00 PM",
    },
  ]);

  const [appointmentSettings, setAppointmentSettings] = useState({
    duration: 30,
    buffer: 15,
    advance: 1,
    maxPerDay: 8,
  });

  const toggleDayEnabled = (id: string) => {
    setAvailability(
      availability.map((day) =>
        day.id === id ? { ...day, enabled: !day.enabled } : day
      )
    );
  };

  const updateDayTime = (
    id: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setAvailability(
      availability.map((day) =>
        day.id === id ? { ...day, [field]: value } : day
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Availability</h1>
        <p className="text-muted-foreground">
          Set your working hours and appointment preferences
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Working Hours</CardTitle>
            <CardDescription>
              Set your availability for each day of the week
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availability.map((day) => (
              <div
                key={day.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={day.enabled}
                    onCheckedChange={() => toggleDayEnabled(day.id)}
                    id={`day-${day.id}`}
                  />
                  <Label htmlFor={`day-${day.id}`} className="">
                    {day.day}
                  </Label>
                </div>
                {day.enabled ? (
                  <div className="flex items-center space-x-2">
                    <Select
                      value={day.startTime}
                      onValueChange={(value) =>
                        updateDayTime(day.id, "startTime", value)
                      }
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {HOURS.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>to</span>
                    <Select
                      value={day.endTime}
                      onValueChange={(value) =>
                        updateDayTime(day.id, "endTime", value)
                      }
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="End time" />
                      </SelectTrigger>
                      <SelectContent>
                        {HOURS.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Unavailable
                  </span>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full md:w-auto">Save Working Hours</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Settings</CardTitle>
            <CardDescription>
              Configure how your appointments are scheduled
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 w-full">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Default Duration (minutes)</Label>
                <Select
                  value={appointmentSettings.duration.toString()}
                  onValueChange={(value) =>
                    setAppointmentSettings({
                      ...appointmentSettings,
                      duration: Number.parseInt(value),
                    })
                  }
                >
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buffer">Buffer Time (minutes)</Label>
                <Select
                  value={appointmentSettings.buffer.toString()}
                  onValueChange={(value) =>
                    setAppointmentSettings({
                      ...appointmentSettings,
                      buffer: Number.parseInt(value),
                    })
                  }
                >
                  <SelectTrigger id="buffer">
                    <SelectValue placeholder="Buffer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No buffer</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="advance">Minimum Advance Notice (days)</Label>
                <Select
                  value={appointmentSettings.advance.toString()}
                  onValueChange={(value) =>
                    setAppointmentSettings({
                      ...appointmentSettings,
                      advance: Number.parseInt(value),
                    })
                  }
                >
                  <SelectTrigger id="advance">
                    <SelectValue placeholder="Advance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Same day</SelectItem>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="2">2 days</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-per-day">
                  Maximum Appointments Per Day
                </Label>
                <Select
                  value={appointmentSettings.maxPerDay.toString()}
                  onValueChange={(value) =>
                    setAppointmentSettings({
                      ...appointmentSettings,
                      maxPerDay: Number.parseInt(value),
                    })
                  }
                >
                  <SelectTrigger id="max-per-day">
                    <SelectValue placeholder="Max per day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 appointments</SelectItem>
                    <SelectItem value="6">6 appointments</SelectItem>
                    <SelectItem value="8">8 appointments</SelectItem>
                    <SelectItem value="10">10 appointments</SelectItem>
                    <SelectItem value="12">12 appointments</SelectItem>
                    <SelectItem value="0">No limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full md:w-auto">Save Settings</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
