import { logout } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserLinkItem from "@/components/user/user-link-item";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

export default async function UserLinkPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  return (
    <div className="flex flex-col items-center justify-center m-5 md:m-16 gap-4">
      <Avatar className="w-20 h-20">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold">{username}</h1>

      <div className="flex gap-4">
        <Button
          key="1"
          variant="outline"
          size="icon"
          asChild
          className="h-10 w-10"
        >
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </Button>
        <Button
          key="2"
          variant="outline"
          size="icon"
          asChild
          className="h-10 w-10"
        >
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </Button>
        <Button
          key="3"
          variant="outline"
          size="icon"
          asChild
          className="h-10 w-10"
        >
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </Button>
        <Button
          key="4"
          variant="outline"
          size="icon"
          asChild
          className="h-10 w-10"
        >
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </Button>
      </div>
      <UserLinkItem href="https://shadcn.com" title="Shadcn" onEdit={logout} />
      <UserLinkItem href="https://shadcn.com" title="Shadcn" onEdit={logout} />
      <UserLinkItem href="https://shadcn.com" title="Shadcn" onEdit={logout} />
      <UserLinkItem href="https://shadcn.com" title="Shadcn" onEdit={logout} />
      <UserLinkItem href="https://shadcn.com" title="Shadcn" onEdit={logout} />
    </div>
  );
}
