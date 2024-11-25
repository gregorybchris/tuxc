"use client";

import { useEffect, useRef, useState } from "react";

import { LoadingBox } from "@/app/components/loading-box";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";
import { formatDatetimeWithMonthAndYear } from "@/app/lib/utilities/time-utils";

export default function RunPage({ params }: { params: { id: number } }) {
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState<Run>();
  const client = useRef(new Client());

  useEffect(() => {
    fetchRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchRun() {
    setLoading(true);
    client.current.getRun(params.id).then((run) => {
      setRun(run);
      setLoading(false);
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
        {!loading && !run && <div>run not found</div>}
        {!loading && run && (
          <div className="flex flex-col gap-3">
            <span className="w-full overflow-hidden truncate text-xl">
              {run.name}
            </span>

            <div className="flex flex-col gap-2 text-sm">
              <div className="">
                added: {formatDatetimeWithMonthAndYear(new Date(run.createdAt))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
