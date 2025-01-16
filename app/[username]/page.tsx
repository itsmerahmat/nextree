import { getUserByUsername } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserLinkItem from "@/components/user/user-link-item";
import { Link, SocialMedia } from "@prisma/client";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import { notFound } from "next/navigation";

interface UserData {
  id: number;
  name: string;
  role: string;
  username: string;
  email: string;
  password: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  links?: Link[];
  socials?: SocialMedia[];
}

export default async function UserLinkPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const userData = (await getUserByUsername(username)) as UserData;
  if (!userData) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center m-5 md:m-16 gap-4">
      <Avatar className="w-20 h-20">
        <AvatarImage src={userData.image || "https://github.com/shadcn.png"} />
        <AvatarFallback>{userData.name[0]}</AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold">{userData.name}</h1>

      <div className="flex gap-4">
        {userData.socials?.map((social) => {
          const Icon =
            social.platform === "Github"
              ? Github
              : social.platform === "Facebook"
              ? Facebook
              : social.platform === "Linkedin"
              ? Linkedin
              : social.platform === "Instagram"
              ? Instagram
              : null;

          return (
            Icon && (
              <Button
                key={social.id}
                variant="outline"
                size="icon"
                asChild
                className="h-10 w-10"
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Button>
            )
          );
        })}
      </div>

      {userData.links?.map((link) => (
        <UserLinkItem key={link.id} href={link.url} title={link.title} />
      ))}
    </div>
  );
}
