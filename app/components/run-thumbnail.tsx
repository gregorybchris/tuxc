"use client";

import { Run } from "@/app/lib/models/run";
import { useEffect, useRef, useState } from "react";
import { Client } from "../lib/clients/client";
import { RunMap } from "../lib/models/runMap";
import { ThumbnailGenerator } from "../lib/thumbnail/thumbnail-generator";

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

    ThumbnailGenerator.generate(runMap, svg);
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
    <svg
      ref={thumbnailRef}
      className="h-20 w-full border-4 border-transparent transition-all group-hover:border-white/40 md:h-24"
    />
  );
}
