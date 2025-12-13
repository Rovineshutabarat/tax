"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useParams } from "@/hooks/use-params";
import DataTableProvider from "@/components/providers/data-table-provider";
import { DataTableToolbar } from "@/components/shared/table/data-table-toolbar";
import { DataTableContent } from "@/components/shared/table/data-table-content";
import { DataTableFooter } from "@/components/shared/table/data-table-footer";
import { EmployeeService } from "@/services/employee.service";
import { EmployeeColumns } from "@/components/features/company/employee/employee-column";

const Page = () => {
  const { getQueryString } = useParams();

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees", getQueryString()],
    queryFn: () => EmployeeService.findAllEmployees(),
  });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      phoneNumber: false,
    });

  const table = useReactTable({
    data: employees?.data ?? [],
    columns: EmployeeColumns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border-0">
      <DataTableProvider isLoading={isLoading} table={table}>
        <DataTableToolbar
          title="Employees"
          description="Manage employee data, roles, and organizational assignments"
          createUrl="/company/employee/add"
        />
        <DataTableContent columns={EmployeeColumns} />
        <DataTableFooter pagination={employees?.pagination} />
      </DataTableProvider>
    </div>
  );
};

export default Page;
