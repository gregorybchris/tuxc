import { RunMap } from "@/app/lib/models/runMap";
import { NextResponse } from "next/server";
import { MAPS } from "../maps";
import runs from "../runs.json";

export type GetRunMapsResponse = RunMap[];

export async function GET(
  req: Request,
): Promise<NextResponse<GetRunMapsResponse>> {
  const runMapsWithRuns: RunMap[] = [];
  for (const run of runs) {
    const runMap = MAPS.find((map) => map.id === run.id);
    if (runMap) {
      runMapsWithRuns.push(runMap);
    } else {
      console.warn(
        `Could not find map for registered run: ${run.id} - ${run.name}`,
      );
    }
  }
  return NextResponse.json(runMapsWithRuns);
}
