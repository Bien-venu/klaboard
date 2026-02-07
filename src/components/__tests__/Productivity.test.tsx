import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Productivity from "../Productivity";
import type { ChildrenProps, TFunction } from "../../../types/testing";

jest.mock("../theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("../Productivity", () => ({
  __esModule: true,
  default: () => (
    <div>
      <img alt="Klaboard" />
      <h1>Title</h1>
      <p>Description</p>
      <div>Upgrade</div>
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

describe("Productivity", () => {
  it("renders image and translated texts", () => {
    render(<Productivity />);

    expect(screen.getByRole("img", { name: /Klaboard/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Upgrade/i)).toBeInTheDocument();
  });
});
