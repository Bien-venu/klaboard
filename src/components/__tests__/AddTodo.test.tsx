/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { ThemeProvider } from "../theme-provider";
import AddTodos from "../AddTodo";
import { addTodo } from "../../features/ToDo/todoThunks";
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
  return {
    ...actual,
    addTodo: jest.fn((payload) => ({
      type: "todos/addTodo/fulfilled",
      payload,
    })),
  };
});
jest.mock("../../features/users/userThunks", () => {
  const actual = jest.requireActual("../../features/users/userThunks");
  const fetchUsersMockFn: any = jest.fn(() => ({
    type: "users/fetchUsers/fulfilled",
    payload: {
      users: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "x",
          created_at: "2023-01-01",
          updated_at: "2023-01-01",
        },
      ],
    },
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

jest.mock("../ComboBox", () => ({
  __esModule: true,
  default: ({
    options,
    value,
    onChange,
    placeholder,
  }: {
    options: Array<{ value: string | number; label: string }>;
    value: string | number;
    onChange: (v: string) => void;
    placeholder?: string;
  }) => (
    <select
      aria-label={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value as any} value={opt.value as any}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));
jest.mock("../../features/ToDo/todoThunks", () => {
  const actual = jest.requireActual("../../features/ToDo/todoThunks");
  const addTodoMockFn: any = jest.fn((payload) => ({
    type: "todos/addTodo/fulfilled",
    payload,
  }));
  addTodoMockFn.pending = { type: "todos/addTodo/pending" };
  addTodoMockFn.fulfilled = { type: "todos/addTodo/fulfilled" };
  addTodoMockFn.rejected = { type: "todos/addTodo/rejected" };
  return {
    ...actual,
    addTodo: addTodoMockFn,
  };
});

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

describe("AddTodos", () => {
  it("renders trigger and opens dialog", async () => {
    render(
      <Providers>
        <AddTodos />
      </Providers>,
    );

    const trigger = screen.getByText("Trigger");
    expect(trigger).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(trigger);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Todo")).toBeInTheDocument();
    expect(screen.getByLabelText("MarkAsCompleted")).toBeInTheDocument();
  });

  it("submits a new todo via save button", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <AddTodos />
      </Providers>,
    );

    await user.click(screen.getByText("Trigger"));

    await user.type(screen.getByPlaceholderText("Todo"), "New Task");
    const select = screen.getByLabelText("User");
    await user.selectOptions(select, "1");
    await user.click(screen.getByLabelText("MarkAsCompleted"));

    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeEnabled();
    await user.click(saveButton);

    await waitFor(
      () => {
        expect(addTodo).toHaveBeenCalledWith({
          todo: "New Task",
          completed: true,
          userId: 1,
        });
      },
      { timeout: 1000 },
    );
  });
});
