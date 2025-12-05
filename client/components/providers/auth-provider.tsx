"use client";
import React from "react";
import { AuthResponse } from "@/types/payload/response/auth.response";
import { setAccessToken } from "@/services/config/api.client";
import { refreshAccessToken } from "@/services/config/refresh.client";
import { Role } from "@/types/entity/role";
import { usePathname } from "next/navigation";
import { Permission } from "@/types/entity/permission";

type AuthProviderContextState = {
  session: AuthResponse | null;
  setSession: (session: AuthResponse | null) => void;
  isAuthenticated: boolean;
  hasPermission: (permissions: string[]) => boolean;
  hasRole: (roles: string[]) => boolean;
  isRefreshLoading: boolean;
};

export const AuthProviderContext = React.createContext<
  AuthProviderContextState | undefined
>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSessionState] = React.useState<AuthResponse | null>(null);
  const [isRefreshLoading, setIsRefreshLoading] = React.useState<boolean>(true);
  const pathname = usePathname();

  const setSession = React.useCallback((response: AuthResponse | null) => {
    setSessionState(response);
    setAccessToken(response?.accessToken ?? null);
  }, []);

  React.useEffect(() => {
    if (pathname.startsWith("/auth")) {
      setIsRefreshLoading(false);
      return;
    }
    (async () => {
      try {
        const response = await refreshAccessToken();
        setSession(response);
      } catch {
        setSession(null);
      } finally {
        setIsRefreshLoading(false);
      }
    })();
  }, [pathname, setSession]);

  const hasRole = React.useCallback(
    (roles: string[]): boolean => {
      if (!session?.user?.roles || roles.length === 0) {
        return false;
      }

      return session.user.roles.some((role: Role): boolean => {
        return roles.includes(role.name);
      });
    },
    [session],
  );

  const hasPermission = React.useCallback(
    (permissions: string[]): boolean => {
      if (!session?.user || permissions.length === 0) {
        return false;
      }

      return session.user.roles.some((role: Role) =>
        role.permissions.some((permission: Permission) =>
          permissions.includes(permission.name),
        ),
      );
    },
    [session],
  );

  const isAuthenticated = React.useMemo(
    () => Boolean(session?.accessToken && session?.user),
    [session],
  );

  return (
    <AuthProviderContext.Provider
      value={{
        session,
        setSession,
        isAuthenticated: isAuthenticated,
        hasRole,
        hasPermission,
        isRefreshLoading,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
}
