import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Header() {
  return (
    <header className="flex w-full justify-between items-center py-2 px-6 gap-4 h-16 border border-[#E4E4E7] bg-white">
      <div className="flex items-center gap-4">
        <div className="text-black font-semibold text-[24px] leading-9 tracking-[-0.528px]">
          Quiz app
        </div>
      </div>
      <div className="flex gap-5">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#000000] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
