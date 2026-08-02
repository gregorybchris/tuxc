import { Client } from "@/lib/clients/client";
import { Run } from "@/lib/models/run";
import { RunMap } from "@/lib/models/runMap";
import { getRouteOutline } from "@/lib/thumbnail/route-outline";
import { useEffect, useMemo, useRef, useState } from "react";

// Strokes are set in pixels rather than grid units so a short loop and a
// marathon come out drawn with the same weight.
const STROKE_WIDTH = 2.5;

interface RunThumbnailProps {
  run: Run;
  className?: string;
}

export function RunThumbnail({ run, className }: RunThumbnailProps) {
  const [runMap, setRunMap] = useState<RunMap>();
  const client = useRef(new Client());

  useEffect(() => {
    let current = true;
    client.current.getRunMap(run.id).then((runMap) => {
      if (current) setRunMap(runMap);
    });
    return () => {
      current = false;
    };
  }, [run.id]);

  const outline = useMemo(
    () => (runMap ? getRouteOutline(runMap) : null),
    [runMap],
  );

  if (!outline) return <div className={className} />;

  return (
    <svg
      className={className}
      viewBox={outline.viewBox}
      role="img"
      aria-label={`Route map for ${run.name}`}
    >
      {outline.loops.map((loop, index) => (
        <path key={index} d={loop} className="fill-light-blue/[0.16]" />
      ))}
      <path
        d={outline.route}
        className="stroke-light-blue"
        fill="none"
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
