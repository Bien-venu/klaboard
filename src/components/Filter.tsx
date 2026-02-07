import Bienvenu from "@/assets/images/Bienvenu.jpg";
import Older from "@/assets/images/Older.png";
import Doctor from "@/assets/images/doctor.png";
import { Separator } from "@/components/ui/separator";
import {
  Calendar02Icon,
  CommandIcon,
  FilterMailIcon,
  LeftToRightListBulletIcon,
  MoreHorizontalIcon,
  Search01Icon,
  SortByDown02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { KanbanIcon } from "lucide-react";

const users: {
  title: string;
  icon: string;
}[] = [
  {
    title: "Bienvenu",
    icon: Older,
  },
  {
    title: "Jean",
    icon: Bienvenu,
  },
  {
    title: "Emme",
    icon: Doctor,
  },
];

type FilterProps = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

import { useTranslation } from "react-i18next";
import AddTodos from "./AddTodo";

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  const { t } = useTranslation();

  const handleFilter = (e: string) => {
    setFilter(e);
  };

  return (
    <div className="border-text/10 flex w-full flex-wrap items-center justify-between gap-4 border-b px-4 pb-4 lg:px-6">
      <div className="flex items-center gap-2">
        <div className="border-text/30 flex gap-1 rounded-lg border p-1.5">
          <HugeiconsIcon icon={MoreHorizontalIcon} size={17} />
        </div>
        <div
          onClick={() => handleFilter("kanban")}
          className={` ${filter === "kanban" ? "text-text" : "text-text/30"} border-text/30 flex cursor-pointer items-center gap-1 rounded-lg border p-1.5`}
        >
          <KanbanIcon size={17} />
          <span>{t("filter.kanban")}</span>
        </div>
        <div
          onClick={() => handleFilter("list")}
          className={` ${filter === "list" ? "text-text" : "text-text/30"} border-text/30 flex cursor-pointer items-center gap-1 rounded-lg border p-1.5`}
        >
          <HugeiconsIcon icon={LeftToRightListBulletIcon} size={17} />
          <span>{t("filter.list")}</span>
        </div>
        <div
          onClick={() => handleFilter("calendar")}
          className={` ${filter === "calendar" ? "text-text" : "text-text/30"} border-text/30 flex cursor-pointer items-center gap-1 rounded-lg border p-1.5`}
        >
          <HugeiconsIcon icon={Calendar02Icon} size={17} />
          <span>{t("filter.calendar")}</span>
        </div>
      </div>
      <div className="ml-auto flex flex-wrap items-center gap-2">
        <div className="border-text/30 flex items-center gap-1 rounded-lg border p-1.5">
          <HugeiconsIcon icon={Search01Icon} size={17} />
          <input
            type="text"
            placeholder={t("filter.searchPlaceholder")}
            className="placeholder-text/70 h-full"
          />
          <div className="bg-background flex items-center gap-1 rounded-lg p-0 px-1">
            <HugeiconsIcon icon={CommandIcon} size={15} />
            <span>F</span>
          </div>
        </div>
        <div className="border-text/30 flex items-center gap-1 rounded-lg border p-1.5">
          <HugeiconsIcon icon={FilterMailIcon} size={17} />
          <span>{t("filter.filter")}</span>
        </div>
        <div className="border-text/30 flex items-center gap-1 rounded-lg border p-1.5">
          <HugeiconsIcon icon={SortByDown02Icon} size={17} />
          <span>{t("filter.sort")}</span>
        </div>
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex -space-x-3">
          {users.map((user, index) => (
            <img
              key={index}
              src={user.icon}
              alt={user.title}
              className="ring-foreground size-8 rounded-md object-cover object-top ring-1"
            />
          ))}
        </div>
        <AddTodos />
      </div>
    </div>
  );
};

export default Filter;
