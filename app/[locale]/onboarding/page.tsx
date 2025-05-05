"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateProfile } from "@/actions/auth";
import { createService } from "@/actions/services";
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

export default function OnboardingPage() {
  const { t } = useTranslation("onboarding");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"profile" | "service">("profile");
  const [serviceLoading, setServiceLoading] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    duration: "",
    price: "",
    description: "",
  });

  const handleOnboarding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const companyName = formData.get("company_name") as string;
    const jobTitle = formData.get("job_title") as string;
    const username = formData.get("username") as string;
    try {
      await updateProfile(companyName, jobTitle, true, username);
      setStep("service");
    } catch (error) {
      console.error("Onboarding error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServiceLoading(true);
    try {
      await createService({
        name: serviceForm.name,
        duration: Number(serviceForm.duration),
        price: Number(serviceForm.price),
        description: serviceForm.description,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Service creation error:", error);
      router.push("/dashboard");
    } finally {
      setServiceLoading(false);
    }
  };

  const handleSkipService = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex gap-2 mb-2">
            <span
              className={
                step === "profile" ? "font-bold" : "text-muted-foreground"
              }
            >
              {t("steps.profile")}
            </span>
            <span>→</span>
            <span
              className={
                step === "service" ? "font-bold" : "text-muted-foreground"
              }
            >
              {t("steps.service")}
            </span>
          </div>
          {step === "profile" && (
            <>
              <CardTitle className="text-2xl font-bold">
                {t("page.title")}
              </CardTitle>
              <CardDescription>{t("page.subtitle")}</CardDescription>
            </>
          )}
          {step === "service" && (
            <>
              <CardTitle className="text-2xl font-bold">
                {t("service_form.title")}
              </CardTitle>
              <CardDescription>{t("service_form.description")}</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {step === "profile" && (
            <form onSubmit={handleOnboarding}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">
                    {t("form.company_name.label")}
                  </Label>
                  <Input
                    id="company_name"
                    name="company_name"
                    placeholder={t("form.company_name.placeholder")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job_title">{t("form.job_title.label")}</Label>
                  <Input
                    id="job_title"
                    name="job_title"
                    placeholder={t("form.job_title.placeholder")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">{t("form.username.label")}</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder={t("form.username.placeholder")}
                    required
                  />
                </div>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? t("actions.saving") : t("actions.continue")}
                </Button>
              </div>
            </form>
          )}
          {step === "service" && (
            <form onSubmit={handleServiceSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service_name">
                    {t("service_form.fields.name.label")}
                  </Label>
                  <Input
                    id="service_name"
                    value={serviceForm.name}
                    onChange={(e) =>
                      setServiceForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="service_duration">
                      {t("service_form.fields.duration.label")}
                    </Label>
                    <Input
                      id="service_duration"
                      type="number"
                      value={serviceForm.duration}
                      onChange={(e) =>
                        setServiceForm((f) => ({
                          ...f,
                          duration: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service_price">
                      {t("service_form.fields.price.label")}
                    </Label>
                    <Input
                      id="service_price"
                      type="number"
                      value={serviceForm.price}
                      onChange={(e) =>
                        setServiceForm((f) => ({ ...f, price: e.target.value }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service_description">
                    {t("service_form.fields.description.label")}
                  </Label>
                  <Input
                    id="service_description"
                    value={serviceForm.description}
                    onChange={(e) =>
                      setServiceForm((f) => ({
                        ...f,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={serviceLoading}
                  >
                    {t("service_form.actions.add")}
                  </Button>
                  <Button
                    className="w-full"
                    type="button"
                    variant="outline"
                    onClick={handleSkipService}
                  >
                    {t("service_form.actions.skip")}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
