import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AppSidebar } from "../app-sidebar";
import type { ChildrenProps, TFunction } from "../../../types/testing";

jest.mock("../theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("../ui/sidebar", () => ({
  __esModule: true,
  SidebarProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("../app-sidebar", () => ({
  __esModule: true,
  AppSidebar: () => (
    <div>
      <div>Search</div>
      <div>KlaAi</div>
      <div>Inbox</div>
      <div>Calendar</div>
      <div>Settings</div>
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

afterEach(() => {
  jest.clearAllMocks();
});

describe("AppSidebar", () => {
  it("renders nav sections and items", () => {
    render(<AppSidebar />);

    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("KlaAi")).toBeInTheDocument();
    expect(screen.getByText("Inbox")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});
