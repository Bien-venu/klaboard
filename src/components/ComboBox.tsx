import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

type ComboBoxOption = {
  value: string;
  label: string;
};

type ComboBoxProps = {
  options: ComboBoxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const ComboBox = ({
  options,
  value,
  onChange,
  placeholder,
  className = "w-full",
}: ComboBoxProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className={cn(
            className,
            "border-text/10 flex w-full items-center justify-between gap-4 rounded-lg border text-sm capitalize",
          )}
        >
          <span className="w-full truncate text-left text-sm">
            {selectedLabel?.toLocaleLowerCase() || placeholder || t("common.selectOption")}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className={cn(className, "p-0")}>
        <Command>
          <CommandInput placeholder={t("common.searchPlaceholder")} className="h-9" />
          <CommandList>
            <CommandEmpty>{t("common.noMatch")}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  className="capitalize"
                  onSelect={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label.toLocaleLowerCase()}

                  <Check
                    className={cn(
                      "text-done ml-auto h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
