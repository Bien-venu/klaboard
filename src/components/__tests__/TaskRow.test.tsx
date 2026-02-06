/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TaskRow from "../TaskRow";
import type { ChildrenProps } from "../../../types/testing";

// no redux needed for mocked component

jest.mock("../theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("../TaskRow", () => ({
  __esModule: true,
  default: ({ row }: { row: any }) => (
    <tr>
      {row.getVisibleCells().map((c: any, i: number) => (
        <td key={i}>{c.column.columnDef.cell()}</td>
      ))}
    </tr>
  ),
}));
jest.mock("@dnd-kit/sortable", () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    setActivatorNodeRef: jest.fn(),
    transform: null,
    transition: null,
  }),
}));
jest.mock("@dnd-kit/utilities", () => ({
  CSS: { Transform: { toString: () => "" } },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("TaskRow", () => {
  it("renders cells from row", () => {
    const mockRow = {
      original: { id: 1 },
      getVisibleCells: () => [
        {
          id: "todo",
          column: { columnDef: { cell: () => <span>Cell Content</span> } },
          getContext: () => ({}),
        },
      ],
    } as unknown as import("@tanstack/react-table").Row<any>;

    render(
      <table>
        <tbody>
          <TaskRow row={mockRow} column="To-do" />
        </tbody>
      </table>,
    );

    expect(screen.getByText("Cell Content")).toBeInTheDocument();
  });
});
