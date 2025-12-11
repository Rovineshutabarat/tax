"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams } from "@/hooks/use-params";
import { useDataTable } from "@/hooks/use-data-table";
import DataTableColumnSelector from "@/components/shared/table/data-table-column-selector";
import SearchBar from "@/components/shared/search-bar";

type DataTableToolbarProps = {
  title: string;
  description: string;
  createUrl: string;
};

export function DataTableToolbar({
  title,
  description,
  createUrl,
}: DataTableToolbarProps) {
  const { getParams } = useParams();
  const { table, isLoading } = useDataTable();

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage {title}</h2>
          <p className="text-sm mt-1 ml-1 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled={isLoading}>
            <Download />
            <span>Export</span>
          </Button>

          <Link href={createUrl}>
            <Tooltip delayDuration={700}>
              <TooltipTrigger asChild>
                <Button className="cursor-pointer">
                  <Plus />
                  Add {title}
                </Button>
              </TooltipTrigger>
              <TooltipContent>create a new {title}</TooltipContent>
            </Tooltip>
          </Link>
        </div>
      </div>

      <div className="flex justify-between gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          placeholder={`Search ${title}...`}
          defaultValue={getParams.keyword ?? ""}
          displaySize="medium"
        />
        <div className="flex flex-col gap-4 sm:flex-row">
          <DataTableColumnSelector table={table} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
