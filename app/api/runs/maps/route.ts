import { RunMap } from "@/app/lib/models/runMap";
import { getVisibleRuns } from "@/app/lib/utilities/api-utils";
import { NextResponse } from "next/server";
import { MAPS } from "../../../db/maps";

export type GetRunMapsResponse = RunMap[];

export async function GET(
  req: Request,
): Promise<NextResponse<GetRunMapsResponse>> {
  const runMapsWithRuns: RunMap[] = [];
  const runs = getVisibleRuns();
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
