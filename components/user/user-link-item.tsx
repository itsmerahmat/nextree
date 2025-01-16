"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserLinkItemProps {
  href: string;
  title: string;
}

const UserLinkItem: React.FC<UserLinkItemProps> = ({ href, title }) => {
  const { toast } = useToast();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      toast({
        title: "URL Copied",
        description: "The link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: `Could not copy the URL to clipboard. ${err}`,
        variant: "destructive",
      });
    }
  };
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
              <DropdownMenuItem onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserLinkItem;
