"use client";

import { useEffect, useRef, useState } from "react";

import { LoadingRunViews } from "@/app/components/loading-run-views";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";

export default function EditPage() {
  const [loading, setLoading] = useState(true);
  const [runs, setRuns] = useState<Run[]>([]);
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

  return (
    <div className="h-full w-full px-5 py-10 md:px-20 md:py-20">
      <div className="flex w-full flex-col items-center gap-5 md:items-start">
        <div className="flex w-full flex-col items-center text-xl">
          <div>Edit</div>
        </div>
        {loading && <LoadingRunViews numLoading={10} />}

        {!loading && (
          <div className="flex flex-col gap-6">
            <div>How to make an edit</div>
            <div>You can't make edits yet. Check back later!</div>
          </div>
        )}
      </div>
    </div>
  );
}
