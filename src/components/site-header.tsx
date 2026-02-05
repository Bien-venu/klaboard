import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarIcon,
  Message02Icon,
  Clock02Icon,
  FilterIcon,
  Add01Icon,
  GlobalIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { Separator } from "./ui/separator";

export function SiteHeader() {
  const { open } = useSidebar();

  return (
    <header className="border-text/10 flex h-(--header-height) shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="text-text/70 flex items-center gap-2">
          {!open && <SidebarTrigger className="-ml-1" />}
          <HugeiconsIcon icon={Add01Icon} size={20} />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <div className="border-text/30 flex items-center gap-1 rounded-lg">
            <HugeiconsIcon icon={GlobalIcon} size={20} />
            <span>Shared Pages</span>
          </div>
          <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
          <span className="text-text">HR Tasks Hub</span>
        </div>

        <div className="wflex text-text flex items-center gap-2">
          <div className="border-text/30 flex gap-1 rounded-lg border p-1.5">
            <ThemeToggle />
          </div>
          <div className="border-text/30 flex gap-1 rounded-lg border p-1.5">
            <HugeiconsIcon icon={StarIcon} size={17} />
          </div>
          <div className="border-text/30 flex gap-1 rounded-lg border p-1.5">
            <HugeiconsIcon icon={Message02Icon} size={17} />
          </div>
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />

          <div className="border-text/30 flex gap-1 rounded-lg border p-1.5">
            <HugeiconsIcon icon={Clock02Icon} size={17} />
          </div>
          <div className="border-text/30 flex items-center gap-1 rounded-lg border p-1.5">
            <HugeiconsIcon icon={FilterIcon} size={17} />
            <span>Share</span>
          </div>
        </div>
      </div>
    </header>
  );
}
