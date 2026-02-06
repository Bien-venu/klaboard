import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NavPrivate } from "../nav-private";
import { SidebarProvider } from "../ui/sidebar";
import { MemoryRouter } from "react-router-dom";
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

describe("NavPrivate", () => {
  it("renders private pages list", () => {
    const items = [
      {
        title: "PrivatePages",
        isActive: true,
        items: [{ title: "DribbblePortfolio", url: "#" }],
      },
    ];
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SidebarProvider>
          <NavPrivate items={items} />
        </SidebarProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText("PrivatePages")).toBeInTheDocument();
    expect(screen.getByText("DribbblePortfolio")).toBeInTheDocument();
  });
});
