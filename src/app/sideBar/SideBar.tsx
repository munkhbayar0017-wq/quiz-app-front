import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="bg-amber-400">
      <SidebarHeader className="bg-amber-400">History</SidebarHeader>
      <SidebarContent className="bg-amber-800">
        <SidebarGroup className="bg-green-500" />
        <SidebarGroup className="bg-green-800" />
      </SidebarContent>
      <SidebarFooter className="bg-amber-200" />
    </Sidebar>
  );
}
