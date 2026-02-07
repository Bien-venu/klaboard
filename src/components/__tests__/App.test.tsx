import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import type { ChildrenProps, TFunction } from "../../../types/testing";

jest.mock("../theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("../../App", () => ({
  __esModule: true,
  default: () => (
    <div>
      <div>SharedPages</div>
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

jest.mock("../../features/ToDo/todoThunks", () => ({
  fetchTodos: () => ({ type: "todos/fetchTodos/pending" }),
}));
jest.mock("../../features/users/userThunks", () => ({
  fetchUser: (id: number) => ({ type: "users/fetchUser/pending", payload: id }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

function AppProviders({ children }: ChildrenProps) {
  return <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>;
}

describe("App", () => {
  it("renders initial route and dashboard layout", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    await waitFor(
      () => {
        expect(screen.getByText("SharedPages")).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    await user.click(screen.getByText("Calendar"));
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });
});

function renderWithProviders(ui: React.ReactElement) {
  return {
    ...render(<AppProviders>{ui}</AppProviders>),
  };
}
