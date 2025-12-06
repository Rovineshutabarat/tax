"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable, VisibilityState
} from "@tanstack/react-table";
import { useParams } from "@/hooks/use-params";
import { DepartmentService } from "@/services/department.service";
import { DepartmentColumns } from "@/components/features/company/department/department-column";
import DataTableProvider from "@/components/providers/data-table-provider";
import { DataTableToolbar } from "@/components/shared/table/data-table-toolbar";
import { DataTableContent } from "@/components/shared/table/data-table-content";
import { DataTableFooter } from "@/components/shared/table/data-table-footer";

const Page = () => {
  const { getQueryString } = useParams();

  const { data: departments, isLoading } = useQuery({
    queryKey: ["departments", getQueryString()],
    queryFn: () => DepartmentService.findAllDepartments(),
  });
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    data: departments?.data ?? [],
    columns: DepartmentColumns,
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
          title="Department"
          description=" Organize your educational content with custom courses for
                better learner navigation"
          createUrl="/company/department/create"
        />
        <DataTableContent columns={DepartmentColumns} />
        <DataTableFooter pagination={departments?.pagination} />
      </DataTableProvider>
    </div>
  );
};

export default Page;