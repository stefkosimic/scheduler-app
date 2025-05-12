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
import { createService, updateService, deleteService } from "@/actions/services";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ServiceFormData = {
  name: string;
  duration: number;
  price: number;
  description: string;
};

export default function ServicesContent({
  data,
}: {
  data: Tables<"services">[];
}) {
  const { t } = useTranslation("services");
  const router = useRouter();
  const [services, setServices] = useState<Tables<"services">[]>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] =
    useState<Tables<"services"> | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    duration: 60,
    price: 0,
    description: "",
  });

  const handleRowClick = (service: Tables<"services">) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      duration: service.duration,
      price: service.price,
      description: service.description || "",
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedService(null);
    setFormData({
      name: "",
      duration: 60,
      price: 0,
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (selectedService) {
        // Update service
        const data = await updateService(selectedService.id, formData);
        setSelectedService(null)
        setServices((prev) => prev.map((service) => (service.id === selectedService.id ? data : service)));
        setIsModalOpen(false);
      } else {
        // Create new service
        const data = await createService(formData);
        setServices((prev) => [...prev, data]);
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(t("actions.add_service_error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async () => {
    if (!selectedService) return;

    setLoading(true);
    try {
      await deleteService(selectedService.id);
      setServices((prev) => prev.filter((service) => service.id !== selectedService.id));
      setSelectedService(null);
      setIsModalOpen(false);
      toast.success(t("actions.delete_service_success"));
    } catch (error) {
      toast.error(t("actions.delete_service_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardPageWrapper
      title={t("page.title")}
      subtitle={t("page.subtitle")}
      actions={
        <Button className="w-full" onClick={handleAddNew}>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="duration">
                      {t("modal.form.duration.label")}
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: Number(e.target.value) })
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
                        setFormData({ ...formData, price: Number(e.target.value) })
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
            <DialogFooter className="flex flex-col md:flex-row gap-4 justify-between">
              {selectedService && (
                <Button
                  variant="destructive"
                  type="button"
                  disabled={loading}
                  onClick={handleDeleteService}
                >
                  {t("actions.delete")}
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                {t("actions.cancel")}
              </Button>
              <Button loading={loading} onClick={handleSubmit}>
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
