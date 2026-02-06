/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { ThemeProvider } from "../theme-provider";
import EditTodo from "../EditTodo";
import { updateTodo } from "../../features/ToDo/todoThunks";
import type { ChildrenProps, TFunction } from "../../../types/testing";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    const t: TFunction = (key) => {
      const seg = (key.split(".").pop() || key).replace(/_/g, " ");
      return seg.slice(0, 1).toUpperCase() + seg.slice(1);
    };
    return { t, i18n: { language: "en", changeLanguage: jest.fn() } };
  },
}));

jest.mock("../../features/ToDo/todoThunks", () => {
  const actual = jest.requireActual("../../features/ToDo/todoThunks");
  const updateTodoMockFn: any = jest.fn((payload) => ({
    type: "todos/updateTodo/fulfilled",
    payload,
  }));
  updateTodoMockFn.pending = { type: "todos/updateTodo/pending" };
  updateTodoMockFn.fulfilled = { type: "todos/updateTodo/fulfilled" };
  updateTodoMockFn.rejected = { type: "todos/updateTodo/rejected" };
  return {
    ...actual,
    updateTodo: updateTodoMockFn,
  };
});
jest.mock("../../features/users/userThunks", () => {
  const actual = jest.requireActual("../../features/users/userThunks");
  const fetchUsersMockFn: any = jest.fn(() => ({
    type: "users/fetchUsers/fulfilled",
    payload: { users: [] },
  }));
  fetchUsersMockFn.pending = { type: "users/fetchUsers/pending" };
  fetchUsersMockFn.fulfilled = { type: "users/fetchUsers/fulfilled" };
  fetchUsersMockFn.rejected = { type: "users/fetchUsers/rejected" };
  return {
    ...actual,
    fetchUsers: fetchUsersMockFn,
  };
});
jest.mock("@/lib/api", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

function Providers({ children }: ChildrenProps) {
  return (
    <ThemeProvider defaultTheme="light">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}

describe("EditTodo", () => {
  const todo = { id: 5, todo: "Existing Task", completed: false, userId: 2 };

  it("renders trigger and opens dialog", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <EditTodo todo={todo} />
      </Providers>,
    );

    const trigger = document.querySelector(
      '[aria-haspopup="dialog"]',
    ) as HTMLElement;
    expect(trigger).toBeTruthy();
    await user.click(trigger);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Todo")).toHaveValue("Existing Task");
  });

  it("updates completion and submits", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <EditTodo todo={todo} />
      </Providers>,
    );

    const trigger = document.querySelector(
      '[aria-haspopup="dialog"]',
    ) as HTMLElement;
    expect(trigger).toBeTruthy();
    await user.click(trigger);
    const checkbox = screen.getByLabelText("MarkAsCompleted");
    await user.click(checkbox);

    const updateButton = screen.getByText("Update");
    await user.click(updateButton);

    await waitFor(
      () => {
        expect(updateTodo).toHaveBeenCalledWith({ id: 5, completed: true });
      },
      { timeout: 1000 },
    );
  });
});
