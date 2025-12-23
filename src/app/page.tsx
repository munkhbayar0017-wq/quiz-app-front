"use client";

import { AppSidebar } from "./sideBar/AppSidebar";
import { Header } from "./header/Header";
import InputCard from "./_components/InputCard";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden relative">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <div className="flex flex-1 items-center justify-center">
            <div className="border-r flex pt-4 justify-center w-18 h-full">
              <SidebarTrigger />
            </div>

            <main className="flex pt-30 justify-center w-full h-full">
              <InputCard />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
