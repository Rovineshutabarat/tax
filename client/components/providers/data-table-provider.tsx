"use client";

import React from "react";
import { Table } from "@tanstack/table-core";

type DataTableProviderProps<Data> = {
  children: React.ReactNode;
  isLoading: boolean;
  table: Table<Data>;
};

export type DataTableContextState<Data> = {
  isLoading: boolean;
  table: Table<Data>;
};

export const DataTableContext = React.createContext<
  DataTableContextState<any> | undefined
>(undefined);

export function DataTableProvider<Data>({
  children,
  isLoading,
  table,
}: DataTableProviderProps<Data>) {
  return (
    <DataTableContext.Provider value={{ isLoading, table }}>
      <div className="flex flex-col gap-5">{children}</div>
    </DataTableContext.Provider>
  );
}

export default DataTableProvider;
