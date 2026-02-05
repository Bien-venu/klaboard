/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TodoItem } from "@/types/todo";
import { DndContext, closestCenter, useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import {
  Add01Icon,
  ChatEdit01Icon,
  Fire02Icon,
  FireIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import TaskCard from "./TaskCard";

type KanbanProps = {
  todoList: TodoItem[];
};

const columns = ["To-do", "On Progress", "Need Review", "Done"] as const;
type ColumnType = (typeof columns)[number];

const Kanban: React.FC<KanbanProps> = ({ todoList }) => {
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

    if (fromColumn && toColumn && fromColumn !== toColumn) {
      const fromTasks = tasks[fromColumn].filter((t) => t.id !== active.id);
      const movedTask = tasks[fromColumn].find((t) => t.id === active.id);
      if (!movedTask) return;

      const toTasks = [...tasks[toColumn], movedTask];

      setTasks({
        ...tasks,
        [fromColumn]: fromTasks,
        [toColumn]: toTasks,
      });
    }
  };

  return (
    <div className="bg-background h-full w-full overflow-auto rounded-xl px-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-4">
          {columns.map((col) => (
            <Column key={col} id={col} tasks={tasks[col]} />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

const Column: React.FC<{ id: ColumnType; tasks: TodoItem[] }> = ({
  id,
  tasks,
}) => {
  const { setNodeRef } = useDroppable({
    id,
    data: { column: id },
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-background flex h-full w-full flex-col gap-4 rounded-lg"
    >
      <div className="bg-background sticky top-0 border-0 pt-4">
        <div className="border-text/10 bg-foreground flex items-center justify-between gap-2 rounded-xl border p-2">
          <div className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Add01Icon}
              className="text-text/70 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              size={20}
            />
            <h2 className="font-semibold">{id}</h2>
          </div>

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
      </div>

      <div className="flex h-full w-full flex-col p-1">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={rectSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} column={id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Kanban;
