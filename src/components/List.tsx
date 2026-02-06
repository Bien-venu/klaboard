import type { TodoItem } from "@/types/todo";
import { useTranslation } from "react-i18next";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Add01Icon,
  ArrowDown01Icon,
  ChatEdit01Icon,
  Fire02Icon,
  FireIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import DraggedRowPreview from "./DraggedRowPreview";
import { Tables } from "./Table";

const columns = ["To-do", "On Progress", "Need Review", "Done"] as const;
type ColumnType = (typeof columns)[number];

type KanbanProps = {
  todoList: TodoItem[];
  loading: boolean;
};

const KanbanTables: React.FC<KanbanProps> = ({ todoList, loading }) => {
  const [tasks, setTasks] = useState<Record<ColumnType, TodoItem[]>>({
    "To-do": todoList.filter((t) => !t.completed),
    "On Progress": [],
    "Need Review": [],
    Done: todoList.filter((t) => t.completed),
  });

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    const fromColumn = active.data.current?.column as ColumnType;
    const toColumn = over.data.current?.column as ColumnType;

    if (!fromColumn || !toColumn) return;

    if (fromColumn === toColumn) {
      const oldIndex = tasks[fromColumn].findIndex((t) => t.id === active.id);
      const newIndex = tasks[toColumn].findIndex((t) => t.id === over.id);

      if (newIndex !== -1) {
        setTasks({
          ...tasks,
          [fromColumn]: arrayMove(tasks[fromColumn], oldIndex, newIndex),
        });
      }
      return;
    }

    const movedTask = tasks[fromColumn].find((t) => t.id === active.id);
    if (!movedTask) return;

    setTasks({
      ...tasks,
      [fromColumn]: tasks[fromColumn].filter((t) => t.id !== active.id),
      [toColumn]: [...tasks[toColumn], movedTask],
    });
  };
  const [activeRow, setActiveRow] = useState<TodoItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.5,
      },
    }),
    useSensor(KeyboardSensor),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={({ active }) => {
        const column = active.data.current?.column as ColumnType;
        const task = tasks[column]?.find((t) => t.id === active.id);
        if (task) setActiveRow(task);
      }}
      onDragEnd={(event) => {
        setActiveRow(null);
        handleDragEnd(event);
      }}
    >
      <div className="bg-background flex h-full w-full flex-col gap-4 overflow-auto rounded-lg p-4">
        {columns.map((col) => (
          <ColumnSection
            key={col}
            id={col}
            tasks={tasks[col]}
            loading={loading}
          />
        ))}
      </div>

      <DragOverlay>
        {activeRow ? <DraggedRowPreview row={activeRow} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanTables;

const ColumnSection: React.FC<{
  id: ColumnType;
  tasks: TodoItem[];
  loading: boolean;
}> = ({ id, tasks, loading }) => {
  const { t } = useTranslation();
  const { setNodeRef } = useDroppable({ id, data: { column: id } });

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
    <div ref={setNodeRef} className="min-h-[150px">
      <Collapsible className="flex w-full flex-col gap-4" defaultOpen>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Add01Icon}
                className="text-text/70 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                size={20}
              />
              <h2 className="font-semibold">{getColumnLabel(id)}</h2>
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
          <Tables data={tasks} loading={loading} id={id} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
