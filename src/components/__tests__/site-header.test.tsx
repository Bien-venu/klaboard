import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "../site-header";
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

describe("SiteHeader", () => {
  it("renders breadcrumbs and controls", () => {
    render(
      <SidebarProvider>
        <SiteHeader />
      </SidebarProvider>,
    );
    expect(screen.getByText("SharedPages")).toBeInTheDocument();
    expect(screen.getByText("HrTasksHub")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
  });
});
