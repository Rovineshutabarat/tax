"use client";

import React, { Fragment } from "react";
import { Home, SchoolIcon } from "lucide-react";
import { Sidebar } from "@/types/sidebar";
import AppSidebar from "@/components/shared/app-sidebar";

const CompanySidebar = () => {
  const sidebarContent: Sidebar = {
    label: "Company Dashboard",
    icon: SchoolIcon,
    groups: [
      {
        label: "Main",
        items: [
          {
            label: "Department",
            icon: Home,
            path: "department",
          },
        ],
      },
    ],
  };

  return (
    <Fragment>
      <AppSidebar data={sidebarContent} />
    </Fragment>
  );
};

export default CompanySidebar;
