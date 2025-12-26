import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

type CreateArticleBody = {
  title: string;
  content: string;
  summary: string;
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }
    const body: CreateArticleBody = await req.json();

    if (!body.title || !body.content || !body.summary) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, or summary" },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title: body.title,
        content: body.content,
        summary: body.summary,
        user: {
          connect: {
            clerkId: userId,
          },
        },
      },
    });
    console.log("article created", article);
    return NextResponse.json(
      { success: true, message: "Article created", article },
      { status: 201 }
    );
  } catch (err) {
    console.error("Article creation error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create article",
      },
      { status: 400 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    const articles = await prisma.article.findMany({
      where: {
        user: {
          clerkId: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, articles }, { status: 200 });
  } catch (err) {
    console.error("Article fetch error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch articles",
      },
      { status: 400 }
    );
  }
}
