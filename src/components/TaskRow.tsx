import type { TodoItem } from "@/types/todo";
import type { Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { flexRender } from "@tanstack/react-table";
import { TableCell, TableRow } from "./ui/table";

const TaskRow: React.FC<{ row: Row<TodoItem>; column: string }> = ({
  row,
  column,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: row.original.id,
    data: { column },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-text/10 cursor-grab border-t"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} ref={setActivatorNodeRef}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TaskRow;
