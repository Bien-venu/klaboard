/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import List from "../List";
import type { ChildrenProps, TFunction } from "../../../types/testing";

// no redux needed for mocked component

jest.mock("../theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("../List", () => ({
  __esModule: true,
  default: ({ todoList }: { todoList: any[] }) => (
    <div>
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
  KeyboardSensor: jest.fn(),
  PointerSensor: jest.fn(),
  pointerWithin: jest.fn(),
  useDroppable: () => ({ setNodeRef: jest.fn() }),
  useSensor: jest.fn(),
  useSensors: jest.fn(() => []),
}));
jest.mock("../Table", () => ({
  __esModule: true,
  Tables: ({ data }: { data: any[] }) => (
    <div>
      {data.map((d: any) => (
        <div key={d.id}>{d.todo}</div>
      ))}
    </div>
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("List (KanbanTables)", () => {
  it("renders sections and counts", () => {
    const todoList = [
      { id: 1, todo: "Task 1", completed: false, userId: 1 },
      { id: 2, todo: "Task 2", completed: true, userId: 2 },
    ];
    render(<List todoList={todoList as any} loading={false} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
