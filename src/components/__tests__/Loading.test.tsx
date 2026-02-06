import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading", () => {
  it("renders loader image", () => {
    render(<Loading />);
    const img = screen.getByRole("img", { name: /Klaboard/i });
    expect(img).toBeInTheDocument();
  });
});
