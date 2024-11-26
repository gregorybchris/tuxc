"use client";

import { Run } from "@/app/lib/models/run";
import { cn } from "@/app/lib/utilities/style-utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Client } from "../lib/clients/client";
import { RunMap } from "../lib/models/runMap";
import { generateThumbnail } from "../lib/thumbnail/thumbnail-generator";

interface RunViewProps {
  run: Run;
  className?: string;
}

export function RunView({ run, className }: RunViewProps) {
  const [runMap, setRunMap] = useState<RunMap>();
  const thumbnailRef = useRef<SVGSVGElement | null>(null);
  const client = useRef(new Client());

  useEffect(() => {
    const svg = thumbnailRef.current;
    if (!svg) return;

    if (!runMap) return;

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    generateThumbnail(runMap, svg);
  }, [runMap]);

  useEffect(() => {
    fetchRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchRun() {
    client.current.getRunMap(run.id).then((runMap) => {
      setRunMap(runMap);
    });
  }

  return (
    <div className={cn("group w-40 transition-all md:w-36", className)}>
      <Link href={`/runs/${run.id}`}>
        <div className="flex flex-col items-start gap-2">
          <svg
            ref={thumbnailRef}
            className="h-20 w-full border-4 border-transparent transition-all group-hover:border-white/40 md:h-24"
          />
          <div className="text-near-white text-sm transition-all group-hover:text-black/70">
            {run.name}
          </div>
        </div>
      </Link>
    </div>
  );
}
