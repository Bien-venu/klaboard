import { IconInnerShadowTop } from "@tabler/icons-react";
import { SidebarTrigger } from "./ui/sidebar";

const Logo = () => {
  return (
    <div className="border-text/10 flex items-center justify-between gap-1 border-b pb-4 font-semibold">
      <div className="flex items-center gap-2">
        <div className="bg-special h-fit w-fit rounded-xl p-1.5 text-white">
          <IconInnerShadowTop size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-base">Klaboard</span>
          <div className="text-special flex items-center gap-1">
            <span className="bg-special h-1.5 w-1.5 rounded-full"></span>
            <p className="text-xs">free-trial</p>
          </div>
        </div>
      </div>
      <SidebarTrigger className="-ml-1" />
    </div>
  );
};

export default Logo;
