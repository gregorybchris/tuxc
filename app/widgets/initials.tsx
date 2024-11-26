"use client";

import { cn } from "../lib/utilities/style-utils";

interface InitialsBadgeProps {
  initials: string;
  className?: string;
}

export function InitialsBadge({ initials, className }: InitialsBadgeProps) {
  return (
    <div className={cn("flex select-none flex-row gap-1", className)}>
      <div className="flex flex-col items-center justify-between gap-2">
        <div className="flex size-6 flex-row items-center justify-center rounded-full bg-tufts-blue/20 transition-all">
          <span className="text-center text-[10px]">{initials}</span>
        </div>
      </div>
    </div>
  );
}
