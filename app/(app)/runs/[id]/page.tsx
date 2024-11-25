"use client";

import { useEffect, useRef, useState } from "react";

import { LoadingBox } from "@/app/components/loading-box";
import { RunMapView } from "@/app/components/run-map-view";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";
import { RunMap } from "@/app/lib/models/runMap";
import { formatDatetimeWithMonthAndYear } from "@/app/lib/utilities/time-utils";

export default function RunPage({ params }: { params: { id: number } }) {
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState<Run>();
  const [runMap, setRunMap] = useState<RunMap>();
  const client = useRef(new Client());

  useEffect(() => {
    fetchRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchRun() {
    setLoading(true);
    client.current.getRun(params.id).then((run) => {
      setRun(run);
      client.current.getRunMap(params.id).then((runMap) => {
        setRunMap(runMap);
        setLoading(false);
      });
    });
  }

  return (
    <div className="bg-background flex h-full w-full flex-row">
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 py-10">
        {loading && (
          <div className="text-darkest-white/50 flex flex-col gap-4 text-sm">
            <LoadingBox className="h-48 w-56" />
          </div>
        )}
        {!loading && (!run || !runMap) && <div>Run not found</div>}
        {!loading && run && runMap && (
          <div className="flex flex-col gap-7">
            <RunDetails run={run} />
            <RunMapView run={run} runMap={runMap} />
          </div>
        )}
      </div>
    </div>
  );
}

interface RunDetailsProps {
  run: Run;
}

function RunDetails({ run }: RunDetailsProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="w-full overflow-hidden truncate text-xl">
        {run.name}
      </span>

      <span className="w-full overflow-hidden truncate text-sm">
        Distance: {run.distance}
      </span>

      <span className="w-full overflow-hidden truncate text-sm">
        Region: {run.region}
      </span>

      {run.firstRunBy && (
        <span className="w-full overflow-hidden truncate text-sm">
          First run by: {run.firstRunBy}
        </span>
      )}

      {run.lore && (
        <span className="w-full overflow-hidden truncate text-sm">
          Lore: {run.lore}
        </span>
      )}

      <div className="flex flex-col gap-2 text-sm">
        <div className="">
          Added: {formatDatetimeWithMonthAndYear(new Date(run.createdAt))}
        </div>
      </div>
    </div>
  );
}
