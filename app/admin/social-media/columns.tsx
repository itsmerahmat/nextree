"use client";

import { SocialMedia } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteUserDialog } from "@/components/delete-alert";
import { SocialModalForm } from "@/components/social/modal-form";
import { deleteSocial } from "@/actions/social";

export const columns: ColumnDef<SocialMedia>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "platform",
    header: "Platform",
  },
  {
    accessorKey: "url",
    header: "URL",
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
      const social = row.original;

      return (
        <div className="space-x-2">
          <SocialModalForm data={social} type="Edit" />
          <DeleteUserDialog
            onDelete={async () => await deleteSocial(social.id)}
            title="social media"
          />
        </div>
      );
    },
  },
];
