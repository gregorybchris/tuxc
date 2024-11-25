import { RunMap } from "@/app/lib/models/runMap";
import { ErrorResponse } from "@/app/lib/utilities/response-utils";
import { NextResponse } from "next/server";
import runs from "../../runs.json";
import { MAP_09_REDLINE } from "./09-map";

type GetRunMapParams = {
  params: { id: string };
};

export type GetRunMapResponse = {
  runMap: RunMap;
};

export async function GET(
  req: Request,
  { params: { id } }: GetRunMapParams,
): Promise<NextResponse<GetRunMapResponse> | NextResponse<ErrorResponse>> {
  const idNumber = parseInt(id, 10);
  const run = runs.find((run) => run.id === idNumber);
  if (!run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }
  // TODO: Pull run map from file

  const runMap = {
    points: MAP_09_REDLINE.points,
  };
  return NextResponse.json({ runMap });
}
