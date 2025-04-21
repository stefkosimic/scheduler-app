"use client";

import { useState } from "react";
import { Tables } from "@/types/db";
import { useTranslation } from "react-i18next";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsContent({
  profile,
}: {
  profile: Tables<"profiles">;
}) {
  const { t } = useTranslation("settings");
  // State for forms

  const [data, setData] = useState(profile);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Placeholder submit handlers
  const handleFullNameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call server action to update full name
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call server action to update password
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    // TODO: Call server action to delete account
    setDeleteLoading(false);
  };

  return (
    <DashboardPageWrapper title={t("page.title")} subtitle={t("page.subtitle")}>
      <Tabs defaultValue="personal">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger className="w-full md:w-auto" value="personal">
            {t("tabs.personal")}
          </TabsTrigger>
          <TabsTrigger className="w-full md:w-auto" value="security">
            {t("tabs.security")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("personal.title")}</CardTitle>
              <CardDescription>{t("personal.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("personal.fields.full_name")}</Label>
                  <Input
                    id="name"
                    value={data.full_name || ""}
                    onChange={(e) =>
                      setData({ ...data, full_name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">
                    {t("personal.fields.job_title")}
                  </Label>
                  <Input
                    id="job_title"
                    value={data.job_title || ""}
                    onChange={(e) =>
                      setData({ ...data, job_title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("personal.fields.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{t("personal.fields.bio")}</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={data.bio || ""}
                  onChange={(e) => setData({ ...data, bio: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-auto">
                {t("personal.actions.save")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("security.title")}</CardTitle>
              <CardDescription>{t("security.description")}</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordChange}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">
                    {t("security.fields.current_password")}
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder={t("security.fields.current_password")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">
                    {t("security.fields.new_password")}
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder={t("security.fields.new_password")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {t("security.fields.confirm_password")}
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder={t("security.fields.confirm_password")}
                  />
                </div>
              </CardContent>
              <CardFooter className="w-full md:w-auto">
                <Button type="submit" className="w-full md:w-auto">
                  {t("security.actions.change")}
                </Button>
              </CardFooter>
            </form>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">
                {t("delete.title")}
              </CardTitle>
              <CardDescription className="text-destructive">
                {t("delete.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">{t("delete.button")}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t("delete.dialog.title")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("delete.dialog.description")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {t("delete.dialog.cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={deleteLoading}
                      className="bg-destructive"
                    >
                      {deleteLoading
                        ? t("delete.dialog.deleting")
                        : t("delete.dialog.confirm")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardPageWrapper>
  );
}
