import { useEffect, useRef, useState } from "react";

import { RunMapsView } from "@/components/run-maps-view";
import { Client } from "@/lib/clients/client";
import { Run } from "@/lib/models/run";
import { RunMap } from "@/lib/models/runMap";
import { Coordinate } from "@/lib/utilities/map-utils";
import { cn } from "@/lib/utilities/style-utils";
import { CommonIcon } from "@/widgets/common-icon";
import { LinkButton } from "@/widgets/link-button";
import { LoadingBox } from "@/widgets/loading-box";
import { Page, PageHeader } from "@/widgets/page";
import { useNavigate } from "react-router-dom";

// Routes pile up downtown and along the river, so the hover card names a
// handful and counts the rest rather than growing tall enough to cover the map.
// Clicking is the way to see all of them.
const maxNamesShown = 6;

/** Where a click landed, and the routes it caught. */
type PinnedPoint = {
  coordinate: Coordinate;
  slugs: string[];
};

export default function RunsMapPage() {
  const [loading, setLoading] = useState(true);
  const [runs, setRuns] = useState<Run[]>([]);
  const [runMaps, setRunMaps] = useState<RunMap[]>([]);
  const [hoveredSlugs, setHoveredSlugs] = useState<string[]>([]);
  const [pinned, setPinned] = useState<PinnedPoint | null>(null);
  const [listHoveredSlug, setListHoveredSlug] = useState<string | null>(null);
  const client = useRef(new Client());
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    client.current.getRunMaps().then((runMaps) => {
      setRunMaps(runMaps);
      setLoading(false);
    });
    client.current.getRuns().then(setRuns);
  }, []);

  // The pin covers part of the map and the list covers more, so there has to be
  // a way out that isn't aiming at a small button.
  useEffect(() => {
    if (!pinned) {
      return;
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPinned(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pinned]);

  // Slugs arrive closest-first, and that order is what the cards preserve.
  function toRuns(slugs: string[]): Run[] {
    return slugs
      .map((slug) => runs.find((run) => run.slug === slug))
      .filter((run): run is Run => run !== undefined);
  }

  function onClickRun(slug: string) {
    navigate(`/runs/${slug}`);
  }

  // Clicking bare map is how you put the map back the way you found it.
  function onClickPoint(coordinate: Coordinate, slugs: string[]) {
    setListHoveredSlug(null);
    setPinned(slugs.length > 0 ? { coordinate, slugs } : null);
  }

  const hoveredRuns = toRuns(hoveredSlugs);
  const pinnedRuns = pinned ? toRuns(pinned.slugs) : [];

  // Pointing at one name in the list picks that route out of the tangle;
  // otherwise the map's own hover keeps working the way it always has.
  const highlightedSlugs = listHoveredSlug ? [listHoveredSlug] : hoveredSlugs;

  return (
    <Page className="flex flex-col gap-6">
      <PageHeader
        title="Heatmap"
        lede="Works best on desktop. Hover to see every route through a spot, click to drop a pin and pick one."
        actions={
          <LinkButton
            text="Back to the grid"
            href="/runs"
            iconName="grid"
            className="-ml-3"
          />
        }
      />

      {loading && <LoadingBox className="h-[60vh] min-h-[24rem] w-full" />}

      {!loading && (
        <div className="relative h-[60vh] min-h-[24rem] w-full overflow-hidden rounded-xl border border-ink/10">
          <RunMapsView
            runMaps={runMaps}
            onClickPoint={onClickPoint}
            onHoverRuns={setHoveredSlugs}
            pinnedCoordinate={pinned?.coordinate ?? null}
            highlightedSlugs={highlightedSlugs}
          />

          {hoveredRuns.length > 0 && (
            <div className="pointer-events-none absolute left-3 top-3 flex max-w-[15rem] flex-col gap-1.5 rounded-md bg-raised/95 px-3 py-1.5 shadow-sm">
              {hoveredRuns.slice(0, maxNamesShown).map((run, index) => (
                <div key={run.slug} className="flex flex-col">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      // The closest route leads, the way it does in the list.
                      index === 0 ? "text-ink/80" : "text-ink/55",
                    )}
                  >
                    {run.name}
                    <span className="pl-2 font-normal text-ink/50">
                      {run.distance} mi
                    </span>
                  </span>
                  <span className="text-xs text-ink/40">{run.area}</span>
                </div>
              ))}

              {hoveredRuns.length > maxNamesShown && (
                <span className="text-xs text-ink/40">
                  +{hoveredRuns.length - maxNamesShown} more
                </span>
              )}
            </div>
          )}

          {pinnedRuns.length > 0 && (
            <div className="absolute right-3 top-3 flex max-h-[calc(100%-1.5rem)] w-[15rem] flex-col rounded-md bg-raised/95 shadow-md">
              <div className="flex items-center justify-between gap-2 border-b border-ink/10 px-3 py-2">
                <span className="text-xs font-bold uppercase tracking-wide text-ink/50">
                  {pinnedRuns.length}{" "}
                  {pinnedRuns.length === 1 ? "route" : "routes"} here
                </span>
                <button
                  type="button"
                  onClick={() => setPinned(null)}
                  aria-label="Clear the pin"
                  className="-mr-1.5 rounded p-1 text-ink/40 hover:bg-ink/5 hover:text-ink/70"
                >
                  <CommonIcon name="close" size={14} weight="bold" />
                </button>
              </div>

              {/* min-h-0 so the list scrolls inside the card instead of
                  stretching it past the bottom of the map. */}
              <div className="flex min-h-0 flex-col overflow-y-auto p-1">
                {pinnedRuns.map((run) => (
                  <button
                    key={run.slug}
                    type="button"
                    onClick={() => onClickRun(run.slug)}
                    onMouseEnter={() => setListHoveredSlug(run.slug)}
                    onMouseLeave={() => setListHoveredSlug(null)}
                    className="flex flex-col rounded px-2 py-1.5 text-left hover:bg-ink/5"
                  >
                    <span className="text-sm font-bold text-ink/80">
                      {run.name}
                      <span className="pl-2 font-normal text-ink/50">
                        {run.distance} mi
                      </span>
                    </span>
                    <span className="text-xs text-ink/40">{run.area}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Page>
  );
}
