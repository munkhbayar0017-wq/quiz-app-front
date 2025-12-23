import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarHeader className="p-4 bg-white">
        <h2 className="text-foreground text-lg font-semibold leading-7 tracking-tight">
          History
        </h2>
      </SidebarHeader>
      <SidebarContent className="bg-white p-4">
        <SidebarGroup className="text-muted-foreground text-sm">
          Group 1
        </SidebarGroup>
        <div className="text-[#09090B] p-2 font-sans text-[16px] font-medium leading-6 tracking-0">
          Genghis Khan
        </div>
        <SidebarGroup className="text-muted-foreground text-sm">
          Group 2
        </SidebarGroup>
        <div className="text-[#09090B] p-2 font-sans text-[16px] font-medium leading-6 tracking-0">
          Figma ашиглах заавар
        </div>
        <div className="text-[#09090B] p-2 font-sans text-[16px] font-medium leading-6 tracking-0">
          Санхүүгийн шийдвэрүүд
        </div>
      </SidebarContent>
      <SidebarFooter className=" p-4">Footer Content</SidebarFooter>
    </Sidebar>
  );
}
