"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "../lib/utilities/style-utils";

interface SubmitButtonProps {
  children: ReactNode;
  className?: string;
}

export function SubmitButton({ children, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type={pending ? "button" : "submit"}
      aria-disabled={pending}
      className={cn(
        "flex flex-col items-center justify-center rounded-md px-6 py-1.5 text-center text-sm text-black/80 transition-all hover:bg-black/5 focus:outline-none",
        className,
      )}
    >
      {!pending && children}

      {pending && <PendingAnimation />}

      <span aria-live="polite" className="sr-only" role="status">
        {pending ? "loading" : "submit form"}
      </span>
    </button>
  );
}

function PendingAnimation() {
  return (
    <svg
      className="ml-2 h-4 w-4 animate-spin text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="#FFFFFF"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="#FFFFFF"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
