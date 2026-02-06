/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Calendar from "../Calendar";
import type { TFunction } from "../../../types/testing";

jest.mock("@fullcalendar/react", () => ({
  __esModule: true,
  default: ({ events }: { events: Array<{ title: string }> }) => (
    <div>
      {events.map((ev: { title: string }, i: number) => (
        <div key={i}>
          <div>{ev.title}</div>
          <div>Edit</div>
          <div>Delete</div>
        </div>
      ))}
    </div>
  ),
}));
jest.mock("@fullcalendar/daygrid", () => ({
  __esModule: true,
  default: {},
}));
jest.mock("@fullcalendar/timegrid", () => ({
  __esModule: true,
  default: {},
}));
jest.mock("@fullcalendar/interaction", () => ({
  __esModule: true,
  default: {},
}));
jest.mock("@/assets/images/Bienvenu.jpg", () => "bienvenu.jpg");
jest.mock("@/assets/images/Older.png", () => "older.png");
jest.mock("@/assets/images/doctor.png", () => "doctor.png");
jest.mock("../EditTodo", () => ({
  __esModule: true,
  default: () => <div>Edit</div>,
}));
jest.mock("../Delete", () => ({
  __esModule: true,
  default: () => <div>Delete</div>,
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

afterEach(() => {
  jest.clearAllMocks();
});

describe("Calendar", () => {
  it("renders events based on todo list", () => {
    const todoList = [
      { id: 1, todo: "First task" },
      { id: 2, todo: "Second task" },
    ];
    render(<Calendar todoList={todoList as any} />);
    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
    expect(screen.getAllByText("Edit").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Delete").length).toBeGreaterThan(0);
  });
});
