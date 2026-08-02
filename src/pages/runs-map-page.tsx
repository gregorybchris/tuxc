import { useEffect, useRef, useState } from "react";

import { RunMapsView } from "@/components/run-maps-view";
import { Client } from "@/lib/clients/client";
import { Run } from "@/lib/models/run";
import { RunMap } from "@/lib/models/runMap";
import { LinkButton } from "@/widgets/link-button";
import { LoadingBox } from "@/widgets/loading-box";
import { Page, PageHeader } from "@/widgets/page";
import { useNavigate } from "react-router-dom";

export default function RunsMapPage() {
  const [loading, setLoading] = useState(true);
  const [runs, setRuns] = useState<Run[]>([]);
  const [runMaps, setRunMaps] = useState<RunMap[]>([]);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
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

  function onClickRun(id: number) {
    navigate(`/runs/${id}`);
  }

  function onHoverRun(id?: number) {
    if (id === undefined) {
      setSelectedRun(null);
      return;
    }
    setSelectedRun(runs.find((run) => run.id === id) ?? null);
  }

  return (
    <Page className="flex flex-col gap-6">
      <PageHeader
        title="Heatmap"
        lede="Works best on desktop. Hover over a route to see its name, click to open it."
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
        <div className="relative h-[60vh] min-h-[24rem] w-full overflow-hidden rounded-xl border border-black/10">
          <RunMapsView
            runMaps={runMaps}
            onClickRun={onClickRun}
            onHoverRun={onHoverRun}
          />

          {selectedRun && (
            <div className="pointer-events-none absolute left-3 top-3 flex flex-col rounded-md bg-white/95 px-3 py-1.5 shadow-sm">
              <span className="text-sm font-bold text-black/80">
                {selectedRun.name}
                <span className="pl-2 font-normal text-black/50">
                  {selectedRun.distance} mi
                </span>
              </span>
              <span className="text-xs text-black/40">{selectedRun.area}</span>
            </div>
          )}
        </div>
      )}
    </Page>
  );
}
