/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Add01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/sidebar";

export function Accounts({ items }: { items: any[] }) {
  const [subItems, setSubItems] = useState(items[0].items || []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          setSubItems((prev: any[]) => {
            const oldIndex = prev.findIndex(
              (i: { title: UniqueIdentifier }) => i.title === active.id,
            );
            const newIndex = prev.findIndex(
              (i: { title: UniqueIdentifier }) => i.title === over.id,
            );
            return arrayMove(prev, oldIndex, newIndex);
          });
        }
      }}
    >
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={items[0].title}>
              <span>{items[0].title}</span>
              <HugeiconsIcon
                icon={Add01Icon}
                className="text-text/70 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                size={20}
              />
            </SidebarMenuButton>

            <SidebarMenuSub className="rounded-xl px-0">
              <SortableContext
                items={subItems.map((i: { title: any }) => i.title)}
                strategy={verticalListSortingStrategy}
              >
                {subItems.map((subItem: { icon: any; title: string }) => (
                  <SidebarMenuSubItem className="p-0">
                    <SidebarMenuSubButton asChild className="p-0">
                      <div
                        className={`flex items-center gap-2 rounded-xl p-0 px-0 py-2`}
                      >
                        <div className="flex items-center gap-2">
                          {subItem.icon && (
                            <img
                              src={subItem.icon}
                              alt={subItem.title}
                              className="size-6.5 rounded-md object-cover object-top"
                            />
                          )}
                          <span>{subItem.title}</span>
                        </div>
                        <HugeiconsIcon
                          icon={MoreHorizontalIcon}
                          className="text-text/70 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                          size={20}
                        />
                      </div>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SortableContext>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </DndContext>
  );
}
