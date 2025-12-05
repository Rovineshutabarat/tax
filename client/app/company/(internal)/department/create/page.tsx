import React from "react";
import AuthGuard from "@/components/shared/auth-guard";

const Page = () => {
  return (
    <AuthGuard permissions={["DEPARTMENT_CREATE"]}>
      Create Page
    </AuthGuard>
  );
};

export default Page;