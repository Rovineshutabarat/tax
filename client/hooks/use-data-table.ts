import React from "react";
import {
  DataTableContext,
  DataTableContextState,
} from "@/components/providers/data-table-provider";

export function useDataTable<Data>(): DataTableContextState<Data> {
  const context = React.useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTable must be used within DataTableProvider");
  }
  return context;
}
