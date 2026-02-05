import Filter from "@/components/Filter";
import PageHeader from "@/components/PageHeader";
import { SiteHeader } from "@/components/site-header";

export default function HumanResources() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SiteHeader />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-auto py-4">
        <PageHeader />
        <Filter />
        <div className="flex h-full w-full px-4 lg:px-6">
          <div className="flex h-full w-full bg-amber-950"></div>
        </div>
      </div>
    </div>
  );
}
