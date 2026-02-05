import * as React from "react";

import Bienvenu from "@/assets/images/Bienvenu.jpg";
import Logo1 from "@/assets/images/logo/Logo1.png";
import Logo2 from "@/assets/images/logo/Logo2.png";
import Logo3 from "@/assets/images/logo/Logo3.png";
import Logo4 from "@/assets/images/logo/Logo4.png";
import { NavMain } from "@/components/nav-main";
import { NavShared } from "@/components/nav-shared";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import {
  Calendar02Icon,
  Mail01Icon,
  Search01Icon,
  Setting07Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { Accounts } from "./Account";
import Logo from "./Logo";
import { NavPrivate } from "./nav-private";
import Productivity from "./Productivity";

const data = {
  user: {
    name: "Bienvenu",
    email: "m@example.com",
    avatar: Bienvenu,
  },
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search01Icon,
    },
    {
      title: "Kla AI",
      url: "#",
      icon: SparklesIcon,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Mail01Icon,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar02Icon,
    },
    {
      title: "Settings & Preferences",
      url: "#",
      icon: Setting07Icon,
    },
  ],
  shared: [
    {
      title: "Shared Pages",
      isActive: true,
      items: [
        {
          title: "HR Tasks Hub",
          url: "/",
          icon: Logo1,
        },
        {
          title: "Windah Comp",
          url: "#",
          icon: Logo2,
        },
        {
          title: "NoSpace Dev",
          url: "#",
          icon: Logo3,
        },
      ],
    },
  ],
  private: [
    {
      title: "Private Pages",
      isActive: true,
      items: [
        {
          title: "Dribbble Portfolio",
          url: "#",
          icon: Logo4,
        },
      ],
    },
  ],
  account: [
    {
      title: "Accounts",
      isActive: true,
      items: [
        {
          title: "Bienvenu",
          icon: Bienvenu,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex h-full flex-col justify-between overflow-hidden">
        <div className="flex flex-col">
          <NavMain items={data.navMain} />
          <NavShared items={data.shared} />
          <NavPrivate items={data.private} />
          <Accounts items={data.account} />
        </div>
        <Productivity />
      </SidebarContent>
    </Sidebar>
  );
}
