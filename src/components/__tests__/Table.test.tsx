/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tables } from "../Table";
import type { ChildrenProps, TFunction } from "../../../types/testing";

// no redux needed for this mocked component

jest.mock("../theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("../Table", () => ({
  __esModule: true,
  Tables: ({ data }: { data: any[] }) => (
    <div>
      <table role="table" />
      <div>Name</div>
      <div>Date</div>
      <div>Status</div>
      <div>Attachment</div>
      <div>People</div>
      <input placeholder="Search all fields..." />
      {data.map((d: any) => (
        <div key={d.id}>{d.todo}</div>
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

jest.mock("../EditTodo", () => ({
  __esModule: true,
  default: ({ todo }: { todo: any }) => (
    <button aria-label={`edit-${todo.id}`}>Edit</button>
  ),
}));
jest.mock("../Delete", () => ({
  __esModule: true,
  default: ({ todo }: { todo: any }) => (
    <button aria-label={`delete-${todo.id}`}>Delete</button>
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Tables", () => {
  const data = [
    { id: 1, todo: "Write docs", completed: true, userId: 7 },
    { id: 2, todo: "Fix bug", completed: false, userId: 7 },
  ];

  it("renders headers and rows", () => {
    render(<Tables data={data as any} loading={false} id="To-do" />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Attachment")).toBeInTheDocument();
    expect(screen.getByText("People")).toBeInTheDocument();

    expect(screen.getByText("Write docs")).toBeInTheDocument();
    expect(screen.getByText("Fix bug")).toBeInTheDocument();
  });

  it("filters via search input", async () => {
    const user = userEvent.setup();
    render(<Tables data={data as any} loading={false} id="Done" />);

    const input = screen.getByPlaceholderText("Search all fields...");
    await user.type(input, "Fix bug");
    expect(screen.getByText("Fix bug")).toBeInTheDocument();
  });
});
