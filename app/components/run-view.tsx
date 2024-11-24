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
    <div className={cn("group w-36 transition-all", className)}>
      <Link href={`/rpp/runs/${run.id}`}>
        <div className="flex flex-col gap-1">
          <div className="flex h-24 w-36 flex-row items-center justify-center rounded-lg border-4 border-transparent bg-white/20 transition-all group-hover:border-white/10"></div>
          <div className="flex flex-row items-start justify-between gap-2">
            <div className="text-near-white text-sm transition-all group-hover:text-black/40">
              {run.name}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
