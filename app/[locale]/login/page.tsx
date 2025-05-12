"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/actions/auth";
import { useTranslation } from "react-i18next";

import LanguageChanger from "@/components/LanguageChanger";
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

export default function LoginPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { redirect } = await signIn(email, password);
      if (redirect) {
        router.push(redirect);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <LanguageChanger />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {t("login.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("login.email")}</Label>
                <Input
                  id="email"
                  name="email"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("login.password")}</Label>
                  <Link
                    className="text-sm text-primary underline-offset-4 hover:underline"
                    href="/forgot-password"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>
                <Input id="password" name="password" required type="password" />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button loading={loading} className="w-full" type="submit">
                {loading ? t("login.loading") : t("login.login")}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t("login.noAccount")}{" "}
            <Link
              className="text-primary underline-offset-4 hover:underline"
              href="/signup"
            >
              {t("login.signupLink")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
