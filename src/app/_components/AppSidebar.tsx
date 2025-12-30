import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";

type Article = {
  title: string;
  id: string;
};

type AppSidebarProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setSelectedArticleId: React.Dispatch<React.SetStateAction<string>>;
};

export function AppSidebar({ setStep, setSelectedArticleId }: AppSidebarProps) {
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const widths = ["w-50", "w-44", "w-48"];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const responseArticle = await axios.get("/api/articles");
        setArticleData(responseArticle.data.articles);
        setSelectedArticleId(responseArticle.data.articles[0]?.id || "");
        console.log("Articles fetched:", responseArticle.data);
      } catch (error) {
        console.error("Error articles fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sidebar className="border-none">
      <SidebarHeader className="p-4 bg-white">
        <h2 className="text-foreground text-lg font-semibold leading-7 tracking-tight">
          History
        </h2>
      </SidebarHeader>
      <SidebarContent className="bg-white p-4">
        {loading ? (
          <div className="flex flex-col gap-7 mt-1.5">
            {Array.from({ length: 30 }).map((_, index) => (
              <Skeleton
                key={index}
                className={`h-4 ${widths[index % widths.length]}`}
              />
            ))}
          </div>
        ) : articleData.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center gap-2 py-10">
            <p className="text-sm font-medium text-muted-foreground">
              No history yet
            </p>
            <p className="text-xs text-muted-foreground">
              Your saved articles will appear here
            </p>
          </div>
        ) : (
          articleData.map((article, index) => (
            <Button
              onClick={() => {
                setSelectedArticleId(article.id);
                setStep(5);
              }}
              variant="outline"
              key={index}
              className="max-w-54 flex justify-start text-[#09090B] p-2 font-sans text-[16px] font-medium leading-6 tracking-0 border-none shadow-none cursor-pointer"
            >
              {article.title}
            </Button>
          ))
        )}
      </SidebarContent>
      <SidebarFooter className=" p-4">Footer Content</SidebarFooter>
    </Sidebar>
  );
}
