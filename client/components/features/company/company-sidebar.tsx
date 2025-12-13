"use client";

import React, { Fragment } from "react";
import { Home, SchoolIcon, User } from "lucide-react";
import { Sidebar } from "@/types/sidebar";
import AppSidebar from "@/components/shared/app-sidebar";

const CompanySidebar = () => {
  const sidebarContent: Sidebar = {
    label: "Company Internal",
    icon: SchoolIcon,
    groups: [
      {
        label: "Main",
        items: [
          {
            label: "Department",
            icon: Home,
            subItems: [
              {
                label: "Department List",
                path: "/company/department/list",
              },
              {
                label: "Department Create",
                path: "/company/department/create",
              },
            ],
          },
          {
            label: "Employee",
            icon: User,
            subItems: [
              {
                label: "Employee List",
                path: "/company/employee/list",
              },
              {
                label: "Add Employee",
                path: "/company/employee/add",
              },
            ],
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
