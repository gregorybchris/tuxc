"use client";

import { useEffect, useRef, useState } from "react";

import { RunView } from "@/app/components/run-view";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";
import { runMatchesSearch } from "@/app/lib/utilities/search-utils";
import {
  getRunsByCreated,
  getRunsByDistance,
  getRunsByName,
} from "@/app/lib/utilities/sort-utils";
import { Dropdown } from "@/app/widgets/dropdown";
import { LinkButton } from "@/app/widgets/link-button";
import { LoadingRunViews } from "@/app/widgets/loading-run-views";
import { Textbox } from "@/app/widgets/textbox";
import * as Slider from "@radix-ui/react-slider";

const MIN_DISTANCE = 0;
const MAX_DISTANCE = 100;

export default function RunsPage() {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [runs, setRuns] = useState<Run[]>([]);
  const [sortValue, setSortValue] = useState<string>("Alphabetical");
  const client = useRef(new Client());
  const [distanceRange, setDistanceRange] = useState([
    MIN_DISTANCE,
    MAX_DISTANCE,
  ]);

  useEffect(() => {
    fetchRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchRuns() {
    setLoading(true);
    setRuns([]);
    client.current.getRuns().then((runs) => {
      setRuns(runs);
      setDistanceRange(getDistanceRange(runs));
      setLoading(false);
    });
  }

  let selectedRuns = runs.filter((run) => runMatchesSearch(run, searchText));
  if (sortValue === "Alphabetical") {
    selectedRuns = getRunsByName(selectedRuns);
  } else if (sortValue === "Recently added") {
    selectedRuns = getRunsByCreated(selectedRuns);
  } else if (sortValue === "Distance") {
    selectedRuns = getRunsByDistance(selectedRuns);
  }

  selectedRuns = selectedRuns.filter(
    (run) =>
      run.distance >= distanceRange[0] && run.distance <= distanceRange[1],
  );

  function getDistanceRange(runs: Run[]): [number, number] {
    const minDistance =
      runs.reduce((min, run) => Math.min(min, run.distance), MAX_DISTANCE) ||
      MIN_DISTANCE;
    const maxDistance =
      runs.reduce((max, run) => Math.max(max, run.distance), MIN_DISTANCE) ||
      MAX_DISTANCE;
    return [minDistance, maxDistance];
  }

  const [minDistance, maxDistance] = getDistanceRange(runs);

  return (
    <div className="h-full w-full px-5 py-10 md:px-20 md:py-20">
      <div className="flex w-full flex-col items-center gap-5 md:items-start">
        <div className="flex w-full flex-col items-center">
          <div className="text-xl font-bold text-black/60">
            TUXC Run Preservation Project
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-6 md:items-start">
          <div className="flex flex-row items-center gap-5">
            <LinkButton text="About the project" href="/rpp" iconName="info" />
            <LinkButton text="Submit a run" href="/edit" iconName="pin-plus" />
          </div>
          {!loading && (
            <>
              <div className="flex w-full flex-col items-center gap-5 md:flex-row">
                <div className="flex flex-row gap-3">
                  <div className="text-sm">Distance</div>
                  <Slider.Root
                    className="relative flex h-5 w-[200px] touch-none select-none items-center"
                    min={minDistance}
                    max={maxDistance}
                    step={0.1}
                    minStepsBetweenThumbs={1}
                    value={distanceRange}
                    onValueChange={setDistanceRange}
                  >
                    <Slider.Track className="relative h-[3px] grow rounded-full bg-black/20">
                      <Slider.Range className="absolute h-full rounded-full bg-black/30" />
                    </Slider.Track>
                    <Slider.Thumb className="bg-light-blue flex size-5 cursor-pointer flex-col items-center justify-center rounded-[10px] text-[10px] text-white transition-all hover:bg-tufts-blue focus:outline-none">
                      {distanceRange[0].toFixed(0)}
                    </Slider.Thumb>
                    <Slider.Thumb className="bg-light-blue flex size-5 cursor-pointer flex-col items-center justify-center rounded-[10px] text-[10px] text-white transition-all hover:bg-tufts-blue focus:outline-none">
                      {distanceRange[1].toFixed(0)}
                    </Slider.Thumb>
                  </Slider.Root>
                </div>

                <Dropdown
                  value={sortValue}
                  setValue={setSortValue}
                  choices={["Alphabetical", "Distance", "Recently added"]}
                />

                <Textbox
                  value={searchText}
                  onChange={setSearchText}
                  id="search"
                  name="search"
                  placeholder="Search"
                  required
                  icon="search"
                  className="w-full md:w-[300px]"
                />
              </div>
            </>
          )}
        </div>
        {loading && <LoadingRunViews numLoading={12} />}

        {!loading && selectedRuns.length === 0 && (
          <div className="text-darkest-white/50 pt-5 text-center text-sm">
            {searchText.length === 0 && "no runs created yet"}
            {searchText.length > 0 && "no runs matching search"}
          </div>
        )}

        {!loading && selectedRuns.length !== 0 && (
          <div className="flex flex-row flex-wrap justify-center gap-6 md:justify-start">
            {selectedRuns.map((run) => (
              <RunView key={run.id} run={run} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
