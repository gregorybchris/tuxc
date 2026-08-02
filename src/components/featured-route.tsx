import { getRunMap, hasRunMap } from "@/db/maps";
import { Run } from "@/lib/models/run";
import { getRouteOutline } from "@/lib/thumbnail/route-outline";
import { getVisibleRuns } from "@/lib/utilities/api-utils";
import { useState } from "react";
import { Link } from "react-router-dom";

// Routes that read well drawn large: closed loops with a shape you could pick
// out of a lineup.
const FEATURED_SLUGS = [
  "around-the-fells",
  "aquarium",
  "bbb",
  "boat-house",
  "boston-tour",
  "brooks-estate",
  "dea-pond",
  "encore",
  "fells-n-chips",
  "fresh-pond",
];

function pickFeaturedRun(): Run | undefined {
  const runs = getVisibleRuns().filter(
    (run) => FEATURED_SLUGS.includes(run.slug) && hasRunMap(run.slug),
  );
  if (runs.length === 0) return undefined;
  return runs[Math.floor(Math.random() * runs.length)];
}

/**
 * One route from the archive, drawn large as line art.
 *
 * A different one each visit, which is the point: the archive is 150-odd of
 * these and no two are the same shape.
 */
export function FeaturedRoute() {
  // Picked once per mount, so a re-render does not swap the drawing out from
  // under the reader.
  const [run] = useState(pickFeaturedRun);
  const runMap = run ? getRunMap(run.slug) : undefined;
  const outline = runMap ? getRouteOutline(runMap) : null;

  if (!run || !outline) return null;

  return (
    <figure className="flex flex-col items-center gap-3">
      <Link
        to={`/runs/${run.slug}`}
        className="group w-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-tufts-blue"
        aria-label={`${run.name}, ${run.distance} miles`}
      >
        <svg
          viewBox={outline.viewBox}
          className="h-56 w-full sm:h-72 lg:h-[26rem]"
          role="img"
          aria-hidden="true"
        >
          {/* The wash arrives late, as the line closes the loop it belongs to. */}
          {outline.loops.map((loop, index) => (
            <path
              key={index}
              d={loop}
              className="animate-fade fill-tufts-blue/10 transition-colors [animation-delay:1.15s] group-hover:fill-tufts-blue/20"
            />
          ))}
          <path
            d={outline.route}
            fill="none"
            pathLength={1}
            className="animate-trace stroke-light-blue transition-colors [animation-delay:0.35s] group-hover:stroke-tufts-blue"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </Link>

      <figcaption className="animate-rise flex flex-row items-baseline gap-2 text-sm [animation-delay:1.5s]">
        <span className="text-black/40">Featured route</span>
        <Link
          to={`/runs/${run.slug}`}
          className="font-bold text-black/70 underline-offset-4 hover:underline"
        >
          {run.name}
        </Link>
        <span className="text-black/40">{run.distance} mi</span>
      </figcaption>
    </figure>
  );
}
