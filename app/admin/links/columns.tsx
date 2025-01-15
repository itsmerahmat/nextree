"use client";

import { Link } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteUserDialog } from "@/components/delete-alert";
import { deleteLink } from "@/actions/link";
import { LinkModalForm } from "@/components/link/modal-form";

export const columns: ColumnDef<Link>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const link = row.original;

      return <span>{link.isActive ? "Active" : "Inactive"}</span>;
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const link = row.original;

      return (
        <div className="space-x-2">
          <LinkModalForm data={link} type="Edit" />
          <DeleteUserDialog
            onDelete={async () => await deleteLink(link.id)}
            title="link"
          />
        </div>
      );
    },
  },
];
