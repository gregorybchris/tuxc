import { RunMap } from "@/app/lib/models/runMap";
import { NextResponse } from "next/server";
import { MAPS } from "../maps";
import runs from "../runs.json";

export type GetRunMapsResponse = {
  runMaps: RunMap[];
};

export async function GET(
  req: Request,
): Promise<NextResponse<GetRunMapsResponse>> {
  const runMapsWithRuns: RunMap[] = [];
  for (const run of runs) {
    const runMap = MAPS.get(run.slug);
    if (runMap) {
      runMapsWithRuns.push(runMap);
    }
  }
  return NextResponse.json({ runMaps: runMapsWithRuns });
}
