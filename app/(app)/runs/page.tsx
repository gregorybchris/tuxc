"use client";

import { useEffect, useRef, useState } from "react";

import { LoadingRunViews } from "@/app/components/loading-run-views";
import { RunView } from "@/app/components/run-view";
import { SortDropdown } from "@/app/components/sort-dropdown";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";
import { runMatchesSearch } from "@/app/lib/utilities/search-utils";
import {
  getRunsByCreated,
  getRunsByUpdated,
} from "@/app/lib/utilities/sort-utils";
import { LinkButton } from "@/app/widgets/link-button";
import { Textbox } from "@/app/widgets/textbox";

export default function CollectionPage() {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [runs, setRuns] = useState<Run[]>([]);
  const [sortValue, setSortValue] = useState<string>("alphabetical");
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
  if (sortValue === "alphabetical") {
    selectedRuns.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "recently added") {
    selectedRuns = getRunsByCreated(selectedRuns);
  } else if (sortValue === "recently updated") {
    selectedRuns = getRunsByUpdated(selectedRuns);
  }

  return (
    <div className="h-full w-full px-5 py-10 md:px-20 md:py-20">
      <div className="flex w-full flex-col items-center gap-8 md:items-start">
        <div className="flex w-full flex-col items-center text-xl">
          <div>TUXC Run Preservation Project</div>
        </div>
        <LinkButton text="About the Project" href="/rpp" iconName="runner" />
        <div className="flex flex-col flex-wrap items-center gap-3 md:flex-row">
          <Textbox
            value={searchText}
            onChange={setSearchText}
            id="search"
            name="search"
            placeholder="search"
            required
            icon="search"
            className="w-full md:w-[300px]"
          />

          <SortDropdown
            value={sortValue}
            setValue={setSortValue}
            choices={["alphabetical", "recently added", "recently updated"]}
          />
        </div>

        {loading && <LoadingRunViews numLoading={3} />}

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
