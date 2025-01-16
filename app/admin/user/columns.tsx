"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { deleteUser } from "@/actions/user";
import { UserModalForm } from "@/components/user/modal-form";
import { DeleteUserDialog } from "@/components/delete-alert";

export const columns: ColumnDef<User>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="space-x-2">
          <UserModalForm data={user} type="Edit" />
          <DeleteUserDialog
            onDelete={async () => await deleteUser(user.id)}
            title="user"
          />
        </div>
      );
    },
  },
];
