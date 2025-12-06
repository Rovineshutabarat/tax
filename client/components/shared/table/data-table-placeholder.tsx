"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

type DataTablePlaceholderProps = {
  cols: number;
};

const DataTablePlaceholder = ({ cols }: DataTablePlaceholderProps) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-md shadow-sm overflow-hidden">
        <Table>
          <TableHeader
            className={cn(
              theme === "dark"
                ? "bg-primary/10"
                : theme === "light"
                  ? "bg-primary/30"
                  : "bg-primary",
            )}
          >
            <TableRow>
              {Array(cols)
                .fill(0)
                .map((_, index) => (
                  <TableHead key={index} className="w-20">
                    <Skeleton className="h-5 w-24 mx-auto" />
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  {Array(cols)
                    .fill(0)
                    .map((_, index) => (
                      <TableCell className="text-center" key={index}>
                        <Skeleton
                          className={cn(
                            "h-5 w-24 mx-auto",
                            theme === "light" && "bg-primary/20",
                          )}
                        />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTablePlaceholder;
