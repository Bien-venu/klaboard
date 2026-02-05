/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { TodoItem } from "@/types/todo";
import { DndContext, closestCenter, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import TaskRow from "./TaskRow";
import { GripVertical } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Add01Icon,
  ArrowDown01Icon,
  AttachmentIcon,
  ChatEdit01Icon,
  Fire02Icon,
  FireIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

// ✅ shadcn table components
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Bienvenu from "@/assets/images/Bienvenu.jpg";
import Older from "@/assets/images/Older.png";
import Doctor from "@/assets/images/doctor.png";

const users: {
  title: string;
  icon: string;
}[] = [
  {
    title: "Bienvenu",
    icon: Older,
  },
  {
    title: "Jean",
    icon: Bienvenu,
  },
  {
    title: "Emme",
    icon: Doctor,
  },
];

const columns = ["To-do", "On Progress", "Need Review", "Done"] as const;
type ColumnType = (typeof columns)[number];

type KanbanProps = {
  todoList: TodoItem[];
};

const KanbanTables: React.FC<KanbanProps> = ({ todoList }) => {
  const [tasks, setTasks] = useState<Record<ColumnType, TodoItem[]>>({
    "To-do": todoList.filter((t) => !t.completed),
    "On Progress": [],
    "Need Review": [],
    Done: todoList.filter((t) => t.completed),
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const fromColumn = active.data.current?.column as ColumnType;
    const toColumn = over.data.current?.column as ColumnType;
    if (!fromColumn || !toColumn) return;

    // same column → reorder
    if (fromColumn === toColumn) {
      const oldIndex = tasks[fromColumn].findIndex((t) => t.id === active.id);
      const newIndex = tasks[toColumn].findIndex((t) => t.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(tasks[fromColumn], oldIndex, newIndex);
        setTasks({ ...tasks, [fromColumn]: reordered });
      }
      return;
    }

    // different column → move
    const fromTasks = tasks[fromColumn].filter((t) => t.id !== active.id);
    const movedTask = tasks[fromColumn].find((t) => t.id === active.id);
    if (!movedTask) return;

    const overIndex = tasks[toColumn].findIndex((t) => t.id === over.id);
    let newToTasks;
    if (overIndex >= 0) {
      newToTasks = [
        ...tasks[toColumn].slice(0, overIndex),
        movedTask,
        ...tasks[toColumn].slice(overIndex),
      ];
    } else {
      newToTasks = [...tasks[toColumn], movedTask];
    }

    setTasks({
      ...tasks,
      [fromColumn]: fromTasks,
      [toColumn]: newToTasks,
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="bg-background flex h-full w-full flex-col gap-4 overflow-auto rounded-xl p-4">
        {columns.map((col) => (
          <ColumnSection
            key={col}
            id={col}
            tasks={tasks[col]}
            tableColumns={tableColumns}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanTables;

// ✅ Table column definitions
const tableColumns: ColumnDef<TodoItem>[] = [
  {
    id: "chevron",
    header: "",
    cell: () => <GripVertical size={20} className="text-text/50" />,
  },
  {
    id: "todo",
    header: "Name",
    accessorKey: "todo",
    cell: ({ row }) => {
      const todo = row.original.todo;
      return <span>{todo}</span>;
    },
  },
  {
    id: "date",
    header: "Date",
    accessorKey: "date",
    cell: () => {
      return <span>May 18, 2024 - May 26, 2024 </span>;
    },
  },
  {
    id: "completed",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.completed
            ? "text-done bg-done/10 rounded-full p-2 px-4"
            : "text-error bg-error/10 rounded-full p-2 px-4"
        }
      >
        {row.original.completed ? "Low" : "High"}
      </span>
    ),
  },
  {
    id: "attachment",
    header: "Attachment",
    accessorKey: "attachment",
    cell: () => {
      return (
        <div className="border-text/10 bg-text/10 flex w-fit items-center gap-2 rounded-full border p-2 px-4">
          <HugeiconsIcon icon={AttachmentIcon} size={20} />{" "}
          <span>requirements.doc</span>
        </div>
      );
    },
  },
  {
    id: "people",
    header: "People",
    accessorKey: "people",
    cell: () => {
      return (
        <div className="flex min-w-20 -space-x-3">
          {users.map((user, index) => (
            <img
              key={index}
              src={user.icon}
              alt={user.title}
              className="ring-foreground size-8 rounded-md object-cover object-top ring-1"
            />
          ))}
        </div>
      );
    },
  },
];

const ColumnSection: React.FC<{
  id: ColumnType;
  tasks: TodoItem[];
  tableColumns: ColumnDef<TodoItem>[];
}> = ({ id, tasks, tableColumns }) => {
  const { setNodeRef } = useDroppable({ id, data: { column: id } });
  const table = useReactTable({
    data: tasks,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div ref={setNodeRef}>
      <Collapsible className="flex w-full flex-col gap-4" defaultOpen>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Add01Icon}
                className="text-text/70 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                size={20}
              />
              <h2 className="font-semibold">{id}</h2>
              {id === "To-do" && (
                <div className="bg-error/10 text-error flex items-center gap-1 rounded-full p-0.5 px-2">
                  <HugeiconsIcon icon={ChatEdit01Icon} size={17} />
                  <span>{tasks.length}</span>
                </div>
              )}
              {id === "On Progress" && (
                <div className="bg-progress/10 text-progress flex items-center gap-1 rounded-full p-0.5 px-2">
                  <HugeiconsIcon icon={Loading03Icon} size={17} />
                  <span>{tasks.length}</span>
                </div>
              )}
              {id === "Need Review" && (
                <div className="bg-review/10 text-review flex items-center gap-1 rounded-full p-0.5 px-2">
                  <HugeiconsIcon icon={Fire02Icon} size={17} />
                  <span>{tasks.length}</span>
                </div>
              )}
              {id === "Done" && (
                <div className="bg-done/10 text-done flex items-center gap-1 rounded-full p-0.5 px-2">
                  <HugeiconsIcon icon={FireIcon} size={17} />
                  <span>{tasks.length}</span>
                </div>
              )}
            </div>
            <HugeiconsIcon icon={ArrowDown01Icon} size={20} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Table className="bg-foreground border-text/10 w-full overflow-hidden rounded-xl border text-sm">
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id} className="px-2 py-2 text-left">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <SortableContext
              items={tasks.map((t) => t.id)}
              strategy={rectSortingStrategy}
            >
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TaskRow key={row.id} row={row} column={id} />
                ))}
              </TableBody>
            </SortableContext>
          </Table>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
