"use client";
import Link from "next/link";
import { cn } from "../lib/utilities/style-utils";
import { CommonIcon, IconName } from "./common-icon";

interface LinkButtonProps {
  text: string;
  href: string;
  iconName?: IconName;
  className?: string;
}

export function LinkButton({
  text,
  href,
  iconName,
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded px-2 py-1.5 text-sm transition-all hover:bg-black/5",
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
    </Link>
  );
}
