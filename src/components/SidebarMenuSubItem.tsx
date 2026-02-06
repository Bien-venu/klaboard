/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/sidebar";

export function DraggableSubItem({ subItem }: { subItem: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: subItem.title });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const location = useLocation();
  const isActive = location.pathname === subItem.url;

  return (
    <SidebarMenuSubItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <SidebarMenuSubButton asChild>
        <div
          className={`flex cursor-pointer items-center gap-2 rounded-lg px-0 py-2 ${isActive ? "border-text/20 text-text bg-foreground border" : ""}`}
        >
          <GripVertical size={20} className="text-text/30" />
          <div className="flex items-center gap-2">
            {subItem.icon && (
              <img src={subItem.icon} alt={subItem.title} className="size-4" />
            )}
            <span>{subItem.title}</span>
          </div>
        </div>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
