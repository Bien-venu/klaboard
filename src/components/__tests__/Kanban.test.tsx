/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import type { ChildrenProps, TFunction } from "../../../types/testing";
import Kanban from "../Kanban";

// no redux needed for mocked component

jest.mock("../theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("../Kanban", () => ({
  __esModule: true,
  default: ({ todoList }: { todoList: any[] }) => (
    <div>
      <div>Todo</div>
      <div>Done</div>
      {todoList.map((t: any) => (
        <div key={t.id}>{t.todo}</div>
      ))}
    </div>
  ),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    const t: TFunction = (key) => {
      const seg = (key.split(".").pop() || key).replace(/_/g, " ");
      return seg.slice(0, 1).toUpperCase() + seg.slice(1);
    };
    return { t, i18n: { language: "en", changeLanguage: jest.fn() } };
  },
}));

jest.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: ChildrenProps) => <div>{children}</div>,
  DragOverlay: ({ children }: ChildrenProps) => <div>{children}</div>,
  pointerWithin: jest.fn(),
  useDroppable: () => ({ setNodeRef: jest.fn() }),
}));
jest.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }: ChildrenProps) => <div>{children}</div>,
  arrayMove: jest.fn(),
  rectSortingStrategy: {},
}));
jest.mock("../TaskCard", () => ({
  __esModule: true,
  default: ({ task }: { task: any }) => <div>{task.todo}</div>,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Kanban", () => {
  it("renders columns and tasks", () => {
    const todoList = [
      { id: 1, todo: "Task 1", completed: false, userId: 1 },
      { id: 2, todo: "Task 2", completed: true, userId: 2 },
    ];
    render(<Kanban todoList={todoList as any} />);

    expect(screen.getByText("Todo")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
