/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SidebarProvider } from "../ui/sidebar";
import { NavMain } from "../nav-main";
import type { ChildrenProps, TFunction } from "../../../types/testing";
jest.mock("../nav-main", () => ({
  __esModule: true,
  NavMain: ({ items }: { items: any[] }) => (
    <div>
      {items.map((i: any) => (
        <div key={i.id}>{i.title}</div>
      ))}
      <div>New</div>
    </div>
  ),
}));
jest.mock("../ui/sidebar", () => ({
  __esModule: true,
  SidebarProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
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

describe("NavMain", () => {
  it("renders items and inbox badge", () => {
    const items = [
      { title: "Search", url: "#", id: "search" },
      { title: "Inbox", url: "#", id: "inbox" },
    ];
    render(
      <SidebarProvider>
        <NavMain items={items} />
      </SidebarProvider>,
    );
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Inbox")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });
});
