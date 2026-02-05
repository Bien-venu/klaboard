import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider
      className="bg-background text-text flex h-screen overflow-hidden text-sm font-medium"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-foreground flex flex-col">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
