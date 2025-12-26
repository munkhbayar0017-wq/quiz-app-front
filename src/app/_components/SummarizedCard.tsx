"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GeminiIcon from "../icons/GeminiIcon";
import BookIcon from "../icons/BookIcon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

type SummarizedCardProps = {
  quiz: [];
  setQuiz: React.Dispatch<React.SetStateAction<[]>>;
  summary: string;
  setSummary: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  content: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function SummarizedCard({
  quiz,
  setQuiz,
  summary,
  setSummary,
  title,
  content,
  setStep,
}: SummarizedCardProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleTakeQuiz = async () => {
    if (!title || !content) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/generate/quizzes", {
        content,
      });
      setQuiz(response.data.result);
      setStep(3);

      //       const quizRes = await axios.post(`/api/article/${articleId}/quizzes`, {
      // question
      //   options
      //   answer
      //   articleId
      //       });

      //       console.log("article saved", quizRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-214 w-full h-fit max-h-154.5 p-7 gap-5">
      <CardHeader>
        <div className="flex gap-2 items-center">
          <GeminiIcon />
          <CardTitle>Article Quiz Generator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2">
        <CardDescription className="flex gap-2 items-center justify-start">
          <BookIcon /> Summarized content
        </CardDescription>
        <div className="text-black font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
          {title}
        </div>
        <div className="max-h-70 overflow-scroll text-black font-inter text-[14px] font-normal leading-5">
          {summary}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 items-end ">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-27 cursor-pointer">
                See content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-157 p-7">
              <DialogHeader>
                <DialogTitle className="text-black font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
                  {title}
                </DialogTitle>
                <div className="text-black font-inter text-[14px] font-normal leading-5">
                  {content}
                </div>
              </DialogHeader>
            </DialogContent>
          </form>
        </Dialog>
        <Button
          type="submit"
          className="w-27 cursor-pointer"
          disabled={!title || !content || loading}
          onClick={handleTakeQuiz}
        >
          {loading ? "Take a quiz..." : "Take a quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
