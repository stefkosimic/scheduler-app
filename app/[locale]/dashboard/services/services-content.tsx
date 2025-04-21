"use client";

import { useState } from "react";
import { Tables } from "@/types/db";
import { PlusCircle } from "lucide-react";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type ServiceFormData = {
  name: string;
  duration: string;
  price: string;
  description: string;
};

export default function ServicesContent({
  services,
}: {
  services: Tables<"services">[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<Tables<"services"> | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    duration: "",
    price: "",
    description: "",
  });

  const handleRowClick = (service: Tables<"services">) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      duration: service.duration.toString(),
      price: service.price.toString(),
      description: service.description || "",
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedService(null);
    setFormData({
      name: "",
      duration: "",
      price: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // TODO: Implement service creation/update logic
    setIsModalOpen(false);
  };

  return (
    <DashboardPageWrapper
      title="Services"
      subtitle="Manage your services"
      actions={
        <Button onClick={handleAddNew}>
          <PlusCircle className="h-4 w-4" />
          Add Service
        </Button>
      }
    >
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Duration (min)</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow
                key={service.id}
                className="cursor-pointer"
                onClick={() => handleRowClick(service)}
              >
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {service.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedService ? "Edit Service" : "Add New Service"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {selectedService ? "Save Changes" : "Add Service"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardPageWrapper>
  );
}
