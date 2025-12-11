"use client";

import React, { Fragment } from "react";
import { Bell, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CompanyNavbar = () => {
  const { session } = useAuth();
  const { changeTheme } = useTheme();
  const pathName = usePathname();

  const segments = pathName.split("/").filter(Boolean);

  return (
    <div className="flex justify-between px-5 p-4 shadow-sm sticky top-0 z-50 bg-background items-center">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="cursor-pointer" />
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment: string , index : number) => {
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">{segment}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== segments.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-x-5">
        <Bell />
        <ShoppingCart onClick={changeTheme} className="cursor-pointer" />
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={""} alt={session?.user.username} />
          <AvatarFallback className="rounded-lg uppercase">
            {session?.user?.username.at(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default CompanyNavbar;
