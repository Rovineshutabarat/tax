"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { Fragment } from "react";
import { User } from "@/types/entity/user";

type EmployeeActionCellProps = {
  employee: User;
};

export const EmployeeActionCell = ({ employee }: EmployeeActionCellProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  return (
    <Fragment>
      {/*<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>*/}
      {/*  <AlertDialogContent>*/}
      {/*    <AlertDialogHeader>*/}
      {/*      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>*/}
      {/*      <AlertDialogDescription>*/}
      {/*        Are you sure you want to delete this item? This action is*/}
      {/*        permanent and cannot be undone.*/}
      {/*      </AlertDialogDescription>*/}
      {/*    </AlertDialogHeader>*/}
      {/*    <AlertDialogFooter>*/}
      {/*      <AlertDialogCancel>Cancel</AlertDialogCancel>*/}
      {/*      <AlertDialogAction*/}
      {/*        onClick={() => deleteMutation.mutate()}*/}
      {/*        className="bg-red-600 dark:text-primary hover:bg-red-700"*/}
      {/*      >*/}
      {/*        Delete*/}
      {/*      </AlertDialogAction>*/}
      {/*    </AlertDialogFooter>*/}
      {/*  </AlertDialogContent>*/}
      {/*</AlertDialog>*/}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/company/department/update/${employee.id}`}
              className="flex items-center gap-x-2 w-full"
            >
              <Edit />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          {/*<DropdownMenuItem*/}
          {/*  className="text-destructive flex items-center cursor-pointer"*/}
          {/*  onClick={() => setShowDeleteDialog(true)}*/}
          {/*>*/}
          {/*  <TrashIcon /> <span>Delete</span>*/}
          {/*</DropdownMenuItem>*/}
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
};
