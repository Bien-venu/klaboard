import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LaptopIcon, Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Laptop, Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative rounded-full">
          <HugeiconsIcon
            icon={Sun01Icon}
            className={`transition-all ${
              theme === "light" ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            size={17}
          />
          <HugeiconsIcon
            icon={Moon02Icon}
            className={`absolute top-0 right-0 bottom-0 left-0 transition-all ${
              theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            size={17}
          />
          <HugeiconsIcon
            icon={LaptopIcon}
            className={`absolute top-0 right-0 bottom-0 left-0 transition-all ${
              theme === "system" ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            size={17}
          />
          <span className="sr-only">Toggle theme</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-foreground/80 text-text border-text/10 backdrop-blur-md"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer"
        >
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
