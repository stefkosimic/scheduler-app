import { useState } from "react";
import { getProfileAndServices } from "@/actions/auth";
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

import ProfileTabs from "./profile-tabs";

export default async function ProfilePage() {
  const { profile } = await getProfileAndServices();
  return <ProfileTabs profile={profile} />;
}
