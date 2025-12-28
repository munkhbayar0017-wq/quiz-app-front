"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import GeminiIcon from "../icons/GeminiIcon";
import FileIcon from "../icons/FileIcon";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import BookIcon from "../icons/BookIcon";
import { Skeleton } from "@/components/ui/skeleton";

type ArticleHistoryProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedArticleId: string;
  setHistoryQuiz: React.Dispatch<React.SetStateAction<[]>>;
};
type QuizQuestion = {
  question: string;
  options: string[];
  answer?: string;
};

export default function ArticleHistory({
  setStep,
  selectedArticleId,
  setHistoryQuiz,
}: ArticleHistoryProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [contentData, setContentData] = useState<string>("");
  const [summaryData, setSummaryData] = useState<string>("");
  const [titleData, setTitleData] = useState<string>("");
  console.log("Fetching article with ID:", selectedArticleId);
  useEffect(() => {
    const fetchArticle = async () => {
      const articleId = selectedArticleId;
      if (!articleId) {
        console.error("articleId is missing");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`/api/article/${articleId}`);
        const articleArray = response.data.article;
        console.log("Fetched article data:", articleArray);
        if (articleArray.length > 0) {
          const article = articleArray[0];
          setContentData(article.content);
          setSummaryData(article.summary);
          setTitleData(article.title);
        } else {
          console.warn("No article found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [selectedArticleId]);

  const handleTakeQuiz = async () => {
    const content = contentData;
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post("/api/generate/quizzes", {
        content,
      });
      setHistoryQuiz(response.data.result);
      const parsedQuiz: QuizQuestion[] = JSON.parse(
        response.data.result as unknown as string
      );
      setStep(6);
      console.log("response from histoty", parsedQuiz);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const ArticleSkeleton = () => {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <div className="flex gap-2 items-center mt-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  };

  return (
    <Card className="max-w-214 w-full min-h-110.5 p-7">
      <CardHeader>
        <div className="flex gap-2 items-center">
          <GeminiIcon />
          <CardTitle>Article Quiz Generator</CardTitle>
        </div>
        <CardDescription className="flex gap-2 items-center justify-start">
          <BookIcon /> Summarized content
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <ArticleSkeleton />
        ) : (
          <div className="flex flex-col gap-4 items-end">
            <div className="w-full items-start text-black font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
              {titleData}
            </div>
            <div className="w-full items-start">{summaryData}</div>
            <div className="flex gap-1 w-full items-start">
              <FileIcon />
              <Label htmlFor="email">Article Content</Label>
            </div>
            <div className="w-full line-clamp-3">{contentData}</div>

            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    See more
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-157 p-7">
                  <DialogHeader>
                    <DialogTitle className="text-black font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
                      {titleData}
                    </DialogTitle>
                    <div className="text-black font-inter text-[14px] font-normal leading-5">
                      {contentData}
                    </div>
                  </DialogHeader>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">
        <Button
          type="submit"
          className="w-31 cursor-pointer"
          onClick={handleTakeQuiz}
          disabled={loading}
        >
          Take a quiz
        </Button>
      </CardFooter>
    </Card>
  );
}
