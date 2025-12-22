"use client";
import { AppSidebar } from "./sideBar/SideBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileIcon from "./icons/FileIcon";
import { Textarea } from "@/components/ui/textarea";
import GeminiIcon from "./icons/GeminiIcon";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <AppSidebar />
      <Card className="max-w-214 w-full min-h-110.5 p-7 gap-5">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <GeminiIcon />
            <CardTitle>Article Quiz Generator</CardTitle>
          </div>
          <CardDescription>
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex gap-1">
                  <FileIcon />
                  <Label htmlFor="email">Article Title</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter a title for your article..."
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-1">
                  <FileIcon />
                  <Label htmlFor="password">Article Content</Label>
                </div>
                <Textarea
                  required
                  placeholder="Paste your article content here..."
                  className="min-h-30"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2 items-end ">
          <Button
            type="submit"
            className="w-40 cursor-pointer"
            disabled={!title || !content}
          >
            Generate summary
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
