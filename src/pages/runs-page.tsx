import { useEffect, useMemo, useRef, useState } from "react";

import { RunView } from "@/components/run-view";
import {
  TrailsToggle,
  TrailsToggleGroup,
} from "@/components/trail-toggle-group";
import { Client } from "@/lib/clients/client";
import { useFavorites } from "@/lib/hooks/favorites-storage";
import { Run } from "@/lib/models/run";
import { runMatchesSearch } from "@/lib/utilities/search-utils";
import {
  getRunsByCreated,
  getRunsByDistance,
  getRunsByName,
} from "@/lib/utilities/sort-utils";
import { cn } from "@/lib/utilities/style-utils";
import { Button } from "@/widgets/button";
import { CommonIcon } from "@/widgets/common-icon";
import { Dropdown } from "@/widgets/dropdown";
import { LoadingRunViews } from "@/widgets/loading-run-views";
import { Page, PageHeader } from "@/widgets/page";
import { Textbox } from "@/widgets/textbox";
import * as Slider from "@radix-ui/react-slider";

const MIN_DISTANCE = 0;
const MAX_DISTANCE = 100;

const SORT_CHOICES = ["Alphabetical", "Distance", "Recently added"];

// How many cards to add each time the end of the grid comes into view.
const BATCH_SIZE = 24;

function getDistanceRange(runs: Run[]): [number, number] {
  const minDistance =
    runs.reduce((min, run) => Math.min(min, run.distance), MAX_DISTANCE) ||
    MIN_DISTANCE;
  const maxDistance =
    runs.reduce((max, run) => Math.max(max, run.distance), MIN_DISTANCE) ||
    MAX_DISTANCE;
  return [minDistance, maxDistance];
}

