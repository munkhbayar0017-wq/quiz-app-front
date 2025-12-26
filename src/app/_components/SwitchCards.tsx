"use client";
import InputCard from "./InputCard";
import SummarizedCard from "./SummarizedCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import QuickTest from "./QuickTest";
import QuizCompleted from "./QuizCompleted";

export default function SwitchCards() {
  const [summary, setSummary] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [quiz, setQuiz] = useState<[]>([]);

  return (
    <div className="max-w-214 w-full min-h-110.5 p-7 flex flex-col gap-5">
      {step === 2 && (
        <Button
          onClick={() => {
            setStep(1);
          }}
          variant="outline"
          className="w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer"
        >
          <ChevronLeft />
        </Button>
      )}
      {step === 1 && (
        <InputCard
          summary={summary}
          setSummary={setSummary}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <SummarizedCard
          quiz={quiz}
          setQuiz={setQuiz}
          summary={summary}
          setSummary={setSummary}
          title={title}
          content={content}
          setStep={setStep}
        />
      )}
      {step === 3 && <QuickTest setStep={setStep} quiz={quiz} />}
      {step === 4 && <QuizCompleted setStep={setStep} />}
    </div>
  );
}
