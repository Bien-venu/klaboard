/* eslint-disable @typescript-eslint/no-unused-vars */
import Bienvenu from "@/assets/images/Bienvenu.jpg";
import Older from "@/assets/images/Older.png";
import Doctor from "@/assets/images/doctor.png";
import type { TodoItem } from "@/types/todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useMemo } from "react";

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

import { useTranslation } from "react-i18next";
import EditTodo from "./EditTodo";
import DeleteTodo from "./Delete";

const TaskCard: React.FC<{ task: TodoItem; column: ColumnType }> = ({
  task,
  column,
}) => {
  const { t } = useTranslation();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { column },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const randomOrder = (arr: typeof users) =>
    [...arr].sort(() => Math.random() - 0.5);
  const fromFront = (arr: typeof users) => arr;
  const fromBack = (arr: typeof users) => [...arr].reverse();
  const fromCenter = (arr: typeof users) => {
    if (arr.length === 3) {
      return [arr[1], arr[0], arr[2]];
    }
    return arr;
  };
  const mode: "random" | "front" | "back" | "center" = "random";

  const orderedUsers = useMemo(() => {
    return mode === "random"
      ? randomOrder(users)
      : mode === "front"
        ? fromFront(users)
        : mode === "back"
          ? fromBack(users)
          : fromCenter(users);
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="border-text/10 bg-foreground mb-2 flex cursor-grab flex-col gap-3 rounded-md border py-3 shadow-xs"
    >
      <div {...listeners} className="flex flex-col gap-1">
        <div className="text-text/40 flex items-center gap-1 px-3 font-semibold">
          <span className="bg-text/40 border-background h-3 w-3 rounded-full border-2"></span>
          <span>{t("kanban.card.mockDate")}</span>
        </div>
        <div className="flex items-center justify-between gap-4 px-3 font-semibold">
          <h1 className="line-clamp-1 w-fit text-base font-semibold">
            {task.todo}
          </h1>
          <HugeiconsIcon
            icon={MoreHorizontalIcon}
            size={20}
            className="w-fit"
          />
        </div>
        <p className="text-text/70 line-clamp-1 w-fit px-3 text-sm">
          {task.todo}
        </p>
      </div>
      <div className="border-text/10 flex items-center justify-between border-t px-3 pt-3">
        <div className="flex items-center gap-1">
          <EditTodo todo={task} />
          <DeleteTodo todo={task} />
        </div>
        <div
          {...listeners}
          className="border-text/10 flex items-center justify-between overflow-hidden rounded-lg"
        >
          <div className="flex -space-x-3">
            {orderedUsers.map((user, index) => (
              <img
                key={index}
                src={user.icon}
                alt={user.title}
                className="ring-foreground size-8 rounded-md object-cover object-top ring-1"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
