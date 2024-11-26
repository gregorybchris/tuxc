"use client";

import { useEffect, useRef, useState } from "react";

import { LoadingBox } from "@/app/components/loading-box";
import { RunMapView } from "@/app/components/run-map-view";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";
import { RunMap } from "@/app/lib/models/runMap";
import { cn } from "@/app/lib/utilities/style-utils";
import { formatDatetimeWithMonthAndYear } from "@/app/lib/utilities/time-utils";
import { LinkButton } from "@/app/widgets/link-button";

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
      <div className="flex h-full w-full flex-col py-5 md:py-8">
        {loading && (
          <div className="flex flex-col gap-3 px-2 md:px-2">
            <div className="flex flex-row gap-3">
              <LoadingBox className="h-48 w-64" />
              <LoadingBox className="h-48 w-64" />
              <LoadingBox className="h-48 w-64" />
            </div>
            <LoadingBox className="h-[100px] w-full md:h-[300px] md:w-[500px]" />
          </div>
        )}

        {!loading && (!run || !runMap) && <div>Run not found</div>}

        {!loading && run && runMap && (
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-col gap-4 md:w-[80%]">
              <div className="flex flex-col gap-3 px-5 md:px-0">
                <div className="flex flex-row">
                  <LinkButton href="/runs" text="All Runs" iconName="back" />
                </div>

                <RunDetails run={run} />
              </div>

              <div className="flex flex-col items-center">
                <div className="h-[500px] w-full">
                  <RunMapView run={run} runMap={runMap} />
                </div>
              </div>
            </div>
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
    <div className="flex flex-col gap-1">
      <RunDetail detail={run.name} className="text-lg font-bold" />
      <RunDetail name="Distance" detail={`${run.distance} mi`} />
      <RunDetail name="Region" detail={run.region} />
      {run.firstRunBy && (
        <RunDetail name="First run by" detail={run.firstRunBy} />
      )}
      {run.lore && <RunDetail name="Lore" detail={run.lore} />}
      <RunDetail
        name="Added"
        detail={formatDatetimeWithMonthAndYear(new Date(run.createdAt))}
      />
    </div>
  );
}

interface RunDetailProps {
  name?: string;
  detail: string;
  className?: string;
}

function RunDetail({ name, detail, className }: RunDetailProps) {
  return (
    <div className={cn("w-full text-sm", className)}>
      {name && <span className="font-bold">{name}: </span>}
      <span className="">{detail}</span>
    </div>
  );
}
