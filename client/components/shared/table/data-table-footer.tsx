"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "@/hooks/use-params";
import { PaginationResponse } from "@/types/payload/response/common/pagination.response";

type DataTableFooterProps = {
  pagination?: PaginationResponse;
};

export function DataTableFooter({ pagination }: DataTableFooterProps) {
  const { setParams } = useParams();

  return (
    <div className="flex items-center gap-x-10 my-5 justify-end">
      <div className="flex items-center gap-x-3">
        <p className="text-sm text-muted-foreground">Rows per page</p>
        <Select
          value={pagination?.size.toString()}
          onValueChange={(value) =>
            setParams({
              size: Number(value),
            })
          }
        >
          <SelectTrigger className="w-[4.4rem] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="40">40</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="flex items-center text-sm text-muted-foreground">
        Page {pagination ? Number(pagination.page) + 1 : 0} of{" "}
        {pagination?.totalPages ?? 0}
      </p>
      <div className="flex items-center gap-x-3">
        <Button
          variant="outline"
          disabled={!pagination?.hasPrevious}
          onClick={() =>
            setParams({
              page: Number(pagination?.page) - 1,
            })
          }
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          disabled={!pagination?.hasNext}
          onClick={() =>
            setParams({
              page: Number(pagination?.page) + 1,
            })
          }
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
