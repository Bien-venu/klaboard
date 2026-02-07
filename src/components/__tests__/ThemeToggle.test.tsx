import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "../theme-toggle";
import type {
  ChildrenProps,
  MaybeHandler,
  ThemeName,
} from "../../../types/testing";

jest.mock("../theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
  useTheme: () => ({
    theme: "light",
    setTheme: (next: ThemeName) => {
      document.documentElement.classList.remove("light", "dark");
      if (next === "system") {
        const prefersDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.add(prefersDark ? "dark" : "light");
      } else {
        document.documentElement.classList.add(next);
      }
    },
  }),
}));

jest.mock("../ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: ChildrenProps) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: ChildrenProps) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: ChildrenProps) => <div>{children}</div>,
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: MaybeHandler;
  }) => <button onClick={onClick}>{children}</button>,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("ThemeToggle", () => {
  it("switches themes via menu items", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByText("Light"));
    expect(document.documentElement.classList.contains("light")).toBe(true);

    await user.click(screen.getByText("Dark"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await user.click(screen.getByText("System"));
    expect(
      document.documentElement.classList.contains("light") ||
        document.documentElement.classList.contains("dark"),
    ).toBe(true);
  });
});
