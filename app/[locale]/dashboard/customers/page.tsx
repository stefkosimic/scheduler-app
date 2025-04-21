import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import { CustomersTable } from "@/components/customers/customers-table";

export default function CustomersPage() {
  return (
    <DashboardPageWrapper
      title="Customers"
      subtitle="Manage and view your customer list"
    >
      <CustomersTable />
    </DashboardPageWrapper>
  );
}
