"use client";

import React from "react";
import { Bell, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useParams } from "@/hooks/use-params";
import SearchBar from "@/components/shared/search-bar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

const CompanyNavbar = () => {
  const { getParams } = useParams();
  const router = useRouter();
  const { session } = useAuth();

  console.log(session);

  return (
    <div className="flex justify-between px-5 p-4 shadow-sm sticky top-0 z-50 bg-background items-center">
      <SidebarTrigger className="cursor-pointer" />
      <SearchBar
        defaultValue={getParams.keyword ?? ""}
        placeholder="Search anything..."
        displaySize="large"
      />
      <div className="flex items-center gap-x-5">
        <Bell />
        <ShoppingCart
          onClick={() => router.push("/cart")}
          className="cursor-pointer"
        />
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
