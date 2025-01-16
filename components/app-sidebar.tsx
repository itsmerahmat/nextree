"use client";

import * as React from "react";
import {
  ChartArea,
  ContactRound,
  GalleryVerticalEnd,
  Link,
  User as UserIcon,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { User } from "@/lib/session";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    image: "https://github.com/shadcn.png",
  },
  teams: [
    {
      name: "Nextree",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  adminMenu: [
    {
      name: "Dashboard",
      url: "/admin",
      icon: ChartArea,
    },
    {
      name: "User",
      url: "/admin/user",
      icon: UserIcon,
    },
    {
      name: "Link",
      url: "/admin/links",
      icon: Link,
    },
    {
      name: "Social Media",
      url: "/admin/social-media",
      icon: ContactRound,
    },
  ],
  userMenu: [
    {
      name: "User",
      url: "/admin/user",
      icon: UserIcon,
    },
    {
      name: "Link",
      url: "/admin/links",
      icon: Link,
    },
    {
      name: "Social Media",
      url: "/admin/social-media",
      icon: ContactRound,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects
          projects={user?.role === "ADMIN" ? data.adminMenu : data.userMenu}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
