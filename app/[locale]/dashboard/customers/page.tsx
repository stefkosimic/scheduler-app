"use client";

import { useTranslation } from "react-i18next";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import { CustomersTable } from "@/components/customers/customers-table";

export default function CustomersPage() {
  const { t } = useTranslation("customers");

  return (
    <DashboardPageWrapper title={t("page.title")} subtitle={t("page.subtitle")}>
      <CustomersTable />
    </DashboardPageWrapper>
  );
}
