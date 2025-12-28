//api/article/[articleId]/quizzes/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer?: string;
  answer: string;
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const { articleId } = await params;
    const { quizzes } = await req.json();

    console.log("articleId:", articleId);
    console.log("Received quizzes:", quizzes);

    await prisma.quiz.createMany({
      data: quizzes.map((quiz: QuizQuestion) => ({
        question: quiz.question,
        options: quiz.options,
        answer: quiz.answer,
        articleId: articleId,
      })),
    });
    return NextResponse.json({ quizzes, articleId }, { status: 200 });
  } catch (err) {
    console.error("Quiz post error:", err);
    return NextResponse.json(
      { success: false, error: "failed to post quizzes" },
      { status: 500 }
    );
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const { articleId } = await params;

    const quizzes = await prisma.quiz.findMany({
      where: { articleId: articleId },
    });

    return NextResponse.json({ quizzes }, { status: 200 });
  } catch (err) {
    console.error("Quiz get error:", err);
    return NextResponse.json(
      { success: false, error: "failed to get quizzes" },
      { status: 500 }
    );
  }
}
