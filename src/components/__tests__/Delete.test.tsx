import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteTodo from "../Delete";
import type { ChildrenProps, TFunction } from "../../../types/testing";

const dispatchMock = jest.fn();
jest.mock("@/hooks/useAppDispatch", () => ({
  useAppDispatch: () => dispatchMock,
}));
jest.mock("@/features/ToDo/todoThunks", () => ({
  deleteTodo: (id: number) => ({ type: "todos/deleteTodo", payload: id }),
}));
jest.mock("@/components/ui/alert-dialog", () => ({
  __esModule: true,
  AlertDialog: ({ children }: ChildrenProps) => <div>{children}</div>,
  AlertDialogTrigger: ({ children }: ChildrenProps) => (
    <button>{children}</button>
  ),
  AlertDialogContent: ({ children }: ChildrenProps) => <div>{children}</div>,
  AlertDialogHeader: ({ children }: ChildrenProps) => <div>{children}</div>,
  AlertDialogTitle: ({ children }: ChildrenProps) => <h2>{children}</h2>,
  AlertDialogDescription: ({ children }: ChildrenProps) => <p>{children}</p>,
  AlertDialogFooter: ({ children }: ChildrenProps) => <div>{children}</div>,
  AlertDialogCancel: ({
    children,
    ...props
  }: ChildrenProps & Record<string, unknown>) => (
    <button {...props}>{children}</button>
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

afterEach(() => {
  jest.clearAllMocks();
});

describe("DeleteTodo", () => {
  const todo = { id: 5, todo: "Remove this task", completed: false, userId: 1 };

  it("shows dialog content with translated labels", () => {
    render(<DeleteTodo todo={todo} />);
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("TaskLabel")).toBeInTheDocument();
    expect(screen.getByText("Remove this task")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("dispatches delete action on confirm", async () => {
    const user = userEvent.setup();
    render(<DeleteTodo todo={todo} />);
    await user.click(screen.getByText("Delete"));
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "todos/deleteTodo",
      payload: 5,
    });
  });

  it("does not dispatch when cancel is clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteTodo todo={todo} />);
    await user.click(screen.getByText("Cancel"));
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
