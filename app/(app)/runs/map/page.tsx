"use client";

import { useEffect, useRef, useState } from "react";

import { RunMapsView } from "@/app/components/run-maps-view";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";
import { RunMap } from "@/app/lib/models/runMap";
import { LinkButton } from "@/app/widgets/link-button";
import { LoadingBox } from "@/app/widgets/loading-box";
import { useRouter } from "next/navigation";

export default function RunsMapPage() {
  const [loading, setLoading] = useState(true);
  const [runs, setRuns] = useState<Run[]>([]);
  const [runMaps, setRunMaps] = useState<RunMap[]>([]);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const client = useRef(new Client());
  const { push } = useRouter();

  useEffect(() => {
    fetchRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchRuns() {
    setLoading(true);
    setRunMaps([]);
    client.current.getRunMaps().then((runMaps) => {
      setRunMaps(runMaps);
      setLoading(false);
    });
    setRuns([]);
    client.current.getRuns().then((runs) => {
      setRuns(runs);
    });
  }

  function onClickRun(id: number) {
    const run = runs.find((run) => run.id === id);
    if (run) {
      console.log(`Clicked run ${run.id} ${run.name} ${run.distance}`);
    }
    push(`/runs/${id}`);
  }

  function onHoverRun(id: number) {
    const run = runs.find((run) => run.id === id);
    if (run) {
      setSelectedRun(run);
    }
  }

  return (
    <div className="h-full w-full py-10 md:px-20 md:py-20">
      <div className="flex w-full flex-col items-center gap-5 md:items-start">
        <div className="flex w-full flex-col items-center">
          <div className="text-xl font-bold text-black/60">
            TUXC Run Preservation Project
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-6 md:items-start">
          <div className="flex w-full flex-row items-center justify-between gap-5">
            <LinkButton text="Runs grid" href="/runs" iconName="back" />
            <div className="text-sm">{selectedRun && selectedRun.name}</div>
          </div>
        </div>

        {loading && (
          <div className="flex w-full flex-col items-center">
            <LoadingBox className="h-[500px] w-full" />
          </div>
        )}

        {!loading && (
          <div className="w-full">
            <div className="h-[500px] w-full">
              <RunMapsView
                runMaps={runMaps}
                onClickRun={onClickRun}
                onHoverRun={onHoverRun}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
