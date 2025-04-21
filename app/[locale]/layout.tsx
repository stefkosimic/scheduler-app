import { Inter } from "next/font/google";
import type React from "react";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { notFound } from "next/navigation";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";

import TranslationsProvider from "@/components/TranslationsProvider";

import initTranslations from "../i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scheduler App",
  description: "Book appointments with ease",
  generator: "v0.dev",
};

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  if (!i18nConfig.locales.includes(locale)) {
    return notFound();
  }

  const namespaces = [
    "auth",
    "sidebar",
    "dashboard",
    "customers",
    "services",
    "availability",
    "appointments",
    "settings",
  ];

  const { resources } = await initTranslations(locale, namespaces);

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body className={inter.className}>
        <TranslationsProvider
          namespaces={namespaces}
          locale={locale}
          resources={resources}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
