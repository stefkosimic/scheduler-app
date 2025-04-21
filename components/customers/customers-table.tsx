"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// This would come from your database
type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  appointments: Array<{
    id: string;
    date: string;
    service: string;
  }>;
};

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    notes: "Prefers afternoon appointments",
    appointments: [
      { id: "1", date: "2024-03-20", service: "Haircut" },
      { id: "2", date: "2024-04-15", service: "Styling" },
    ],
  },
  // Add more mock data as needed
];

export function CustomersTable() {
  const { t } = useTranslation("customers");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setNotes(customer.notes);
    setIsModalOpen(true);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    // Here you would typically update the notes in your database
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("table.headers.name")}</TableHead>
            <TableHead>{t("table.headers.email")}</TableHead>
            <TableHead>{t("table.headers.phone")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCustomers.map((customer) => (
            <TableRow
              key={customer.id}
              onClick={() => handleRowClick(customer)}
              className="cursor-pointer hover:bg-muted"
            >
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">
                {t("customer_details.tabs.info")}
              </TabsTrigger>
              <TabsTrigger value="appointments">
                {t("customer_details.tabs.appointments")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <h4 className="mb-2 font-medium">
                    {t("customer_details.contact_info.title")}
                  </h4>
                  <p>
                    {t("customer_details.contact_info.email")}:{" "}
                    {selectedCustomer?.email}
                  </p>
                  <p>
                    {t("customer_details.contact_info.phone")}:{" "}
                    {selectedCustomer?.phone}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-medium">
                    {t("customer_details.notes.title")}
                  </h4>
                  <Textarea
                    value={notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    placeholder={t("customer_details.notes.placeholder")}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="appointments" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium">
                  {t("customer_details.appointments.title")}
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {t("customer_details.appointments.headers.date")}
                      </TableHead>
                      <TableHead>
                        {t("customer_details.appointments.headers.service")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCustomer?.appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.service}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
