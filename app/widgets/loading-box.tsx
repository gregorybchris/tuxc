"use client";

import { cn } from "../lib/utilities/style-utils";

interface BoxLoadingProps {
  duration?: number;
  delay?: number;
  className?: string;
}

export function LoadingBox({ duration, delay, className }: BoxLoadingProps) {
  return (
    <div
      className={cn(
        "h-8 w-8 animate-pulse rounded bg-black/30 bg-opacity-25",
        className,
      )}
      style={{
        animationDelay: `${delay || 0}ms`,
        animationDuration: `${duration || 1000}ms`,
      }}
    ></div>
  );
}