export default function RunsPage() {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [runs, setRuns] = useState<Run[]>([]);
  const [sortValue, setSortValue] = useState<string>(SORT_CHOICES[0]);
  const [trailsToggle, setTrailsToggle] = useState<TrailsToggle>(undefined);
  const [favoritesToggle, setFavoritesToggle] = useState<boolean>(false);
  const [favorites, saveFavorites] = useFavorites();
  const client = useRef(new Client());
  const [distanceRange, setDistanceRange] = useState([
    MIN_DISTANCE,
    MAX_DISTANCE,
  ]);

  useEffect(() => {
    setLoading(true);
    client.current.getRuns().then((runs) => {
      setRuns(runs);
      setDistanceRange(getDistanceRange(runs));
      setLoading(false);
    });
  }, []);

  const [minDistance, maxDistance] = getDistanceRange(runs);

  const selectedRuns = useMemo(() => {
    let selected = runs.filter((run) => runMatchesSearch(run, searchText));

    if (sortValue === "Alphabetical") selected = getRunsByName(selected);
    else if (sortValue === "Recently added")
      selected = getRunsByCreated(selected);
    else if (sortValue === "Distance") selected = getRunsByDistance(selected);

    selected = selected.filter(
      (run) =>
        run.distance >= distanceRange[0] && run.distance <= distanceRange[1],
    );
    selected = selected.filter((run) => {
      if (trailsToggle === "trails") return run.includesTrail;
      if (trailsToggle === "no trails") return !run.includesTrail;
      return true;
    });
    return selected.filter((run) => {
      if (favoritesToggle) return favorites.some((fav) => fav.id === run.id);
      return true;
    });
  }, [
    runs,
    searchText,
    sortValue,
    distanceRange,
    trailsToggle,
    favoritesToggle,
    favorites,
  ]);

  // Thumbnails are images and load lazily on their own, but the grid still
  // fills in as you scroll rather than putting all 150-odd cards in the
  // document up front.
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset on what the reader changed, not on the filtered list itself, so
  // favoriting a run mid-scroll does not throw them back to the first batch.
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [searchText, sortValue, distanceRange, trailsToggle, favoritesToggle]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setVisibleCount((count) =>
          Math.min(count + BATCH_SIZE, selectedRuns.length),
        );
      },
      // Start on the next batch before the reader reaches the end of this one.
      { rootMargin: "600px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [selectedRuns.length, visibleCount]);

  const visibleRuns = selectedRuns.slice(0, visibleCount);

  const filtered =
    searchText.length > 0 ||
    trailsToggle !== undefined ||
    favoritesToggle ||
    distanceRange[0] !== minDistance ||
    distanceRange[1] !== maxDistance;

  function toggleFavorite(run: Run) {
    const isFavorite = favorites.some((favorite) => favorite.id === run.id);
    saveFavorites(
      isFavorite
        ? favorites.filter((favorite) => favorite.id !== run.id)
        : [...favorites, { id: run.id }],
    );
  }

  function clearFilters() {
    setSearchText("");
    setTrailsToggle(undefined);
    setFavoritesToggle(false);
    setDistanceRange([minDistance, maxDistance]);
  }

  return (
    <Page className="flex flex-col gap-6">
      <PageHeader
        title="TUXC Run Preservation Project"
        lede="All routes in the archive."
      />

      {!loading && (
        <div className="sticky top-14 z-20 -mx-5 flex flex-col gap-3 border-b border-ink/10 bg-surface px-5 py-3 sm:-mx-8 sm:px-8 md:top-16">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <Textbox
              value={searchText}
              onChange={setSearchText}
              id="search"
              name="search"
              placeholder={`Search ${runs.length} runs`}
              icon="search"
              className="w-full min-w-[12rem] sm:w-auto sm:flex-1"
            />

            <div className="flex flex-row items-center gap-2">
              <label htmlFor="distance-slider" className="text-sm text-ink/50">
                Distance
              </label>
              <Slider.Root
                id="distance-slider"
                className="relative flex h-5 w-[9rem] touch-none select-none items-center"
                min={minDistance}
                max={maxDistance}
                step={0.1}
                minStepsBetweenThumbs={1}
                value={distanceRange}
                onValueChange={setDistanceRange}
              >
                <Slider.Track className="relative h-[3px] grow rounded-full bg-ink/20">
                  <Slider.Range className="absolute h-full rounded-full bg-ink/30" />
                </Slider.Track>
                <Slider.Thumb className="flex size-5 cursor-pointer flex-col items-center justify-center rounded-full bg-route text-[10px] text-accent-ink outline-none transition-colors hover:bg-route-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                  {distanceRange[0].toFixed(0)}
                </Slider.Thumb>
                <Slider.Thumb className="flex size-5 cursor-pointer flex-col items-center justify-center rounded-full bg-route text-[10px] text-accent-ink outline-none transition-colors hover:bg-route-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                  {distanceRange[1].toFixed(0)}
                </Slider.Thumb>
              </Slider.Root>
            </div>

            <div className="flex flex-row items-center gap-3">
              <button
                type="button"
                className={cn(
                  "flex size-[35px] flex-row items-center justify-center rounded border border-ink/10 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent md:hover:bg-ink/5",
                  favoritesToggle && "bg-ink/15 md:hover:bg-ink/20",
                )}
                onClick={() => setFavoritesToggle(!favoritesToggle)}
                aria-pressed={favoritesToggle}
                title="Favorites"
              >
                <CommonIcon
                  name="star"
                  size={16}
                  className="text-accent"
                  weight="duotone"
                />
              </button>

              <TrailsToggleGroup
                value={trailsToggle}
                onChange={setTrailsToggle}
              />

              <Dropdown
                value={sortValue}
                setValue={setSortValue}
                choices={SORT_CHOICES}
              />
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 text-sm text-ink/50">
            <span>
              {selectedRuns.length}{" "}
              {selectedRuns.length === 1 ? "route" : "routes"}
              {filtered && ` of ${runs.length}`}
            </span>
            {filtered && (
              <Button
                text="Clear filters"
                onClick={clearFilters}
                className="px-2 py-1 text-sm"
              />
            )}
          </div>
        </div>
      )}

      {loading && <LoadingRunViews numLoading={15} />}

      {!loading && selectedRuns.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-ink/50">
            {runs.length === 0
              ? "No runs in the archive yet."
              : "No routes match these filters."}
          </p>
          {filtered && (
            <Button
              text="Clear filters"
              onClick={clearFilters}
              variant="outline"
            />
          )}
        </div>
      )}

      {!loading && selectedRuns.length > 0 && (
        <>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleRuns.map((run) => (
              <li key={run.id}>
                <RunView
                  run={run}
                  isFavorite={favorites.some((fav) => fav.id === run.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </li>
            ))}
          </ul>

          {/* Scrolling within reach of this loads the next batch. Every route is
              still counted in the summary above, whether it is drawn yet or not. */}
          {visibleRuns.length < selectedRuns.length && (
            <div
              ref={sentinelRef}
              className="flex flex-row justify-center py-6 text-sm text-ink/40"
            >
              Loading more routes…
            </div>
          )}
        </>
      )}
    </Page>
  );
}
