"use client";

import type { TodoItem } from "@/types/todo";
import type { Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { flexRender } from "@tanstack/react-table";
import { TableCell } from "./ui/table";

type ColumnType = "To-do" | "On Progress" | "Need Review" | "Done";

const TaskRow: React.FC<{ row: Row<TodoItem>; column: ColumnType }> = ({
  row,
  column,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: row.original.id,
      data: { column },
    });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-text/10 cursor-grab border-t"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </tr>
  );
};

export default TaskRow;
