"use client";

import { useState } from "react";
import { Tables } from "@/types/db";
import { PlusCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("services");
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
      title={t("page.title")}
      subtitle={t("page.subtitle")}
      actions={
        <Button onClick={handleAddNew}>
          <PlusCircle className="h-4 w-4" />
          {t("actions.add_service")}
        </Button>
      }
    >
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.headers.name")}</TableHead>
              <TableHead>{t("table.headers.duration")}</TableHead>
              <TableHead>{t("table.headers.price")}</TableHead>
              <TableHead>{t("table.headers.description")}</TableHead>
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
                {selectedService ? t("modal.title.edit") : t("modal.title.add")}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("modal.form.name.label")}</Label>
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
                    <Label htmlFor="duration">
                      {t("modal.form.duration.label")}
                    </Label>
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
                    <Label htmlFor="price">{t("modal.form.price.label")}</Label>
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
                <Label htmlFor="description">
                  {t("modal.form.description.label")}
                </Label>
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
                {t("actions.cancel")}
              </Button>
              <Button onClick={handleSubmit}>
                {selectedService
                  ? t("actions.save_changes")
                  : t("actions.add_service")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardPageWrapper>
  );
}
