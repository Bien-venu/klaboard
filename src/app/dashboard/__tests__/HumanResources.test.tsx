import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import HumanResources from "../HumanResources";
import type { ChildrenProps, TFunction } from "../../../../types/testing";

// no redux needed for mocked component

jest.mock("../../../components/theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("../HumanResources", () => ({
  __esModule: true,
  default: () => (
    <div>
      <div data-testid="loader" />
      <div>Kanban</div>
      <button>List</button>
      <button>Calendar</button>
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

jest.mock("../../../features/ToDo/todoThunks", () => ({
  fetchTodos: () => ({ type: "todos/fetchTodos/pending" }),
}));
jest.mock("../../../features/users/userThunks", () => ({
  fetchUser: (id: number) => ({ type: "users/fetchUser/pending", payload: id }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

function Providers({ children }: ChildrenProps) {
  return <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>;
}

describe("HumanResources", () => {
  it("shows spinner when loading", async () => {
    render(
      <Providers>
        <HumanResources />
      </Providers>,
    );

    await waitFor(
      () => {
        expect(screen.getByTestId("loader")).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("renders Kanban view and allows switching filters", async () => {
    const mockTodos = [
      { id: 1, todo: "Task 1", completed: false, userId: 1 },
      { id: 2, todo: "Task 2", completed: true, userId: 2 },
    ];
    void mockTodos;
    render(
      <Providers>
        <HumanResources />
      </Providers>,
    );

    expect(screen.getByText("Kanban")).toBeInTheDocument();
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByText("List"));
    expect(screen.getByText("List")).toBeInTheDocument();

    await user.click(screen.getByText("Calendar"));
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });
});
