import { ReactNode } from "react";
import { cn } from "../lib/utilities/style-utils";

interface SubmitButtonProps {
  children: ReactNode;
  className?: string;
}

export function SubmitButton({ children, className }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        "flex flex-col items-center justify-center rounded-md px-6 py-1.5 text-center text-sm text-black/80 transition-all hover:bg-black/5 focus:outline-none",
        className,
      )}
    >
      {children}
    </button>
  );
}
