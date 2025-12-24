import { Button } from "@/components/ui/button";
import GeminiIcon from "../icons/GeminiIcon";
import WrongIcon from "../icons/WrongIcon";
import CorrectIcon from "../icons/CorrectIcon";
import ReloadIcon from "../icons/ReloadIcon";
import BookMarkIcon from "../icons/BookMarkIcon";

type QuickTestProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function QuizCompleted({ setStep }: QuickTestProps) {
  return (
    <div className="w-107 h-154 flex flex-col items-center justify-center gap-6">
      <div className="flex justify-between w-full">
        <div className="flex-col gap-2 items-center">
          <div className="flex gap-2 items-center">
            <GeminiIcon />
            <div className="text-black text-center font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
              Quiz completed
            </div>
          </div>
          <div className="text-gray-500 text-center font-inter text-[16px] font-medium leading-6 tracking-normal">
            Let’s see what you did
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-white border p-7 flex flex-col rounded-lg gap-7">
        <div className="flex justify-start items-center gap-2">
          <div className="text-black font-inter text-[20px] font-medium leading-7 tracking-normal">
            Your score:
          </div>
          <div className="text-black font-inter text-[20px] font-medium leading-7 tracking-normal">
            2/
            <span className="text-gray-500 font-inter text-[16px] font-medium leading-6 tracking-normal">
              5
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <WrongIcon />
            <div className="flex flex-col gap-1">
              <div className="text-gray-500 font-inter text-[12px] font-medium leading-4 tracking-normal">
                1. What was Genghis Khan’s birth name?
              </div>
              <div className="text-neutral-900 font-inter text-[12px] font-medium leading-4 tracking-normal">
                Your answer: Toghrul
              </div>
              <div className="text-green-500 font-inter text-[12px] font-medium leading-4 tracking-normal">
                Correct: Temüjin
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <CorrectIcon />
            <div className="flex flex-col gap-1">
              <div className="text-gray-500 font-inter text-[12px] font-medium leading-4 tracking-normal">
                1. What was Genghis Khan’s birth name?
              </div>
              <div className="text-neutral-900 font-inter text-[12px] font-medium leading-4 tracking-normal">
                Your answer: Toghrul
              </div>
              <div className="text-green-500 font-inter text-[12px] font-medium leading-4 tracking-normal">
                Correct: Temüjin
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <WrongIcon />
            <div className="flex flex-col gap-1">
              <div className="text-gray-500 font-inter text-[12px] font-medium leading-4 tracking-normal">
                1. What was Genghis Khan’s birth name?
              </div>
              <div className="text-neutral-900 font-inter text-[12px] font-medium leading-4 tracking-normal">
                Your answer: Toghrul
              </div>
              <div className="text-green-500 font-inter text-[12px] font-medium leading-4 tracking-normal">
                Correct: Temüjin
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-5">
          <Button
            variant="outline"
            className="w-44 flex gap-2 items-center justify-center cursor-pointer"
            onClick={() => setStep(3)}
          >
            <ReloadIcon />
            Restart quiz
          </Button>
          <Button
            onClick={() => setStep(1)}
            className="w-44 flex gap-2 items-center justify-center cursor-pointer"
          >
            <BookMarkIcon />
            Save and leave
          </Button>
        </div>
      </div>
    </div>
  );
}
