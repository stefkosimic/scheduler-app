"use client";

import { useState } from "react";

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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <h4 className="mb-2 font-medium">Contact Information</h4>
                  <p>Email: {selectedCustomer?.email}</p>
                  <p>Phone: {selectedCustomer?.phone}</p>
                </div>
                <div>
                  <h4 className="mb-2 font-medium">Notes</h4>
                  <Textarea
                    value={notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    placeholder="Add notes about the customer..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="appointments">
              <div className="space-y-4">
                <h4 className="font-medium">Appointment History</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Service</TableHead>
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
