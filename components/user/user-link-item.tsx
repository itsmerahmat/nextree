import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Share2, Pencil, Trash } from "lucide-react";

interface UserLinkItemProps {
  href: string;
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
}

const UserLinkItem: React.FC<UserLinkItemProps> = ({
  href,
  title,
  onEdit,
  onDelete,
  onShare,
}) => {
  return (
    <Card className="w-full md:w-1/2">
      <CardContent className="p-1">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="w-full justify-start text-left h-auto py-2 px-4"
            asChild
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onShare && (
                <DropdownMenuItem onClick={onShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
              )}
              {onEdit && (
                <DropdownMenuItem onClick={onEdit}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem onClick={onDelete}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserLinkItem;
