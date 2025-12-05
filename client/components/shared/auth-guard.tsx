"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

type AuthGuardProps = {
  children: React.ReactNode;
  permissions?: string[];
  roles?: string[];
};

const AuthGuard = ({ children, permissions, roles }: AuthGuardProps) => {
  const { isAuthenticated, hasRole, hasPermission, isRefreshLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isRefreshLoading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
      } else if (roles && !hasRole(roles)) {
        router.push("/unauthorized");
      } else if (permissions && !hasPermission(permissions)) {
        router.push("/unauthorized");
      }
    }
  }, [isRefreshLoading, isAuthenticated, roles, permissions, hasRole, hasPermission, router]);

  if (isRefreshLoading || !isAuthenticated) return null;

  if (roles && !hasRole(roles)) return null;
  if (permissions && !hasPermission(permissions)) return null;

  return <>{children}</>;
};

export default AuthGuard;
