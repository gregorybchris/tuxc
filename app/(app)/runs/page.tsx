"use client";

import { useEffect, useRef, useState } from "react";

import { Dropdown } from "@/app/components/dropdown";
import { LoadingRunViews } from "@/app/components/loading-run-views";
import { RunView } from "@/app/components/run-view";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";
import { runMatchesSearch } from "@/app/lib/utilities/search-utils";
import {
  getRunsByCreated,
  getRunsByDistance,
  getRunsByName,
} from "@/app/lib/utilities/sort-utils";
import { LinkButton } from "@/app/widgets/link-button";
import { Textbox } from "@/app/widgets/textbox";

export default function RunsPage() {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [runs, setRuns] = useState<Run[]>([]);
  const [sortValue, setSortValue] = useState<string>("Alphabetical");
  const client = useRef(new Client());

  useEffect(() => {
    fetchRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchRuns() {
    setLoading(true);
    setRuns([]);
    client.current.getRuns().then((runs) => {
      setRuns(runs);
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

  return (
    <div className="h-full w-full px-5 py-10 md:px-20 md:py-20">
      <div className="flex w-full flex-col items-center gap-5 md:items-start">
        <div className="flex w-full flex-col items-center">
          <div className="text-xl font-bold text-black/60">
            TUXC Run Preservation Project
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2 px-10 md:items-start md:px-0">
          <LinkButton text="About the project" href="/rpp" iconName="info" />
          {/* <LinkButton text="Make an edit" href="/edit" iconName="pencil" /> */}
          <div className="flex w-full flex-col items-center gap-3 md:flex-row">
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

            <Dropdown
              value={sortValue}
              setValue={setSortValue}
              choices={["Alphabetical", "Distance", "Recently added"]}
            />
          </div>
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
