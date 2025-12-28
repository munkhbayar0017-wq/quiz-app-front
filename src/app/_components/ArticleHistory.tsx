"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import GeminiIcon from "../icons/GeminiIcon";
import FileIcon from "../icons/FileIcon";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import BookIcon from "../icons/BookIcon";

type ArticleHistoryProps = {
  articleId: string;
};

export default function ArticleHistory({ articleId }: ArticleHistoryProps) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) {
        console.error("articleId is missing");
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching article with ID:", articleId);
        const response = await axios.get(`/api/article/${articleId}`);
        console.log("Fetched article data:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [articleId]);

  return (
    <Card className="max-w-214 w-full min-h-110.5 p-7 gap-5">
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
        <div className="flex flex-col gap-4 items-end">
          <div className="flex gap-1 w-full items-start">
            <FileIcon />
            <Label htmlFor="email">Article Title</Label>
          </div>
          <div className="w-full items-start">content</div>
          <Button variant="outline" className="cursor-pointer">
            See more
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">
        <Button type="submit" className="w-31 cursor-pointer">
          {loading ? "Take a quiz..." : "Take a quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
