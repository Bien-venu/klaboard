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
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function SiteHeader() {
  const { isMobile, open } = useSidebar();
  const { t } = useTranslation();

  return (
    <header className="border-text/10 flex h-(--header-height) shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="text-text/70 flex items-center gap-2">
          {isMobile ? (
            <SidebarTrigger className="-ml-1" />
          ) : (
            <>{!open && <SidebarTrigger className="-ml-1" />}</>
          )}

          <div className="gap- hidden items-center sm:flex md:hidden lg:flex">
            <HugeiconsIcon icon={Add01Icon} size={20} />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <div className="border-text/30 flex items-center gap-1 rounded-lg">
              <HugeiconsIcon icon={GlobalIcon} size={20} />
              <span>{t("nav.sharedPages")}</span>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
            <span className="text-text">{t("nav.hrTasksHub")}</span>
          </div>
        </div>

        <div className="text-text flex items-center gap-2">
            <ThemeToggle />
          
          <div className="border-text/10 hidden gap-1 rounded-lg border p-1.5 shadow-xs md:flex">
            <HugeiconsIcon icon={StarIcon} size={17} />
          </div>
          <div className="border-text/10 hidden gap-1 rounded-lg border p-1.5 shadow-xs md:flex">
            <HugeiconsIcon icon={Message02Icon} size={17} />
          </div>
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />

          <div className="border-text/10 hidden gap-1 rounded-lg border p-1.5 shadow-xs md:flex">
            <HugeiconsIcon icon={Clock02Icon} size={17} />
          </div>
          <div className="border-text/10 hidden items-center gap-1 rounded-lg border p-1.5 shadow-xs md:flex">
            <HugeiconsIcon icon={FilterIcon} size={17} />
            <span>{t("header.share")}</span>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
