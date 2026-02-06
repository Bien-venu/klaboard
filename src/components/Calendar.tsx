"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

type TodoItem = {
  id: number;
  todo: string;
  priority?: "High" | "Medium" | "Low";
  description?: string;
};

// Theme colors for priority
const priorityColors: Record<string, string> = {
  High: "bg-error border-error",
  Medium: "bg-review border-review",
  Low: "bg-progress border-progress",
};

const Calendar: React.FC<{ todoList: TodoItem[] }> = ({ todoList }) => {
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

  return (
    <div className="bg-background text-text h-full w-full min-w-[1400px] overflow-hidden rounded-xl px-4">
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
              className={`bg-foreground flex h-fit w-full flex-col gap-1 rounded-xl border p-2 shadow-sm`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-text/60 flex items-center gap-1 text-xs font-semibold">
                  <span className="border-background bg-text/60 h-3 w-3 rounded-full border-2"></span>
                  <span>
                    {new Date(arg.event.start!).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div
                  className={`bg-opacity- flex rounded-xl px-2 py-1 text-xs font-semibold ${
                    priority && priorityColors[priority]
                  }`}
                >
                  {priority}
                </div>
              </div>
              <div className="text-text truncate text-sm font-semibold">
                {arg.event.title}
              </div>

              <p className="text-text truncate text-xs font-normal">
                {arg.event.title}
              </p>
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
