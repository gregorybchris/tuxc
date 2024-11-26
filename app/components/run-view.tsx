"use client";

import { Run } from "@/app/lib/models/run";
import { cn } from "@/app/lib/utilities/style-utils";
import Link from "next/link";

interface RunViewProps {
  run: Run;
  className?: string;
}

export function RunView({ run, className }: RunViewProps) {
  return (
    <div className={cn("group w-40 transition-all md:w-36", className)}>
      <Link href={`/runs/${run.id}`}>
        <div className="flex flex-col items-start gap-2">
          <div className="flex h-20 w-full flex-row items-center justify-center rounded-md border-4 border-transparent bg-tufts-brown transition-all group-hover:border-white/40 md:h-24"></div>
          <div className="text-near-white text-sm transition-all group-hover:text-black/70">
            {run.name}
          </div>
        </div>
      </Link>
    </div>
  );
}
