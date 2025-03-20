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
import ProfileTabs from "./profile-tabs";
import { getProfileAndServices } from "@/actions/auth";

export default async function ProfilePage() {
  const { profile } = await getProfileAndServices();
  return <ProfileTabs profile={profile} />;
}
