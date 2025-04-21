"use client";

import { useState } from "react";
import { Tables } from "@/types/db";
import { useTranslation } from "react-i18next";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { DAYS } from "@/lib/utils";

export default function AvailabilityData(props: any) {
  const { t } = useTranslation("availability");
  const [availability, setAvailability] = useState(
    props.availability.sort(
      (a: Tables<"availability">, b: Tables<"availability">) =>
        DAYS.indexOf(a.day) - DAYS.indexOf(b.day)
    )
  );
  const [appointmentSettings, setAppointmentSettings] = useState(
    props.appointment_settings
  );

  const toggleDayEnabled = (id: string) => {
    setAvailability(
      availability.map((day: Tables<"availability">) =>
        day.id === id ? { ...day, enabled: !day.enabled } : day
      )
    );
  };

  const updateDayTime = (
    id: string,
    field: "start_time" | "end_time",
    value: string
  ) => {
    setAvailability(
      availability.map((day: Tables<"availability">) =>
        day.id === id ? { ...day, [field]: value + ":00" } : day
      )
    );
  };

  return (
    <DashboardPageWrapper title={t("page.title")} subtitle={t("page.subtitle")}>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("working_hours.title")}</CardTitle>
            <CardDescription>{t("working_hours.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availability.map((day: Tables<"availability">) => (
              <div
                key={day.id}
                className="flex flex-col md:flex-row items-start md:items-center md:h-9 gap-2 justify-between"
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
                    <input
                      type="time"
                      value={day.start_time.slice(0, 5)}
                      onChange={(e) =>
                        updateDayTime(day.id, "start_time", e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm w-[120px]"
                    />
                    <span>{t("working_hours.to")}</span>
                    <input
                      type="time"
                      value={day.end_time.slice(0, 5)}
                      onChange={(e) =>
                        updateDayTime(day.id, "end_time", e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm w-[120px]"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {t("working_hours.unavailable")}
                  </span>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full md:w-auto">
              {t("working_hours.save")}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("appointment_settings.title")}</CardTitle>
            <CardDescription>
              {t("appointment_settings.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 w-full">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">
                  {t("appointment_settings.duration.label")}
                </Label>
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
                    <SelectValue
                      placeholder={t(
                        "appointment_settings.duration.placeholder"
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {[15, 30, 45, 60, 90, 120].map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {t(`appointment_settings.duration.options.${value}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buffer">
                  {t("appointment_settings.buffer.label")}
                </Label>
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
                    <SelectValue
                      placeholder={t("appointment_settings.buffer.placeholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 5, 10, 15, 30].map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {t(`appointment_settings.buffer.options.${value}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="advance">
                  {t("appointment_settings.advance.label")}
                </Label>
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
                    <SelectValue
                      placeholder={t(
                        "appointment_settings.advance.placeholder"
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 7].map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {t(`appointment_settings.advance.options.${value}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-per-day">
                  Maximum Appointments Per Day
                </Label>
                <Select
                  value={appointmentSettings.max_per_day.toString()}
                  onValueChange={(value) =>
                    setAppointmentSettings({
                      ...appointmentSettings,
                      max_per_day: Number.parseInt(value),
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
    </DashboardPageWrapper>
  );
}
