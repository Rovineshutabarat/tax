import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { EmployeeActionCell } from "@/components/features/company/employee/employee-action-cell";
import { Role } from "@/types/entity/role";
import { Employee } from "@/types/entity/employee";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EmployeeStatus } from "@/types/enums/employee.status";

export const EmployeeColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
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
      <div className="text-center">{row.getValue("name")}</div>
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
    accessorKey: "phoneNumber",
    header: () => (
      <Button variant="ghost" className="text-center cursor-pointer">
        Phone Number
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "baseSalary",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Base Salary
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
      <div className="text-center">{row.getValue("baseSalary")}</div>
    ),
  },
  {
    accessorKey: "department",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Department
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
      <div className="text-center">{row.original.department.name}</div>
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
    accessorKey: "employeeStatus",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Employee Status
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
      <Badge
        className={cn(
          row.original.employeeStatus === EmployeeStatus.Values.RESIGNED ?
            "bg-destructive text-white" : "bg-blue-500 text-white",
        )}
      >
        {row.original.employeeStatus}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => <EmployeeActionCell employee={row.original} />,
  },
];
