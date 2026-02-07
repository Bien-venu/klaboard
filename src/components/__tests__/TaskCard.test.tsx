/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen } from "@testing-library/react";
import TaskCard from "../TaskCard";
import { renderWithProviders } from "../../test-utils";
import type { TFunction } from "../../../types/testing";

jest.mock("@/assets/images/Bienvenu.jpg", () => "bienvenu.jpg");
jest.mock("@/assets/images/Older.png", () => "older.png");
jest.mock("@/assets/images/doctor.png", () => "doctor.png");

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: ((key) => key) as TFunction,
  }),
}));

jest.mock("@hugeicons/react", () => ({
  HugeiconsIcon: () => <span data-testid="icon" />,
}));

jest.mock("@dnd-kit/sortable", () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
}));

jest.mock("@dnd-kit/utilities", () => ({
  CSS: {
    Transform: {
      toString: jest.fn(),
    },
  },
}));

describe("TaskCard Component", () => {
  const mockTask = {
    id: 1,
    todo: "Test Todo",
    completed: false,
    userId: 1,
  };

  it("renders task content", () => {
    renderWithProviders(<TaskCard task={mockTask as any} column="To-do" />);

    expect(screen.getAllByText("Test Todo")[0]).toBeInTheDocument();
    expect(screen.getByText("kanban.card.mockDate")).toBeInTheDocument();
  });
});
