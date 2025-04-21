import { useState } from "react";
import { getProfileAndServices } from "@/actions/auth";
import { getServices } from "@/actions/services";
import { PlusCircle, X } from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import ServicesContent from "./services-content";

export default async function ServicesPage() {
  const { services } = (await getServices()) as any;
  return <ServicesContent services={services} />;
}
