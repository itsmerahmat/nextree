"use client";

import * as React from "react";
import {
  ChartArea,
  ContactRound,
  GalleryVerticalEnd,
  Link,
  User,
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
  projects: [
    {
      name: "Dashboard",
      url: "/admin",
      icon: ChartArea,
    },
    {
      name: "User",
      url: "/admin/user",
      icon: User,
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
  user: {
    name: string;
    email: string;
    image: string;
  } | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {user ? <NavUser user={user} /> : <p>Please log in</p>}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
