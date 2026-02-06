import * as React from "react";
import { useTranslation } from "react-i18next";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();

  const data = {
    user: {
      name: t("user.name"),
      email: "m@example.com",
      avatar: Bienvenu,
    },
    navMain: [
      {
        title: t("nav.search"),
        url: "#",
        icon: Search01Icon,
        id: "search",
      },
      {
        title: t("nav.klaAi"),
        url: "#",
        icon: SparklesIcon,
        id: "klaAi",
      },
      {
        title: t("nav.inbox"),
        url: "#",
        icon: Mail01Icon,
        id: "inbox",
      },
      {
        title: t("nav.calendar"),
        url: "#",
        icon: Calendar02Icon,
        id: "calendar",
      },
      {
        title: t("nav.settings"),
        url: "#",
        icon: Setting07Icon,
        id: "settings",
      },
    ],
    shared: [
      {
        title: t("nav.sharedPages"),
        isActive: true,
        items: [
          {
            title: t("nav.hrTasksHub"),
            url: "/",
            icon: Logo1,
          },
          {
            title: t("nav.windahComp"),
            url: "#",
            icon: Logo2,
          },
          {
            title: t("nav.noSpaceDev"),
            url: "#",
            icon: Logo3,
          },
        ],
      },
    ],
    private: [
      {
        title: t("nav.privatePages"),
        isActive: true,
        items: [
          {
            title: t("nav.dribbblePortfolio"),
            url: "#",
            icon: Logo4,
          },
        ],
      },
    ],
    account: [
      {
        title: t("nav.accounts"),
        isActive: true,
        items: [
          {
            title: t("user.name"),
            icon: Bienvenu,
          },
        ],
      },
    ],
  };

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
        <div className="flex flex-col h-full overflow-auto">
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
