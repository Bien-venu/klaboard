import type { TodoItem } from "@/types/todo";
import { GripVertical } from "lucide-react";

export default function DraggedRowPreview({ row }: { row: TodoItem }) {
  return (
    <div className="bg-foreground w-full border-text/10 rounded-md border p-2 py-4 shadow-xl">
      <div className="flex items-center gap-11 px-4 py-3">
        <GripVertical size={18} className="text-text/40" />
        <span className="font-medium">{row.todo}</span>
      </div>
    </div>
  );
}
