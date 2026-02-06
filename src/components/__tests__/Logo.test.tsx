import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Logo from "../Logo";
import { SidebarProvider } from "../ui/sidebar";

describe("Logo", () => {
  it("renders brand text", () => {
    render(
      <SidebarProvider>
        <Logo />
      </SidebarProvider>,
    );
    expect(screen.getByText(/KlaBoard/i)).toBeInTheDocument();
  });
});
