import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NavUser } from "../nav-user";
import { SidebarProvider } from "../ui/sidebar";
import type { TFunction } from "../../../types/testing";

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

describe("NavUser", () => {
  it("renders user name and email", () => {
    const user = {
      name: "Alice",
      email: "alice@example.com",
      avatar: "/img.png",
    };
    render(
      <SidebarProvider>
        <NavUser user={user} />
      </SidebarProvider>,
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });
});
