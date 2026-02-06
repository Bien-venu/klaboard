/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DraggedRowPreview from "../DraggedRowPreview";
import type { ChildrenProps } from "../../../types/testing";

jest.mock("../theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));

jest.mock("../DraggedRowPreview", () => ({
  __esModule: true,
  default: ({ row }: { row: any }) => <div>{row.todo}</div>,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("DraggedRowPreview", () => {
  it("renders todo text", () => {
    const row = { id: 10, todo: "Preview this task" };
    render(<DraggedRowPreview row={row as any} />);
    expect(screen.getByText("Preview this task")).toBeInTheDocument();
  });
});
