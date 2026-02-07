/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TodoItem } from "@/types/todo";
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useTranslation } from "react-i18next";
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

    const toColumn =
      (over.data.current?.column as ColumnType) ?? (over.id as ColumnType);

    if (!fromColumn || !toColumn) return;

    if (fromColumn === toColumn) {
      const items = tasks[fromColumn];
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setTasks({
          ...tasks,
          [fromColumn]: arrayMove(items, oldIndex, newIndex),
        });
      }
      return;
    }

    const fromItems = [...tasks[fromColumn]];
    const toItems = [...tasks[toColumn]];

    const activeIndex = fromItems.findIndex((i) => i.id === active.id);
    if (activeIndex === -1) return;

    const [movedItem] = fromItems.splice(activeIndex, 1);

    const overIndex = toItems.findIndex((i) => i.id === over.id);

    if (overIndex === -1) {
      toItems.push(movedItem);
    } else {
      toItems.splice(overIndex, 0, movedItem);
    }

    setTasks({
      ...tasks,
      [fromColumn]: fromItems,
      [toColumn]: toItems,
    });
  };

  const [activeTask, setActiveTask] = useState<TodoItem | null>(null);

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const fromColumn = active.data.current?.column as ColumnType;
    const toColumn =
      (over.data.current?.column as ColumnType) ?? (over.id as ColumnType);

    if (!fromColumn || !toColumn || fromColumn === toColumn) return;

    setTasks((prev) => {
      const fromItems = [...prev[fromColumn]];
      const toItems = [...prev[toColumn]];

      const activeIndex = fromItems.findIndex((i) => i.id === active.id);
      if (activeIndex === -1) return prev;

      const [movedItem] = fromItems.splice(activeIndex, 1);

      const overIndex = toItems.findIndex((i) => i.id === over.id);
      if (overIndex === -1) {
        toItems.push(movedItem);
      } else {
        toItems.splice(overIndex, 0, movedItem);
      }

      return {
        ...prev,
        [fromColumn]: fromItems,
        [toColumn]: toItems,
      };
    });

    active.data.current.column = toColumn;
  };

  return (
    <div className="bg-background h-full w-full overflow-auto rounded-lg px-4">
      <DndContext
        collisionDetection={pointerWithin}
        onDragStart={(event) => {
          const { active } = event;
          const fromColumn = active.data.current?.column as ColumnType;
          const task =
            tasks[fromColumn].find((t) => t.id === active.id) || null;
          setActiveTask(task);
        }}
        onDragOver={handleDragOver}
        onDragEnd={(event) => {
          handleDragEnd(event);
          setActiveTask(null); 
        }}
      >
        <div className="grid min-w-[1000px] grid-cols-4 gap-4">
          {columns.map((col) => (
            <Column key={col} id={col} tasks={tasks[col]} activeTask={null} />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} column={activeTask.column} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

const Column: React.FC<{
  activeTask: TodoItem | null;
  id: ColumnType;
  tasks: TodoItem[];
}> = ({ id, tasks }) => {
  const { t } = useTranslation();
  const { setNodeRef } = useDroppable({
    id,
    data: { column: id },
  });

  const getColumnLabel = (id: ColumnType) => {
    switch (id) {
      case "To-do":
        return t("kanban.todo");
      case "On Progress":
        return t("kanban.onProgress");
      case "Need Review":
        return t("kanban.needReview");
      case "Done":
        return t("kanban.done");
      default:
        return id;
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-background flex h-full w-full flex-col gap-4 rounded-lg"
    >
      <div className="bg-background sticky top-0 border-0 pt-4">
        <div className="border-text/10 bg-foreground flex items-center justify-between gap-2 rounded-lg border p-2">
          <div className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Add01Icon}
              className="text-text/70 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              size={20}
            />
            <h2 className="font-semibold">{getColumnLabel(id)}</h2>
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
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              column={id}
              data-testid="todo-item"
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Kanban;
