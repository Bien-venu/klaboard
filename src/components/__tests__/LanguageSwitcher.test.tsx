import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageSwitcher from "../LanguageSwitcher";
import type { ChildrenProps, TFunction } from "../../../types/testing";

// no redux needed for mocked component

jest.mock("../theme-provider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: ChildrenProps) => <div>{children}</div>,
}));

const changeLanguage = jest.fn();
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    const t: TFunction = (key) => {
      const seg = (key.split(".").pop() || key).replace(/_/g, " ");
      return seg.slice(0, 1).toUpperCase() + seg.slice(1);
    };
    return { t, i18n: { language: "en", changeLanguage } };
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("LanguageSwitcher", () => {
  it("renders tabs and changes language", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const tablist = screen.getByRole("tablist", { name: "Switcher" });
    expect(tablist).toBeInTheDocument();

    const english = screen.getByRole("tab", { name: "English" });
    const french = screen.getByRole("tab", { name: "French" });
    expect(english).toHaveAttribute("aria-selected", "true");

    await user.click(french);
    expect(changeLanguage).toHaveBeenCalledWith("fr");
  });
});
