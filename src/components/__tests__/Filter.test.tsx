import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { ThemeProvider } from "../theme-provider";
import Filter from "../Filter";
import type { ChildrenProps, TFunction } from "../../../types/testing";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    const t: TFunction = (key) => {
      const seg = (key.split(".").pop() || key).replace(/_/g, " ");
      return seg.slice(0, 1).toUpperCase() + seg.slice(1);
    };
    return { t, i18n: { language: "en", changeLanguage: jest.fn() } };
  },
}));
jest.mock("../AddTodo", () => ({
  __esModule: true,
  default: () => <button>AddTodo</button>,
}));

afterEach(() => {
  jest.clearAllMocks();
});

function Providers({ children }: ChildrenProps) {
  return (
    <ThemeProvider defaultTheme="light">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}

describe("Filter", () => {
  it("switches filters via clicks", async () => {
    const setFilter = jest.fn();
    const user = userEvent.setup();
    render(
      <Providers>
        <Filter filter="kanban" setFilter={setFilter} />
      </Providers>,
    );

    await user.click(screen.getByText("List"));
    expect(setFilter).toHaveBeenCalledWith("list");

    await user.click(screen.getByText("Calendar"));
    expect(setFilter).toHaveBeenCalledWith("calendar");
  });
});
