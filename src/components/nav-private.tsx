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
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { DraggableSubItem } from "./SidebarMenuSubItem";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function NavPrivate({ items }: { items: any[] }) {
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
          <Collapsible
            key={items[0].title}
            asChild
            defaultOpen={items[0].isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={items[0].title}>
                  <span>{items[0].title}</span>
                  <ChevronRight
                    className="text-text/70 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    size={20}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="rounded-xl px-0">
                  <SortableContext
                    items={subItems.map((i: { title: any }) => i.title)}
                    strategy={verticalListSortingStrategy}
                  >
                    {subItems.map((subItem: { title: UniqueIdentifier }) => (
                      <DraggableSubItem key={subItem.title} subItem={subItem} />
                    ))}
                  </SortableContext>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    </DndContext>
  );
}
