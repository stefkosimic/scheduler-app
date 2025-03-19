"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, X } from "lucide-react";

export default function ProfilePage() {
  // Mock data - would be fetched from database
  const [profile, setProfile] = useState({
    name: "John Doe",
    title: "Professional Consultant",
    email: "john@example.com",
    phone: "(555) 123-4567",
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
  });

  const [newService, setNewService] = useState({
    name: "",
    duration: "",
    price: "",
    description: "",
  });

  const handleAddService = () => {
    if (newService.name && newService.duration && newService.price) {
      setProfile({
        ...profile,
        services: [
          ...profile.services,
          {
            id: Date.now().toString(),
            name: newService.name,
            duration: Number.parseInt(newService.duration),
            price: Number.parseInt(newService.price),
            description: newService.description,
          },
        ],
      });
      setNewService({ name: "", duration: "", price: "", description: "" });
    }
  };

  const handleRemoveService = (id: string) => {
    setProfile({
      ...profile,
      services: profile.services.filter((service) => service.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your professional profile and services
        </p>
      </div>

      <Tabs defaultValue="basic-info">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger className="w-full md:w-auto" value="basic-info">
            Basic Info
          </TabsTrigger>
          <TabsTrigger className="w-full md:w-auto" value="services">
            Services
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Update your personal and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={profile.title}
                    onChange={(e) =>
                      setProfile({ ...profile, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Services</CardTitle>
              <CardDescription>
                Add and manage the services you offer to clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {service.duration} min | ${service.price}
                    </div>
                    <div className="text-sm mt-1">{service.description}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveService(service.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Add New Service</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="service-name">Service Name</Label>
                      <Input
                        id="service-name"
                        value={newService.name}
                        onChange={(e) =>
                          setNewService({ ...newService, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (min)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={newService.duration}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              duration: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newService.price}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              price: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={2}
                      value={newService.description}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button onClick={handleAddService} type="button">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
