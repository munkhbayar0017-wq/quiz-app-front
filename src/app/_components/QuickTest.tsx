import { Button } from "@/components/ui/button";
import GeminiIcon from "../icons/GeminiIcon";
import { XIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type QuickTestProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function QuickTest({ setStep }: QuickTestProps) {
  return (
    <div className="w-140 h-72 flex flex-col items-center justify-center gap-6">
      <div className="flex justify-between w-full">
        <div className="flex-col gap-2 items-center">
          <div className="flex gap-2 items-center">
            <GeminiIcon />
            <div className="text-black text-center font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
              Quick test
            </div>
          </div>
          <div className="text-gray-500 text-center font-inter text-[16px] font-medium leading-6 tracking-normal">
            Take a quick test about your knowledge from your content
          </div>
        </div>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                <XIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-112.5 p-7">
              <DialogHeader>
                <DialogTitle className="text-black font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
                  Are you sure?
                </DialogTitle>
                <DialogDescription className="text-red-500">
                  If you press &apos;Cancel&apos;, this quiz will restart from
                  the beginning.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex items-center justify-between w-full gap-11">
                <DialogClose asChild>
                  <Button type="submit" className="w-44.75">
                    Go back
                  </Button>
                </DialogClose>
                <Button
                  variant="outline"
                  className="w-44.75"
                  onClick={() => setStep(1)}
                >
                  Cancel quiz
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <div className="w-full h-50 bg-white border p-7 flex flex-col rounded-lg gap-5">
        <div className="flex justify-between">
          <div className="text-black font-inter text-[20px] font-medium leading-7 tracking-normal">
            What was Genghis Khan’s birth name?
          </div>
          <div className="text-black font-inter text-[20px] font-medium leading-7 tracking-normal">
            1/
            <span className="text-gray-500 font-inter text-[16px] font-medium leading-6 tracking-normal">
              5
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="cursor-pointer">
            Yesugei
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Yesugei
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Yesugei
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Yesugei
          </Button>
        </div>
      </div>
    </div>
  );
}
