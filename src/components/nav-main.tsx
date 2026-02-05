/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Fire02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: any;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu></SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.title.toLocaleLowerCase() === "inbox" ? (
                <SidebarMenuButton tooltip={item.title} className="flex">
                  <div className="flex items-center gap-2">
                    {item.icon && (
                      <HugeiconsIcon
                        icon={item.icon}
                        size={20}
                        className="text-text/70"
                      />
                    )}
                    <span>{item.title}</span>
                  </div>
                  <div className="bg-special/10 text-special ml-auto flex items-center gap-1 rounded-full p-0.5 px-2 font-semibold">
                    <HugeiconsIcon icon={Fire02FreeIcons} size={17} />
                    <span>New</span>
                  </div>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && (
                    <HugeiconsIcon
                      icon={item.icon}
                      size={20}
                      className="text-text/70"
                    />
                  )}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
