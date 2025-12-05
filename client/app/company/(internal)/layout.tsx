import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import CompanySidebar from "@/components/features/company/company-sidebar";
import CompanyNavbar from "@/components/features/company/company-navbar";
import AuthGuard from "@/components/shared/auth-guard";

type CompanyLayoutProps = {
  children: React.ReactNode;
};

export default function CompanyLayout({ children }: CompanyLayoutProps) {
  return (
    <AuthGuard roles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
      <SidebarProvider>
        <CompanySidebar />
        <SidebarInset>
          <CompanyNavbar />
          <div className="p-5">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
