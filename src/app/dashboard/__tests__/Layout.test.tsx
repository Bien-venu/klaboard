import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import type { ChildrenProps, TFunction } from "../../../../types/testing";

jest.mock("../../../components/theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("../Layout", () => ({
  __esModule: true,
  default: () => <div>OutletContent</div>,
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

describe("Layout", () => {
  it("renders sidebar and outlet content", () => {
    const OutletMock = () => <div>OutletContent</div>;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<OutletMock />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("OutletContent")).toBeInTheDocument();
  });
});
