"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "@/actions/auth";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("signup");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);

    const fullName = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      setError(t("error.passwordMismatch"));
      return;
    }

    try {
      const user = await signUp(email, password, fullName);
      console.log("User signed up:", user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">{t("fullName.label")}</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder={t("fullName.placeholder")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email.label")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("email.placeholder")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("password.label")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("password.placeholder")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  {t("confirmPassword.label")}
                </Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  required
                  type="password"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                {t("button")}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t("alreadyHaveAccount")}{" "}
            <Link
              className="text-primary underline-offset-4 hover:underline"
              href="/login"
            >
              {t("login")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
