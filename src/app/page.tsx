"use client";
import { AppSidebar } from "./_components/AppSidebar";
import { Header } from "./header/Header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SwitchCards from "./_components/SwitchCards";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  return (
    <div className="h-screen w-full flex flex-col bg-[#FAFAFA]">
      <Header />

      <div className="flex flex-1 overflow-hidden relative">
        <AppSidebar setStep={setStep} />
        <div className="flex flex-col flex-1">
          <div className="flex flex-1 items-center justify-center">
            <div className="border-r flex pt-4 justify-center w-18 h-full bg-white">
              <SidebarTrigger />
            </div>

            <main className="flex pt-30 justify-center w-full h-full">
              <SwitchCards step={step} setStep={setStep} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
