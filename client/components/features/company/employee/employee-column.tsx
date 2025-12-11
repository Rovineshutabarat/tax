import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { User } from "@/types/entity/user";
import { EmployeeActionCell } from "@/components/features/company/employee/employee-action-cell";
import { Role } from "@/types/entity/role";

export const EmployeeColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "username",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        {column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        {column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "roles",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role
        {column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const roles: Role[] = row.original.roles;

      const formatRole = (role: string) =>
        role
          .replace(/^ROLE_/, "")
          .toLowerCase()
          .replace(/_/g, " ");

      return (
        <div className="flex justify-center items-center flex-wrap gap-2">
          {roles?.map((role, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700"
            >
              {formatRole(role.name)}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => <EmployeeActionCell employee={row.original} />,
  },
];
