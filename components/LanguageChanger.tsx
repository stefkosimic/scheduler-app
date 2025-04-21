"use client";

import { usePathname, useRouter } from "next/navigation";
import i18nConfig from "@/i18nConfig";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageChanger({ subMenu }: { subMenu?: boolean }) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      // @ts-ignore
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  const languages = [
    {
      label: "English",
      value: "en",
    },
    {
      label: "Deutsch",
      value: "de",
    },
    {
      label: "Serbian",
      value: "sr",
    },
  ];

  return (
    <>
      {subMenu ? (
        <>
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.value}
              onClick={() => handleChange(language.value)}
              className="cursor-pointer"
            >
              {language.label}
            </DropdownMenuItem>
          ))}
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.value}
                onClick={() => handleChange(language.value)}
                className="cursor-pointer"
              >
                {language.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
