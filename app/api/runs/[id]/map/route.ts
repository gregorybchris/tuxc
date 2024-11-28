import { RunMap } from "@/app/lib/models/runMap";
import { getVisibleRuns } from "@/app/lib/utilities/api-utils";
import { ErrorResponse } from "@/app/lib/utilities/response-utils";
import { NextResponse } from "next/server";
import { MAPS } from "../../../../db/maps";

type GetRunMapParams = {
  params: { id: string };
};

export type GetRunMapResponse = RunMap;

export async function GET(
  req: Request,
  { params: { id } }: GetRunMapParams,
): Promise<NextResponse<GetRunMapResponse> | NextResponse<ErrorResponse>> {
  const idNumber = parseInt(id, 10);
  const runs = getVisibleRuns();
  const run = runs.find((run) => run.id === idNumber);
  if (!run) {
    return NextResponse.json(
      { error: `Run metadata not found: ${id}` },
      { status: 404 },
    );
  }
  const runMap = MAPS.find((map) => map.id === idNumber);
  if (!runMap) {
    return NextResponse.json(
      { error: `Run map not found: ${run.slug}` },
      { status: 404 },
    );
  } else {
    console.warn(
      `Could not find map for registered run: ${run.id} - ${run.name}`,
    );
  }
  return NextResponse.json(runMap);
}
