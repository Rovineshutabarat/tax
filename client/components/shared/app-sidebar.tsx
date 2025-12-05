"use client";

import React from "react";
import { Sidebar as NavigationSidebar } from "@/types/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NavigationGroup } from "@/types/navigation.group";
import { NavigationItem } from "@/types/navigation.item";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { NavigationSubItem } from "@/types/navigation.sub.item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

type AppSidebarProps = {
  data: NavigationSidebar;
};

const AppSidebar = ({ data }: AppSidebarProps) => {
  const { session, logout, isLoading } = useAuth();
  const pathName = usePathname();

  function isActive(path: string): boolean {
    return pathName.startsWith(path);
  }

  function isDefaultOpen(item: NavigationItem): boolean {
    if (item?.label === "Dashboard") return true;
    return item?.subItems?.some((sub: NavigationSubItem): boolean =>
      pathName.startsWith(sub.path),
    ) as boolean;
  }

  const { isMobile } = useSidebar();

  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <div
          className={cn(
            "flex items-center border-b py-4 justify-center",
            open && "justify-start px-2",
          )}
        >
          <Link
            href="/"
            className={cn(
              "flex items-center gap-x-3",
              !open && "justify-center",
            )}
          >
            <data.icon />
            <span
              className={cn("font-semibold tracking-wide", !open && "hidden")}
            >
              {data.label}
            </span>
          </Link>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {data.groups.map((group: NavigationGroup, index: number) => {
          return (
            <SidebarGroup key={index}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarMenu>
                {group?.items?.map((item: NavigationItem, index: number) => {
                  return (
                    <Collapsible
                      key={index}
                      defaultOpen={isDefaultOpen(item)}
                      className="group/collapsible"
                      asChild
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="cursor-pointer tracking-wide]">
                            <item.icon />
                            <Link href={item.path ?? ""}>{item.label}</Link>
                            {(item.subItems ?? []).length > 0 && (
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        {item?.subItems?.map(
                          (subItem: NavigationSubItem, index: number) => {
                            return (
                              <CollapsibleContent key={index}>
                                <SidebarMenuSub>
                                  <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                      className={cn("cursor-pointer")}
                                      isActive={isActive(subItem.path)}
                                      href={subItem.path}
                                    >
                                      {subItem.label}
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            );
                          },
                        )}
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={""} alt={session?.user.username} />
                    <AvatarFallback className="rounded-lg uppercase">
                      {session?.user?.username.at(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {session?.user?.username}
                    </span>
                    <span className="truncate text-xs">
                      {session?.user?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={""} alt={session?.user?.username} />
                      <AvatarFallback className="rounded-lg uppercase">
                        {session?.user?.username.at(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {session?.user?.username}
                      </span>
                      <span className="truncate text-xs">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  disabled={isLoading}
                  className="cursor-pointer"
                >
                  <LogOut />
                  {isLoading ? "Please wait..." : "Log out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
