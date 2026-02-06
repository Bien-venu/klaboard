/* eslint-disable @typescript-eslint/no-unused-vars */
import Bienvenu from "@/assets/images/Bienvenu.jpg";
import Older from "@/assets/images/Older.png";
import Doctor from "@/assets/images/doctor.png";
import type { TodoItem } from "@/types/todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AttachmentIcon,
  Message02Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

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

const TaskCard: React.FC<{ task: TodoItem; column: ColumnType }> = ({
  task,
  column,
}) => {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-text/10 bg-foreground mb-2 flex cursor-grab flex-col gap-3 rounded-md border py-3 shadow-xs"
    >
      <div className="flex flex-col gap-1">
        <div className="text-text/40 flex items-center gap-1 px-3 font-semibold">
          <span className="bg-text/40 border-background h-3 w-3 rounded-full border-2"></span>
          <span>May 28, 2024</span>
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
        <div className="flex items-center gap-2">
          <div className="text-text border-text/10 flex items-center gap-1 rounded-lg border p-0.5 px-1.5">
            <HugeiconsIcon icon={Message02Icon} size={17} /> <span>8</span>
          </div>
          <div className="text-text border-text/10 flex items-center gap-1 rounded-lg border p-0.5 px-1.5">
            <HugeiconsIcon icon={AttachmentIcon} size={17} /> <span>8</span>
          </div>
        </div>
        <div className="border-text/10 flex items-center justify-between overflow-hidden rounded-xl">
          <div className="flex -space-x-3">
            {users.map((user, index) => (
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
