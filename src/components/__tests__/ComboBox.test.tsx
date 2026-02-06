import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ComboBox from "../ComboBox";
import type {
  ChildrenProps,
  MaybeHandler,
  TFunction,
} from "../../../types/testing";

jest.mock("@/components/ui/popover", () => ({
  __esModule: true,
  Popover: ({ children }: ChildrenProps) => <div>{children}</div>,
  PopoverTrigger: ({ children }: ChildrenProps) => <div>{children}</div>,
  PopoverContent: ({ children }: ChildrenProps) => <div>{children}</div>,
}));
jest.mock("@/components/ui/command", () => ({
  __esModule: true,
  Command: ({ children }: ChildrenProps) => <div>{children}</div>,
  CommandInput: ({ placeholder }: { placeholder?: string }) => (
    <input placeholder={placeholder} />
  ),
  CommandList: ({ children }: ChildrenProps) => <div>{children}</div>,
  CommandEmpty: ({ children }: ChildrenProps) => <div>{children}</div>,
  CommandGroup: ({ children }: ChildrenProps) => <div>{children}</div>,
  CommandItem: ({
    children,
    onSelect,
  }: {
    children: React.ReactNode;
    onSelect?: MaybeHandler;
  }) => <button onClick={() => onSelect && onSelect()}>{children}</button>,
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

function Wrapper() {
  const [value, setValue] = React.useState("");
  const options = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];
  return (
    <ComboBox
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select option"
      className="w-64"
    />
  );
}

describe("ComboBox", () => {
  it("renders placeholder and updates selection", async () => {
    const user = userEvent.setup();
    render(<Wrapper />);
    const trigger = screen.getByRole("button", { name: /Select option/i });
    expect(trigger).toBeInTheDocument();
    await user.click(screen.getByText("low"));
    const updatedTrigger = screen
      .getAllByRole("button")
      .find((b) => b.getAttribute("aria-expanded") !== null);
    expect(updatedTrigger).toHaveTextContent("low");
  });

  it("shows search input with translated placeholder", () => {
    render(<Wrapper />);
    expect(
      screen.getByPlaceholderText("SearchPlaceholder"),
    ).toBeInTheDocument();
  });
});
