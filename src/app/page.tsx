"use client";
import { AppSidebar } from "./_components/AppSidebar";
import { Header } from "./header/Header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SwitchCards from "./_components/SwitchCards";
import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");
  return (
    <div className="h-screen  w-full flex flex-col  bg-[#FAFAFA]">
      <Header />
      <SignedIn>
        <div className="flex flex-1 overflow-hidden relative">
          <AppSidebar
            setStep={setStep}
            setSelectedArticleId={setSelectedArticleId}
          />
          <div className="flex flex-col flex-1">
            <div className="flex flex-1 items-center justify-center">
              <div className="border-r flex pt-4 justify-center w-18 h-full bg-white">
                <SidebarTrigger />
              </div>

              <main className="flex pt-6 justify-center w-full h-full">
                <SwitchCards
                  step={step}
                  setStep={setStep}
                  selectedArticleId={selectedArticleId}
                />
              </main>
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <Card className="w-full max-w-sm text-center absolute left-2/5 top-1/3">
          <CardHeader className="gap-2">
            <CardTitle className="text-xl font-semibold">
              Sign in required 🔒
            </CardTitle>
            <CardDescription className="text-sm">
              You need to be singed in to continue.
              <br />
              Please sign in to access this feature.
            </CardDescription>
          </CardHeader>
        </Card>
      </SignedOut>
    </div>
  );
}
