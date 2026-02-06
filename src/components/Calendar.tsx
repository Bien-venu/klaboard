import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Bienvenu from "@/assets/images/Bienvenu.jpg";
import Older from "@/assets/images/Older.png";
import Doctor from "@/assets/images/doctor.png";
import EditTodo from "./EditTodo";
import DeleteTodo from "./Delete";
import { useTranslation } from "react-i18next";

type TodoItem = {
  id: number;
  todo: string;
  priority?: "High" | "Medium" | "Low";
  description?: string;
};

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

// Theme colors for priority
const priorityColors: Record<string, string> = {
  High: "bg-error border-error",
  Medium: "bg-review border-review",
  Low: "bg-progress border-progress",
};

const Calendar: React.FC<{ todoList: TodoItem[] }> = ({ todoList }) => {
  const { t, i18n } = useTranslation();
  const today = new Date();

  const priorityOrder: ("High" | "Medium" | "Low")[] = [
    "High",
    "Medium",
    "Low",
  ];

  // Assign each todo a unique date, time, and priority
  const eventsWithDates = todoList.map((t, index) => {
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + index); // each todo on a different day
    startDate.setHours(7 + (index % 8), 0, 0, 0); // start time: 9AM + index hours
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // 1-hour duration

    const priority = t.priority ?? priorityOrder[index % priorityOrder.length];

    return {
      id: String(t.id),
      title: t.todo,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      extendedProps: {
        description: t.description,
        priority,
      },
    };
  });

  const [events] = useState(eventsWithDates);

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

  const orderedUsers =
    mode === "random"
      ? randomOrder(users)
      : mode === "front"
        ? fromFront(users)
        : mode === "back"
          ? fromBack(users)
          : fromCenter(users);

  return (
    <div className="bg-background text-text h-full w-full min-w-[1400px] overflow-hidden rounded-lg px-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        events={events}
        eventContent={(arg) => {
          const priority = arg.event.extendedProps.priority as
            | "High"
            | "Medium"
            | "Low"
            | undefined;

          return (
            <div
              className={`bg-foreground border-text/10 flex h-fit w-full flex-col gap-1 rounded-lg border p-2 shadow-sm`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-text/60 flex items-center gap-1 text-xs font-semibold">
                  <span className="border-background bg-text/60 h-3 w-3 rounded-full border-2"></span>
                  <span>
                    {new Date(arg.event.start!).toLocaleDateString(i18n.language, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div
                  className={`bg-opacity- flex rounded-lg px-2 py-1 text-xs font-semibold text-white ${
                    priority && priorityColors[priority]
                  }`}
                >
                  {priority ? t(`priority.${priority.toLowerCase()}`) : priority}
                </div>
              </div>
              <div className="text-text truncate text-sm font-semibold">
                {arg.event.title}
              </div>

              <p className="text-text truncate text-xs font-normal">
                {arg.event.title}
              </p>
              <div className="border-text/10 flex items-center justify-between border-t pt-3">
                <div className="flex items-center gap-1">
                  <EditTodo
                    todo={{
                      id: Number(arg.event.id),
                      todo: arg.event.title,
                      completed: arg.event.extendedProps?.completed ?? false,
                      userId: arg.event.extendedProps?.userId ?? 0,
                    }}
                  />

                  <DeleteTodo
                    todo={{
                      id: Number(arg.event.id),
                      todo: arg.event.title,
                      completed: arg.event.extendedProps?.completed ?? false,
                      userId: arg.event.extendedProps?.userId ?? 0,
                    }}
                  />
                </div>
                <div className="border-text/10 flex items-center justify-between overflow-hidden rounded-lg">
                  <div className="flex -space-x-3">
                    {orderedUsers.map((user, index) => (
                      <img
                        key={index}
                        src={user.icon}
                        alt={user.title}
                        className="ring-foreground size-7 rounded-md object-cover object-top ring-1"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
        // Sticky header
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          right: "today,prev,next",
        }}
      />
    </div>
  );
};

export default Calendar;
