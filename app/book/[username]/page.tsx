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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

export default function BookingPage({
  params,
}: {
  params: { username: string };
}) {
  // Mock data - would be fetched from database based on username
  const provider = {
    name: "John Doe",
    title: "Professional Consultant",
    bio: "I am a professional consultant with over 10 years of experience helping businesses grow and succeed.",
    services: [
      {
        id: "1",
        name: "Initial Consultation",
        duration: 60,
        price: 100,
        description: "A comprehensive overview of your needs and goals.",
      },
      {
        id: "2",
        name: "Follow-up Session",
        duration: 30,
        price: 50,
        description: "Check on progress and adjust strategies as needed.",
      },
    ],
    availability: [
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
    ],
  };

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

  // Mock available time slots - would be generated based on provider's availability and existing appointments
  const availableTimeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ];

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

  const handleBookAppointment = () => {
    // In a real app, we would submit the booking to the server
    console.log("Booking appointment with:", {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
    });
    setBookingComplete(true);
  };

  const getSelectedServiceDetails = () => {
    return provider.services.find((service) => service.id === selectedService);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!bookingComplete ? (
          <div className="grid gap-6 md:grid-cols-5">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{provider.name}</CardTitle>
                <CardDescription>{provider.title}</CardDescription>
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
                    {provider.availability.map((day) => (
                      <div key={day.id} className="flex justify-between">
                        <span>{day.day}</span>
                        {day.enabled ? (
                          <span>
                            {day.startTime} - {day.endTime}
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
                        disabled={(date) => {
                          // Disable past dates and weekends in this example
                          const day = date.getDay();
                          return (
                            date < new Date() ||
                            day === 0 || // Sunday
                            day === 6 // Saturday
                          );
                        }}
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
