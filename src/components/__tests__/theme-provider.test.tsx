import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "../theme-provider";

afterEach(() => {
  jest.clearAllMocks();
});

function Consumer() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span>Theme: {theme}</span>
      <button onClick={() => setTheme("dark")}>SetDark</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  it("provides theme context and allows updates", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <Consumer />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Theme: light/)).toBeInTheDocument();
    await user.click(screen.getByText("SetDark"));
    expect(screen.getByText(/Theme: dark/)).toBeInTheDocument();
  });
});
