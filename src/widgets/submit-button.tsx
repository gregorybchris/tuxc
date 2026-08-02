import { ReactNode } from "react";
import { cn } from "../lib/utilities/style-utils";
import { BUTTON_BASE, VARIANT_CLASSES } from "./button-styles";

interface SubmitButtonProps {
  children: ReactNode;
  className?: string;
}

export function SubmitButton({ children, className }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        BUTTON_BASE,
        VARIANT_CLASSES.primary,
        "px-5 py-2.5",
        className,
      )}
    >
      {children}
    </button>
  );
}
