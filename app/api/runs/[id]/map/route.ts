import { RunMap } from "@/app/lib/models/runMap";
import { ErrorResponse } from "@/app/lib/utilities/response-utils";
import { NextResponse } from "next/server";
import { MAPS } from "../../maps";
import runs from "../../runs.json";

type GetRunMapParams = {
  params: { id: string };
};

export type GetRunMapResponse = RunMap;

export async function GET(
  req: Request,
  { params: { id } }: GetRunMapParams,
): Promise<NextResponse<GetRunMapResponse> | NextResponse<ErrorResponse>> {
  const idNumber = parseInt(id, 10);
  const run = runs.find((run) => run.id === idNumber);
  if (!run) {
    return NextResponse.json(
      { error: `Run metadata not found: ${id}` },
      { status: 404 },
    );
  }
  const runMap = MAPS.get(run.slug);
  if (!runMap) {
    return NextResponse.json(
      { error: `Run map not found: ${run.slug}` },
      { status: 404 },
    );
  }
  return NextResponse.json(runMap);
}
