"use client";
import { cn } from "../lib/utilities/style-utils";
import { CommonIcon } from "./common-icon";
type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  text: string;
  type?: ButtonTypes;
  onClick?: () => void;
  iconName?: string;
  className?: string;
}

export function Button({
  text,
  type,
  onClick,
  iconName,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "hover-bg-black/5 flex cursor-pointer select-none flex-col items-center justify-center rounded px-6 py-1.5 text-center text-sm text-black/80 transition-all hover:bg-black/5 hover:text-black/90",
        className,
      )}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        {iconName && (
          <CommonIcon
            name={iconName}
            size={16}
            color="#3172AE"
            weight="duotone"
          />
        )}
        <span>{text}</span>
      </div>
    </button>
  );
}
