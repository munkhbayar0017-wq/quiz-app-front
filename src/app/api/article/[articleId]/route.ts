//api/article/[articleId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const { articleId } = await params;
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { quizzes: true },
    });
    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ article }, { status: 200 });
  } catch (err) {
    console.error("Article get error:", err);
    return NextResponse.json(
      { success: false, error: "failed to get article" },
      { status: 500 }
    );
  }
}
