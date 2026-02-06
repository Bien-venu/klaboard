import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "./ui/sidebar";

const Logo = () => {
  const { t } = useTranslation();
  return (
    <div className="border-text/10 flex items-center justify-between gap-1 border-b pb-4 font-semibold">
      <div className="flex items-center gap-2">
        <div className="h-fit w-fit overflow-hidden rounded-lg">
          <img
            src="/klaboard.png"
            alt="Klaboard"
            className="size-10 rounded-md object-cover object-top"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-base">Klaboard</span>
          <div className="text-special flex items-center gap-1">
            <span className="bg-special h-1.5 w-1.5 rounded-full"></span>
            <p className="text-xs">{t("freeTrial")}</p>
          </div>
        </div>
      </div>
      <SidebarTrigger className="-ml-1" />
    </div>
  );
};

export default Logo;
