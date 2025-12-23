"use client";
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
import GeminiIcon from "../icons/GeminiIcon";
import FileIcon from "../icons/FileIcon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import BookIcon from "../icons/BookIcon";
import { ChevronLeft } from "lucide-react";

export default function InputCard() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<string>("");
  const handleGenerate = async () => {
    if (!title || !content) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/ai", {
        // title: title,
        content,
      });
      setQuiz(response.data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-214 w-full min-h-110.5 p-7 flex flex-col gap-5">
      <Button
        onClick={() => {
          setQuiz("");
        }}
        variant="outline"
        className="w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer"
      >
        <ChevronLeft />
      </Button>
      {quiz ? (
        <Card className="max-w-214 w-full min-h-110.5 p-7 gap-5">
          <CardHeader>
            <div className="flex gap-2 items-center">
              <GeminiIcon />
              <CardTitle>Article Quiz Generator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="gap-2">
            <CardDescription className="flex gap-2 items-center justify-start">
              <BookIcon /> Summarized content
            </CardDescription>
            <div className="text-black font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
              {title}
            </div>
            <div className="max-h-70 overflow-scroll text-black font-inter text-[14px] font-normal leading-5">
              {quiz}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2 items-end ">
            <Button
              variant="outline"
              className="w-27 cursor-pointer"
              onClick={() => {
                setQuiz("");
              }}
            >
              See content
            </Button>{" "}
            <Button
              type="submit"
              className="w-27 cursor-pointer"
              disabled={!title || !content || loading}
              onClick={handleGenerate}
            >
              {loading ? "Take a quiz..." : "Take a quiz"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-214 w-full min-h-110.5 p-7 gap-5">
          <CardHeader>
            <div className="flex gap-2 items-center">
              <GeminiIcon />
              <CardTitle>Article Quiz Generator</CardTitle>
            </div>
            <CardDescription>
              Paste your article below to generate a summarize and quiz
              question. Your articles will saved in the sidebar for future
              reference.
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
              disabled={!title || !content || loading}
              onClick={handleGenerate}
            >
              {loading ? "Generate summary..." : "Generate summary"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
