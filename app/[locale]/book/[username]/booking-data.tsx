"use client";

import { useMemo, useState } from "react";
import { bookAppointment } from "@/actions/booking";
import { Tables } from "@/types/db";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { DAYS, generateTimeSlots } from "@/lib/utils";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

export default function BookingData({
  provider,
}: {
  provider: Tables<"profiles"> & {
    services: Tables<"services">[];
    availability: Tables<"availability">[];
    appointments: Tables<"appointments">[];
    appointment_settings: Tables<"appointment_settings">;
  };
}) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [bookingComplete, setBookingComplete] = useState(false);

  console.log("providerprovider", provider);

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Provider Not Found</h2>
          <p className="text-muted-foreground">
            The provider you are looking for does not exist or is unavailable.
          </p>
        </div>
      </div>
    );
  }

  // Mock available time slots - would be generated based on provider's availability and existing appointments
  //   const availableTimeSlots = [];
  const availableTimeSlots = useMemo(
    () =>
      provider && selectedDate
        ? generateTimeSlots(
          // @ts-ignore
          provider.availability.find(
            (a: any) => a.day === dayjs(selectedDate).format("dddd")
          ),
          // @ts-ignore
          provider.appointment_settings[0],
          provider.appointments,
          dayjs(selectedDate)!,
          selectedService
            ? Number(
              provider.services.find(
                (service) => service.id === selectedService
              )?.duration
            )
            : undefined
        )
        : [],
    [selectedDate, selectedService]
  );

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep(2);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      // In a real app, we would fetch available time slots for this date
      setStep(3);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo({
      ...customerInfo,
      [field]: value,
    });
  };

  const handleBookAppointment = async () => {
    try {
      const appointmentDate = dayjs(selectedDate)
        .hour(parseInt(selectedTime.split(":")[0]))
        .minute(parseInt(selectedTime.split(":")[1]));

      const { appointment_id } = await bookAppointment({
        service_id: selectedService,
        date: appointmentDate,
        user_id: provider.id,
        customerData: customerInfo,
      });
      if (appointment_id) {
        setBookingComplete(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getSelectedServiceDetails = () => {
    return provider.services.find((service) => service.id === selectedService);
  };

  const formatTime = (time: string) => {
    return dayjs(`2000-01-01 ${time}`).format("HH:mm");
  };

  // Convert day names to index (Monday = 0, Sunday = 6)
  const dayMap: Record<string, number> = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    if (date < today) return true; // Disable past dates

    const dayIndex = date.getDay();
    const adjustedIndex = (dayIndex + 6) % 7; // Convert Sunday (0) to 6, Monday (1) to 0, etc.

    const dayInfo = provider.availability.find(
      (d) => dayMap[d.day] === adjustedIndex
    );
    return !dayInfo || !dayInfo.enabled;
  };

  return (
    // <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 px-0">
      {/* Modern Header with Cover and Avatar */}
      <div className="relative w-full max-w-4xl mx-auto mb-10">
        {/* Cover Image */}
        <div className="h-48 md:h-64 w-full rounded-b-3xl overflow-hidden bg-gray-200 dark:bg-gray-800">
          <img
            src={"/cover-placeholder.jpg"}
            alt="Cover"
            className="object-cover w-full h-full"
            style={{ minHeight: '12rem', minWidth: '100%' }}
          />
        </div>
        {/* Avatar & Info */}
        <div className="absolute left-6 md:left-12 -bottom-12 flex items-end gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-900 bg-gray-100 overflow-hidden shadow-lg">
            <img
              src={provider.avatar_url || "/avatar-placeholder.png"}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="pb-4">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {provider.full_name || "Provider Name"}
            </div>
            <div className="text-md md:text-lg text-gray-600 dark:text-gray-300 font-medium">
              {provider.job_title || "Professional Title"}
            </div>
            <div className="mt-2 text-gray-500 dark:text-gray-400 max-w-md line-clamp-2">
              {provider.bio || "Short description about the provider goes here."}
            </div>
          </div>
        </div>
      </div>
      {/* Spacer for avatar overlap */}
      <div className="h-16 md:h-20" />
      <div className="max-w-4xl mx-auto px-4">

        {!bookingComplete ? (
          <div className="grid gap-6 md:grid-cols-5">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{provider.full_name}</CardTitle>
                <CardDescription>{provider.job_title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{provider.bio}</p>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <h3 className="font-medium">Available Services</h3>
                  <div className="space-y-2">
                    {provider.services.map((service) => (
                      <div key={service.id} className="text-sm">
                        <div className="font-medium">{service.name}</div>
                        <div className="text-muted-foreground">
                          {service.duration} min | ${service.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <h3 className="font-medium">Working Hours</h3>
                  <div className="space-y-1 text-sm">
                    {provider.availability
                      .sort(
                        (a: any, b: any) =>
                          DAYS.indexOf(a.day) - DAYS.indexOf(b.day)
                      )
                      .map((day) => (
                        <div key={day.id} className="flex justify-between">
                          <span>{day.day}</span>
                          {day.enabled ? (
                            <span>
                              {formatTime(day.start_time)} -{" "}
                              {formatTime(day.end_time)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              Unavailable
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>
                  {step === 1 && "Select a service to get started"}
                  {step === 2 && "Choose a date for your appointment"}
                  {step === 3 && "Select a time slot"}
                  {step === 4 && "Enter your information to complete booking"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <RadioGroup
                    value={selectedService}
                    onValueChange={handleServiceSelect}
                  >
                    <div className="space-y-4">
                      {provider.services.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={service.id}
                            id={`service-${service.id}`}
                          />
                          <Label
                            htmlFor={`service-${service.id}`}
                            className="flex flex-col cursor-pointer"
                          >
                            <span className="font-medium">{service.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {service.duration} min | ${service.price}
                            </span>
                            <span className="text-sm">
                              {service.description}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Select a Date</h3>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                        disabled={isDateDisabled}
                      />
                    </div>
                    {selectedService && (
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-medium">Selected Service</h3>
                        <div className="text-sm">
                          {getSelectedServiceDetails()?.name} -{" "}
                          {getSelectedServiceDetails()?.duration} min
                        </div>
                      </div>
                    )}
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Select a Time</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <h3 className="font-medium">Appointment Details</h3>
                      <div className="text-sm">
                        <div>
                          {getSelectedServiceDetails()?.name} -{" "}
                          {getSelectedServiceDetails()?.duration} min
                        </div>
                        <div>
                          {selectedDate?.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                          {selectedTime && ` at ${selectedTime}`}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <h3 className="font-medium">Appointment Details</h3>
                      <div className="text-sm">
                        <div>
                          {getSelectedServiceDetails()?.name} -{" "}
                          {getSelectedServiceDetails()?.duration} min
                        </div>
                        <div>
                          {selectedDate?.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          at {selectedTime}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={customerInfo.name}
                            onChange={(e) =>
                              handleCustomerInfoChange("name", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) =>
                              handleCustomerInfoChange("email", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={customerInfo.phone}
                          onChange={(e) =>
                            handleCustomerInfoChange("phone", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          rows={3}
                          value={customerInfo.notes}
                          onChange={(e) =>
                            handleCustomerInfoChange("notes", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row gap-2">
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => setStep(3)}
                      >
                        Back
                      </Button>
                      <Button
                        className="w-full"
                        onClick={handleBookAppointment}
                        disabled={!customerInfo.name || !customerInfo.email}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Booking Confirmed!</CardTitle>
              <CardDescription>
                Your appointment has been scheduled successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <h3 className="font-medium">Appointment Details</h3>
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Service:</div>
                    <div>{getSelectedServiceDetails()?.name}</div>
                    <div className="font-medium">Date:</div>
                    <div>
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="font-medium">Time:</div>
                    <div>{selectedTime}</div>
                    <div className="font-medium">Duration:</div>
                    <div>{getSelectedServiceDetails()?.duration} minutes</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <h3 className="font-medium">Your Information</h3>
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Name:</div>
                    <div>{customerInfo.name}</div>
                    <div className="font-medium">Email:</div>
                    <div>{customerInfo.email}</div>
                    <div className="font-medium">Phone:</div>
                    <div>{customerInfo.phone || "Not provided"}</div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  A confirmation email has been sent to {customerInfo.email}
                </p>
                <p>
                  You can cancel or reschedule your appointment up to 24 hours
                  before the scheduled time.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => window.location.reload()}>
                Book Another Appointment
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
